import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const ROUTES = ["/", "/carte/pizzas/", "/carte/tacos/", "/carte/burgers/", "/carte/formules/", "/infos/", "/mentions-legales/"];
const WCAG_22_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const MINIMUM_TARGET_SIZE = 44;

/**
 * Motion is reduced so scroll-revealed elements are fully visible: axe audits the whole page
 * at once, and an element still waiting for its reveal would be measured at opacity 0.
 */
async function openSettledPage(page: Page, route: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("[data-pending]")).toHaveCount(0);
}

for (const route of ROUTES) {
  test.describe(route, () => {
    test("has no WCAG 2.2 AA violation detected by axe", async ({ page }) => {
      await openSettledPage(page, route);
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_22_AA_TAGS).analyze();
      const summary = violations.map((violation) => ({
        rule: violation.id,
        targets: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(summary).toEqual([]);
    });

    test(`gives every visible control a target of at least ${MINIMUM_TARGET_SIZE} px`, async ({ page }) => {
      await openSettledPage(page, route);
      const tooSmall = await page.evaluate((minimum) => {
        const controls = [...document.querySelectorAll<HTMLElement>("a[href], button, summary")];
        return controls
          .filter((control) => control.getClientRects().length > 0 && !control.classList.contains("skip-link"))
          .filter((control) => getComputedStyle(control).display !== "inline")
          .map((control) => ({ text: control.innerText.trim().slice(0, 30), box: control.getBoundingClientRect() }))
          .filter(({ box }) => box.width < minimum || box.height < minimum)
          .map(({ text, box }) => `${text} (${Math.round(box.width)}×${Math.round(box.height)})`);
      }, MINIMUM_TARGET_SIZE);
      expect(tooSmall).toEqual([]);
    });

    test("reaches every control with the keyboard, with a visible focus", async ({ page }) => {
      await openSettledPage(page, route);
      const focusableCount = await page.evaluate(() => {
        const focusables = [...document.querySelectorAll<HTMLElement>("a[href], button, summary")].filter(
          (element) => element.getClientRects().length > 0 || element.classList.contains("skip-link"),
        );
        focusables.forEach((element, index) => (element.dataset.focusIndex = String(index)));
        return focusables.length;
      });
      const visited = new Set<string>();
      for (let step = 0; step < focusableCount; step++) {
        await page.keyboard.press("Tab");
        const focus = await page.evaluate(() => {
          const element = document.activeElement as HTMLElement;
          const style = getComputedStyle(element);
          return {
            index: element.dataset.focusIndex ?? `unexpected ${element.tagName}`,
            label: element.innerText.trim().slice(0, 30),
            outlineVisible: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0,
          };
        });
        expect(focus.outlineVisible, `focus outline on « ${focus.label} »`).toBe(true);
        visited.add(focus.index);
      }
      expect(visited.size).toBe(focusableCount);
    });
  });
}

test("opens a pizza with the keyboard on mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "the <details> rows only exist on mobile");
  await openSettledPage(page, "/carte/pizzas/");
  const firstSummary = page.locator("summary:visible").first();
  await firstSummary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details:visible").first()).toHaveAttribute("open", "");
});

import { describe, expect, it } from "vitest";
import infos from "@/content/infos.json";
import legal from "@/content/legal.json";
import ui from "@/content/ui.json";
import { burgers, lowestBurgerPrice, lowestMegaPrice, lowestSeniorPrice, menu, pizzas, selectByName } from "@/lib/menu";

const FORBIDDEN_WORDS = ["halal", "sans porc", "artisanal", "fait maison"];

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

describe("menu", () => {
  it("lists 32 pizzas split 18 / 11 / 3 across families", () => {
    expect(pizzas).toHaveLength(32);
    expect(menu.pizzas.families.map((family) => family.items.length)).toEqual([18, 11, 3]);
  });

  it("lists 9 burgers split 5 / 4 across groups", () => {
    expect(burgers).toHaveLength(9);
    expect(menu.burgers.groups.map((group) => group.items.length)).toEqual([5, 4]);
  });

  it("stores every price as a positive number", () => {
    const prices = collectPrices(menu);
    expect(prices.length).toBeGreaterThan(0);
    for (const price of prices) expect(price).toBeGreaterThan(0);
  });

  it("resolves every dish featured on the home page", () => {
    expect(selectByName(pizzas, ui.home.pizzas.featured)).toHaveLength(8);
    expect(selectByName(burgers, ui.home.burgers.featured)).toHaveLength(3);
    expect(() => selectByName(pizzas, ["Hawaïenne"])).toThrow(/Hawaïenne/);
  });

  it("derives the 'from' prices shown on the home page", () => {
    expect(lowestSeniorPrice).toBe(6);
    expect(lowestMegaPrice).toBe(9);
    expect(lowestBurgerPrice).toBe(3.9);
  });
});

describe("wording rules", () => {
  const allTexts = collectStrings([menu, infos, ui, legal]).map((text) => text.toLowerCase());

  it.each(FORBIDDEN_WORDS)("never uses « %s »", (word) => {
    expect(allTexts.filter((text) => text.includes(word))).toEqual([]);
  });

  it("only uses « maison » in the tacos bases", () => {
    const tacosBases = menu.tacos.bases.map((base) => base.detail.toLowerCase());
    const offending = allTexts.filter((text) => text.includes("maison") && !tacosBases.includes(text));
    expect(offending).toEqual([]);
  });
});

function collectPrices(value: unknown): number[] {
  if (Array.isArray(value)) return value.flatMap(collectPrices);
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) =>
    key.endsWith("_eur") && typeof child === "number" ? [child] : collectPrices(child),
  );
}

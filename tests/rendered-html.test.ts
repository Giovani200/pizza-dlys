import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse, type HTMLElement } from "node-html-parser";
import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/format";
import { burgers, menu, pizzas } from "@/lib/menu";

const EXPORT_DIRECTORY = join(__dirname, "..", "out");
const FORBIDDEN_WORDS = ["halal", "sans porc", "artisanal", "fait maison"];

if (!existsSync(EXPORT_DIRECTORY)) {
  throw new Error("No static export found in out/. Run `npm run verify` (build, then tests).");
}

const normalizeSpaces = (text: string) => text.replace(/\s+/g, " ").trim();

function readPage(route: string): HTMLElement {
  return parse(readFileSync(join(EXPORT_DIRECTORY, route, "index.html"), "utf8"));
}

function readDisplayedDishes(route: string) {
  return readPage(route)
    .querySelectorAll("[data-dish]")
    .map((row) => ({
      names: row.querySelectorAll("[data-dish-name]").map((name) => normalizeSpaces(name.text)),
      prices: row.querySelectorAll("[data-dish-price]").map((price) => normalizeSpaces(price.text)),
    }));
}

const expectedPrice = (amount: number) => normalizeSpaces(formatPrice(amount));

describe("the generated menu pages match content/menu.json", () => {
  it("shows the 32 pizzas with their exact Senior and Méga prices, in every layout", () => {
    const rows = readDisplayedDishes("carte/pizzas");
    expect(rows).toHaveLength(32);
    rows.forEach((row, index) => {
      const pizza = pizzas[index];
      const layoutCount = row.names.length;
      expect(layoutCount).toBeGreaterThan(0);
      expect(row.names).toEqual(Array(layoutCount).fill(pizza.name));
      expect(row.prices).toEqual(
        Array.from({ length: layoutCount }, () => [expectedPrice(pizza.senior_eur), expectedPrice(pizza.mega_eur)]).flat(),
      );
    });
  });

  it("shows the 9 burgers with their exact prices", () => {
    const rows = readDisplayedDishes("carte/burgers");
    expect(rows).toEqual(burgers.map((burger) => ({ names: [burger.name], prices: [expectedPrice(burger.price_eur)] })));
  });
});

describe("the generated pages are complete", () => {
  const pages = readdirSync(EXPORT_DIRECTORY, { recursive: true, encoding: "utf8" }).filter(
    (file) => file.endsWith("index.html") && !file.includes("_not-found"),
  );

  const imageUrls = (document: HTMLElement) =>
    [
      ...document.querySelectorAll("img").flatMap((image) => [image.getAttribute("src"), image.getAttribute("srcset")]),
      ...document.querySelectorAll('link[rel="preload"][as="image"]').map((link) => link.getAttribute("imagesrcset")),
    ]
      .filter((value): value is string => Boolean(value))
      .flatMap((value) => value.split(",").map((candidate) => candidate.trim().split(/\s+/)[0]))
      .filter((url) => url.startsWith("/"));

  it.each(pages)("%s only references image files that exist", (file) => {
    const urls = imageUrls(parse(readFileSync(join(EXPORT_DIRECTORY, file), "utf8")));
    expect(urls.length).toBeGreaterThan(0);
    const missing = urls.filter((url) => !existsSync(join(EXPORT_DIRECTORY, decodeURIComponent(url))));
    expect(missing).toEqual([]);
  });

  it.each(pages)("%s has a meta description", (file) => {
    const description = parse(readFileSync(join(EXPORT_DIRECTORY, file), "utf8"))
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    expect(description?.length).toBeGreaterThan(50);
  });
});

describe("the generated HTML respects the wording rules", () => {
  const htmlFiles = readdirSync(EXPORT_DIRECTORY, { recursive: true, encoding: "utf8" }).filter((file) =>
    file.endsWith(".html"),
  );
  const allowedMaisonTexts = menu.tacos.bases.map((base) => base.detail.toLowerCase());

  it("has pages to check", () => {
    expect(htmlFiles.length).toBeGreaterThan(0);
  });

  it.each(htmlFiles)("%s contains no forbidden word", (file) => {
    const text = normalizeSpaces(parse(readFileSync(join(EXPORT_DIRECTORY, file), "utf8")).text).toLowerCase();
    for (const word of FORBIDDEN_WORDS) expect(text).not.toContain(word);

    const textWithoutAllowedUses = allowedMaisonTexts.reduce((remaining, allowed) => remaining.replaceAll(allowed, ""), text);
    expect(textWithoutAllowedUses).not.toContain("maison");
  });
});

import ui from "@/content/ui.json";
import { fillTemplate, formatPrice, lowercaseFirst } from "@/lib/format";

const FOOTNOTE_MARK = "*";

const withoutFootnoteMark = (text: string) => text.replaceAll(FOOTNOTE_MARK, "").trim();

/**
 * The restaurant's posters carry prices and conditions, so their alt text must say the same.
 * These builders read everything from content/ so the alt never drifts from the menu.
 */
export function counterPosterAlt(items: { name: string; price_eur: number }[]): string {
  const list = items.map((item) => `${item.name} ${formatPrice(item.price_eur)}`).join(", ");
  return fillTemplate(ui.images.counter_poster, { items: list });
}

export function menuPosterAlt(menu: { name: string; price_eur: number; detail: string }): string {
  return fillTemplate(ui.images.menu_poster, {
    name: menu.name,
    price: formatPrice(menu.price_eur),
    detail: lowercaseFirst(menu.detail),
  });
}

export function formulaPosterAlt(formula: { name: string; price_eur: number; detail: string }, footnote: string): string {
  const condition = lowercaseFirst(withoutFootnoteMark(footnote).replace(/\.$/, ""));
  return fillTemplate(ui.images.formula_poster, {
    name: formula.name,
    price: formatPrice(formula.price_eur),
    detail: `${lowercaseFirst(withoutFootnoteMark(formula.detail))}, ${condition}`,
  });
}

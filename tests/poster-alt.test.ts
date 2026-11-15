import { describe, expect, it } from "vitest";
import { menu } from "@/lib/menu";
import { counterPosterAlt, formulaPosterAlt, menuPosterAlt } from "@/lib/poster-alt";

const normalizeSpaces = (text: string) => text.replaceAll(" ", " ");

describe("poster alt texts", () => {
  it("matches the reference alt for the menu poster", () => {
    expect(normalizeSpaces(menuPosterAlt(menu.formules.menu))).toBe(
      "Menu 4,90 € : hamburger (pain, steak, cornichons, sauce) + frites + boisson",
    );
  });

  it("matches the reference alt for the lunch formula posters", () => {
    const [burger, tacos] = menu.formules.midi.items;
    const footnote = menu.formules.midi.footnote;
    expect(normalizeSpaces(formulaPosterAlt(burger, footnote))).toBe(
      "Formule Burger 7,50 € : un burger D-Lys au choix (hors Triple Cheese) + frites + boisson + dessert, hors tiramisu et tarte au daim",
    );
    expect(normalizeSpaces(formulaPosterAlt(tacos, footnote))).toBe(
      "Formule Tacos 8,50 € : un tacos taille M + boisson + dessert, hors tiramisu et tarte au daim",
    );
  });

  it("lists every burger with its price for the counter poster", () => {
    expect(normalizeSpaces(counterPosterAlt(menu.burgers.groups[1].items))).toBe(
      "Affiche du comptoir : D-Lys Fish 6,90 €, D-Lys Steak 7,90 €, D-Lys Chicken 7,90 €, D-Lys Crispy 7,90 €",
    );
  });
});

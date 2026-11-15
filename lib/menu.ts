import menu from "@/content/menu.json";

export { menu };

export const pizzas = menu.pizzas.families.flatMap((family) => family.items);
export const burgers = menu.burgers.groups.flatMap((group) => group.items);

export const lowestSeniorPrice = Math.min(...pizzas.map((pizza) => pizza.senior_eur));
export const lowestMegaPrice = Math.min(...pizzas.map((pizza) => pizza.mega_eur));
export const lowestBurgerPrice = Math.min(...burgers.map((burger) => burger.price_eur));

/**
 * Resolves the home page's editorial selection (names in content/ui.json) against the menu.
 * Throws on an unknown name so a renamed or removed dish breaks the build instead of vanishing.
 */
export function selectByName<Dish extends { name: string }>(dishes: Dish[], names: string[]): Dish[] {
  return names.map((name) => {
    const dish = dishes.find((candidate) => candidate.name === name);
    if (!dish) throw new Error(`Featured dish "${name}" is not in content/menu.json`);
    return dish;
  });
}

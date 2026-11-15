import { describe, expect, it } from "vitest";
import { fillTemplate, formatPrice, formatTime } from "@/lib/format";

const NO_BREAK_SPACE = " ";

describe("formatPrice", () => {
  it.each([
    [6, "6"],
    [16, "16"],
    [8.5, "8,50"],
    [3.9, "3,90"],
  ])("formats %d as « %s € »", (amount, expected) => {
    expect(formatPrice(amount)).toBe(`${expected}${NO_BREAK_SPACE}€`);
  });

  it("adds the sign for supplements", () => {
    expect(formatPrice(1, { signed: true })).toBe(`+1${NO_BREAK_SPACE}€`);
    expect(formatPrice(1.5, { signed: true })).toBe(`+1,50${NO_BREAK_SPACE}€`);
  });
});

describe("formatTime", () => {
  it("uses the French « h » separator", () => {
    expect(formatTime("11:00")).toBe("11h00");
    expect(formatTime("22:30")).toBe("22h30");
  });
});

describe("fillTemplate", () => {
  it("replaces every placeholder", () => {
    expect(fillTemplate("Voir les {count} pizzas", { count: 32 })).toBe("Voir les 32 pizzas");
  });

  it("throws on a missing value", () => {
    expect(() => fillTemplate("Appeler le {phone}", {})).toThrow(/phone/);
  });
});

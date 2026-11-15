import { describe, expect, it } from "vitest";
import {
  describeOpeningStatus,
  formatDayList,
  getOpeningStatus,
  groupOpeningDays,
  type OpeningHours,
} from "@/lib/opening-hours";

const parisWinter = (date: string, time: string) => new Date(`${date}T${time}:00+01:00`);
const MONDAY = "2026-11-16";
const FRIDAY = "2026-11-20";
const SATURDAY = "2026-11-21";
const SUNDAY = "2026-11-22";

const describeAt = (date: Date) => describeOpeningStatus(getOpeningStatus(date));

describe("getOpeningStatus at every opening boundary", () => {
  it.each([
    ["10:59", "Fermé", "ouvre à 11h00"],
    ["11:00", "Ouvert", "de 11h00 à 14h30"],
    ["14:29", "Ouvert", "de 11h00 à 14h30"],
    ["14:30", "Fermé", "ouvre à 18h00"],
    ["17:59", "Fermé", "ouvre à 18h00"],
    ["18:00", "Ouvert", "de 18h00 à 22h30"],
    ["22:29", "Ouvert", "de 18h00 à 22h30"],
    ["22:30", "Fermé", "ouvre demain à 11h00"],
  ])("Monday %s → %s, %s", (time, label, detail) => {
    expect(describeAt(parisWinter(MONDAY, time))).toEqual({ isOpen: label === "Ouvert", label, detail });
  });

  it("is closed on Friday at noon", () => {
    expect(describeAt(parisWinter(FRIDAY, "12:00"))).toEqual({ isOpen: false, label: "Fermé", detail: "ouvre à 18h00" });
  });

  it("is closed on Sunday at noon", () => {
    expect(describeAt(parisWinter(SUNDAY, "12:00"))).toEqual({ isOpen: false, label: "Fermé", detail: "ouvre à 18h00" });
  });

  it("opens Friday evening only, so Thursday night points to 18h00", () => {
    expect(describeAt(parisWinter("2026-11-19", "23:00")).detail).toBe("ouvre demain à 18h00");
  });

  it("reads the time in Paris, summer time included", () => {
    expect(describeAt(new Date("2026-07-06T09:00:00Z")).label).toBe("Ouvert");
    expect(describeAt(new Date("2026-07-06T08:59:00Z")).label).toBe("Fermé");
  });

  it("skips a closed day when looking for the next opening", () => {
    const hours: OpeningHours = {
      timezone: "Europe/Paris",
      weekly: {
        monday: [], tuesday: [["11:00", "14:30"]], wednesday: [], thursday: [],
        friday: [], saturday: [], sunday: [["18:00", "22:30"]],
      },
    };
    const status = getOpeningStatus(parisWinter(SUNDAY, "23:00"), hours);
    expect(describeOpeningStatus(status).detail).toBe("ouvre mardi à 11h00");
  });

  it("uses Saturday's own hours", () => {
    expect(describeAt(parisWinter(SATURDAY, "12:00")).label).toBe("Ouvert");
  });
});

describe("opening days display", () => {
  it("groups days that share the same slots, in week order", () => {
    expect(groupOpeningDays().map((group) => group.days)).toEqual([
      ["monday", "tuesday", "wednesday", "thursday", "saturday"],
      ["friday", "sunday"],
    ]);
  });

  it("writes the day list in French", () => {
    expect(formatDayList(["friday", "sunday"])).toBe("Vendredi et dimanche");
    expect(formatDayList(["monday", "tuesday", "wednesday", "thursday", "saturday"])).toBe(
      "Lundi, mardi, mercredi, jeudi et samedi",
    );
  });
});

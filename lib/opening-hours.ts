import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { fillTemplate, formatTime } from "@/lib/format";

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
type Weekday = (typeof WEEKDAYS)[number];

type Slot = string[];
export type OpeningHours = { timezone: string; weekly: Record<Weekday, Slot[]> };

type OpeningStatus =
  | { isOpen: true; start: string; end: string }
  | { isOpen: false; nextOpening: { daysAhead: number; weekday: Weekday; time: string } | null };

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

function readClock(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)!.value;
  return {
    weekdayIndex: WEEKDAYS.indexOf(part("weekday").toLowerCase() as Weekday),
    minutes: Number(part("hour")) * 60 + Number(part("minute")),
  };
}

/**
 * Tells whether the restaurant is open at `date`, read in the restaurant's timezone.
 * A slot includes its start minute and excludes its end minute: open at 11:00, closed at 14:30.
 */
export function getOpeningStatus(date: Date, hours: OpeningHours = infos.hours): OpeningStatus {
  const { weekdayIndex, minutes } = readClock(date, hours.timezone);

  const currentSlot = hours.weekly[WEEKDAYS[weekdayIndex]].find(
    ([start, end]) => toMinutes(start) <= minutes && minutes < toMinutes(end),
  );
  if (currentSlot) return { isOpen: true, start: currentSlot[0], end: currentSlot[1] };

  for (let daysAhead = 0; daysAhead <= WEEKDAYS.length; daysAhead++) {
    const weekday = WEEKDAYS[(weekdayIndex + daysAhead) % WEEKDAYS.length];
    const nextSlot = hours.weekly[weekday].find(([start]) => daysAhead > 0 || toMinutes(start) > minutes);
    if (nextSlot) return { isOpen: false, nextOpening: { daysAhead, weekday, time: nextSlot[0] } };
  }
  return { isOpen: false, nextOpening: null };
}

const weekdayNameFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "UTC" });
const FIRST_MONDAY_OF_2024 = Date.UTC(2024, 0, 1);
const DAY_IN_MILLISECONDS = 86_400_000;

function frenchWeekdayName(weekday: Weekday): string {
  return weekdayNameFormatter.format(FIRST_MONDAY_OF_2024 + WEEKDAYS.indexOf(weekday) * DAY_IN_MILLISECONDS);
}

export function describeOpeningStatus(status: OpeningStatus) {
  if (status.isOpen) {
    return {
      isOpen: true,
      label: ui.status.open,
      detail: fillTemplate(ui.status.open_slot, { start: formatTime(status.start), end: formatTime(status.end) }),
    };
  }
  const { nextOpening } = status;
  if (!nextOpening) return { isOpen: false, label: ui.status.closed, detail: "" };

  return { isOpen: false, label: ui.status.closed, detail: describeNextOpening(nextOpening) };
}

function describeNextOpening({ daysAhead, weekday, time }: { daysAhead: number; weekday: Weekday; time: string }) {
  const displayTime = formatTime(time);
  if (daysAhead === 0) return fillTemplate(ui.status.opens_today, { time: displayTime });
  if (daysAhead === 1) return fillTemplate(ui.status.opens_tomorrow, { time: displayTime });
  return fillTemplate(ui.status.opens_on, { day: frenchWeekdayName(weekday), time: displayTime });
}

export function groupOpeningDays(hours: OpeningHours = infos.hours) {
  const groups = new Map<string, { days: Weekday[]; slots: Slot[] }>();
  for (const weekday of WEEKDAYS) {
    const slots = hours.weekly[weekday];
    const key = JSON.stringify(slots);
    const group = groups.get(key) ?? { days: [], slots };
    group.days.push(weekday);
    groups.set(key, group);
  }
  return [...groups.values()];
}

export function formatDayList(days: Weekday[]): string {
  const list = new Intl.ListFormat("fr-FR", { type: "conjunction" }).format(days.map(frenchWeekdayName));
  return list.charAt(0).toUpperCase() + list.slice(1);
}

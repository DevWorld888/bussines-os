export type CalendarEventType = "job" | "quote" | "task";

export type CalendarEvent = {
  id: string;
  type: CalendarEventType;
  title: string;
  date: string; // YYYY-MM-DD
  customerId: number | null;
  customerName: string | null;
  status: string;
  address?: string | null;
  notes?: string | null;
  sourceId: number;
  href: string;
};

export type CalendarSummary = {
  todaysJobs: number;
  upcomingQuotes: number;
  overdueTasks: number;
  completedToday: number;
};

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export function addMonths(iso: string, months: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setMonth(d.getMonth() + months, 1);
  return toISODate(d);
}

export function startOfMonth(iso: string): string {
  return iso.slice(0, 7) + "-01";
}

export function getMonthLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export function getWeekLabel(weekDays: string[]): string {
  const start = new Date(weekDays[0] + "T00:00:00");
  const end = new Date(weekDays[6] + "T00:00:00");
  const startLabel = start.toLocaleDateString("en-AU", { month: "short", day: "numeric" });
  const endLabel = end.toLocaleDateString("en-AU", { month: "short", day: "numeric", year: "numeric" });
  return `${startLabel} – ${endLabel}`;
}

export function getDayLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

/** Full 6-week (42 day) grid covering the month, weeks starting Monday. */
export function getMonthGridDays(iso: string): string[] {
  const first = new Date(startOfMonth(iso) + "T00:00:00");
  const firstDow = (first.getDay() + 6) % 7; // 0 = Monday
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - firstDow);

  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    return toISODate(day);
  });
}

export function getWeekDays(iso: string): string[] {
  const d = new Date(iso + "T00:00:00");
  const dow = (d.getDay() + 6) % 7;
  const start = new Date(d);
  start.setDate(d.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return toISODate(day);
  });
}

export function isSameMonth(iso: string, monthIso: string): boolean {
  return iso.slice(0, 7) === monthIso.slice(0, 7);
}

export function getCalendarSummary(events: CalendarEvent[], todayISO: string): CalendarSummary {
  const in7ISO = addDays(todayISO, 7);
  return {
    todaysJobs: events.filter((e) => e.type === "job" && e.date === todayISO).length,
    upcomingQuotes: events.filter(
      (e) => e.type === "quote" && e.date >= todayISO && e.date <= in7ISO
    ).length,
    overdueTasks: events.filter(
      (e) => e.type === "task" && e.date < todayISO && e.status !== "done"
    ).length,
    completedToday: events.filter(
      (e) =>
        e.date === todayISO &&
        ((e.type === "job" && e.status === "completed") || (e.type === "task" && e.status === "done"))
    ).length,
  };
}

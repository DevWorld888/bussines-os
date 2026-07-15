import type { CalendarEventType } from "@/lib/calendar-utils";

export const eventColors: Record<
  CalendarEventType,
  { bg: string; text: string; dot: string; label: string }
> = {
  job: { bg: "#eaf2ff", text: "#1d4ed8", dot: "#2563eb", label: "Jobs" },
  quote: { bg: "#fff4e5", text: "#c2410c", dot: "#f97316", label: "Quotes" },
  task: { bg: "#eafbf0", text: "#15803d", dot: "#16a34a", label: "Tasks" },
};

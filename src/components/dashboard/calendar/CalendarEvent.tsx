"use client";

import type { CalendarEvent as CalendarEventData } from "@/lib/calendar-utils";
import { eventColors } from "./eventColors";

export default function CalendarEventChip({
  event,
  onClick,
}: {
  event: CalendarEventData;
  onClick: () => void;
}) {
  const colors = eventColors[event.type];

  return (
    <button
      type="button"
      onClick={onClick}
      title={event.customerName ? `${event.title} — ${event.customerName}` : event.title}
      className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-[6px] text-left transition-opacity hover:opacity-80"
      style={{ background: colors.bg, color: colors.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors.dot }} />
      <span className="text-[11px] font-medium truncate">{event.title}</span>
    </button>
  );
}

"use client";

import type { CalendarEvent } from "@/lib/calendar-utils";
import { getMonthGridDays, getWeekDays, isSameMonth, toISODate, getDayLabel } from "@/lib/calendar-utils";
import CalendarEventChip from "./CalendarEvent";
import { eventColors } from "./eventColors";

type ViewMode = "month" | "week" | "day";

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarGrid({
  view,
  cursor,
  events,
  onSelectEvent,
}: {
  view: ViewMode;
  cursor: string;
  events: CalendarEvent[];
  onSelectEvent: (e: CalendarEvent) => void;
}) {
  const today = toISODate(new Date());
  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const list = eventsByDate.get(e.date) ?? [];
    list.push(e);
    eventsByDate.set(e.date, list);
  }

  if (view === "day") {
    const dayEvents = eventsByDate.get(cursor) ?? [];
    return (
      <div className="card-elevated flex flex-col gap-3">
        <h3 className="t-small font-semibold text-[#0a0a0a]">{getDayLabel(cursor)}</h3>
        {dayEvents.length === 0 ? (
          <p className="t-small text-[#737373] py-8 text-center">No events on this day.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {dayEvents.map((e) => {
              const colors = eventColors[e.type];
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => onSelectEvent(e)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-[#e5e5e5] text-left hover:bg-[#f2f2f2] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: colors.dot }} />
                  <div className="flex flex-col min-w-0">
                    <span className="t-small font-medium text-[#0a0a0a] truncate">{e.title}</span>
                    {e.customerName && (
                      <span className="t-caption text-[#737373] truncate">{e.customerName}</span>
                    )}
                  </div>
                  <span className="ml-auto t-caption text-[#737373] capitalize shrink-0">{e.status}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const days = view === "week" ? getWeekDays(cursor) : getMonthGridDays(cursor);

  return (
    <div className="card-elevated flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-2">
        {weekLabels.map((w) => (
          <span
            key={w}
            className="t-caption text-[#737373] font-medium uppercase tracking-widest text-center"
          >
            {w}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((iso) => {
          const dayEvents = eventsByDate.get(iso) ?? [];
          const inMonth = view === "week" ? true : isSameMonth(iso, cursor);
          const isToday = iso === today;
          return (
            <div
              key={iso}
              className={[
                "rounded-[10px] border p-1.5 flex flex-col gap-1",
                view === "week" ? "min-h-[220px]" : "min-h-[96px]",
                inMonth ? "border-[#e5e5e5] bg-white" : "border-transparent bg-[#fafafa]",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[11px] font-medium w-5 h-5 flex items-center justify-center rounded-full",
                  isToday ? "bg-[#0a0a0a] text-white" : inMonth ? "text-[#0a0a0a]" : "text-[#c9c9c9]",
                ].join(" ")}
              >
                {Number(iso.slice(8, 10))}
              </span>
              <div className="flex flex-col gap-1">
                {dayEvents.map((e) => (
                  <CalendarEventChip key={e.id} event={e} onClick={() => onSelectEvent(e)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { getMonthGridDays, isSameMonth, toISODate } from "@/lib/calendar-utils";

const weekLabels = ["M", "T", "W", "T", "F", "S", "S"];

export default function MiniCalendar({
  cursor,
  onSelect,
}: {
  cursor: string;
  onSelect: (iso: string) => void;
}) {
  const days = getMonthGridDays(cursor);
  const today = toISODate(new Date());

  return (
    <div className="card-elevated w-64 flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-1">
        {weekLabels.map((w, i) => (
          <span key={i} className="t-caption text-[#737373] text-center font-medium">
            {w}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((iso) => {
          const inMonth = isSameMonth(iso, cursor);
          const isToday = iso === today;
          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(iso)}
              className={[
                "h-7 rounded-[8px] text-[12px] flex items-center justify-center transition-colors hover:bg-[#f2f2f2]",
                !inMonth ? "text-[#c9c9c9]" : "text-[#0a0a0a]",
                isToday ? "font-semibold" : "font-normal",
              ].join(" ")}
            >
              {Number(iso.slice(8, 10))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

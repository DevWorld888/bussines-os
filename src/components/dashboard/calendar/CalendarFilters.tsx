"use client";

import type { CalendarEventType } from "@/lib/calendar-utils";
import { eventColors } from "./eventColors";

export type FilterState = Record<CalendarEventType, boolean>;

const types: CalendarEventType[] = ["job", "quote", "task"];

export default function CalendarFilters({
  filters,
  counts,
  onChange,
}: {
  filters: FilterState;
  counts: Record<CalendarEventType, number>;
  onChange: (type: CalendarEventType) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {types.map((type) => {
        const colors = eventColors[type];
        const active = filters[type];
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className="flex items-center gap-1.5 px-3 py-[6px] rounded-[10px] border text-[13px] font-medium transition-colors"
            style={{
              borderColor: active ? colors.dot : "#e5e5e5",
              background: active ? colors.bg : "transparent",
              color: active ? colors.text : "#737373",
            }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: colors.dot }} />
            {colors.label}
            <span className="t-caption">({counts[type]})</span>
          </button>
        );
      })}
    </div>
  );
}

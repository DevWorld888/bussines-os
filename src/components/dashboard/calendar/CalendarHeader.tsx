"use client";

type ViewMode = "month" | "week" | "day";

const views: ViewMode[] = ["month", "week", "day"];

export default function CalendarHeader({
  label,
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday,
  search,
  onSearchChange,
  onToggleMiniCalendar,
}: {
  label: string;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  search: string;
  onSearchChange: (v: string) => void;
  onToggleMiniCalendar: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onToday} className="btn-ghost">
          Today
        </button>
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#e5e5e5] text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f2f2f2] transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#e5e5e5] text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f2f2f2] transition-colors"
        >
          ›
        </button>
        <button
          type="button"
          onClick={onToggleMiniCalendar}
          className="t-heading text-[#000000] cursor-pointer"
        >
          {label}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search title or customer…"
          className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#0a0a0a] transition-colors w-56"
        />
        <div className="flex items-center rounded-[10px] border border-[#e5e5e5] p-[2px]">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onViewChange(v)}
              className={[
                "px-3 py-[5px] rounded-[8px] text-[13px] font-medium capitalize transition-colors",
                view === v ? "bg-[#0a0a0a] text-white" : "text-[#737373] hover:text-[#0a0a0a]",
              ].join(" ")}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

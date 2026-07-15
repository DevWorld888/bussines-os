"use client";

import { useMemo, useState } from "react";
import type { CalendarEvent, CalendarEventType } from "@/lib/calendar-utils";
import {
  addDays,
  addMonths,
  getDayLabel,
  getMonthLabel,
  getWeekDays,
  getWeekLabel,
  toISODate,
} from "@/lib/calendar-utils";
import CalendarHeader from "./CalendarHeader";
import CalendarFilters from "./CalendarFilters";
import CalendarGrid from "./CalendarGrid";
import MiniCalendar from "./MiniCalendar";
import EventDrawer from "./EventDrawer";

type ViewMode = "month" | "week" | "day";

export default function CalendarShell({ events }: { events: CalendarEvent[] }) {
  const today = toISODate(new Date());
  const [view, setView] = useState<ViewMode>("month");
  const [cursor, setCursor] = useState(today);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<CalendarEventType, boolean>>({
    job: true,
    quote: true,
    task: true,
  });
  const [selected, setSelected] = useState<CalendarEvent | null>(null);
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);

  const counts = useMemo(
    () => ({
      job: events.filter((e) => e.type === "job").length,
      quote: events.filter((e) => e.type === "quote").length,
      task: events.filter((e) => e.type === "task").length,
    }),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      if (!filters[e.type]) return false;
      if (!q) return true;
      return e.title.toLowerCase().includes(q) || (e.customerName?.toLowerCase().includes(q) ?? false);
    });
  }, [events, filters, search]);

  const label = useMemo(() => {
    if (view === "month") return getMonthLabel(cursor);
    if (view === "week") return getWeekLabel(getWeekDays(cursor));
    return getDayLabel(cursor);
  }, [view, cursor]);

  function handlePrev() {
    if (view === "month") setCursor((c) => addMonths(c, -1));
    else if (view === "week") setCursor((c) => addDays(c, -7));
    else setCursor((c) => addDays(c, -1));
  }

  function handleNext() {
    if (view === "month") setCursor((c) => addMonths(c, 1));
    else if (view === "week") setCursor((c) => addDays(c, 7));
    else setCursor((c) => addDays(c, 1));
  }

  function toggleFilter(type: CalendarEventType) {
    setFilters((f) => ({ ...f, [type]: !f[type] }));
  }

  if (events.length === 0) {
    return (
      <div className="card-elevated flex flex-col items-center justify-center gap-2 py-20 text-center">
        <p className="t-small font-semibold text-[#0a0a0a]">No events scheduled.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CalendarHeader
        label={label}
        view={view}
        onViewChange={(v) => {
          setView(v);
          setShowMiniCalendar(false);
        }}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={() => setCursor(today)}
        search={search}
        onSearchChange={setSearch}
        onToggleMiniCalendar={() => setShowMiniCalendar((v) => !v)}
      />

      <CalendarFilters filters={filters} counts={counts} onChange={toggleFilter} />

      {showMiniCalendar && (
        <MiniCalendar
          cursor={cursor}
          onSelect={(iso) => {
            setCursor(iso);
            setShowMiniCalendar(false);
          }}
        />
      )}

      <CalendarGrid view={view} cursor={cursor} events={filteredEvents} onSelectEvent={setSelected} />

      <EventDrawer event={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

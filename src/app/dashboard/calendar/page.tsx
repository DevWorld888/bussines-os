import OverviewCard from "@/components/dashboard/OverviewCard";
import CalendarShell from "@/components/dashboard/calendar/CalendarShell";
import { getCalendarEvents } from "@/lib/calendar";
import { getCalendarSummary, toISODate } from "@/lib/calendar-utils";

export default async function CalendarPage() {
  const events = await getCalendarEvents();
  const today = toISODate(new Date());
  const summary = getCalendarSummary(events, today);

  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div>
        <h2 className="t-heading text-[#000000]">Calendar</h2>
        <p className="t-small text-[#737373] mt-1">
          Schedule site visits, jobs, and follow-up reminders.
        </p>
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Today's Jobs"     value={String(summary.todaysJobs)} />
        <OverviewCard label="Upcoming Quotes"  value={String(summary.upcomingQuotes)} />
        <OverviewCard label="Overdue Tasks"    value={String(summary.overdueTasks)} />
        <OverviewCard label="Completed Today"  value={String(summary.completedToday)} />
      </div>

      {/* ── Calendar ─────────────────────────────────────────── */}
      <CalendarShell events={events} />

    </div>
  );
}

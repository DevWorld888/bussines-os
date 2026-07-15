"use client";

import Link from "next/link";
import type { CalendarEvent } from "@/lib/calendar-utils";
import { eventColors } from "./eventColors";

const typeLabels: Record<CalendarEvent["type"], string> = {
  job: "Job",
  quote: "Quote",
  task: "Task",
};

export default function EventDrawer({
  event,
  onClose,
}: {
  event: CalendarEvent | null;
  onClose: () => void;
}) {
  if (!event) return null;
  const colors = eventColors[event.type];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] shrink-0">
          <span
            className="text-[12px] font-medium uppercase tracking-widest px-2 py-1 rounded-[8px]"
            style={{ background: colors.bg, color: colors.text }}
          >
            {typeLabels[event.type]}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#737373] hover:text-[#000000] text-lg leading-none transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          <h2 className="t-heading text-[#000000]">{event.title}</h2>

          <DetailRow label="Customer" value={event.customerName ?? "—"} />
          <DetailRow label="Date" value={event.date} />
          <DetailRow label="Status" value={event.status} capitalize />
          {event.type === "job" && event.address && <DetailRow label="Address" value={event.address} />}
          {event.notes && <DetailRow label="Notes" value={event.notes} />}

          <div className="mt-auto pt-2 flex flex-col gap-2">
            <Link href={event.href} className="btn-primary justify-center" onClick={onClose}>
              Open {typeLabels[event.type]}
            </Link>
            {event.customerId !== null && (
              <Link href="/dashboard/customers" className="btn-ghost justify-center" onClick={onClose}>
                Open Customer
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function DetailRow({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="t-caption text-[#737373] font-medium uppercase tracking-widest">{label}</span>
      <span className={`t-small text-[#0a0a0a] ${capitalize ? "capitalize" : ""}`}>{value}</span>
    </div>
  );
}

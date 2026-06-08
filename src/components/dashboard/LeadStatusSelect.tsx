"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "@/app/dashboard/leads/actions";

type Status = "new" | "contacted" | "quote-sent" | "won" | "lost";

const styles: Record<Status, string> = {
  "new":        "bg-[#f2f2f2] text-[#0a0a0a]",
  "contacted":  "bg-[#f2f2f2] text-[#0a0a0a]",
  "quote-sent": "bg-[#171717] text-white",
  "won":        "bg-[#10c22b]/10 text-[#0a7a1b]",
  "lost":       "bg-[#c22b10]/10 text-[#9a2208]",
};

const labels: Record<Status, string> = {
  "new":        "New",
  "contacted":  "Contacted",
  "quote-sent": "Quote Sent",
  "won":        "Won",
  "lost":       "Lost",
};

export default function LeadStatusSelect({ id, status }: { id: number; status: string }) {
  const [current, setCurrent] = useState(status as Status);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Status;
    setCurrent(next);
    startTransition(() => updateLeadStatus(id, next));
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isPending}
      className={[
        "px-2 py-0.5 rounded-[26px] text-[11px] font-medium border-0 outline-none cursor-pointer transition-opacity",
        styles[current] ?? "bg-[#f2f2f2] text-[#0a0a0a]",
        isPending ? "opacity-50" : "",
      ].join(" ")}
    >
      {(Object.keys(labels) as Status[]).map((s) => (
        <option key={s} value={s}>{labels[s]}</option>
      ))}
    </select>
  );
}

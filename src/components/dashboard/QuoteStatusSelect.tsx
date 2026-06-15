"use client";

import { useState, useTransition } from "react";
import { updateQuoteStatus } from "@/app/dashboard/quotes/actions";

type Status = "draft" | "sent" | "accepted" | "rejected";

const styles: Record<Status, string> = {
  "draft":    "bg-[#f2f2f2] text-[#737373]",
  "sent":     "bg-[#171717] text-white",
  "accepted": "bg-[#10c22b]/10 text-[#0a7a1b]",
  "rejected": "bg-[#c22b10]/10 text-[#9a2208]",
};

const labels: Record<Status, string> = {
  "draft":    "Draft",
  "sent":     "Sent",
  "accepted": "Accepted",
  "rejected": "Rejected",
};

export default function QuoteStatusSelect({ id, status }: { id: number; status: string }) {
  const [current, setCurrent] = useState(status as Status);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Status;
    setCurrent(next);
    startTransition(() => updateQuoteStatus(id, next));
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isPending}
      className={[
        "px-2 py-0.5 rounded-[26px] text-[11px] font-medium border-0 outline-none cursor-pointer transition-opacity appearance-none",
        styles[current] ?? "bg-[#f2f2f2] text-[#737373]",
        isPending ? "opacity-50" : "",
      ].join(" ")}
    >
      {(Object.keys(labels) as Status[]).map((s) => (
        <option key={s} value={s}>{labels[s]}</option>
      ))}
    </select>
  );
}

"use client";

import { useState, useTransition } from "react";
import { updateTaskStatus } from "@/app/dashboard/tasks/actions";

type Status = "todo" | "in-progress" | "done";

const styles: Record<Status, string> = {
  "todo":        "bg-[#f2f2f2] text-[#737373]",
  "in-progress": "bg-[#171717] text-white",
  "done":        "bg-[#10c22b]/10 text-[#0a7a1b]",
};

const labels: Record<Status, string> = {
  "todo":        "To Do",
  "in-progress": "In Progress",
  "done":        "Done",
};

export default function TaskStatusSelect({ id, status }: { id: number; status: string }) {
  const [current, setCurrent] = useState(status as Status);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Status;
    setCurrent(next);
    startTransition(() => updateTaskStatus(id, next));
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

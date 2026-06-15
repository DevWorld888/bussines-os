"use client";

import { useState } from "react";
import EditTaskDrawer from "./EditTaskDrawer";
import TaskStatusSelect from "./TaskStatusSelect";

type TaskRow = {
  id: number;
  title: string;
  relatedTo: string;
  dueDate: string;
  priority: string;
  status: string;
  createdAt: Date;
};

const TABLE_COLS = ["Task", "Related To", "Due Date", "Priority", "Status", ""];

type TaskPriority = "low" | "medium" | "high";

const priorityStyles: Record<TaskPriority, string> = {
  "low":    "bg-[#f2f2f2] text-[#737373]",
  "medium": "bg-[#f2f2f2] text-[#0a0a0a]",
  "high":   "bg-[#c22b10]/10 text-[#9a2208]",
};

function PriorityBadge({ priority }: { priority: string }) {
  const p = priority as TaskPriority;
  const label = p.charAt(0).toUpperCase() + p.slice(1);
  return (
    <span className={[
      "inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium whitespace-nowrap",
      priorityStyles[p] ?? "bg-[#f2f2f2] text-[#737373]",
    ].join(" ")}>
      {label}
    </span>
  );
}

export default function TasksTable({ tasks }: { tasks: TaskRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? tasks.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.relatedTo.toLowerCase().includes(q)
        );
      })
    : tasks;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search tasks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8 w-60 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#0a0a0a] transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="t-caption text-[#737373] hover:text-[#0a0a0a] transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="card-elevated p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#f9f9f9]">
                {TABLE_COLS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2.5 text-left t-caption text-[#737373] font-medium uppercase tracking-widest whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[#e5e5e5] last:border-0 bg-white transition-colors hover:bg-[#f9f9f9]"
                >
                  <td className="px-4 py-3 t-small font-medium text-[#000000]">
                    <span className={task.status === "done" ? "line-through text-[#737373]" : ""}>
                      {task.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                    {task.relatedTo}
                  </td>
                  <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                    {task.dueDate}
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <TaskStatusSelect id={task.id} status={task.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <EditTaskDrawer task={task} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLS.length} className="px-4 py-8 text-center t-small text-[#737373]">
                    No tasks match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="t-caption text-[#737373]">
        {filtered.length === tasks.length
          ? `${tasks.length} tasks total`
          : `${filtered.length} of ${tasks.length} tasks`}
      </p>
    </section>
  );
}

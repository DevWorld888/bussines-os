import OverviewCard from "@/components/dashboard/OverviewCard";
import { tasks, taskSummary, type TaskStatus, type TaskPriority } from "@/data/tasks";

const TABLE_COLS = ["Task", "Related To", "Due Date", "Priority", "Status"];

const statusStyles: Record<TaskStatus, string> = {
  "todo":        "bg-[#f2f2f2] text-[#737373]",
  "in-progress": "bg-[#171717] text-white",
  "done":        "bg-[#10c22b]/10 text-[#0a7a1b]",
};

const statusLabels: Record<TaskStatus, string> = {
  "todo":        "To Do",
  "in-progress": "In Progress",
  "done":        "Done",
};

const priorityStyles: Record<TaskPriority, string> = {
  "low":    "bg-[#f2f2f2] text-[#737373]",
  "medium": "bg-[#f2f2f2] text-[#0a0a0a]",
  "high":   "bg-[#c22b10]/10 text-[#9a2208]",
};

const priorityLabels: Record<TaskPriority, string> = {
  "low":    "Low",
  "medium": "Medium",
  "high":   "High",
};

function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium whitespace-nowrap",
        statusStyles[status],
      ].join(" ")}
    >
      {statusLabels[status]}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium whitespace-nowrap",
        priorityStyles[priority],
      ].join(" ")}
    >
      {priorityLabels[priority]}
    </span>
  );
}

export default function TasksPage() {
  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">Tasks</h2>
          <p className="t-small text-[#737373] mt-1">
            Stay on top of follow-ups, reminders, and open actions.
          </p>
        </div>
        <button className="btn-primary shrink-0" type="button">
          + New Task
        </button>
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Total Tasks" value={String(taskSummary.total)}      />
        <OverviewCard label="To Do"       value={String(taskSummary.todo)}       />
        <OverviewCard label="In Progress" value={String(taskSummary.inProgress)} />
        <OverviewCard label="Done"        value={String(taskSummary.done)}       />
      </div>

      {/* ── Table section ───────────────────────────────────── */}
      <section className="flex flex-col gap-3">

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tasks…"
            readOnly
            className="h-8 w-60 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none cursor-default"
          />
        </div>

        {/* Table */}
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
                {tasks.map((task) => (
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
                      <TaskStatusBadge status={task.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row count */}
        <p className="t-caption text-[#737373]">{tasks.length} tasks total</p>
      </section>

    </div>
  );
}

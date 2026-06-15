import OverviewCard from "@/components/dashboard/OverviewCard";
import NewTaskDrawer from "@/components/dashboard/NewTaskDrawer";
import TasksTable from "@/components/dashboard/TasksTable";
import { prisma } from "@/lib/prisma";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "asc" } });

  const summary = {
    total:      tasks.length,
    todo:       tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done:       tasks.filter((t) => t.status === "done").length,
  };

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
        <NewTaskDrawer />
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Total Tasks" value={String(summary.total)}      />
        <OverviewCard label="To Do"       value={String(summary.todo)}       />
        <OverviewCard label="In Progress" value={String(summary.inProgress)} />
        <OverviewCard label="Done"        value={String(summary.done)}       />
      </div>

      {/* ── Table section ───────────────────────────────────── */}
      <TasksTable tasks={tasks} />

    </div>
  );
}

import OverviewCard from "@/components/dashboard/OverviewCard";
import NewJobDrawer from "@/components/dashboard/NewJobDrawer";
import JobsTable from "@/components/dashboard/JobsTable";
import { prisma } from "@/lib/prisma";

export default async function JobsPage() {
  const [jobs, customers] = await Promise.all([
    prisma.job.findMany({
      orderBy: { createdAt: "asc" },
      include: { customer: { select: { name: true } } },
    }),
    prisma.customer.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const summary = {
    total:      jobs.length,
    scheduled:  jobs.filter((j) => j.status === "scheduled").length,
    inProgress: jobs.filter((j) => j.status === "in-progress").length,
    completed:  jobs.filter((j) => j.status === "completed").length,
  };

  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">Jobs</h2>
          <p className="t-small text-[#737373] mt-1">
            Track scheduled and active jobs across all customers.
          </p>
        </div>
        <NewJobDrawer customers={customers} />
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Total Jobs"  value={String(summary.total)}      />
        <OverviewCard label="Scheduled"   value={String(summary.scheduled)}  />
        <OverviewCard label="In Progress" value={String(summary.inProgress)} />
        <OverviewCard label="Completed"   value={String(summary.completed)}  />
      </div>

      {/* ── Table section ───────────────────────────────────── */}
      <JobsTable jobs={jobs} customers={customers} />

    </div>
  );
}

import OverviewCard from "@/components/dashboard/OverviewCard";
import NewJobDrawer from "@/components/dashboard/NewJobDrawer";
import { prisma } from "@/lib/prisma";

const TABLE_COLS = ["Customer", "Service", "Address", "Date", "Value", "Status"];

type JobStatus = "scheduled" | "in-progress" | "completed" | "cancelled";

const statusStyles: Record<JobStatus, string> = {
  "scheduled":   "bg-[#f2f2f2] text-[#0a0a0a]",
  "in-progress": "bg-[#171717] text-white",
  "completed":   "bg-[#10c22b]/10 text-[#0a7a1b]",
  "cancelled":   "bg-[#c22b10]/10 text-[#9a2208]",
};

const statusLabels: Record<JobStatus, string> = {
  "scheduled":   "Scheduled",
  "in-progress": "In Progress",
  "completed":   "Completed",
  "cancelled":   "Cancelled",
};

function JobStatusBadge({ status }: { status: string }) {
  const s = status as JobStatus;
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium whitespace-nowrap",
        statusStyles[s] ?? "bg-[#f2f2f2] text-[#737373]",
      ].join(" ")}
    >
      {statusLabels[s] ?? status}
    </span>
  );
}

function formatCurrency(value: number) {
  return "$" + value.toLocaleString("en-AU");
}

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
      <section className="flex flex-col gap-3">

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search jobs…"
            readOnly
            className="h-8 w-60 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none cursor-default"
          />
        </div>

        {/* Table */}
        <div className="card-elevated p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
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
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-[#e5e5e5] last:border-0 bg-white transition-colors hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-3 t-small font-medium text-[#000000] whitespace-nowrap">
                      {job.customer.name}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {job.service}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373]">
                      {job.address}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {job.date}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {formatCurrency(job.value)}
                    </td>
                    <td className="px-4 py-3">
                      <JobStatusBadge status={job.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row count */}
        <p className="t-caption text-[#737373]">{jobs.length} jobs total</p>
      </section>

    </div>
  );
}

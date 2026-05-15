import OverviewCard from "@/components/dashboard/OverviewCard";
import { prisma } from "@/lib/prisma";

function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-AU");
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const [
    openLeads,
    newLeads,
    activeCustomers,
    jobsInProgress,
    pendingQuotes,
    pendingQuoteAgg,
    openTasks,
    revenueAgg,
    recentLead,
    recentQuote,
    recentJob,
    recentTask,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: { notIn: ["won", "lost"] } } }),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.customer.count({ where: { status: "active" } }),
    prisma.job.count({ where: { status: "in-progress" } }),
    prisma.quote.count({ where: { status: { in: ["draft", "sent"] } } }),
    prisma.quote.aggregate({
      where: { status: { in: ["draft", "sent"] } },
      _sum: { total: true },
    }),
    prisma.task.count({ where: { status: { not: "done" } } }),
    prisma.job.aggregate({
      where: { status: "completed" },
      _sum: { value: true },
    }),
    prisma.lead.findFirst({ orderBy: { id: "desc" } }),
    prisma.quote.findFirst({
      orderBy: { id: "desc" },
      include: { customer: { select: { name: true } } },
    }),
    prisma.job.findFirst({
      where: { status: "completed" },
      orderBy: { id: "desc" },
      include: { customer: { select: { name: true } } },
    }),
    prisma.task.findFirst({
      where: { status: { not: "done" } },
      orderBy: { id: "desc" },
    }),
  ]);

  const overviewStats = [
    {
      label: "Open Leads",
      value: String(openLeads),
      note:  `${newLeads} new`,
    },
    {
      label: "Active Customers",
      value: String(activeCustomers),
      note:  "from your customer base",
    },
    {
      label: "Jobs In Progress",
      value: String(jobsInProgress),
      note:  "currently active",
    },
    {
      label: "Pending Quotes",
      value: String(pendingQuotes),
      note:  `${formatCurrency(pendingQuoteAgg._sum.total ?? 0)} total value`,
    },
    {
      label: "Open Tasks",
      value: String(openTasks),
      note:  "not yet done",
    },
    {
      label: "Revenue (Total)",
      value: formatCurrency(revenueAgg._sum.value ?? 0),
      note:  "from completed jobs",
    },
  ];

  const recentActivity = [
    recentLead && {
      badge: "Lead",
      text:  `New lead: ${recentLead.name} — ${recentLead.service}`,
      time:  recentLead.source,
    },
    recentQuote && {
      badge: "Quote",
      text:  `${recentQuote.quoteNumber} sent to ${recentQuote.customer.name}`,
      time:  recentQuote.status,
    },
    recentJob && {
      badge: "Job",
      text:  `${recentJob.service} for ${recentJob.customer.name} completed`,
      time:  recentJob.date,
    },
    recentTask && {
      badge: "Task",
      text:  recentTask.title,
      time:  `Due ${recentTask.dueDate}`,
    },
  ].filter(Boolean) as { badge: string; text: string; time: string }[];

  return (
    <div className="flex flex-col gap-10 md:gap-[83px]">

      {/* Section: Overview */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">{greeting()}</h2>
          <p className="t-small text-[#737373] mt-1">
            Here&apos;s what&apos;s happening in your business today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[8px]">
          {overviewStats.map((stat) => (
            <OverviewCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              note={stat.note}
            />
          ))}
        </div>
      </section>

      {/* Section: Recent Activity */}
      <section className="flex flex-col gap-4">
        <h3 className="t-caption text-[#737373] uppercase tracking-widest font-medium">
          Recent Activity
        </h3>
        <div className="card-elevated flex flex-col divide-y divide-[#e5e5e5] p-0 overflow-hidden">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="badge-neutral shrink-0">{item.badge}</span>
                <span className="t-small text-[#0a0a0a] truncate">{item.text}</span>
              </div>
              <span className="t-caption text-[#737373] shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

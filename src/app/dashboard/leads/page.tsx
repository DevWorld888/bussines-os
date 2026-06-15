import OverviewCard from "@/components/dashboard/OverviewCard";
import NewLeadDrawer from "@/components/dashboard/NewLeadDrawer";
import LeadsTable from "@/components/dashboard/LeadsTable";
import { prisma } from "@/lib/prisma";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "asc" } });

  const summary = {
    new:       leads.filter((l) => l.status === "new").length,
    quoteSent: leads.filter((l) => l.status === "quote-sent").length,
    won:       leads.filter((l) => l.status === "won").length,
    lost:      leads.filter((l) => l.status === "lost").length,
  };

  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">Leads</h2>
          <p className="t-small text-[#737373] mt-1">
            Manage potential customers and follow-ups.
          </p>
        </div>
        <NewLeadDrawer />
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="New Leads"   value={String(summary.new)}       />
        <OverviewCard label="Quote Sent"  value={String(summary.quoteSent)} />
        <OverviewCard label="Won"         value={String(summary.won)}       />
        <OverviewCard label="Lost"        value={String(summary.lost)}      />
      </div>

      {/* ── Table section ───────────────────────────────────── */}
      <LeadsTable leads={leads} />

    </div>
  );
}

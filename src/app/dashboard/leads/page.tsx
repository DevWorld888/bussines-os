import OverviewCard from "@/components/dashboard/OverviewCard";
import NewLeadDrawer from "@/components/dashboard/NewLeadDrawer";
import LeadStatusSelect from "@/components/dashboard/LeadStatusSelect";
import { prisma } from "@/lib/prisma";

const TABLE_COLS = [
  "Name",
  "Phone",
  "Email",
  "Service",
  "Status",
  "Source",
  "Follow-up",
];

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
      <section className="flex flex-col gap-3">

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search leads…"
            readOnly
            className="h-8 w-60 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none cursor-default"
          />
        </div>

        {/* Table */}
        <div className="card-elevated p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
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
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-[#e5e5e5] last:border-0 bg-white transition-colors hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-3 t-small font-medium text-[#000000] whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373]">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {lead.service}
                    </td>
                    <td className="px-4 py-3">
                      <LeadStatusSelect id={lead.id} status={lead.status} />
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {lead.source}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {lead.followUp ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row count */}
        <p className="t-caption text-[#737373]">
          {leads.length} leads total
        </p>
      </section>

    </div>
  );
}

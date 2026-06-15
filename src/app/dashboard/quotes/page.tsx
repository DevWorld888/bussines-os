import OverviewCard from "@/components/dashboard/OverviewCard";
import NewQuoteDrawer from "@/components/dashboard/NewQuoteDrawer";
import QuotesTable from "@/components/dashboard/QuotesTable";
import { prisma } from "@/lib/prisma";

function formatCurrency(value: number) {
  return "$" + value.toLocaleString("en-AU");
}

export default async function QuotesPage() {
  const [quotes, customers] = await Promise.all([
    prisma.quote.findMany({
      orderBy: { createdAt: "asc" },
      include: { customer: { select: { name: true } } },
    }),
    prisma.customer.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const summary = {
    total:      quotes.length,
    draft:      quotes.filter((q) => q.status === "draft").length,
    sent:       quotes.filter((q) => q.status === "sent").length,
    wonValue:   quotes
      .filter((q) => q.status === "accepted")
      .reduce((sum, q) => sum + q.total, 0),
  };

  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">Quotes</h2>
          <p className="t-small text-[#737373] mt-1">
            Create and manage quotes for your customers.
          </p>
        </div>
        <NewQuoteDrawer customers={customers} />
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Total Quotes" value={String(summary.total)}              />
        <OverviewCard label="Draft"        value={String(summary.draft)}              />
        <OverviewCard label="Sent"         value={String(summary.sent)}               />
        <OverviewCard label="Won Value"    value={formatCurrency(summary.wonValue)}   />
      </div>

      {/* ── Table section ───────────────────────────────────── */}
      <QuotesTable quotes={quotes} customers={customers} />

    </div>
  );
}

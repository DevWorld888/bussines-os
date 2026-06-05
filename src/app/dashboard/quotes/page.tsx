import OverviewCard from "@/components/dashboard/OverviewCard";
import NewQuoteDrawer from "@/components/dashboard/NewQuoteDrawer";
import { prisma } from "@/lib/prisma";

const TABLE_COLS = ["Quote #", "Customer", "Service", "Date", "Expires", "Total", "Status"];

type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";

const statusStyles: Record<QuoteStatus, string> = {
  "draft":    "bg-[#f2f2f2] text-[#737373]",
  "sent":     "bg-[#171717] text-white",
  "accepted": "bg-[#10c22b]/10 text-[#0a7a1b]",
  "rejected": "bg-[#c22b10]/10 text-[#9a2208]",
};

const statusLabels: Record<QuoteStatus, string> = {
  "draft":    "Draft",
  "sent":     "Sent",
  "accepted": "Accepted",
  "rejected": "Rejected",
};

function QuoteStatusBadge({ status }: { status: string }) {
  const s = status as QuoteStatus;
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
      <section className="flex flex-col gap-3">

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search quotes…"
            readOnly
            className="h-8 w-60 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none cursor-default"
          />
        </div>

        {/* Table */}
        <div className="card-elevated p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
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
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="border-b border-[#e5e5e5] last:border-0 bg-white transition-colors hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-3 t-small font-medium text-[#000000] whitespace-nowrap">
                      {quote.quoteNumber}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {quote.customer.name}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {quote.service}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {quote.date}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {quote.expiresOn}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {formatCurrency(quote.total)}
                    </td>
                    <td className="px-4 py-3">
                      <QuoteStatusBadge status={quote.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row count */}
        <p className="t-caption text-[#737373]">{quotes.length} quotes total</p>
      </section>

    </div>
  );
}

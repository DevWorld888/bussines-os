"use client";

import { useState } from "react";
import EditQuoteDrawer from "./EditQuoteDrawer";
import QuoteStatusSelect from "./QuoteStatusSelect";

type QuoteRow = {
  id: number;
  quoteNumber: string;
  service: string;
  date: string;
  expiresOn: string;
  total: number;
  status: string;
  customerId: number;
  createdAt: Date;
  customer: { name: string };
};

type CustomerOption = { id: number; name: string };

const TABLE_COLS = ["Quote #", "Customer", "Service", "Date", "Expires", "Total", "Status", ""];

function formatCurrency(value: number) {
  return "$" + value.toLocaleString("en-AU");
}

export default function QuotesTable({
  quotes,
  customers,
}: {
  quotes: QuoteRow[];
  customers: CustomerOption[];
}) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? quotes.filter((q) => {
        const s = query.toLowerCase();
        return (
          q.quoteNumber.toLowerCase().includes(s) ||
          q.customer.name.toLowerCase().includes(s) ||
          q.service.toLowerCase().includes(s)
        );
      })
    : quotes;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search quotes…"
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
              {filtered.map((quote) => (
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
                    <QuoteStatusSelect id={quote.id} status={quote.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <EditQuoteDrawer quote={quote} customers={customers} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLS.length} className="px-4 py-8 text-center t-small text-[#737373]">
                    No quotes match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="t-caption text-[#737373]">
        {filtered.length === quotes.length
          ? `${quotes.length} quotes total`
          : `${filtered.length} of ${quotes.length} quotes`}
      </p>
    </section>
  );
}

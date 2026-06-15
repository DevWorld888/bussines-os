"use client";

import { useState } from "react";
import LeadStatusSelect from "./LeadStatusSelect";
import EditLeadDrawer from "./EditLeadDrawer";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
  source: string;
  followUp: string | null;
  createdAt: Date;
};

const TABLE_COLS = ["Name", "Phone", "Email", "Service", "Status", "Source", "Follow-up", ""];

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? leads.filter((l) => {
        const q = query.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.service.toLowerCase().includes(q) ||
          l.source.toLowerCase().includes(q)
        );
      })
    : leads;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search leads…"
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
              {filtered.map((lead) => (
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
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <EditLeadDrawer lead={lead} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLS.length} className="px-4 py-8 text-center t-small text-[#737373]">
                    No leads match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="t-caption text-[#737373]">
        {filtered.length === leads.length
          ? `${leads.length} leads total`
          : `${filtered.length} of ${leads.length} leads`}
      </p>
    </section>
  );
}

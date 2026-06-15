"use client";

import { useState } from "react";
import EditCustomerDrawer from "./EditCustomerDrawer";

type CustomerRow = {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  since: string;
  createdAt: Date;
  jobs: { value: number }[];
};

const TABLE_COLS = ["Name", "Phone", "Email", "Total Jobs", "Total Spend", "Status", "Customer Since", ""];

function CustomerStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium whitespace-nowrap",
        status === "active"
          ? "bg-[#10c22b]/10 text-[#0a7a1b]"
          : "bg-[#f2f2f2] text-[#737373]",
      ].join(" ")}
    >
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}

function formatCurrency(value: number) {
  return "$" + value.toLocaleString("en-AU");
}

export default function CustomersTable({ customers }: { customers: CustomerRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? customers.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
        );
      })
    : customers;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search customers…"
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
              {filtered.map((customer) => {
                const totalJobs  = customer.jobs.length;
                const totalSpend = customer.jobs.reduce((s, j) => s + j.value, 0);

                return (
                  <tr
                    key={customer.id}
                    className="border-b border-[#e5e5e5] last:border-0 bg-white transition-colors hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-3 t-small font-medium text-[#000000] whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {customer.phone}
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373]">
                      {customer.email}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] text-center">
                      {totalJobs}
                    </td>
                    <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                      {formatCurrency(totalSpend)}
                    </td>
                    <td className="px-4 py-3">
                      <CustomerStatusBadge status={customer.status} />
                    </td>
                    <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                      {customer.since}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <EditCustomerDrawer customer={customer} />
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLS.length} className="px-4 py-8 text-center t-small text-[#737373]">
                    No customers match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="t-caption text-[#737373]">
        {filtered.length === customers.length
          ? `${customers.length} customers total`
          : `${filtered.length} of ${customers.length} customers`}
      </p>
    </section>
  );
}

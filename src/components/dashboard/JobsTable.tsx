"use client";

import { useState } from "react";
import EditJobDrawer from "./EditJobDrawer";
import JobStatusSelect from "./JobStatusSelect";

type JobRow = {
  id: number;
  service: string;
  address: string;
  date: string;
  value: number;
  status: string;
  customerId: number;
  createdAt: Date;
  customer: { name: string };
};

type CustomerOption = { id: number; name: string };

const TABLE_COLS = ["Customer", "Service", "Address", "Date", "Value", "Status", ""];

function formatCurrency(value: number) {
  return "$" + value.toLocaleString("en-AU");
}

export default function JobsTable({
  jobs,
  customers,
}: {
  jobs: JobRow[];
  customers: CustomerOption[];
}) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? jobs.filter((j) => {
        const q = query.toLowerCase();
        return (
          j.customer.name.toLowerCase().includes(q) ||
          j.service.toLowerCase().includes(q) ||
          j.address.toLowerCase().includes(q)
        );
      })
    : jobs;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search jobs…"
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
              {filtered.map((job) => (
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
                    <JobStatusSelect id={job.id} status={job.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <EditJobDrawer job={job} customers={customers} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLS.length} className="px-4 py-8 text-center t-small text-[#737373]">
                    No jobs match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="t-caption text-[#737373]">
        {filtered.length === jobs.length
          ? `${jobs.length} jobs total`
          : `${filtered.length} of ${jobs.length} jobs`}
      </p>
    </section>
  );
}

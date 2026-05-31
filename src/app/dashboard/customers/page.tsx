import OverviewCard from "@/components/dashboard/OverviewCard";
import NewCustomerDrawer from "@/components/dashboard/NewCustomerDrawer";
import { prisma } from "@/lib/prisma";

const TABLE_COLS = ["Name", "Phone", "Email", "Total Jobs", "Total Spend", "Status", "Customer Since"];

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

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      jobs:   { select: { value: true } },
      quotes: false,
    },
  });

  const summary = {
    total:    customers.length,
    active:   customers.filter((c) => c.status === "active").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    totalRevenue: customers.reduce(
      (sum, c) => sum + c.jobs.reduce((s, j) => s + j.value, 0),
      0
    ),
  };

  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">Customers</h2>
          <p className="t-small text-[#737373] mt-1">
            View and manage your existing customer base.
          </p>
        </div>
        <NewCustomerDrawer />
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Total Customers" value={String(summary.total)}                   />
        <OverviewCard label="Active"           value={String(summary.active)}                 />
        <OverviewCard label="Inactive"         value={String(summary.inactive)}               />
        <OverviewCard label="Total Revenue"    value={formatCurrency(summary.totalRevenue)}   />
      </div>

      {/* ── Table section ───────────────────────────────────── */}
      <section className="flex flex-col gap-3">

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search customers…"
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
                {customers.map((customer) => {
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row count */}
        <p className="t-caption text-[#737373]">{customers.length} customers total</p>
      </section>

    </div>
  );
}

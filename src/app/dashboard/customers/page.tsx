import OverviewCard from "@/components/dashboard/OverviewCard";
import NewCustomerDrawer from "@/components/dashboard/NewCustomerDrawer";
import CustomersTable from "@/components/dashboard/CustomersTable";
import { prisma } from "@/lib/prisma";

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
      <CustomersTable customers={customers} />

    </div>
  );
}

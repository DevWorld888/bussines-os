export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="t-heading text-[#000000]">Reports</h2>
        <p className="t-small text-[#737373] mt-1">
          Track business performance over time.
        </p>
      </div>

      <div className="card-elevated flex flex-col items-center justify-center gap-2 py-20 text-center">
        <p className="t-small font-semibold text-[#0a0a0a]">Coming soon</p>
        <p className="t-caption text-[#737373] max-w-xs">
          Leads per month, quote conversion rate, revenue, top-performing
          services, and lead sources will live here.
        </p>
      </div>
    </div>
  );
}

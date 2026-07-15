import OverviewCard from "@/components/dashboard/OverviewCard";
import ReviewsTable from "@/components/dashboard/ReviewsTable";
import { mockReviews, getReviewsSummary } from "@/lib/mock-reviews";

export default function ReviewsPage() {
  const summary = getReviewsSummary(mockReviews);

  return (
    <div className="flex flex-col" style={{ gap: "40px" }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div>
        <h2 className="t-heading text-[#000000]">Reviews</h2>
        <p className="t-small text-[#737373] mt-1">
          Manage your reputation and customer feedback.
        </p>
      </div>

      {/* ── Summary cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <OverviewCard label="Average Rating"   value={summary.averageRating} />
        <OverviewCard label="Total Reviews"    value={String(summary.totalReviews)} />
        <OverviewCard label="Pending Requests" value={String(summary.pendingRequests)} />
        <OverviewCard label="Response Rate"    value={`${summary.responseRate}%`} />
      </div>

      {/* ── Reviews table ───────────────────────────────────── */}
      <ReviewsTable reviews={mockReviews} />

    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="t-heading text-[#000000]">Reviews</h2>
        <p className="t-small text-[#737373] mt-1">
          Manage your reputation and customer feedback.
        </p>
      </div>

      <div className="card-elevated flex flex-col items-center justify-center gap-2 py-20 text-center">
        <p className="t-small font-semibold text-[#0a0a0a]">Coming soon</p>
        <p className="t-caption text-[#737373] max-w-xs">
          Requesting Google reviews, tracking feedback, and automated
          post-job review requests will live here.
        </p>
      </div>
    </div>
  );
}

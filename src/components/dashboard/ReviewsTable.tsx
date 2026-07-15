"use client";

import { useState } from "react";
import type { Review, ReviewStatus } from "@/lib/mock-reviews";

const TABLE_COLS = ["Customer", "Service", "Platform", "Rating", "Comment", "Status", ""];

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) {
    return <span className="t-small text-[#737373]">—</span>;
  }
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#0a0a0a" : "none"}
          stroke={i < rating ? "#0a0a0a" : "#a1a1a1"}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  switch (status) {
    case "responded":
      return <span className="inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium bg-[#10c22b]/10 text-[#0a7a1b]">Responded</span>;
    case "received":
      return <span className="badge-inverse">New</span>;
    case "requested":
      return <span className="badge-neutral">Requested</span>;
    case "not_requested":
      return <span className="badge-outline">Not requested</span>;
  }
}

export default function ReviewsTable({ reviews: initialReviews }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [query, setQuery] = useState("");

  function requestReview(id: number) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "requested", requestedDate: new Date().toISOString().slice(0, 10) }
          : r
      )
    );
  }

  const filtered = query.trim()
    ? reviews.filter((r) => {
        const q = query.toLowerCase();
        return (
          r.customerName.toLowerCase().includes(q) ||
          r.service.toLowerCase().includes(q) ||
          (r.comment ?? "").toLowerCase().includes(q)
        );
      })
    : reviews;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search reviews…"
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
              {filtered.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-[#e5e5e5] last:border-0 bg-white transition-colors hover:bg-[#f9f9f9]"
                >
                  <td className="px-4 py-3 t-small font-medium text-[#000000] whitespace-nowrap">
                    {review.customerName}
                  </td>
                  <td className="px-4 py-3 t-small text-[#0a0a0a] whitespace-nowrap">
                    {review.service}
                  </td>
                  <td className="px-4 py-3 t-small text-[#737373] whitespace-nowrap">
                    {review.platform}
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={review.rating} />
                  </td>
                  <td className="px-4 py-3 t-small text-[#737373] max-w-[260px] truncate">
                    {review.comment ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <ReviewStatusBadge status={review.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {review.status === "not_requested" && (
                      <button
                        type="button"
                        onClick={() => requestReview(review.id)}
                        className="h-7 px-3 rounded-[10px] border border-[#e5e5e5] bg-white t-caption font-medium text-[#0a0a0a] hover:bg-[#f2f2f2] transition-colors"
                      >
                        Request review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLS.length} className="px-4 py-8 text-center t-small text-[#737373]">
                    No reviews match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="t-caption text-[#737373]">
        {filtered.length === reviews.length
          ? `${reviews.length} reviews total`
          : `${filtered.length} of ${reviews.length} reviews`}
      </p>
    </section>
  );
}

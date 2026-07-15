export type ReviewStatus = "not_requested" | "requested" | "received" | "responded";

export type Review = {
  id: number;
  customerName: string;
  service: string;
  platform: "Google" | "Facebook";
  rating: number | null; // null until the customer leaves one
  comment: string | null;
  status: ReviewStatus;
  requestedDate: string | null;
  receivedDate: string | null;
};

export const mockReviews: Review[] = [
  {
    id: 1,
    customerName: "Olivia Bennett",
    service: "Interior Painting",
    platform: "Google",
    rating: 5,
    comment: "Fantastic job, tidy and on time. Would book again.",
    status: "responded",
    requestedDate: "2026-06-20",
    receivedDate: "2026-06-22",
  },
  {
    id: 2,
    customerName: "Marcus Lee",
    service: "End of Lease Clean",
    platform: "Google",
    rating: 4,
    comment: "Good clean overall, missed a spot in the kitchen.",
    status: "received",
    requestedDate: "2026-07-01",
    receivedDate: "2026-07-02",
  },
  {
    id: 3,
    customerName: "Priya Natarajan",
    service: "Exterior Painting",
    platform: "Facebook",
    rating: 5,
    comment: "Excellent communication from quote to finish.",
    status: "responded",
    requestedDate: "2026-06-10",
    receivedDate: "2026-06-11",
  },
  {
    id: 4,
    customerName: "James O'Connor",
    service: "Gutter Cleaning",
    platform: "Google",
    rating: null,
    comment: null,
    status: "requested",
    requestedDate: "2026-07-10",
    receivedDate: null,
  },
  {
    id: 5,
    customerName: "Grace Kim",
    service: "Deep Clean",
    platform: "Google",
    rating: null,
    comment: null,
    status: "requested",
    requestedDate: "2026-07-12",
    receivedDate: null,
  },
  {
    id: 6,
    customerName: "Daniel Ferreira",
    service: "Fence Painting",
    platform: "Google",
    rating: 3,
    comment: "Job took longer than quoted, finish looks good though.",
    status: "received",
    requestedDate: "2026-06-28",
    receivedDate: "2026-06-30",
  },
  {
    id: 7,
    customerName: "Isabelle Wright",
    service: "Office Cleaning",
    platform: "Facebook",
    rating: null,
    comment: null,
    status: "not_requested",
    requestedDate: null,
    receivedDate: null,
  },
  {
    id: 8,
    customerName: "Tom Richards",
    service: "Roof Painting",
    platform: "Google",
    rating: 5,
    comment: "Best painting crew we've used, highly recommend.",
    status: "responded",
    requestedDate: "2026-05-30",
    receivedDate: "2026-06-01",
  },
];

export type ReviewsSummary = {
  averageRating: string;
  totalReviews: number;
  pendingRequests: number;
  responseRate: number;
};

export function getReviewsSummary(reviews: Review[]): ReviewsSummary {
  const rated = reviews.filter((r) => r.rating !== null);
  const answered = reviews.filter((r) => r.status === "received" || r.status === "responded");
  const actioned = reviews.filter((r) => r.status !== "not_requested");

  const averageRating = rated.length
    ? (rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rated.length).toFixed(1)
    : "—";

  return {
    averageRating,
    totalReviews: rated.length,
    pendingRequests: reviews.filter((r) => r.status === "requested").length,
    responseRate: actioned.length ? Math.round((answered.length / actioned.length) * 100) : 0,
  };
}

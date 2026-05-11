export type JobStatus = "scheduled" | "in-progress" | "completed" | "cancelled";

export type Job = {
  id: number;
  customer: string;
  service: string;
  address: string;
  date: string;
  value: number;
  status: JobStatus;
};

export const jobs: Job[] = [
  {
    id: 1,
    customer: "Priya Sharma",
    service: "Interior Painting",
    address: "12 Maple St, Sydney",
    date: "2026-05-14",
    value: 1800,
    status: "scheduled",
  },
  {
    id: 2,
    customer: "Tom Nguyen",
    service: "Fence Install",
    address: "7 Oak Ave, Melbourne",
    date: "2026-05-10",
    value: 950,
    status: "completed",
  },
  {
    id: 3,
    customer: "Rachel Kim",
    service: "Exterior Painting",
    address: "3 Cedar Rd, Brisbane",
    date: "2026-05-12",
    value: 3200,
    status: "in-progress",
  },
  {
    id: 4,
    customer: "David Okonkwo",
    service: "Deck Restoration",
    address: "88 Birch Lane, Perth",
    date: "2026-05-08",
    value: 580,
    status: "completed",
  },
  {
    id: 5,
    customer: "Linda Tran",
    service: "Roof Painting",
    address: "55 Elm St, Adelaide",
    date: "2026-05-20",
    value: 2400,
    status: "scheduled",
  },
  {
    id: 6,
    customer: "Mark Jensen",
    service: "Interior Painting",
    address: "19 Pine Cres, Sydney",
    date: "2026-05-09",
    value: 1600,
    status: "in-progress",
  },
  {
    id: 7,
    customer: "Susan Patel",
    service: "Pressure Washing",
    address: "42 Willow Dr, Brisbane",
    date: "2026-05-06",
    value: 320,
    status: "cancelled",
  },
  {
    id: 8,
    customer: "Chris Lawson",
    service: "Commercial Paint",
    address: "100 King St, Melbourne",
    date: "2026-05-22",
    value: 5800,
    status: "scheduled",
  },
  {
    id: 9,
    customer: "Amanda Fox",
    service: "Fence Painting",
    address: "6 Ash Close, Perth",
    date: "2026-05-05",
    value: 420,
    status: "completed",
  },
  {
    id: 10,
    customer: "Ben Hartley",
    service: "Full House Repaint",
    address: "31 Gum Tree Blvd, Sydney",
    date: "2026-05-18",
    value: 7200,
    status: "scheduled",
  },
];

export const jobSummary = {
  total:     jobs.length,
  scheduled: jobs.filter((j) => j.status === "scheduled").length,
  inProgress: jobs.filter((j) => j.status === "in-progress").length,
  completed: jobs.filter((j) => j.status === "completed").length,
};

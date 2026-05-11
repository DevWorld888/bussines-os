export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";

export type Quote = {
  id: number;
  quoteNumber: string;
  customer: string;
  service: string;
  date: string;
  expiresOn: string;
  total: number;
  status: QuoteStatus;
};

export const quotes: Quote[] = [
  {
    id: 1,
    quoteNumber: "Q-0001",
    customer: "Priya Sharma",
    service: "Interior Painting",
    date: "2026-05-01",
    expiresOn: "2026-05-15",
    total: 1800,
    status: "accepted",
  },
  {
    id: 2,
    quoteNumber: "Q-0002",
    customer: "Tom Nguyen",
    service: "Fence Install",
    date: "2026-05-03",
    expiresOn: "2026-05-17",
    total: 950,
    status: "sent",
  },
  {
    id: 3,
    quoteNumber: "Q-0003",
    customer: "Rachel Kim",
    service: "Exterior Painting",
    date: "2026-05-05",
    expiresOn: "2026-05-19",
    total: 3200,
    status: "accepted",
  },
  {
    id: 4,
    quoteNumber: "Q-0004",
    customer: "David Okonkwo",
    service: "Deck Restoration",
    date: "2026-05-06",
    expiresOn: "2026-05-20",
    total: 580,
    status: "rejected",
  },
  {
    id: 5,
    quoteNumber: "Q-0005",
    customer: "Linda Tran",
    service: "Roof Painting",
    date: "2026-05-08",
    expiresOn: "2026-05-22",
    total: 2400,
    status: "draft",
  },
  {
    id: 6,
    quoteNumber: "Q-0006",
    customer: "Mark Jensen",
    service: "Interior Painting",
    date: "2026-05-09",
    expiresOn: "2026-05-23",
    total: 1600,
    status: "sent",
  },
  {
    id: 7,
    quoteNumber: "Q-0007",
    customer: "Susan Patel",
    service: "Pressure Washing",
    date: "2026-05-10",
    expiresOn: "2026-05-24",
    total: 320,
    status: "draft",
  },
  {
    id: 8,
    quoteNumber: "Q-0008",
    customer: "Chris Lawson",
    service: "Commercial Paint",
    date: "2026-05-11",
    expiresOn: "2026-05-25",
    total: 5800,
    status: "sent",
  },
  {
    id: 9,
    quoteNumber: "Q-0009",
    customer: "Amanda Fox",
    service: "Fence Painting",
    date: "2026-05-12",
    expiresOn: "2026-05-26",
    total: 420,
    status: "accepted",
  },
  {
    id: 10,
    quoteNumber: "Q-0010",
    customer: "Ben Hartley",
    service: "Full House Repaint",
    date: "2026-05-13",
    expiresOn: "2026-05-27",
    total: 7200,
    status: "accepted",
  },
];

export const quoteSummary = {
  total:    quotes.length,
  draft:    quotes.filter((q) => q.status === "draft").length,
  sent:     quotes.filter((q) => q.status === "sent").length,
  accepted: quotes.filter((q) => q.status === "accepted").length,
  totalValue: quotes
    .filter((q) => q.status === "accepted")
    .reduce((sum, q) => sum + q.total, 0),
};

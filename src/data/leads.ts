import type { BadgeVariant } from "@/components/dashboard/Badge";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  status: BadgeVariant;
  source: string;
  followUp: string;
};

export const leads: Lead[] = [
  {
    id: 1,
    name: "James Harrington",
    phone: "0412 345 678",
    email: "james.h@email.com",
    service: "Interior Painting",
    status: "new",
    source: "Google Ads",
    followUp: "2026-05-12",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    phone: "0423 456 789",
    email: "s.mitchell@email.com",
    service: "House Cleaning",
    status: "contacted",
    source: "Referral",
    followUp: "2026-05-13",
  },
  {
    id: 3,
    name: "Tom Nguyen",
    phone: "0434 567 890",
    email: "tom.ng@email.com",
    service: "Roof Repair",
    status: "quote-sent",
    source: "Website",
    followUp: "2026-05-14",
  },
  {
    id: 4,
    name: "Priya Sharma",
    phone: "0445 678 901",
    email: "priya.s@email.com",
    service: "Deck Staining",
    status: "won",
    source: "Facebook",
    followUp: "2026-05-10",
  },
  {
    id: 5,
    name: "Daniel Brooks",
    phone: "0456 789 012",
    email: "d.brooks@email.com",
    service: "Pressure Washing",
    status: "lost",
    source: "Google Ads",
    followUp: "2026-05-08",
  },
  {
    id: 6,
    name: "Emily Carter",
    phone: "0467 890 123",
    email: "emily.c@email.com",
    service: "Exterior Painting",
    status: "new",
    source: "Instagram",
    followUp: "2026-05-15",
  },
  {
    id: 7,
    name: "Mark Jensen",
    phone: "0478 901 234",
    email: "mark.j@email.com",
    service: "Gutter Cleaning",
    status: "contacted",
    source: "Referral",
    followUp: "2026-05-16",
  },
  {
    id: 8,
    name: "Linda Tran",
    phone: "0489 012 345",
    email: "linda.t@email.com",
    service: "Window Cleaning",
    status: "quote-sent",
    source: "Website",
    followUp: "2026-05-11",
  },
];

export const leadSummary = {
  new:       leads.filter((l) => l.status === "new").length,
  quoteSent: leads.filter((l) => l.status === "quote-sent").length,
  won:       leads.filter((l) => l.status === "won").length,
  lost:      leads.filter((l) => l.status === "lost").length,
};

export type CustomerStatus = "active" | "inactive";

export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  totalJobs: number;
  totalSpend: number;
  status: CustomerStatus;
  since: string;
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Priya Sharma",
    phone: "0445 678 901",
    email: "priya.s@email.com",
    totalJobs: 4,
    totalSpend: 3200,
    status: "active",
    since: "2024-11-03",
  },
  {
    id: 2,
    name: "Tom Nguyen",
    phone: "0434 567 890",
    email: "tom.ng@email.com",
    totalJobs: 2,
    totalSpend: 1450,
    status: "active",
    since: "2025-01-15",
  },
  {
    id: 3,
    name: "Rachel Kim",
    phone: "0411 222 333",
    email: "rachel.k@email.com",
    totalJobs: 7,
    totalSpend: 6800,
    status: "active",
    since: "2024-06-20",
  },
  {
    id: 4,
    name: "David Okonkwo",
    phone: "0422 333 444",
    email: "d.okonkwo@email.com",
    totalJobs: 1,
    totalSpend: 580,
    status: "inactive",
    since: "2025-03-08",
  },
  {
    id: 5,
    name: "Linda Tran",
    phone: "0489 012 345",
    email: "linda.t@email.com",
    totalJobs: 3,
    totalSpend: 2100,
    status: "active",
    since: "2025-02-01",
  },
  {
    id: 6,
    name: "Mark Jensen",
    phone: "0478 901 234",
    email: "mark.j@email.com",
    totalJobs: 5,
    totalSpend: 4750,
    status: "active",
    since: "2024-09-14",
  },
  {
    id: 7,
    name: "Susan Patel",
    phone: "0433 555 666",
    email: "susan.p@email.com",
    totalJobs: 2,
    totalSpend: 1900,
    status: "inactive",
    since: "2024-12-22",
  },
  {
    id: 8,
    name: "Chris Lawson",
    phone: "0444 777 888",
    email: "c.lawson@email.com",
    totalJobs: 6,
    totalSpend: 5300,
    status: "active",
    since: "2024-07-30",
  },
  {
    id: 9,
    name: "Amanda Fox",
    phone: "0455 888 999",
    email: "a.fox@email.com",
    totalJobs: 1,
    totalSpend: 420,
    status: "inactive",
    since: "2025-04-05",
  },
  {
    id: 10,
    name: "Ben Hartley",
    phone: "0466 999 000",
    email: "ben.h@email.com",
    totalJobs: 9,
    totalSpend: 8900,
    status: "active",
    since: "2024-03-11",
  },
];

export const customerSummary = {
  total:    customers.length,
  active:   customers.filter((c) => c.status === "active").length,
  inactive: customers.filter((c) => c.status === "inactive").length,
  totalRevenue: customers.reduce((sum, c) => sum + c.totalSpend, 0),
};

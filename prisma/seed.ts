import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // Clear in dependency order
  await prisma.task.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.job.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.businessInfo.deleteMany();

  // ── Leads ──────────────────────────────────────────────────────
  await prisma.lead.createMany({
    data: [
      { name: "James Carter",    phone: "0412 345 678", email: "james.c@email.com",   service: "Interior Painting",  status: "new",        source: "Google Ads",    followUp: "2026-05-16" },
      { name: "Maria Lopez",     phone: "0423 456 789", email: "m.lopez@email.com",   service: "Fence Install",      status: "contacted",  source: "Referral",      followUp: "2026-05-14" },
      { name: "Wei Zhang",       phone: "0434 567 890", email: "w.zhang@email.com",   service: "Roof Painting",      status: "quote-sent", source: "Website",       followUp: "2026-05-18" },
      { name: "Aisha Okafor",    phone: "0445 678 901", email: "a.okafor@email.com",  service: "Exterior Painting",  status: "won",        source: "Facebook Ads",  followUp: null         },
      { name: "Luca Moretti",    phone: "0456 789 012", email: "luca.m@email.com",    service: "Deck Restoration",   status: "lost",       source: "Google Ads",    followUp: null         },
      { name: "Sophie Brown",    phone: "0467 890 123", email: "sophie.b@email.com",  service: "Interior Painting",  status: "new",        source: "Instagram",     followUp: "2026-05-20" },
      { name: "Carlos Rivera",   phone: "0478 901 234", email: "c.rivera@email.com",  service: "Pressure Washing",   status: "contacted",  source: "Referral",      followUp: "2026-05-15" },
      { name: "Nina Petrov",     phone: "0489 012 345", email: "nina.p@email.com",    service: "Commercial Paint",   status: "quote-sent", source: "Website",       followUp: "2026-05-22" },
    ],
  });

  // ── Customers ──────────────────────────────────────────────────
  const customerData = [
    { name: "Priya Sharma",   phone: "0445 678 901", email: "priya.s@email.com",   status: "active",   since: "2024-11-03" },
    { name: "Tom Nguyen",     phone: "0434 567 890", email: "tom.ng@email.com",    status: "active",   since: "2025-01-15" },
    { name: "Rachel Kim",     phone: "0411 222 333", email: "rachel.k@email.com",  status: "active",   since: "2024-06-20" },
    { name: "David Okonkwo",  phone: "0422 333 444", email: "d.okonkwo@email.com", status: "inactive", since: "2025-03-08" },
    { name: "Linda Tran",     phone: "0489 012 345", email: "linda.t@email.com",   status: "active",   since: "2025-02-01" },
    { name: "Mark Jensen",    phone: "0478 901 234", email: "mark.j@email.com",    status: "active",   since: "2024-09-14" },
    { name: "Susan Patel",    phone: "0433 555 666", email: "susan.p@email.com",   status: "inactive", since: "2024-12-22" },
    { name: "Chris Lawson",   phone: "0444 777 888", email: "c.lawson@email.com",  status: "active",   since: "2024-07-30" },
    { name: "Amanda Fox",     phone: "0455 888 999", email: "a.fox@email.com",     status: "inactive", since: "2025-04-05" },
    { name: "Ben Hartley",    phone: "0466 999 000", email: "ben.h@email.com",     status: "active",   since: "2024-03-11" },
  ];

  const customers = await Promise.all(
    customerData.map((c) => prisma.customer.create({ data: c }))
  );

  // Build name → id map
  const byName = Object.fromEntries(customers.map((c) => [c.name, c.id]));

  // ── Jobs ───────────────────────────────────────────────────────
  await prisma.job.createMany({
    data: [
      { customerId: byName["Priya Sharma"],  service: "Interior Painting", address: "12 Maple St, Sydney",         date: "2026-05-14", value: 1800, status: "scheduled"  },
      { customerId: byName["Tom Nguyen"],    service: "Fence Install",      address: "7 Oak Ave, Melbourne",        date: "2026-05-10", value: 950,  status: "completed"  },
      { customerId: byName["Rachel Kim"],    service: "Exterior Painting",  address: "3 Cedar Rd, Brisbane",        date: "2026-05-12", value: 3200, status: "in-progress" },
      { customerId: byName["David Okonkwo"],service: "Deck Restoration",   address: "88 Birch Lane, Perth",        date: "2026-05-08", value: 580,  status: "completed"  },
      { customerId: byName["Linda Tran"],    service: "Roof Painting",      address: "55 Elm St, Adelaide",         date: "2026-05-20", value: 2400, status: "scheduled"  },
      { customerId: byName["Mark Jensen"],   service: "Interior Painting",  address: "19 Pine Cres, Sydney",        date: "2026-05-09", value: 1600, status: "in-progress" },
      { customerId: byName["Susan Patel"],   service: "Pressure Washing",   address: "42 Willow Dr, Brisbane",      date: "2026-05-06", value: 320,  status: "cancelled"  },
      { customerId: byName["Chris Lawson"],  service: "Commercial Paint",   address: "100 King St, Melbourne",      date: "2026-05-22", value: 5800, status: "scheduled"  },
      { customerId: byName["Amanda Fox"],    service: "Fence Painting",     address: "6 Ash Close, Perth",          date: "2026-05-05", value: 420,  status: "completed"  },
      { customerId: byName["Ben Hartley"],   service: "Full House Repaint", address: "31 Gum Tree Blvd, Sydney",    date: "2026-05-18", value: 7200, status: "scheduled"  },
    ],
  });

  // ── Quotes ─────────────────────────────────────────────────────
  await prisma.quote.createMany({
    data: [
      { quoteNumber: "Q-0001", customerId: byName["Priya Sharma"],  service: "Interior Painting", date: "2026-05-01", expiresOn: "2026-05-15", total: 1800, status: "accepted" },
      { quoteNumber: "Q-0002", customerId: byName["Tom Nguyen"],    service: "Fence Install",      date: "2026-05-03", expiresOn: "2026-05-17", total: 950,  status: "sent"     },
      { quoteNumber: "Q-0003", customerId: byName["Rachel Kim"],    service: "Exterior Painting",  date: "2026-05-05", expiresOn: "2026-05-19", total: 3200, status: "accepted" },
      { quoteNumber: "Q-0004", customerId: byName["David Okonkwo"],service: "Deck Restoration",   date: "2026-05-06", expiresOn: "2026-05-20", total: 580,  status: "rejected" },
      { quoteNumber: "Q-0005", customerId: byName["Linda Tran"],    service: "Roof Painting",      date: "2026-05-08", expiresOn: "2026-05-22", total: 2400, status: "draft"    },
      { quoteNumber: "Q-0006", customerId: byName["Mark Jensen"],   service: "Interior Painting",  date: "2026-05-09", expiresOn: "2026-05-23", total: 1600, status: "sent"     },
      { quoteNumber: "Q-0007", customerId: byName["Susan Patel"],   service: "Pressure Washing",   date: "2026-05-10", expiresOn: "2026-05-24", total: 320,  status: "draft"    },
      { quoteNumber: "Q-0008", customerId: byName["Chris Lawson"],  service: "Commercial Paint",   date: "2026-05-11", expiresOn: "2026-05-25", total: 5800, status: "sent"     },
      { quoteNumber: "Q-0009", customerId: byName["Amanda Fox"],    service: "Fence Painting",     date: "2026-05-12", expiresOn: "2026-05-26", total: 420,  status: "accepted" },
      { quoteNumber: "Q-0010", customerId: byName["Ben Hartley"],   service: "Full House Repaint", date: "2026-05-13", expiresOn: "2026-05-27", total: 7200, status: "accepted" },
    ],
  });

  // ── Tasks ──────────────────────────────────────────────────────
  await prisma.task.createMany({
    data: [
      { title: "Follow up on quote Q-0002",              relatedTo: "Tom Nguyen",    dueDate: "2026-05-12", priority: "high",   status: "todo"        },
      { title: "Order paint supplies for Job #3",        relatedTo: "Rachel Kim",    dueDate: "2026-05-13", priority: "high",   status: "in-progress" },
      { title: "Send invoice for completed fence job",   relatedTo: "Tom Nguyen",    dueDate: "2026-05-11", priority: "medium", status: "done"        },
      { title: "Confirm site visit with Linda Tran",     relatedTo: "Linda Tran",    dueDate: "2026-05-14", priority: "medium", status: "todo"        },
      { title: "Update quote Q-0005 with revised scope", relatedTo: "Linda Tran",    dueDate: "2026-05-15", priority: "high",   status: "todo"        },
      { title: "Call Chris Lawson re: start date",       relatedTo: "Chris Lawson",  dueDate: "2026-05-13", priority: "medium", status: "in-progress" },
      { title: "Schedule roof painting for Ben Hartley", relatedTo: "Ben Hartley",   dueDate: "2026-05-16", priority: "low",    status: "todo"        },
      { title: "Take before photos at Mark Jensen site", relatedTo: "Mark Jensen",   dueDate: "2026-05-12", priority: "low",    status: "done"        },
      { title: "Check stock levels for exterior paint",  relatedTo: "—",             dueDate: "2026-05-14", priority: "low",    status: "todo"        },
      { title: "Send completion report to Priya Sharma", relatedTo: "Priya Sharma",  dueDate: "2026-05-18", priority: "medium", status: "todo"        },
    ],
  });

  // ── Settings defaults ──────────────────────────────────────────
  await prisma.userProfile.create({
    data: {
      name:  "Augusto Suarez",
      email: "augusto@businessos.com",
      phone: "+61 400 000 000",
      role:  "Owner",
    },
  });

  await prisma.businessInfo.create({
    data: {
      bizName:  "Suarez Painting Co.",
      abn:      "12 345 678 902",
      industry: "Painting & Decorating",
      website:  "https://suarezpainting.com.au",
      address:  "14 Harbour St, Sydney NSW 2000",
      currency: "AUD",
    },
  });

  console.log("✓ Database seeded.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

import { prisma } from "@/lib/prisma";
import type { CalendarEvent } from "@/lib/calendar-utils";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const [jobs, quotes, tasks] = await Promise.all([
    prisma.job.findMany({
      include: { customer: { select: { id: true, name: true } } },
    }),
    prisma.quote.findMany({
      where: { scheduledVisit: { not: null } },
      include: { customer: { select: { id: true, name: true } } },
    }),
    prisma.task.findMany({
      include: { customer: { select: { id: true, name: true } } },
    }),
  ]);

  const jobEvents: CalendarEvent[] = jobs.map((j) => ({
    id: `job-${j.id}`,
    type: "job",
    title: j.service,
    date: j.date,
    customerId: j.customerId,
    customerName: j.customer.name,
    status: j.status,
    address: j.address,
    notes: j.notes,
    sourceId: j.id,
    href: "/dashboard/jobs",
  }));

  const quoteEvents: CalendarEvent[] = quotes.map((q) => ({
    id: `quote-${q.id}`,
    type: "quote",
    title: `${q.service} (${q.quoteNumber})`,
    date: q.scheduledVisit as string,
    customerId: q.customerId,
    customerName: q.customer.name,
    status: q.status,
    notes: q.notes,
    sourceId: q.id,
    href: "/dashboard/quotes",
  }));

  const taskEvents: CalendarEvent[] = tasks.map((t) => ({
    id: `task-${t.id}`,
    type: "task",
    title: t.title,
    date: t.dueDate,
    customerId: t.customerId,
    customerName: t.customer?.name ?? (t.relatedTo !== "—" ? t.relatedTo : null),
    status: t.status,
    notes: t.notes,
    sourceId: t.id,
    href: "/dashboard/tasks",
  }));

  return [...jobEvents, ...quoteEvents, ...taskEvents].sort((a, b) => a.date.localeCompare(b.date));
}

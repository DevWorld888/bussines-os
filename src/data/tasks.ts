export type TaskStatus   = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  relatedTo: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "Follow up on quote Q-0002",
    relatedTo: "Tom Nguyen",
    dueDate: "2026-05-12",
    priority: "high",
    status: "todo",
  },
  {
    id: 2,
    title: "Order paint supplies for Job #3",
    relatedTo: "Rachel Kim",
    dueDate: "2026-05-13",
    priority: "high",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Send invoice for completed fence job",
    relatedTo: "Tom Nguyen",
    dueDate: "2026-05-11",
    priority: "medium",
    status: "done",
  },
  {
    id: 4,
    title: "Confirm site visit with Linda Tran",
    relatedTo: "Linda Tran",
    dueDate: "2026-05-14",
    priority: "medium",
    status: "todo",
  },
  {
    id: 5,
    title: "Update quote Q-0005 with revised scope",
    relatedTo: "Linda Tran",
    dueDate: "2026-05-15",
    priority: "high",
    status: "todo",
  },
  {
    id: 6,
    title: "Call Chris Lawson re: commercial job start date",
    relatedTo: "Chris Lawson",
    dueDate: "2026-05-13",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 7,
    title: "Schedule roof painting for Ben Hartley",
    relatedTo: "Ben Hartley",
    dueDate: "2026-05-16",
    priority: "low",
    status: "todo",
  },
  {
    id: 8,
    title: "Take before photos at Mark Jensen site",
    relatedTo: "Mark Jensen",
    dueDate: "2026-05-12",
    priority: "low",
    status: "done",
  },
  {
    id: 9,
    title: "Check stock levels for exterior paint",
    relatedTo: "—",
    dueDate: "2026-05-14",
    priority: "low",
    status: "todo",
  },
  {
    id: 10,
    title: "Send completion report to Priya Sharma",
    relatedTo: "Priya Sharma",
    dueDate: "2026-05-18",
    priority: "medium",
    status: "todo",
  },
];

export const taskSummary = {
  total:      tasks.length,
  todo:       tasks.filter((t) => t.status === "todo").length,
  inProgress: tasks.filter((t) => t.status === "in-progress").length,
  done:       tasks.filter((t) => t.status === "done").length,
};

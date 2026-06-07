"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  await prisma.task.create({
    data: {
      title:     formData.get("title") as string,
      relatedTo: (formData.get("relatedTo") as string) || "—",
      dueDate:   formData.get("dueDate") as string,
      priority:  (formData.get("priority") as string) || "medium",
      status:    (formData.get("status") as string) || "todo",
    },
  });

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  await prisma.job.create({
    data: {
      customerId: parseInt(formData.get("customerId") as string),
      service:    formData.get("service") as string,
      address:    formData.get("address") as string,
      date:       formData.get("date") as string,
      value:      parseFloat(formData.get("value") as string) || 0,
      status:     (formData.get("status") as string) || "scheduled",
    },
  });

  revalidatePath("/dashboard/jobs");
  revalidatePath("/dashboard");
}

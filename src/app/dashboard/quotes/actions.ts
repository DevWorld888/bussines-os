"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createQuote(formData: FormData) {
  const count = await prisma.quote.count();
  const quoteNumber = `Q-${String(count + 1).padStart(4, "0")}`;

  await prisma.quote.create({
    data: {
      quoteNumber,
      customerId: parseInt(formData.get("customerId") as string),
      service:    formData.get("service") as string,
      date:       formData.get("date") as string,
      expiresOn:  formData.get("expiresOn") as string,
      total:      parseFloat(formData.get("total") as string) || 0,
      status:     (formData.get("status") as string) || "draft",
    },
  });

  revalidatePath("/dashboard/quotes");
  revalidatePath("/dashboard");
}

export async function updateQuote(id: number, formData: FormData) {
  await prisma.quote.update({
    where: { id },
    data: {
      customerId: parseInt(formData.get("customerId") as string),
      service:    formData.get("service") as string,
      date:       formData.get("date") as string,
      expiresOn:  formData.get("expiresOn") as string,
      total:      parseFloat(formData.get("total") as string) || 0,
      status:     formData.get("status") as string,
    },
  });
  revalidatePath("/dashboard/quotes");
  revalidatePath("/dashboard");
}

export async function deleteQuote(id: number) {
  await prisma.quote.delete({ where: { id } });
  revalidatePath("/dashboard/quotes");
  revalidatePath("/dashboard");
}

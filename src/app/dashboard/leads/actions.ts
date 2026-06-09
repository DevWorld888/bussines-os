"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLead(formData: FormData) {
  const followUp = (formData.get("followUp") as string) || null;

  await prisma.lead.create({
    data: {
      name:     formData.get("name") as string,
      phone:    formData.get("phone") as string,
      email:    formData.get("email") as string,
      service:  formData.get("service") as string,
      source:   formData.get("source") as string,
      status:   (formData.get("status") as string) || "new",
      followUp: followUp || null,
    },
  });

  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");
}

export async function updateLeadStatus(id: number, status: string) {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");
}

export async function updateLead(id: number, formData: FormData) {
  const followUp = (formData.get("followUp") as string) || null;
  await prisma.lead.update({
    where: { id },
    data: {
      name:     formData.get("name") as string,
      phone:    formData.get("phone") as string,
      email:    formData.get("email") as string,
      service:  formData.get("service") as string,
      source:   formData.get("source") as string,
      status:   formData.get("status") as string,
      followUp: followUp || null,
    },
  });
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");
}

export async function deleteLead(id: number) {
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");
}

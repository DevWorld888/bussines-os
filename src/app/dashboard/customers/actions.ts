"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCustomer(formData: FormData) {
  await prisma.customer.create({
    data: {
      name:   formData.get("name") as string,
      phone:  formData.get("phone") as string,
      email:  formData.get("email") as string,
      status: (formData.get("status") as string) || "active",
      since:  (formData.get("since") as string) || new Date().toISOString().slice(0, 10),
    },
  });

  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}

export async function updateCustomer(id: number, formData: FormData) {
  await prisma.customer.update({
    where: { id },
    data: {
      name:   formData.get("name") as string,
      phone:  formData.get("phone") as string,
      email:  formData.get("email") as string,
      status: formData.get("status") as string,
      since:  formData.get("since") as string,
    },
  });
  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}

export async function deleteCustomer(id: number) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}

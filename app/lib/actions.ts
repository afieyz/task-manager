"use server";

import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;
  const dueDate = formData.get("due_date") as string;

  if (!title || !description || !dueDate) {
    throw new Error(
      "Title, description, and due date are required."
    );
  }

  await sql`
    INSERT INTO tasks (
      title,
      description,
      status,
      priority,
      due_date
    )
    VALUES (
      ${title},
      ${description},
      ${status},
      ${priority},
      ${dueDate}
    )
  `;

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function updateTask(id: number, formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;
  const dueDate = formData.get("due_date") as string;

  if (!title || !description || !dueDate) {
    throw new Error(
      "Title, description, and due date are required."
    );
  }

  await sql`
    UPDATE tasks
    SET
      title = ${title},
      description = ${description},
      status = ${status},
      priority = ${priority},
      due_date = ${dueDate}
    WHERE id = ${id}
  `;

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function deleteTask(id: number) {
  await sql`
    DELETE FROM tasks
    WHERE id = ${id}
  `;

  revalidatePath("/tasks");
}
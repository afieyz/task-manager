"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import sql from "@/app/lib/db";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const TaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required."),

  description: z
    .string()
    .trim()
    .min(1, "Description is required."),

  status: z.enum([
    "Pending",
    "In Progress",
    "Completed",
  ]),

  priority: z.enum([
    "Low",
    "Medium",
    "High",
  ]),

  due_date: z
    .string()
    .min(1, "Due date is required."),
});

export type TaskState = {
  errors?: {
    title?: string[];
    description?: string[];
    status?: string[];
    priority?: string[];
    due_date?: string[];
  };
  message?: string;
};

export async function createTask(
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const validatedFields = TaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    due_date: formData.get("due_date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const {
    title,
    description,
    status,
    priority,
    due_date,
  } = validatedFields.data;

  try {
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
        ${due_date}
      )
    `;
  } catch (error) {
    console.error("Database Error:", error);

    return {
      message: "Database Error: Failed to create task.",
    };
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function updateTask(
  id: number,
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const validatedFields = TaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    due_date: formData.get("due_date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const {
    title,
    description,
    status,
    priority,
    due_date,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET
        title = ${title},
        description = ${description},
        status = ${status},
        priority = ${priority},
        due_date = ${due_date},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);

    return {
      message: "Database Error: Failed to update task.",
    };
  }

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
  redirect("/tasks");
}

export async function deleteTask(id: number) {
  await sql`
    DELETE FROM tasks
    WHERE id = ${id}
  `;

  revalidatePath("/tasks");
}

export async function completeTask(id: number) {
  await sql`
    UPDATE tasks
    SET
      status = 'Completed',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `;

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
}

export async function reopenTask(id: number) {
  await sql`
    UPDATE tasks
    SET
      status = 'Pending',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `;

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";

        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}
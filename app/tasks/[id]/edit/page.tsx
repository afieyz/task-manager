import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchTaskById } from "@/app/lib/data";
import EditTaskForm from "@/app/ui/edit-task-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const task = await fetchTaskById(Number(id));

  if (!task) {
    return {
      title: "Task Not Found",
    };
  }

  return {
    title: `Edit ${task.title}`,
    description: `Edit the details for ${task.title}.`,
  };
}

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await fetchTaskById(Number(id));

  if (!task) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Task
        </h1>

        <p className="mt-2 text-gray-600">
          Update your task details.
        </p>

        <EditTaskForm task={task} />
      </div>
    </main>
  );
}
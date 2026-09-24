import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchTaskById } from "@/app/lib/data";

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
    title: task.title,
    description:
      task.description || "View task details.",
  };
}

export default async function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await fetchTaskById(Number(id));

  if (!task) {
    notFound();
  }

  const formattedDueDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "No due date";

  const formattedCreatedDate = new Date(
    task.created_at
  ).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedUpdatedDate = new Date(
    task.updated_at
  ).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusColor =
    task.status === "Completed"
      ? "bg-green-100 text-green-800"
      : task.status === "In Progress"
        ? "bg-blue-100 text-blue-800"
        : "bg-yellow-100 text-yellow-800";

  const priorityColor =
    task.priority === "High"
      ? "bg-red-100 text-red-800"
      : task.priority === "Medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/tasks"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Tasks
        </Link>

        <div className="mt-6 rounded-lg bg-white p-8 shadow">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {task.title}
            </h1>

            <div className="flex gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm ${statusColor}`}
              >
                {task.status}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm ${priorityColor}`}
              >
                {task.priority} Priority
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Description
            </h2>

            <p className="mt-2 text-gray-700">
              {task.description}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">
                Due Date
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {formattedDueDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {formattedCreatedDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Last Updated
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {formattedUpdatedDate}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href={`/tasks/${task.id}/edit`}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Edit Task
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
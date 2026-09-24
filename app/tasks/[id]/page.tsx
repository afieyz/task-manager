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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-violet-600 transition hover:bg-purple-100 hover:text-violet-800"
        >
          ← Back to Tasks
        </Link>

        <div className="mt-6 rounded-3xl border border-white/80 bg-white/85 p-6 shadow-xl shadow-purple-200/30 backdrop-blur sm:p-8">
          {/* Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-500">
                Task Details
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {task.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${statusColor}`}
              >
                {task.status}
              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${priorityColor}`}
              >
                {task.priority} Priority
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 rounded-2xl bg-purple-50/60 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-500">
              Description
            </h2>

            <p className="mt-3 leading-7 text-gray-700">
              {task.description}
            </p>
          </div>

          {/* Task Information */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Due Date
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {formattedDueDate}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Created
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {formattedCreatedDate}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Last Updated
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {formattedUpdatedDate}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 flex justify-end border-t border-purple-100 pt-6">
            <Link
              href={`/tasks/${task.id}/edit`}
              className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
            >
              Edit Task
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
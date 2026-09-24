import type { Metadata } from "next";
import Link from "next/link";
import TaskCard from "@/app/ui/task-card";
import Search from "@/app/ui/search";
import StatusFilter from "@/app/ui/status-filter";
import PriorityFilter from "@/app/ui/priority-filter";
import SortFilter from "@/app/ui/sort-filter";
import Pagination from "@/app/ui/pagination";
import {
  fetchTasks,
  fetchTaskSummary,
  fetchTasksPages,
} from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    status?: string;
    priority?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.query || "";
  const status = params.status || "";
  const priority = params.priority || "";
  const sort = params.sort || "newest";

  const parsedPage = Number(params.page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const [tasks, summary, totalPages] = await Promise.all([
    fetchTasks(
      query,
      status,
      priority,
      sort,
      currentPage
    ),
    fetchTaskSummary(),
    fetchTasksPages(query, status, priority),
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 px-6 py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-purple-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-600">
              My Workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Tasks
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your priorities, deadlines and progress in one place.
            </p>
          </div>

          <Link
            href="/tasks/create"
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
          >
            + Add Task
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Tasks
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                ✓
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-violet-700">
              {summary.total}
            </p>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Pending
              </p>

              <div className="h-3 w-3 rounded-full bg-yellow-400" />
            </div>

            <p className="mt-4 text-3xl font-bold text-yellow-600">
              {summary.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                In Progress
              </p>

              <div className="h-3 w-3 rounded-full bg-blue-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-blue-600">
              {summary.in_progress}
            </p>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Completed
              </p>

              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-green-600">
              {summary.completed}
            </p>
          </div>
        </div>

        {/* Search, Filter and Sort */}
        <div className="mt-6 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <Search />
            </div>

            <StatusFilter />
            <PriorityFilter />
            <SortFilter />
          </div>
        </div>

        {/* Task List */}
        <div className="mt-6">
          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-white/80 bg-white/80 p-12 text-center shadow-sm backdrop-blur">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl text-violet-600">
                ✓
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                {query || status || priority
                  ? "No matching tasks."
                  : "No tasks yet."}
              </h2>

              <p className="mt-2 text-gray-600">
                {query || status || priority
                  ? "Try changing your search or filter."
                  : "Create your first task to get started."}
              </p>

              <Link
                href="/tasks/create"
                className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
              >
                + Create Task
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description ?? ""}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.due_date}
                  />
                ))}
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
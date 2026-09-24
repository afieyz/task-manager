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
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Tasks
            </h1>

            <p className="mt-2 text-gray-600">
              Manage and organize your tasks here.
            </p>
          </div>

          <Link
            href="/tasks/create"
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            + Add Task
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">
              Total Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {summary.total}
            </p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {summary.pending}
            </p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {summary.in_progress}
            </p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {summary.completed}
            </p>
          </div>
        </div>

        {/* Search, Filter and Sort */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Search />
          </div>

          <StatusFilter />

          <PriorityFilter />

          <SortFilter />
        </div>

        {/* Task List */}
        <div className="mt-6">
          {tasks.length === 0 ? (
            <div className="rounded-lg bg-white p-10 text-center shadow">
              <h2 className="text-xl font-semibold text-gray-900">
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
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
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
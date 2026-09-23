import Link from "next/link";
import { createTask } from "@/app/lib/actions";
import SubmitButton from "@/app/ui/submit-button";

export default function CreateTaskPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Task
        </h1>

        <p className="mt-2 text-gray-600">
          Add a new task to your task list.
        </p>

        <form
          action={createTask}
          className="mt-8 rounded-lg bg-white p-6 shadow"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter task description"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
                htmlFor="due_date"
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                Due Date
            </label>

            <input
                id="due_date"
                name="due_date"
                type="date"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
            />
            </div>

          <div className="mt-5">
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mt-5">
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link
              href="/tasks"
              className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>

            <SubmitButton
              label="Create Task"
              pendingLabel="Creating..."
            />
          </div>
        </form>
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  createTask,
  type TaskState,
} from "@/app/lib/actions";
import SubmitButton from "@/app/ui/submit-button";

export default function CreateTaskForm() {
  const initialState: TaskState = {
    errors: {},
    message: "",
  };

  const [state, formAction] = useActionState(
    createTask,
    initialState
  );

  return (
    <form
      action={formAction}
      className="mt-8 rounded-lg bg-white p-6 shadow"
    >
      {/* Title */}
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
          aria-describedby="title-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
        />

        <div
          id="title-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.title?.map((error) => (
            <p
              key={error}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
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
          aria-describedby="description-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
        />

        <div
          id="description-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.description?.map((error) => (
            <p
              key={error}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Due Date */}
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
          aria-describedby="due-date-error"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
        />

        <div
          id="due-date-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.due_date?.map((error) => (
            <p
              key={error}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Status */}
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
          aria-describedby="status-error"
          defaultValue="Pending"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>

        <div
          id="status-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.status?.map((error) => (
            <p
              key={error}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Priority */}
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
          aria-describedby="priority-error"
          defaultValue="Medium"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div
          id="priority-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors?.priority?.map((error) => (
            <p
              key={error}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* General Error */}
      {state.message && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* Buttons */}
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
  );
}
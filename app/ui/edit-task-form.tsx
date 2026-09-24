"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  updateTask,
  type TaskState,
} from "@/app/lib/actions";
import type { Task } from "@/app/lib/data";
import SubmitButton from "@/app/ui/submit-button";

export default function EditTaskForm({
  task,
}: {
  task: Task;
}) {
  const initialState: TaskState = {
    errors: {},
    message: "",
  };

  const updateTaskWithId = updateTask.bind(
    null,
    task.id
  );

  const [state, formAction] = useActionState(
    updateTaskWithId,
    initialState
  );

  const dueDateValue = task.due_date
    ? new Date(task.due_date).toISOString().split("T")[0]
    : "";

  const inputStyle =
    "w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

  return (
    <form
      action={formAction}
      className="mt-8 rounded-3xl border border-white/80 bg-white/85 p-6 shadow-xl shadow-purple-200/30 backdrop-blur sm:p-8"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Task Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={task.title}
          aria-describedby="title-error"
          className={inputStyle}
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
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={task.description ?? ""}
          aria-describedby="description-error"
          className={inputStyle}
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
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Due Date
        </label>

        <input
          id="due_date"
          name="due_date"
          type="date"
          defaultValue={dueDateValue}
          aria-describedby="due-date-error"
          className={inputStyle}
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
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={task.status}
          aria-describedby="status-error"
          className={inputStyle}
        >
          <option value="Pending">
            Pending
          </option>
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
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Priority
        </label>

        <select
          id="priority"
          name="priority"
          defaultValue={task.priority}
          aria-describedby="priority-error"
          className={inputStyle}
        >
          <option value="Low">
            Low
          </option>
          <option value="Medium">
            Medium
          </option>
          <option value="High">
            High
          </option>
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
          className="mt-5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-3 border-t border-purple-100 pt-6">
        <Link
          href="/tasks"
          className="rounded-xl border border-purple-200 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-purple-50 hover:text-violet-700"
        >
          Cancel
        </Link>

        <SubmitButton
          label="Save Changes"
          pendingLabel="Saving..."
        />
      </div>
    </form>
  );
}
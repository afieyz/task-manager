import Link from "next/link";
import {
  deleteTask,
  completeTask,
  reopenTask,
} from "@/app/lib/actions";
import DeleteButton from "@/app/ui/delete-button";
import CompleteButton from "@/app/ui/complete-button";
import ReopenButton from "@/app/ui/reopen-button";

type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
};

export default function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
}: TaskCardProps) {
  const deleteTaskWithId = deleteTask.bind(null, id);
  const completeTaskWithId = completeTask.bind(null, id);
  const reopenTaskWithId = reopenTask.bind(null, id);

  const statusColor =
    status === "Completed"
      ? "bg-green-100 text-green-800"
      : status === "In Progress"
        ? "bg-blue-100 text-blue-800"
        : "bg-yellow-100 text-yellow-800";

  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-800"
      : priority === "Medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";

  let dueDateText = "No due date";
  let dueDateColor = "text-gray-500";

  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();

    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const formattedDueDate = due.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (status === "Completed") {
      dueDateText = `Due: ${formattedDueDate}`;
      dueDateColor = "text-gray-500";
    } else if (due.getTime() < today.getTime()) {
      dueDateText = `Overdue · ${formattedDueDate}`;
      dueDateColor = "font-medium text-red-600";
    } else if (due.getTime() === today.getTime()) {
      dueDateText = "Due Today";
      dueDateColor = "font-medium text-orange-600";
    } else {
      dueDateText = `Due: ${formattedDueDate}`;
      dueDateColor = "text-gray-500";
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <p className={`mt-3 text-sm ${dueDateColor}`}>
        {dueDateText}
      </p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status and Priority */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm ${statusColor}`}
          >
            {status}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm ${priorityColor}`}
          >
            {priority} Priority
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/tasks/${id}`}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            View
          </Link>

          {status === "Completed" ? (
            <ReopenButton
              reopenAction={reopenTaskWithId}
            />
          ) : (
            <CompleteButton
              completeAction={completeTaskWithId}
            />
          )}

          <Link
            href={`/tasks/${id}/edit`}
            className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
          >
            Edit
          </Link>

          <DeleteButton deleteAction={deleteTaskWithId} />
        </div>
      </div>
    </div>
  );
}
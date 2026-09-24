import type { Metadata } from "next";
import CreateTaskForm from "@/app/ui/create-task-form";

export const metadata: Metadata = {
  title: "Create Task",
};

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

        <CreateTaskForm />
      </div>
    </main>
  );
}
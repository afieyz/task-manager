import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow">
        <h1 className="text-2xl font-bold text-gray-900">
          Task Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          The task you're looking for doesn't exist.
        </p>

        <Link
          href="/tasks"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Back to Tasks
        </Link>
      </div>
    </main>
  );
}
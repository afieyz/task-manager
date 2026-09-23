import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Task Manager
        </h1>

        <p className="mt-4 text-gray-600">
          Organize your tasks and get things done.
        </p>

        <Link
          href="/tasks"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
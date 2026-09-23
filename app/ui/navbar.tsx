import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          Task Manager
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/tasks"
            className="text-gray-600 hover:text-blue-600"
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
}
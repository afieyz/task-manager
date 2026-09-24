import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-md shadow-violet-200">
            ✓
          </div>

          <div>
            <p className="text-lg font-bold leading-none text-gray-900">
              Task Manager
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Stay organized
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-purple-50 hover:text-violet-600"
          >
            Home
          </Link>

          {session?.user ? (
            <>
              <Link
                href="/tasks"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-purple-50 hover:text-violet-600"
              >
                Tasks
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <button
                  type="submit"
                  className="rounded-xl border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-violet-700"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

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

          {session?.user ? (
            <>
              <Link
                href="/tasks"
                className="text-gray-600 hover:text-blue-600"
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
                  className="text-gray-600 hover:text-red-600"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-gray-600 hover:text-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
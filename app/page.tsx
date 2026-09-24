import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 px-6 py-16">
      {/* Decorative background */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[75vh] max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* Left Section */}
        <section>
          <div className="mb-6 inline-flex rounded-full border border-purple-200 bg-white/70 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm backdrop-blur">
            ✦ Simple. Focused. Productive.
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
            Organize your tasks.
            <span className="block text-violet-600">
              Focus on what matters.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Keep track of your tasks, priorities and deadlines in one
            simple workspace. Stay organized and make progress one task
            at a time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tasks"
              className="rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              Get Started →
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-purple-200 bg-white/80 px-7 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-white"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500">
            <span>✓ Track tasks</span>
            <span>✓ Set priorities</span>
            <span>✓ Manage deadlines</span>
          </div>
        </section>

        {/* Task Preview */}
        <section className="relative">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-purple-200/50 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-violet-600">
                  MY WORKSPACE
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  Today&apos;s Tasks
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
                ✓
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Complete project documentation
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Prepare the final documentation and review.
                    </p>
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                    High
                  </span>
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  Due today
                </div>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Review Next.js notes
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Go through authentication and metadata.
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                    Medium
                  </span>
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  In Progress
                </div>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm text-green-700">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Set up project database
                      </h3>

                      <p className="text-sm text-gray-400">
                        Completed
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-green-600">
                    Done
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-center">
                <p className="text-xl font-bold text-purple-700">6</p>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-center">
                <p className="text-xl font-bold text-blue-700">2</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-center">
                <p className="text-xl font-bold text-green-700">3</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="animate-pulse">
          <div className="h-9 w-40 rounded bg-gray-300" />

          <div className="mt-3 h-5 w-64 rounded bg-gray-200" />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 rounded-lg bg-gray-200"
              />
            ))}
          </div>

          <div className="mt-8 h-12 rounded-lg bg-gray-200" />

          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
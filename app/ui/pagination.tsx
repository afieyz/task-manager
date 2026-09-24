"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    replace(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-xl border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-violet-300 hover:bg-purple-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => createPageURL(page)}
          className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold shadow-sm transition ${
            currentPage === page
              ? "bg-violet-600 text-white shadow-violet-200"
              : "border border-purple-200 bg-white/80 text-gray-700 hover:border-violet-300 hover:bg-purple-50 hover:text-violet-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-xl border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-violet-300 hover:bg-purple-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
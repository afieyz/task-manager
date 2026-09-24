"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function SortFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (sort && sort !== "newest") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      defaultValue={
        searchParams.get("sort")?.toString() || "newest"
      }
      onChange={(event) => {
        handleSort(event.target.value);
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="due">Due Date (Soonest)</option>
      <option value="high">High Priority</option>
      <option value="low">Low Priority</option>
    </select>
  );
}
"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function PriorityFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(priority: string) {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (priority) {
      params.set("priority", priority);
    } else {
      params.delete("priority");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      defaultValue={
        searchParams.get("priority")?.toString() || ""
      }
      onChange={(event) => {
        handleFilter(event.target.value);
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
    >
      <option value="">All Priority</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  );
}
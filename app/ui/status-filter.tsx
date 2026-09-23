"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(status: string) {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      defaultValue={searchParams.get("status")?.toString() || ""}
      onChange={(event) => {
        handleFilter(event.target.value);
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
    >
      <option value="">All Status</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
}
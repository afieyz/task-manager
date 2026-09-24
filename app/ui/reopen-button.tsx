"use client";

import { useTransition } from "react";

type ReopenButtonProps = {
  reopenAction: () => Promise<void>;
};

export default function ReopenButton({
  reopenAction,
}: ReopenButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleReopen() {
    startTransition(async () => {
      await reopenAction();
    });
  }

  return (
    <button
      type="button"
      onClick={handleReopen}
      disabled={isPending}
      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Reopening..." : "Reopen"}
    </button>
  );
}
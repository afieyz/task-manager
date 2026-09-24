"use client";

import { useTransition } from "react";

type CompleteButtonProps = {
  completeAction: () => Promise<void>;
};

export default function CompleteButton({
  completeAction,
}: CompleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleComplete() {
    startTransition(async () => {
      await completeAction();
    });
  }

  return (
    <button
      type="button"
      onClick={handleComplete}
      disabled={isPending}
      className="rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Completing..." : "Mark Complete"}
    </button>
  );
}
"use client";

type DeleteButtonProps = {
  deleteAction: () => void;
};

export default function DeleteButton({
  deleteAction,
}: DeleteButtonProps) {
  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      deleteAction();
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
    >
      Delete
    </button>
  );
}
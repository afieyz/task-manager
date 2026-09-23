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
      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
    >
      Delete
    </button>
  );
}
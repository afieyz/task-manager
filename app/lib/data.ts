import sql from "@/app/lib/db";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: Date;
};

export type TaskSummary = {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
};

export async function fetchTasks(
  query: string = "",
  status: string = "",
  priority: string = "",
  sort: string = "newest"
) {
  try {
    const tasks = await sql<Task[]>`
      SELECT
        id,
        title,
        description,
        status,
        priority,
        due_date,
        created_at
      FROM tasks
      WHERE
        (
          title ILIKE ${`%${query}%`}
          OR description ILIKE ${`%${query}%`}
        )
        AND (
          ${status} = ''
          OR status = ${status}
        )
        AND (
          ${priority} = ''
          OR priority = ${priority}
        )
      ORDER BY
        CASE
          WHEN ${sort} = 'high' THEN
            CASE priority
              WHEN 'High' THEN 1
              WHEN 'Medium' THEN 2
              WHEN 'Low' THEN 3
            END
        END ASC,

        CASE
          WHEN ${sort} = 'low' THEN
            CASE priority
              WHEN 'Low' THEN 1
              WHEN 'Medium' THEN 2
              WHEN 'High' THEN 3
            END
        END ASC,

        CASE
          WHEN ${sort} = 'due' THEN due_date
        END ASC NULLS LAST,

        CASE
          WHEN ${sort} = 'oldest' THEN created_at
        END ASC,

        CASE
          WHEN ${sort} = 'newest' THEN created_at
        END DESC,

        created_at DESC
    `;

    return tasks;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}

export async function fetchTaskById(id: number) {
  try {
    const tasks = await sql<Task[]>`
      SELECT
        id,
        title,
        description,
        status,
        priority,
        due_date,
        created_at
      FROM tasks
      WHERE id = ${id}
    `;

    return tasks[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch task.");
  }
}

export async function fetchTaskSummary() {
  try {
    const data = await sql<TaskSummary[]>`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'Pending')::int AS pending,
        COUNT(*) FILTER (WHERE status = 'In Progress')::int AS in_progress,
        COUNT(*) FILTER (WHERE status = 'Completed')::int AS completed
      FROM tasks
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch task summary.");
  }
}
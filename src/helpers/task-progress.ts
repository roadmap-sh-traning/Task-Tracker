import type { TaskProgress } from "../types/task-progress.js";

const ALLOWED_TASK_PROGRESS: readonly TaskProgress[] = ["done", "todo", "in-progress"];

export function isAllowedTaskProgress(progress: string): progress is TaskProgress {
  return ALLOWED_TASK_PROGRESS.includes(progress as TaskProgress);
}

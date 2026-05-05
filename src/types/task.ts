import type { TaskProgress } from "./task-progress.js";

export interface Task {
  id: number;
  description: string;
  status: TaskProgress;
  createdAt: string;
  updatedAt: string;
}

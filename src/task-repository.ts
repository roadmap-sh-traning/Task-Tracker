import { FileManager } from "./file-manager.js";
import type { Task } from "./types/task.js";

export class TaskRepository {
  constructor(private fileManager: FileManager) {}

  getAllTasks() {
    return this.fileManager.read<Task[]>();
  }

  saveAllTasks(tasks: Task[]) {
    this.fileManager.add<Task[]>(tasks);
  }
}

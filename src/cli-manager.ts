import { BSP_ERROR_COLLECTION } from "./constants/errors.js";
import { FileManager } from "./file-manager.js";
import type { Task } from "./types/task.js";

export class CliManager {
  fileManager = new FileManager();

  addTask(infoText: string) {
    const tasks = this.fileManager.read<Task>();

    if (!tasks) {
      return BSP_ERROR_COLLECTION.TASKS_NOT_FOUND;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      description: infoText,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    this.fileManager.add<Task[]>(tasks);
  }
}

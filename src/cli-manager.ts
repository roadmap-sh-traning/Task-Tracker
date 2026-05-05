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

  updateTask(id: number, infoText: string) {
    const tasks = this.fileManager.read<Task>();

    try {
      const { taskIndex, task } = this.validateTask(tasks, id);

      if (typeof task === "string") return;

      const existing = tasks[taskIndex];
      if (!existing)
        throw new Error(BSP_ERROR_COLLECTION.TASK_DONT_FOUND_THAT_INDEX);

      tasks[taskIndex] = {
        ...existing,
        description: infoText,
        updatedAt: new Date().toISOString(),
      };

      this.fileManager.add<Task[]>(tasks);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
    }
  }

  deleteTask(taskId: number) {
    const tasks = this.fileManager.read<Task>();

    console.log(`Deleting task with id: ${taskId}`);

    try {
      const { taskIndex, task } = this.validateTask(tasks, taskId);

      if (typeof task === "string") return;

      delete tasks[taskIndex];

      console.log(`Task with id ${taskId} deleted successfully`, tasks);

      this.fileManager.add<Task[]>(tasks);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
    }
  }

  private validateTask(
    tasks: Task[],
    taskId: number,
  ): { taskIndex: number; task: Task } {
    if (!tasks) {
      throw new Error(BSP_ERROR_COLLECTION.TASKS_NOT_FOUND);
    }

    const index = tasks.findIndex((t) => t.id === taskId);

    if (index === -1) {
      throw new Error(BSP_ERROR_COLLECTION.TASK_NOT_FOUND);
    }

    if (!tasks[index]) {
      throw new Error(BSP_ERROR_COLLECTION.TASK_DONT_FOUND_THAT_INDEX);
    }

    return {
      task: tasks[index],
      taskIndex: index,
    };
  }
}

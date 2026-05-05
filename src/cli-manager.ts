import { BSP_ERROR_COLLECTION } from "./constants/errors.js";
import { FileManager } from "./file-manager.js";
import type { TaskProgress } from "./types/task-progress.js";
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

  updateTask(id: number, infoText: string, status?: TaskProgress) {
    const tasks = this.fileManager.read<Task>();

    console.warn(`validateTask validateTaskvalidateTask}`, tasks);

    try {
      const { taskIndex } = this.validateTask(tasks, id);

      console.log(`Updating task updateTask updateTask: ${infoText} ${id}`);

      const existing = tasks[taskIndex];
      if (!existing)
        throw new Error(BSP_ERROR_COLLECTION.TASK_DONT_FOUND_THAT_INDEX);

      tasks[taskIndex] = {
        ...existing,
        ...(status ? { status } : {}),
        description: status ? existing.description : infoText,
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
      const { taskIndex } = this.validateTask(tasks, taskId);

      delete tasks[taskIndex];

      const removeNulls = tasks.filter(Boolean);

      this.fileManager.add<Task[]>(removeNulls);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
    }
  }

  listTasks(status: TaskProgress | null) {
    const tasks = this.fileManager.read<Task>();

    if (!tasks || tasks.length === 0) {
      throw new Error(BSP_ERROR_COLLECTION.TASKS_NOT_FOUND);
    }

    return status ? tasks.filter((t) => t.status === status) : tasks;
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

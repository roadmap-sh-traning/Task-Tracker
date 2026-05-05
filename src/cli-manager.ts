import { BSP_ERROR_COLLECTION } from "./constants/errors.js";
import { FileManager } from "./file-manager.js";
import { TaskRepository } from "./task-repository.js";
import type { TaskProgress } from "./types/task-progress.js";
import type { Task } from "./types/task.js";

export class CliManager {
  taskRepository = new TaskRepository(new FileManager());

  addTask(infoText: string) {
    const tasks = this.taskRepository.getAllTasks();

    const newTask: Task = {
      id: Math.max(...tasks.map((t) => t.id)) + 1 || 1,
      description: infoText,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    this.taskRepository.saveAllTasks(tasks);
  }

  updateTask(id: number, infoText: string, status?: TaskProgress) {
    const tasks = this.taskRepository.getAllTasks();

    const { taskIndex } = this.validateTask(tasks, id);

    const existing = tasks[taskIndex];
    if (!existing) throw new Error(BSP_ERROR_COLLECTION.TASK_DONT_FOUND_THAT_INDEX);

    tasks[taskIndex] = {
      ...existing,
      ...(status ? { status } : {}),
      description: status ? existing.description : infoText,
      updatedAt: new Date().toISOString(),
    };

    this.taskRepository.saveAllTasks(tasks);
  }

  deleteTask(taskId: number) {
    const tasks = this.taskRepository.getAllTasks();

    const { taskIndex } = this.validateTask(tasks, taskId);

    tasks.splice(taskIndex, 1);

    this.taskRepository.saveAllTasks(tasks);
  }

  listTasks(status: TaskProgress | null) {
    const tasks = this.taskRepository.getAllTasks();

    if (!tasks || tasks.length === 0) {
      throw new Error(BSP_ERROR_COLLECTION.TASKS_NOT_FOUND);
    }

    return status ? tasks.filter((t) => t.status === status) : tasks;
  }

  private validateTask(tasks: Task[], taskId: number): { taskIndex: number; task: Task } {
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

import { CliManager } from "./cli-manager.js";
import { BSP_HANDLE_CLI_ERRORS } from "./constants/errors.js";
import { isAllowedTaskProgress } from "./helpers/task-progress.js";
import type { Command } from "./types/command.js";
import type { TaskProgress } from "./types/task-progress.js";

export class CliController {
  constructor(private cliManager: CliManager) {}

  handleCliCommand(command: Command, rest: string[]) {
    switch (command) {
      case "add":
        const [description] = rest;
        this.addCommand(description);
        break;

      case "update":
        const [idStr, infoText] = rest;

        this.updateCommand(idStr, infoText);
        break;

      case "delete":
        const [deleteIdStr] = rest;

        this.deleteCommand(deleteIdStr);
        break;

      case "mark-in-progress":
        const [markInProgressId] = rest;

        this.markInProgressCommand(markInProgressId);
        break;

      case "mark-done":
        const [markDoneId] = rest;

        this.markDoneCommand(markDoneId);
        break;

      case "list":
        const [statusStr] = rest;

        let listStatus: TaskProgress | null = null;

        if (statusStr) {
          if (!isAllowedTaskProgress(statusStr)) {
            throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_TASK_PROGRESS);
          }

          listStatus = statusStr;
        }

        this.listTasksCommand(listStatus);
        break;

      default:
        throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_COMMAND);
    }
  }

  private addCommand(description: string | undefined) {
    if (!description) throw new Error(BSP_HANDLE_CLI_ERRORS.DESCRIPTION_REQUIRED);

    this.cliManager.addTask(description);
  }

  private updateCommand(updateId: string | undefined, infoText: string | undefined) {
    if (!updateId) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
    }

    if (!infoText) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.INFO_TEXT_REQUIRED);
    }

    const id = Number(updateId);

    if (Number.isNaN(id)) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_ID);
    }

    this.cliManager.updateTask(id, infoText);
  }

  private deleteCommand(deleteId: string | undefined) {
    if (!deleteId) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
    }

    const id = Number(deleteId);
    if (Number.isNaN(id)) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_ID);
    }

    this.cliManager.deleteTask(id);
  }
  private markInProgressCommand(markInProgressId: string | undefined) {
    if (!markInProgressId) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
    }

    const id = Number(markInProgressId);
    if (Number.isNaN(id)) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_ID);
    }

    this.cliManager.updateTask(id, "", "in-progress");
  }
  private markDoneCommand(markDoneId: string | undefined) {
    if (!markDoneId) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
    }

    const id = Number(markDoneId);
    if (Number.isNaN(id)) {
      throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_ID);
    }

    this.cliManager.updateTask(id, "", "done");
  }

  private listTasksCommand(listStatus: TaskProgress | null) {
    const tasks = this.cliManager.listTasks(listStatus);

    tasks.forEach((task) => {
      console.log(`${task.id} - ${task.description} - ${task.status}`);
    });
  }
}

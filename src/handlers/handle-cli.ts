import { CliManager } from "../cli-manager.js";
import { BSP_HANDLE_CLI_ERRORS } from "../constants/errors.js";
import type { Command } from "../types/command.js";
import type { TaskProgress } from "../types/task-progress.js";

export function handleCli(command: Command, rest: string[]) {
  const cliManager = new CliManager();

  switch (command) {
    case "add":
      const [description] = rest;
      if (!description)
        throw new Error(BSP_HANDLE_CLI_ERRORS.DESCRIPTION_REQUIRED);

      cliManager.addTask(description);
      break;

    case "update":
      const [idStr, infoText] = rest;
      console.log(`Updating task: ${infoText} ${idStr}`);

      if (!idStr) {
        throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
      }

      if (!infoText) {
        throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_COMMAND);
      }

      cliManager.updateTask(Number(idStr), infoText);
      break;

    case "delete":
      const [deleteIdStr] = rest;

      if (!deleteIdStr) {
        throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
      }

      cliManager.deleteTask(Number(deleteIdStr));
      break;

    case "mark-in-progress":
    case "mark-done":
      const [doneIdStr] = rest;

      const status = command === "mark-in-progress" ? "in-progress" : "done";

      if (!doneIdStr) {
        throw new Error(BSP_HANDLE_CLI_ERRORS.ID_REQUIRED);
      }

      cliManager.updateTask(Number(doneIdStr), "", status);
      break;

    case "list":
      const [statusStr] = rest;
      const listStatus = statusStr ? (statusStr as TaskProgress) : null;

      console.log("ALL Tasks:", cliManager.listTasks(listStatus));
      break;

    default:
      console.log(`Unknown command: ${command}`);
      throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_COMMAND);
  }
}

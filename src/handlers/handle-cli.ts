import { CliManager } from "../cli-manager.js";
import { BSP_HANDLE_CLI_ERRORS } from "../constants/errors.js";
import type { Command } from "../types/command.js";

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
      console.log(`Updating task: ${infoText}`);

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

    default:
      console.log(`Unknown command: ${command}`);
      throw new Error(BSP_HANDLE_CLI_ERRORS.INVALID_COMMAND);
  }
}

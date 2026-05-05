import { CliManager } from "../cli-manager.js";
import type { Command } from "../types/command.js";

export function handleCli(command: Command, infoText: string | undefined) {
  const cliManager = new CliManager();

  if (infoText === undefined) {
    console.log(`No info text provided for command: ${command}`);
    return;
  }

  switch (command) {
    case "add":
      console.log(`Adding task: ${infoText}`);
      cliManager.addTask(infoText);
      break;
    default:
      console.log(`Unknown command: ${command}`);
      break;
  }
}

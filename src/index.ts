#!/usr/bin/env node

import { CliController } from "./cli-controller.js";
import { CliManager } from "./cli-manager.js";
import type { Command } from "./types/command.js";

const [command, ...rest] = process.argv.slice(2) as [Command, ...string[]];

const cliManager = new CliManager();
const cliController = new CliController(cliManager);

try {
  cliController.handleCliCommand(command, rest);
} catch (error) {
  console.error(error);
  process.exit(1);
}

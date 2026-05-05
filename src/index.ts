#!/usr/bin/env node

import type { Command } from "./types/command.js";
import { handleCli } from "./handlers/handle-cli.js";

const [command, ...rest] = process.argv.slice(2) as [Command, ...string[]];

console.log(`Hello! You passed:${command} ${rest}`);

try {
  handleCli(command, rest);
} catch (error) {
  console.error(error);
  process.exit(1);
}

#!/usr/bin/env node

import type { Command } from "./types/command.js";
import { handleCli } from "./handlers/handle-cli.js";

const greeting: string = "Hello, TypeScript!";
console.log(greeting);

// Access arguments passed to the CLI
// process.argv[0] is the node path
// process.argv[1] is the script path
const args = process.argv.slice(2);

const command = args[0] as Command;
const infoText = args[1];

handleCli(command, infoText);

console.log(`Hello! You passed: ${command} and ${infoText}`);

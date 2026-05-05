# Task Tracker CLI

Simple CLI app to manage tasks (`todo`, `in-progress`, `done`) using a JSON file store.

## Features

- Add tasks
- Update task description
- Delete tasks
- Mark tasks as in progress or done
- List all tasks or filter by status

## Tech Stack

- TypeScript
- Node.js
- File-based storage (`src/task.json`)

## Project Structure

- `CliController`: parses and validates CLI input, then routes commands
- `CliManager`: business logic for task operations
- `TaskRepository`: data access abstraction (read and write tasks)
- `FileManager`: low-level file I/O

This separation makes it easy to replace JSON storage with a database later.

## Installation

```bash
git clone <your-repo-url>
cd Task-Tracker
npm install
npm run build
```

## Run as CLI Command (`task-cli`)

```bash
npm link
task-cli add "Buy groceries"
```

## Available Commands

```bash
task-cli add "Buy groceries"
task-cli update 1 "Buy fruits and milk"
task-cli delete 1
task-cli mark-in-progress 1
task-cli mark-done 1
task-cli list
task-cli list done
task-cli list todo
task-cli list in-progress
```

## Development

```bash
npm run dev
```

## Formatting

```bash
npm run format
npm run format:check
```
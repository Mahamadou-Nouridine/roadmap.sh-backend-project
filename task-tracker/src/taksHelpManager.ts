export class TaskManagerHelper {
  static getHelp(command: string) {
    const helpMessages: Record<string, { description: string; usage: string }> =
      {
        add: {
          description: "Adds a new task with a description.",
          usage: "Usage: add <description>",
        },
        update: {
          description: "Updates an existing task's description.",
          usage: "Usage: update <taskId> <newDescription>",
        },
        delete: {
          description: "Deletes a task by ID.",
          usage: "Usage: delete <taskId>",
        },
        "mark-in-progress": {
          description: "Marks a task as in-progress.",
          usage: "Usage: mark-in-progress <taskId>",
        },
        "mark-done": {
          description: "Marks a task as done.",
          usage: "Usage: mark-done <taskId>",
        },
        list: {
          description: "Lists tasks, optionally filtered by status.",
          usage: "Usage: list [status]",
        },
        "--help": {
          description: "Shows usage information for a command.",
          usage: "Usage: help [command]",
        },
      };

    const help = helpMessages[command];

    if (help) {
      console.log(`${command} Command:`);
      console.log(`  Description: ${help.description}`);
      console.log(`  ${help.usage}`);
    } else {
      console.log(`No help available for command: ${command}`);
    }
  }
}

import { Db } from "./db.service";
import { TaskManagerHelper } from "./taksHelpManager";
import { TaskFormat } from "./utils/task-format";

// Create instances of Db and TaskFormat to manage database and format tasks.
const db = new Db();
const taskFormat = new TaskFormat();

export class TaskManager {
  // A record object mapping command names to corresponding handler functions
  comands: Record<string, Function>;

  /**
   * Initializes the TaskManager with the specified environment ("dev" or "prod").
   *
   * @param env The environment for the db instance ("dev" or "prod"), defaults to "prod"
   */
  constructor(env: "dev" | "prod" = "prod") {
    // Set the environment for the db instance
    db.setEnv(env);

    // Initialize the available commands for task management
    this.comands = {
      add: this.add, // Add a new task
      update: this.update, // Update an existing task
      delete: this.delete, // Delete a task
      "mark-in-progress": this.markInProgress, // Mark a task as in-progress
      "mark-done": this.markDone, // Mark a task as done
      list: this.list, // List tasks with optional status filtering
      "--help": this.help, // helper utility
    };
  }

  /**
   * Routes the command to the appropriate function handler.
   *
   * @param args The command and its arguments
   */
  router(args: string[]) {
    if (!args || !args[0]) {
      return this.help();
    }
    const comand = args[0];

    // Check if the command exists in the defined list of commands
    if (!this.comands[comand]) {
      return console.log("This command does not exist.");
    }

    // Call the corresponding function handler for the command
    return this.comands[comand](args.slice(1));
  }

  /**
   * Adds a new task to the database.
   *
   * @param args Arguments containing the task description
   */
  add(args: string[]) {
    // Ensure that a description is provided
    if (args.length < 1)
      return console.log(
        "Not enough arguments: You should provide a task description"
      );

    // Add the task to the database
    db.add(args[0]).then(() => {
      console.log("Task added successfully");
    });
  }

  /**
   * Updates an existing task's description.
   *
   * @param args Arguments containing the task ID and the new description
   */
  async update(args: string[]) {
    // Ensure that both task ID and description are provided
    if (args.length < 2) {
      if (!args[0])
        return console.log(
          "Not enough arguments: You should provide a task id"
        );
      if (!args[1])
        return console.log(
          "Not enough arguments: You should provide a task description"
        );
    }

    // Find the task by ID
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // Update the task description
    task.description = args[1];
    db.update(task)
      .then(() => {
        console.log("Task updated successfully");
      })
      .catch((err) => {
        console.error("An error occurred while updating the task", err);
      });
  }

  /**
   * Deletes a task from the database.
   *
   * @param args Arguments containing the task ID to be deleted
   */
  async delete(args: string[]) {
    // Ensure that a task ID is provided
    if (args.length < 1)
      return console.log("Not enough arguments: You should provide a task id");

    // Find the task by ID
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // Delete the task from the database
    db.deleteOne(parseInt(args[0]))
      .then(() => {
        console.log("Task deleted successfully");
      })
      .catch((err) => {
        console.error("An error occurred while deleting the task", err);
      });
  }

  /**
   * Lists tasks from the database.
   * Optionally filters tasks by status (done, in-progress, todo).
   *
   * @param args Arguments containing an optional status filter
   */
  async list(args: string[]) {
    const tasks = await db.getDbData();
    let taskToDisplay = tasks;

    // If a status filter is provided, filter tasks by status
    if (args.length > 0) {
      if (!["done", "in-progress", "todo"].includes(args[0])) {
        console.log('The status should be: "in-progress", "todo", "done"');
        return;
      }
      taskToDisplay = tasks.filter((t) => t.status === args[0]);
    }

    // Display the tasks using the TaskFormat class
    taskFormat.listTasks(taskToDisplay);
  }

  /**
   * Helper function for using the CLI.
   * Displays information on available commands or command-specific help.
   *
   * @param args Optional command to get help for (default shows help for all commands)
   */
  async help(args?: string[]) {
    if (args && args[0]) return TaskManagerHelper.getHelp(args[0]);
    [
      "add",
      "update",
      "delete",
      "mark-in-progress",
      "mark-done",
      "list",
      "--help",
    ].forEach((c) => {
      TaskManagerHelper.getHelp(c);
      console.log();
    });
  }

  /**
   * Marks a task as in-progress.
   *
   * @param args Arguments containing the task ID to be marked as in-progress
   */
  async markInProgress(args: string[]) {
    // Ensure that a task ID is provided
    if (args.length < 1)
      return console.log("Not enough arguments: You should provide a task id");

    // Find the task by ID
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // Update the task status to "in-progress"
    task.status = "in-progress";
    db.update(task)
      .then(() => {
        console.log("Task marked as in-progress successfully");
      })
      .catch((err) => {
        console.error("An error occurred while updating the task", err);
      });
  }

  /**
   * Marks a task as done.
   *
   * @param args Arguments containing the task ID to be marked as done
   */
  async markDone(args: string[]) {
    // Ensure that a task ID is provided
    if (args.length < 1)
      return console.log("Not enough arguments: You should provide a task id");

    // Find the task by ID
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // Update the task status to "done"
    task.status = "done";
    db.update(task)
      .then(() => {
        console.log("Task marked as done successfully");
      })
      .catch((err) => {
        console.error("An error occurred while updating the task", err);
      });
  }
}

/**
 * Represents a task with properties like id, description, status, and timestamps.
 */
export class Task {
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Constructor to initialize a new task object.
   *
   * @param id The task ID
   * @param description The task description
   * @param status The task status (e.g., "todo", "in-progress", "done")
   * @param createdAt The task creation date
   * @param updatedAt The task last updated date
   */
  constructor(
    id: number,
    description: string,
    status: Status,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

import { Db } from "./db.service";
import { TaskFormat } from "./utils/task-format";

const db = new Db();
const taskFormat = new TaskFormat();

export class TaskManager {
  comands: Record<string, Function>;
  // db: Db;
  constructor(env: "dev" | "prod" = "prod") {
    db.setEnv(env);
    this.comands = {
      add: this.add,
      update: this.update,
      delete: this.delete,
      "mark-in-progress": this.markInProgress,
      "mark-done": this.markDone,
      list: this.list,
    };
  }

  router(args: string[]) {
    const comand = args[0];

    if (!this.comands[comand]) {
      return console.log("This comand does not exist.");
    }
    return this.comands[comand](args.slice(1));
  }

  add(args: string[]) {
    if (args.length < 1)
      return console.log(
        "No enought arguments: You should provide a task description"
      );
    db.add(args[0]).then(() => {
      console.log("Task added successfully");
    });
  }

  async update(args: string[]) {
    if (args.length < 2) {
      // check if the task id is provided
      if (!args[0])
        return console.log(
          "No enought arguments: You should provide a task id"
        );

      // check if the description is provided
      if (!args[1])
        return console.log(
          "No enought arguments: You should provide a task id"
        );
    }

    // check existence
    const task = await db.findTask(parseInt(args[0]));

    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // update the task
    task.description = args[1];
    db.update(task)
      .then(() => {
        console.log("Task updated successfully");
      })
      .catch((err) => {
        console.error("An error occured while updating the task", err);
      });
  }

  async delete(args: string[]) {
    // check if the Id is provided
    if (args.length < 1)
      return console.log("No enought arguments: You should provide a task id");

    // check if task exist
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    db.deleteOne(parseInt(args[0]))
      .then(() => {
        console.log("Task deleted successfully");
      })
      .catch((err) => {
        console.error("An error occured while deleting the task", err);
      });
  }

  async list() {
    const tasks = await db.getDbData();
    taskFormat.displayHeader();
    taskFormat.displaySeparator();
    tasks.forEach((t) => {
      taskFormat.printSingleTask(t);
    });
  }

  async markInProgress(args: string[]) {
    // check if the Id is provided
    if (args.length < 1)
      return console.log("No enought arguments: You should provide a task id");

    // check if task exist
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // update the task
    task.status = "in-progress";
    db.update(task)
      .then(() => {
        console.log("Task marked in-progress successfully");
      })
      .catch((err) => {
        console.error("An error occured while updating the task", err);
      });
  }

  async markDone(args: string[]) {
    // check if the Id is provided
    if (args.length < 1)
      return console.log("No enought arguments: You should provide a task id");

    // check if task exist
    const task = await db.findTask(parseInt(args[0]));
    if (!task) return console.log(`Task with id ${args[0]} not found.`);

    // update the task
    task.status = "done";
    db.update(task)
      .then(() => {
        console.log("Task marked done successfully");
      })
      .catch((err) => {
        console.error("An error occured while updating the task", err);
      });
  }
}

export class Task {
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
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

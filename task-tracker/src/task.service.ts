import { Db } from "./db.service";

const db = new Db("prod");

export class TaskManager {
  comands: Record<string, Function>;
  // db: Db;
  constructor(env: "dev" | "prod" = "dev") {
    // this.db = new Db(env);
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
    // console.log("Feature not yet implemented");
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
    db.update(parseInt(args[0]), args[1]).then(() => {
      console.log("Task updated successfully");
    });
    // console.log("Feature not yet implemented");
  }

  delete(args: string[]) {
    console.log("Feature not yet implemented");
  }

  markInProgress(args: string[]) {
    console.log("Feature not yet implemented");
  }

  markDone(args: string[]) {
    console.log("Feature not yet implemented");
  }

  list(args: string[]) {
    console.log("Feature not yet implemented");
  }
}

// class comand {
//   constructor(argsNb, callFn) {
//     this.argsNb = argsNb;
//     this.callFn = callFn;
//   }

//   execute(args) {
//     if (args.lenght > this.argsNb)
//       throw new Error("You provided more arguments than expected");
//     this.callFn(args);
//   }
// }

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

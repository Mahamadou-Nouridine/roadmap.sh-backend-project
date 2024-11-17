const { readFile, writeFile } = require("node:fs/promises");
import { FILE_PATH, taskStatus } from "./constants";
import { Db } from "./db.service";

const db = new Db();

export class TaskManager {
  comands: Record<string, Function>;
  constructor() {
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
    if (!(args && args[0]))
      return console.log("You should provide a task description");
    return db.add(args[0]);
    // console.log("Feature not yet implemented");
  }

  update(args: string[]) {
    console.log("Feature not yet implemented");
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

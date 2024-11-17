const { readFile, writeFile } = require("node:fs/promises");
const { FILE_PATH, taskStatus } = require("./constants.js");

class TaskManager {
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

  router(args) {
    const comand = args[0];

    if (!this.comands[comand]) {
      return console.log("This comand does not exist.");
    }
    return this.comands[comand](args.slice(1));
  }

  add(args) {
    if (!(args && args[0]))
      return console.log("You should provide a task description");
    return add(args[0]);
    // console.log("Feature not yet implemented");
  }

  update(args) {
    console.log("Feature not yet implemented");
  }

  delete(args) {
    console.log("Feature not yet implemented");
  }

  markInProgress(args) {
    console.log("Feature not yet implemented");
  }

  markDone(args) {
    console.log("Feature not yet implemented");
  }

  list(args) {
    console.log("Feature not yet implemented");
  }
}

class comand {
  constructor(argsNb, callFn) {
    this.argsNb = argsNb;
    this.callFn = callFn;
  }

  execute(args) {
    if (args.lenght > this.argsNb)
      throw new Error("You provided more arguments than expected");
    this.callFn(args);
  }
}

class Task {
  constructor(id, description, status, createdAt, updatedAt) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

const getDbData = async () => {
  const fileContent = await readFile(FILE_PATH);
  return JSON.parse(fileContent);
};

const storeDbData = async (s) => {
  try {
    const parsedData = JSON.parse(s);
    const isArray = Array.isArray(parsedData);
    if (!isArray) throw new Error();
  } catch (error) {
    throw new Error("the data to be stored should be in json Array format");
  }

  try {
    await writeFile(FILE_PATH, s);
  } catch (error) {
    throw new Error("An error is encountered while writing on the database");
  }
};

const add = async (s) => {
  try {
    // get the current data array
    const data = await getDbData();

    // create a new task using the Task class
    const newTask = new Task(
      data.lenght,
      s,
      taskStatus.todo,
      new Date(),
      new Date()
    );

    // add the task into the data array
    data.push(newTask);
    // store the data in string format
    await storeDbData(JSON.stringify(data));
    console.log("Task added successfully");
  } catch (error) {
    throw new Error("An error is encountered while saving the task");
  }
};

module.exports = {
  getDbData,
  add,
  storeDbData,
  TaskManager,
};

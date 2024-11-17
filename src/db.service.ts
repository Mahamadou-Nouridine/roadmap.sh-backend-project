import { readFile, writeFile } from "node:fs/promises";
import { FILE_PATH, taskStatus } from "./constants";
import { Task } from "./task.service";

export class Db {
  getDbData = async () => {
    const fileContent = await readFile(FILE_PATH);
    return JSON.parse(fileContent.toString()) as Task[];
  };

  add = async (description: string) => {
    try {
      // get the current data array
      const data = await this.getDbData();

      // create a new task using the Task class
      const newTask = new Task(
        data.length,
        description,
        taskStatus.todo,
        new Date(),
        new Date()
      );

      // add the task into the data array
      data.push(newTask);
      // store the data in string format
      await this.updateDb(data);
      console.log("Task added successfully");
    } catch (error) {
      throw new Error("An error is encountered while saving the task");
    }
  };

  private updateDb = async (taskList: Task[]) => {
    try {
      await writeFile(FILE_PATH, JSON.stringify(taskList));
    } catch (error) {
      throw new Error("An error is encountered while writing on the database");
    }
  };
}

import { readFile, writeFile } from "node:fs/promises";
import { DB_PATH, TEST_DB_PATH, taskStatus } from "./constants";
import { Task } from "./task.service";
import { existsSync, writeFile as writeSync } from "node:fs";

export class Db {
  env: "dev" | "prod";
  logger: any;
  constructor(env: "dev" | "prod" = "dev") {
    this.env = env;
    this.logger =
      env == "prod"
        ? {
            log(...args: any) {},
            warn(...args: any) {},
            error(...args: any) {},
          }
        : console;

    this.logger.log("Initialized a db");
    this.ensureDbExistence(env);
  }

  async findTask(id: number) {
    return (await this.getDbData()).find((d) => d.id == id);
  }
  add = async (description: string) => {
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
  };

  async update(id: number, description: string) {
    const data = (await this.getDbData()).map((task) => {
      if (task.id != id) return task;
      task.description = description;
      task.updatedAt = new Date();
      return task;
    });
    return this.updateDb(data);
  }

  private get dbPath() {
    if (this.env == "dev") return TEST_DB_PATH;
    return DB_PATH;
  }
  getDbData = async () => {
    const fileContent = await readFile(this.dbPath);
    this.logger.log({ fileContent: fileContent.toString() });
    const data = JSON.parse(fileContent.toString()) as Task[];
    return data;
  };

  private updateDb = async (taskList: Task[]) => {
    await writeFile(this.dbPath, JSON.stringify(taskList));
  };

  private async ensureDbExistence(env: "dev" | "prod") {
    const dbPath = this.dbPath;
    console.log();

    // check the existence of json db file
    const existingDb = existsSync(dbPath);

    // create the file with an umpty array if it does not exist
    if (!existingDb)
      writeSync(dbPath, "[]", (err: any) => {
        if (err) {
          console.log("An error occured while setting up the database", err);
        }
      });
    // Make sure that the db format is valid
    else {
      this.logger.log("Db exist");

      try {
        const fileContent = await readFile(this.dbPath);
        const data = JSON.parse(fileContent.toString());
        if (!Array.isArray(data)) {
          writeSync(dbPath, "[]", (err) => {
            if (err) {
              console.log(
                "An error occured while setting up the database",
                err
              );
            }
          });
        }
      } catch (error) {
        writeSync(dbPath, "[]", (err) => {
          if (err) {
            console.log("An error occured while setting up the database", err);
          }
        });
      }
    }
  }
}

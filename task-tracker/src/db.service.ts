import { readFile, writeFile } from "node:fs/promises";
import { DB_PATH, TEST_DB_PATH, taskStatus } from "./constants";
import { Task } from "./task.service";
import { existsSync, writeFile as writeSync } from "node:fs";

/**
 * Database class for managing tasks in a local JSON file.
 * Provides functionality for adding, updating, deleting, and finding tasks.
 */
export class Db {
  /** The environment (dev or prod) for the database configuration. */
  env: "dev" | "prod";

  /** Logger to handle logging based on the environment. */
  logger: any;

  /**
   * Creates an instance of the Db class.
   * @param {("dev" | "prod")} env - The environment for the database ("dev" or "prod").
   */
  constructor(env: "dev" | "prod" = "prod") {
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

  /**
   * Set the environment for the database.
   * @param {("dev" | "prod")} env - The environment to set ("dev" or "prod").
   */
  setEnv(env: "dev" | "prod") {
    this.env = env;
    this.ensureDbExistence(env);
  }

  /**
   * Find a task by its ID.
   * @param {number} id - The ID of the task to find.
   * @returns {Promise<Task | undefined>} The task object if found, otherwise undefined.
   */
  async findTask(id: number): Promise<Task | undefined> {
    return (await this.getDbData()).find((d) => d.id == id);
  }

  /**
   * Delete a task by its ID.
   * @param {number} id - The ID of the task to delete.
   * @returns {Promise<void>} A promise that resolves once the task is deleted.
   */
  async deleteOne(id: number): Promise<void> {
    const data = await this.getDbData();
    return this.updateDb(data.filter((t) => t.id !== id));
  }

  /**
   * Add a new task.
   * @param {string} description - The description of the new task.
   * @returns {Promise<void>} A promise that resolves once the task is added.
   */
  add = async (description: string): Promise<void> => {
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

  /**
   * Update an existing task.
   * @param {Task} task - The task to update.
   * @returns {Promise<void>} A promise that resolves once the task is updated.
   */
  async update(task: Task): Promise<void> {
    const data = (await this.getDbData()).map((t) => {
      if (t.id != task.id) return t;
      return task;
    });
    return this.updateDb(data);
  }

  /**
   * Get the path to the database file based on the environment.
   * @private
   * @returns {string} The path to the database file.
   */
  private get dbPath(): string {
    if (this.env == "dev") return TEST_DB_PATH;
    return DB_PATH;
  }

  /**
   * Get the database data from the file.
   * @returns {Promise<Task[]>} A promise that resolves with the parsed task data.
   */
  getDbData = async (): Promise<Task[]> => {
    const fileContent = await readFile(this.dbPath);
    this.logger.log({ fileContent: fileContent.toString() });
    const data = JSON.parse(fileContent.toString()) as Task[];
    return data;
  };

  /**
   * Update the database with a new task list.
   * @private
   * @param {Task[]} taskList - The list of tasks to save to the database.
   * @returns {Promise<void>} A promise that resolves once the database is updated.
   */
  private updateDb = async (taskList: Task[]) => {
    await writeFile(this.dbPath, JSON.stringify(taskList));
  };

  /**
   * Ensure the existence of the database file and validate its format.
   * If the file does not exist, it will be created with an empty array.
   * If the file exists but contains invalid data, it will be reset to an empty array.
   * @private
   * @param {("dev" | "prod")} env - The environment for which to check the database.
   * @returns {Promise<void>} A promise that resolves once the database existence and format is ensured.
   */
  private async ensureDbExistence(env: "dev" | "prod") {
    const dbPath = this.dbPath;
    console.log();

    // check the existence of json db file
    const existingDb = existsSync(dbPath);

    // create the file with an empty array if it does not exist
    if (!existingDb)
      writeSync(dbPath, "[]", (err: any) => {
        if (err) {
          console.log("An error occurred while setting up the database", err);
        }
      });
    // Make sure that the db format is valid
    else {
      this.logger.log("Db exists");

      try {
        const fileContent = await readFile(this.dbPath);
        const data = JSON.parse(fileContent.toString());
        if (!Array.isArray(data)) {
          writeSync(dbPath, "[]", (err) => {
            if (err) {
              console.log(
                "An error occurred while setting up the database",
                err
              );
            }
          });
        }
      } catch (error) {
        writeSync(dbPath, "[]", (err) => {
          if (err) {
            console.log("An error occurred while setting up the database", err);
          }
        });
      }
    }
  }
}

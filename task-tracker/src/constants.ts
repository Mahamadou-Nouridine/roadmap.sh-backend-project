import * as path from "node:path";

/**
 * Enum representing the possible statuses of a task.
 * @readonly
 * @enum {string}
 */
export enum taskStatus {
  /** Task is not started yet */
  todo = "todo",
  /** Task is currently being worked on */
  inProgress = "in-progress",
  /** Task is completed */
  done = "done",
}

/**
 * The file path for the main database.
 * @constant
 * @type {string}
 * @default
 */
export const DB_PATH = path.join(__dirname, "db.json");

/**
 * The file path for the test database.
 * @constant
 * @type {string}
 * @default
 */
export const TEST_DB_PATH = path.join(__dirname, "db.test.json");

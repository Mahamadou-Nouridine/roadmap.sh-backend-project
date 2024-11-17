import * as path from "node:path";

export enum taskStatus {
  todo = "todo",
  inProgress = "in-progress",
  done = "done",
}

export const DB_PATH = path.join(__dirname, "db.json");
export const TEST_DB_PATH = path.join(__dirname, "db.test.json");

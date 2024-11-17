import * as path from "node:path";

export enum taskStatus {
  todo = "todo",
  inProgress = "in-progress",
  done = "done",
}

export const FILE_PATH = path.join(__dirname, "db.json");

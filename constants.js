const path = require("node:path");

const taskStatus = {
  todo: "todo",
  inProgress: "in-progress",
  done: "done",
};

const FILE_PATH = path.join(__dirname, "db.json");

module.exports = { FILE_PATH, taskStatus };

#!/usr/bin/env node
const { getDbData, storeDbData, add, TaskManager } = require("./features.js");

// getDbData().then((data) => {
//   console.log({ data });
// });

// storeDbData('[{"data": 12}]');

// add("Do my homework")
const taskManager = new TaskManager();

taskManager.add()

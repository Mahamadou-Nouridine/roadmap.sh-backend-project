#!/usr/bin/env node
import { TaskManager } from "./task.service";

// Get the Params Array
const params = process.argv.slice(2);

new TaskManager("prod").router(params);

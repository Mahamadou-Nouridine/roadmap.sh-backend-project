#!/usr/bin/env node

import { existsSync, writeFile } from "node:fs";
import { FILE_PATH } from "./constants";
import { TaskManager } from "./task.service";
import { Db } from "./db.service";

const db = new Db();

// check the existence of json db file
const existingDb = existsSync(FILE_PATH);

// create the file with an umpty array if it does not exist
if (!existingDb)
  writeFile(FILE_PATH, "[]", (err: any) => {
    if (err) {
      console.log("An error occured while setting up the database", err);
    }
  });
// Make sure that the db format is valid
else {
  db.getDbData()
    .then((data) => {
      if (!Array.isArray(data)) {
        writeFile(FILE_PATH, "[]", (err) => {
          if (err) {
            console.log("An error occured while setting up the database", err);
          }
        });
      }
    })
    .catch(() => {
      writeFile(FILE_PATH, "[]", (err) => {
        if (err) {
          console.log("An error occured while setting up the database", err);
        }
      });
    });
}

// Get the Params Array
const params = process.argv.slice(2);

new TaskManager().router(params);

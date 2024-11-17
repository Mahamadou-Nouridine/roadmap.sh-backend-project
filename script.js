#!/usr/bin/env node
const process = require("node:process");
const fs = require("node:fs");
const path = require("node:path");
const { FILE_PATH } = require("./constants");
const { TaskManager, getDbData } = require("./features");

// check the existence of json db file
const existingDb = fs.existsSync(FILE_PATH);

// create the file with an umpty array if it does not exist
if (!existingDb)
  fs.writeFile(FILE_PATH, "[]", (err) => {
    if (err) {
      console.log("An error occured while setting up the database", err);
    }
  });
// Make sure that the db format is valid
else {
  getDbData()
    .then((data) => {
      if (!Array.isArray(data)) {
        fs.writeFile(FILE_PATH, "[]", (err) => {
          if (err) {
            console.log("An error occured while setting up the database", err);
          }
        });
      }
    })
    .catch(() => {
      fs.writeFile(FILE_PATH, "[]", (err) => {
        if (err) {
          console.log("An error occured while setting up the database", err);
        }
      });
    });
}

// Get the Params Array
const params = process.argv.slice(2);

new TaskManager().router(params);

#!/usr/bin/env node

import { GitHubEventFormatters } from "./event-formatter";

const getEvents = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`
    );

    if (!response.ok) return console.log("An unexpected error occured");

    return (await response.json()) as GitHubEvent[];
  } catch (error) {
    console.log("An unexpected error occured");
  }
};

const disPlay = async (username: string) => {
  // loader
  const P = ["\\", "|", "/", "-"];
  let x = 0;
  const loader = setInterval(() => {
    process.stdout.write(`\r${P[x++]} fetching from github`);
    x %= P.length;
  }, 250);

  const data = await getEvents(username);

  // stop the loader
  if (data) clearInterval(loader);

  console.log();
  console.log("====================================");
  console.log(`GitHub Activity for: ${username}`);
  console.log("====================================");
  console.log();
  if (data) {
    data.forEach((event) => {
      const message = GitHubEventFormatters.format(event);
      const displayingMessage = `${message}, on \x1b[32m${new Date(
        event.created_at
      ).toLocaleString()}\x1b[37m`;
      console.log(displayingMessage);
    });
  }
};

const params = process.argv.slice(2);
disPlay(params[0]);

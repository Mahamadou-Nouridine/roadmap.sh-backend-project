#!/usr/bin/env node

import { GitHubEventFormatters } from "./event-formatter";

const getEvents = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`
    );

    if (!response.ok)
      return console.log("Une erreur innatendue s'est produite");

    return (await response.json()) as GitHubEvent[];
  } catch (error) {
    console.log("Une erreur innatendue s'est produite");
  }
};

const disPlay = async (username: string) => {
  const data = await getEvents(username);
  if (data) {
    data.forEach((event) => {
      const message = GitHubEventFormatters.format(event);
      console.log(message);
    });
  }
};

const params = process.argv.slice(2);
disPlay(params[0])

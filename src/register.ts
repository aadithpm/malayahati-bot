/**
 * This file is meant to be run from the command line, and is not used by the
 * application server.  Run as part of CI/CD in Github Actions
 */

import { commands } from "./commands.js";
import dotenv from "dotenv";
import process from "node:process";
import fetch from "node-fetch";

dotenv.config({ path: "../.env" });

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APP_ID;

if (!token) {
  throw new Error("DISCORD_TOKEN is required.");
}
if (!applicationId) {
  throw new Error("DISCORD_APP_ID is required.");
}

/**
 * Register all commands globally.  This can take o(minutes), so wait until
 * you're sure these are the commands you want.
 */
const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;

console.log("Sending commands request..");
const response = await fetch(url, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  },
  method: "PUT",
  body: JSON.stringify(commands),
});

if (response.ok) {
  console.log("Registered all commands");
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
} else {
  let errorText = `Error registering commands\n${response.url}: ${response.status} ${response.statusText}`;
  try {
    const error = await response.text();
    if (error) {
      errorText = `${errorText}\n${error}`;
    }
  } catch (err) {
    console.error("Error reading body from request:", err);
  }
  console.error(errorText);
}

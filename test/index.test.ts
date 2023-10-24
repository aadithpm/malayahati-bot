import { expect } from "chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import {
  InteractionResponseType,
  InteractionType,
  InteractionResponseFlags,
} from "discord-interactions";
import sinon from "sinon";
import { Env, default as bot } from "../src/index";

const TEST_ENV_VAR = {
  DISCORD_TOKEN: "1234",
  DISCORD_APP_ID: "1a2b3c",
  DISCORD_PUBLIC_KEY: "abcd",
};

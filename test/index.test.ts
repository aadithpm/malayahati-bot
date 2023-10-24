import { expect, test } from "vitest";

const TEST_ENV_VAR = {
  DISCORD_TOKEN: "1234",
  DISCORD_APP_ID: "1a2b3c",
  DISCORD_PUBLIC_KEY: "abcd",
};

test("canary test", () => {
  expect(true).toBe(true);
});

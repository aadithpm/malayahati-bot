import { verifyKey } from "discord-interactions";
import router from "./router";

export interface EnvVar {
  // stored in Workers env vars
  DISCORD_TOKEN: string;
  DISCORD_APP_ID: string;
  DISCORD_PUBLIC_KEY: string;
}

export default {
  async fetch(request: Request, env: EnvVar) {
    if (request.method === "POST") {
      // Using the incoming headers, verify this request actually came from discord.
      const signature = request.headers.get("X-Signature-Ed25519") ?? "";
      const timestamp = request.headers.get("X-Signature-Timestamp") ?? "";
      const body = await request.clone().arrayBuffer();
      const isValidRequest = verifyKey(
        body,
        signature,
        timestamp,
        env.DISCORD_PUBLIC_KEY
      );
      if (!isValidRequest) {
        return new Response("Bad request signature.", { status: 401 });
      }
      await router.handle(request, env);
    }
  },
};

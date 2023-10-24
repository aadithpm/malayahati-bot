import router from "./router";

export interface Env {
  // stored in Workers env vars
  DISCORD_TOKEN: string;
  DISCORD_APP_ID: string;
  DISCORD_PUBLIC_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return router.handle(request, env);
  },
};

import { Router } from "itty-router";
import { type EnvVar } from ".";
import { InteractionResponseType, InteractionType } from "discord-interactions";

const router = Router();

// base route
router.get("/", (_, env: EnvVar) => {
  return new Response(`listening for bot ${env.DISCORD_APP_ID}`);
});

// base discord route
router.post("/", async (request, env: EnvVar) => {
  const body = await request.json();
  if ((body as any).type?.interaction === InteractionType.PING) {
    return new Response(
      JSON.stringify({
        type: InteractionResponseType.PONG,
      })
    );
  }
});

export default router;

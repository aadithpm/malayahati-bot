import { Router } from "itty-router";
import { type Env } from ".";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { verifyDiscordRequest } from "./discordUtils";

class JsonResponse extends Response {
  constructor(body?: any, init?: ResponseInit) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    super(jsonBody, init);
  }
}

const router = Router();

// base route
router.get("/", (_, env: Env) => {
  return new JsonResponse(`listening for bot ${env.DISCORD_APP_ID}`);
});

// base discord route
router.post("/", async (request: Request, env: Env) => {
  // verify request is from discord
  const verify = await verifyDiscordRequest(request, env);
  if (!verify.isValid) {
    return new JsonResponse({}, { status: 400 });
  }

  const body = await request
    .json()
    .then((j) => j as any)
    .catch((e) => {
      console.log("error: ", e);
    });
  if (body?.type === InteractionType.PING) {
    return new JsonResponse(
      { type: InteractionResponseType.PONG },
      { status: 200 }
    );
  }
  return new JsonResponse({}, { status: 400 });
});

export default router;

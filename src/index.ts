import 'dotenv/config'

export interface EnvVar {
  // stored in Workers env vars
  DISCORD_TOKEN: string
  DISCORD_APP_ID: string
  DISCORD_PUBLIC_KEY: string
}

export default {
  async fetch (request: Request, env: EnvVar) {
    return new Response(`request method: ${request.method} ${env.DISCORD_APP_ID}`)
  }
}

import Redis from "ioredis";

import env from "@/config/env";
import z from "zod";

const cache = new Redis(env.REDIS_URL, {
  db: env.REDIS_DATABASE,
});

// {
//     "password_reset_mode": "code",
//     "waitlist_open": "1",
//     "open": "1",
//     "onboarding": "1",
//     "export": "0",
//     "updated": "2024-09-24T20:35:22.024915Z"
// }

const appConfigSchema = z.object({
  password_reset_mode: z.enum(["code", "link"]),
  waitlist_open: z.enum(["1", "0"]),
  open: z.number(),
  onboarding: z.number(),
  export: z.number().optional(),
  updated: z.date().optional(),
});

export type AppConfigurationSchema = z.infer<typeof appConfigSchema>;

export default cache;

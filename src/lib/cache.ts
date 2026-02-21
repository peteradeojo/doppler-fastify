import Redis from "ioredis";

import env from "@/config/env";

const cache = new Redis(env.REDIS_URL, {
    db: env.REDIS_DATABASE,
});

export default cache;
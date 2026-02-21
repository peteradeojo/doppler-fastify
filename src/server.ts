import Fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import app from "@/app";
import env from "@/config/env";

const server = Fastify({ logger: env.APP_ENV !== "production" });

server.register(app);

export default server.withTypeProvider<ZodTypeProvider>();
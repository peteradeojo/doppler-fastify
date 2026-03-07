import { FastifyPluginAsync } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import env from "@/config/env";
import { routes } from "@/routes";
import setupPassport from "@/lib/passport";

import passport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

const app: FastifyPluginAsync = async (fastify) => {
  setupPassport(passport);

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(fastifySecureSession, {
    key: Buffer.from(env.SESSION_SECRET_KEY, "hex"),
  });

  await fastify.register(passport.initialize());
  await fastify.register(passport.secureSession());
  await fastify.register(helmet);
  await fastify.register(cors, {
    origin: env.ALLOWED_ORIGINS.split(","),
    methods: '*'
  });

  await fastify.register(routes, { prefix: "v1" });
};

export default app;

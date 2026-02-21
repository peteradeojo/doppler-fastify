// import { routes } from "@/routes";
// import fastify from "fastify";
// import pino from "pino";
// import passport from "@fastify/passport";
// import fastifySecureSession from "@fastify/secure-session";
// import env from "@/config/env";

// import cors from "@fastify/cors";
// import helmet from "@fastify/helmet";
// import {
//   serializerCompiler,
//   validatorCompiler,
//   ZodTypeProvider,
// } from "fastify-type-provider-zod";
// import setupPassport from "@/lib/passport";

// const server = fastify({ logger: env.APP_ENV != "production" });

// setupPassport(passport);

// server.register(fastifySecureSession, {
//     key: Buffer.from(env.SESSION_SECRET_KEY, 'hex'),
// });

// server.setValidatorCompiler(validatorCompiler);
// server.setSerializerCompiler(serializerCompiler);

// server.register(passport.initialize());
// server.register(passport.secureSession());
// server.register(helmet);
// server.register(cors, {
//   origin: env.ALLOWED_ORIGINS.split(","),
// });

// server.register(routes, {
//   prefix: "v1",
// });

// export default server.withTypeProvider<ZodTypeProvider>();

// export const logger = pino({ name: "Doppler" });

import Fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import app from "@/app";
import env from "@/config/env";

const server = Fastify({ logger: env.APP_ENV !== "production" });

server.register(app);

export default server.withTypeProvider<ZodTypeProvider>();
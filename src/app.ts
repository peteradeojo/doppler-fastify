// import { FastifyPluginAsync } from "fastify";
// import {
//   ZodTypeProvider,
//   serializerCompiler,
//   validatorCompiler,
// } from "fastify-type-provider-zod";

// const passport = require("@fastify/passport");
// const fastifySecureSession = require("@fastify/secure-session");
// import cors from "@fastify/cors";
// import helmet from "@fastify/helmet";
// import { routes } from "@/routes";
// import setupPassport from "@/lib/passport";
// import env from "@/config/env";

// const app: FastifyPluginAsync = async (fastify) => {
//   setupPassport(passport);

//   fastify.setValidatorCompiler(validatorCompiler);
//   fastify.setSerializerCompiler(serializerCompiler);

//   fastify.register(fastifySecureSession, {
//     key: Buffer.from(env.SESSION_SECRET_KEY, "hex"),
//   });

//   fastify.register(passport.initialize());
//   fastify.register(passport.secureSession());
//   fastify.register(helmet);
//   fastify.register(cors, {
//     origin: env.ALLOWED_ORIGINS.split(","),
//   });

//   fastify.register(routes, { prefix: "v1" });
// };

// module.exports = app;
// module.exports.default = app;

// export default app;

// src/app.ts - no imports from server.ts
import { FastifyPluginAsync } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import env from "@/config/env";
import { routes } from "@/routes";
import setupPassport from "@/lib/passport";

// Use require for CJS compat
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const passport = require("@fastify/passport");
const fastifySecureSession = require("@fastify/secure-session");
const cors = require("@fastify/cors");
const helmet = require("@fastify/helmet");

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
  });

  await fastify.register(routes, { prefix: "v1" });
};

export default app;
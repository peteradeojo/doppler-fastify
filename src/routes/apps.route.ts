import AppController from "@/controllers/app.controller";
import { createAppSchema } from "@/schema/app.schema";
import passport from "@fastify/passport";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.addHook(
    "preHandler",
    passport.authenticate("jwt", { session: false }),
  );

  server.get("/", AppController.index);

  server.post(
    "/",
    {
      schema: { body: createAppSchema },
    },
    AppController.create,
  );
};

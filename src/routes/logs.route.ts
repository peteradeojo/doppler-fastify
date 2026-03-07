import LogController from "@/controllers/logs.controller";
import passport from "@fastify/passport";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import z from "zod";

export default async function logRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
) {
  server.addHook(
    "preHandler",
    passport.authenticate("jwt", { session: false }),
  );

  server.get(
    "/:token",
    {
      schema: {
        params: z.object({
          token: z.uuid(),
        }),
        querystring: z.object({
            cursor: z.string().nullable(),
            count: z.coerce.number().default(20),
        }),
      },
    },
    LogController.getAppLogs,
  );

  server.delete("/:token", {
    schema: {
      params: z.object({
        token: z.uuid(),
      }),
    }
  }, LogController.deleteLogs);
}

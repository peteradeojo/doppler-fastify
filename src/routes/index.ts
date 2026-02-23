import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  RouteOptions,
} from "fastify";
import { prisma } from "@/lib/prisma";
import { authRoutes } from "@/routes/auth";
import appsRoute from "@/routes/apps.route";
import passport from "@fastify/passport";
import z from "zod";
import { handleServiceResponse, logger, ServiceResponse } from "@/lib/util";
import cache from "@/lib/cache";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get(
    "/metrics",
    {
      schema: {
        querystring: z.object({
          from: z.string().optional(),
          to: z.string().optional(),
        }),
      },
      preHandler: passport.authenticate("jwt", { session: false }),
    },
    async (request: FastifyRequest, reply) => {
      const result = await prisma.source.findMany({
        where: {
          userId: request.user!.id,
        },
      });

      const data = result.map((app) => ({ app, data: [] }));
      return reply.status(200).send(data);
    },
  );

  fastify.get("/config", async (request, reply) => {
    try {
      let c = await cache.get("app_config");
      if (!c) {
        c = JSON.stringify({
          password_reset_mode: "code",
          waitlist_open: "1",
          open: "1",
          onboarding: "1",
          export: "0",
          updated: new Date(),
        });
        await cache.set("app_config", c);
      }

      const res = ServiceResponse.success(JSON.parse(c));
      return handleServiceResponse(reply, res);
    } catch (error) {
      logger.error(error);
      return handleServiceResponse(
        reply,
        ServiceResponse.error("Unable to fetch config", error),
      );
    }
  });

  fastify.register(authRoutes, {
    prefix: "auth",
  });

  fastify.register(appsRoute, {
    prefix: "apps",
  });

  // fastify.setErrorHandler((error, request, reply) => {});
}

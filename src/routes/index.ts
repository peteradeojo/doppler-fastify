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
import { handleServiceResponse, ServiceResponse } from "@/lib/util";

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

  fastify.register(authRoutes, {
    prefix: "auth",
  });

  fastify.register(appsRoute, {
    prefix: "apps",
  });

  // fastify.setErrorHandler((error, request, reply) => {});
}

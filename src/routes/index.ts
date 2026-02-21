import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import { prisma } from "@/lib/prisma";
import { authRoutes } from "@/routes/auth";
import appsRoute from "@/routes/apps.route";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/", async (request, reply) => {
    const users = await prisma.user.findMany({});
    return { hello: "world", users };
  });

  fastify.register(authRoutes, {
    prefix: "auth",
  });

  fastify.register(appsRoute, {
    prefix: "apps",
  });

  // fastify.setErrorHandler((error, request, reply) => {});
}

import { RequestWithBody } from "@/global";
import { prisma } from "@/lib/prisma";
import { handleServiceResponse, ServiceResponse } from "@/lib/util";
import { CreateAppSchema } from "@/schema/app.schema";
import AppService from "@/services/app.service";
import { FastifyReply, FastifyRequest } from "fastify";

export default class AppController {
  static async index(request: FastifyRequest, reply: FastifyReply) {
    const data = await new AppService().getApps(request.user!.id);
    return handleServiceResponse(reply, data);
  }

  static async create(
    request: RequestWithBody<CreateAppSchema>,
    reply: FastifyReply,
  ) {
    const app = await new AppService().createApp(request.user!, request.body);
    return handleServiceResponse(reply, app);
  }

  static async show(
    request: RequestWithBody<null, { id: number }, null>,
    reply: FastifyReply,
  ) {
    const app = await prisma.source.findFirst({
      where: { id: Number(request.params.id) },
    });

    return handleServiceResponse(reply, ServiceResponse.success(app));
  }
}

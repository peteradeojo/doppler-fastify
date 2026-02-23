import { RequestWithBody } from "@/global";
import { LogQuerySchema } from "@/schema/logs.schema";
import LogService from "@/services/logs.service";
import { FastifyReply } from "fastify";

export default class LogController {
  static async getAppLogs(
    request: RequestWithBody<null, { token: string }, LogQuerySchema>,
    reply: FastifyReply,
  ) {
    const logs = await new LogService().getLogs(
      request.params.token,
      request.query,
    );
  }
}

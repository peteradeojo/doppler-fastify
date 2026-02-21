import { FastifyReply } from "fastify";
import pino from "pino";

export const handleServiceResponse = <T extends Object = any>(
  reply: FastifyReply,
  data: ServiceResponse<T>,
) => {
  return reply.status(data.statusCode ?? 200).send(data.body);
};

export const logger = pino({ name: "Doppler" });
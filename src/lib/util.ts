import { FastifyReply } from "fastify";

export const handleServiceResponse = <T extends Object = any>(
  reply: FastifyReply,
  data: ServiceResponse<T>,
) => {
  return reply.status(data.statusCode ?? 200).send(data.body);
};

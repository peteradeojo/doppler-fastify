import { FastifyRequest } from "fastify";
import { UserModel } from "generated/prisma/models";
interface IServiceResponse<T extends Object = any> {
  statusCode?: number;
  body: { message: string; data?: T };
}

type User = UserModel;
type SafeUser = Omit<UserModel, "password">;

type RequestWithBody<body = null, params = null, query = null> = FastifyRequest<{Body: body, Params: params, Querystring: query}>
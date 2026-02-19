import { FastifyRequest } from "fastify";
import { UserModel } from "../../generated/prisma/models/User";

declare module "fastify" {
  interface PassportUser extends UserModel {}
}

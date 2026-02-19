import { LoginSchema, RegisterSchema } from "@/config/schema/auth.schema";
import { handleServiceResponse } from "@/lib/util";
import { UserService } from "@/services/user.service";
import { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
  static async loginIn(request: FastifyRequest<{Body: LoginSchema}>, reply: FastifyReply) {
    const userService = new UserService();
    const res = await userService.login(request.body);

    return handleServiceResponse(reply, res);
  }

  static async register(request: FastifyRequest<{Body: RegisterSchema}>, reply: FastifyReply) {
    const userService = new UserService();
    const result = await userService.registerUser(request.body);

    return handleServiceResponse(reply, result);
  }

  static async me(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const result = await userService.getUser(request.user!.id);

    return handleServiceResponse(reply, result);
  }
}

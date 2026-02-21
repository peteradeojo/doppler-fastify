import {
  EmailVerificationSchema,
  LoginSchema,
  OnboardingSchema,
  RegisterSchema,
} from "@/schema/auth.schema";
import { RequestWithBody } from "@/global";
import { handleServiceResponse } from "@/lib/util";
import { UserService } from "@/services/user.service";
import { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
  static async loginIn(
    request: FastifyRequest<{ Body: LoginSchema }>,
    reply: FastifyReply,
  ) {
    const userService = new UserService();
    const res = await userService.login(request.body);

    return handleServiceResponse(reply, res);
  }

  static async register(
    request: RequestWithBody<RegisterSchema>,
    reply: FastifyReply,
  ) {
    const userService = new UserService();
    const result = await userService.registerUser(request.body);

    return handleServiceResponse(reply, result);
  }

  static async me(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const result = await userService.getUser(request.user!.id);

    return handleServiceResponse(reply, result);
  }
  static async verifyEmail(
    request: RequestWithBody<EmailVerificationSchema>,
    reply: FastifyReply,
  ) {
    const userService = new UserService();
    const result = await userService.verifyEmail(
      request.user!,
      request.body!.code,
    );

    return handleServiceResponse(reply, result);
  }

  static async collectOnboardingDetails(
    request: RequestWithBody<OnboardingSchema>,
    reply: FastifyReply,
  ) {
    const res = await new UserService().saveUserOnboardingDetails(
      request.user!,
      request.body,
    );

    return handleServiceResponse(reply, res);
  }
}

import {
  emailVerificationSchema,
  loginSchema,
  onboardingSchema,
  registerSchema,
} from "@/schema/auth.schema";
import { AuthController } from "@/controllers/auth.controller";
import passport from "@fastify/passport";
import { FastifyInstance } from "fastify";

export function authRoutes(server: FastifyInstance, options: Object) {
  server.post(
    "/login",
    {
      schema: {
        body: loginSchema,
      },
    },
    AuthController.loginIn,
  );

  server.post(
    "/register",
    {
      schema: {
        body: registerSchema,
      },
    },
    AuthController.register,
  );

  server.register(function (server, opts, done) {
    server.addHook(
      "preHandler",
      passport.authenticate("jwt", { session: false }),
    );

    server.get("/", AuthController.me);

    server.post(
      "/verify-email",
      {
        schema: {
          body: emailVerificationSchema,
        },
      },
      AuthController.verifyEmail,
    );

    server.post(
      "/onboard",
      {
        schema: {
          body: onboardingSchema,
        },
      },
      AuthController.collectOnboardingDetails,
    );

    done();
  });
}

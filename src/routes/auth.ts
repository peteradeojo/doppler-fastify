import { emailVerificationSchema, loginSchema, registerSchema } from "@/config/schema/auth.schema";
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

  server.get(
    "/",
    {
      preHandler: passport.authenticate("jwt", { session: false }),
    },
    AuthController.me,
  );

  server.post(
    "/verify-email",
    {
      preHandler: passport.authenticate("jwt", { session: false }),
      schema: {
        body: emailVerificationSchema,
      }
    },
    AuthController.verifyEmail,
  );
}

import { loginSchema, registerSchema } from "@/config/schema/auth.schema";
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
    "/me",
    {
      preHandler: passport.authenticate("jwt", { session: false }),
    },
    AuthController.me,
  );
}

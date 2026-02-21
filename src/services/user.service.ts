import { prisma } from "@/lib/prisma";
import { sign } from "jsonwebtoken";
import env from "@/config/env";
import ms from "ms";
import { logger } from "@/lib/util";
import { LoginSchema, RegisterSchema } from "@/config/schema/auth.schema";
import { hashSync } from "bcrypt";

export class UserService {
  public async login(data: LoginSchema): Promise<ServiceResponse<any>> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: data.email },
        omit: {
          password: false,
        },
      });

      if (!user) {
        return {
          statusCode: 400,
          body: {
            message: "Invalid credentials,",
          },
        };
      }

      const token = sign(
        {
          id: user.id,
        },
        env.JWT_SECRET,
        {
          expiresIn: env.JWT_EXPIRES_IN as ms.StringValue,
          issuer: "usedoppler.app",
        },
      );

      return {
        body: {
          message: "Login successful",
          data: { token, user: { ...user, password: undefined } },
        },
      };
    } catch (error) {
      logger.error(error);

      return {
        statusCode: 500,
        body: {
          message: error as string,
        },
      };
    }
  }

  public async registerUser(data: RegisterSchema): Promise<ServiceResponse> {
    try {
      const passwordHash = hashSync(data.password, env.SALT_ROUNDS || 10);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: passwordHash,
          name: data.name,
        },
      });

      return {
        body: {
          message: "",
          data: { user },
        },
        statusCode: 201,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: (error as any).message,
          data: null,
        },
      };
    }
  }

  public async getUser(id: number): Promise<ServiceResponse> {
    const user = await prisma.user.findFirst({ where: { id } });
    return {
      statusCode: 200,
      body: {
        message: "User found",
        data: user,
      },
    };
  }
}

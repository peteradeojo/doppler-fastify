import { prisma } from "@/lib/prisma";
import { sign } from "jsonwebtoken";
import env from "@/config/env";
import ms from "ms";
import { logger, ServiceResponse } from "@/lib/util";
import {
  LoginSchema,
  OnboardingSchema,
  RegisterSchema,
} from "@/schema/auth.schema";
import { hashSync } from "bcrypt";
import { EmailService } from "@/services/email.service";
import { SafeUser } from "@/global";
import { randomInt } from "node:crypto";
import cache from "@/lib/cache";
import { primitiveTypes } from "zod/v4/core/util.cjs";

export class UserService {
  private readonly emailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public async login(data: LoginSchema): Promise<ServiceResponse> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: data.email },
        omit: {
          password: false,
        },
      });

      if (!user) {
        return ServiceResponse.error("Invalid credentials", null, 400);
      }

      if (!user.email_verified_at) {
        this.sendVerificationMail(user);
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

      return ServiceResponse.success(
        { token, user: { ...user, password: undefined } },
        "Login successful",
        200,
      );
    } catch (error) {
      logger.error(error);
      return ServiceResponse.error("An error occurred", error, 500);
    }
  }

  async sendVerificationMail(user: SafeUser, email?: string): Promise<boolean> {
    if (user.email_verified_at != null) true;

    const otpCode = randomInt(100000, 1000000);

    try {
      await cache.setex(
        `email_verification:${email ?? user.email}`,
        60 * 15,
        otpCode,
      );
      const res = await this.emailService.sendMail(
        "E-mail verification",
        `Hi ${user.name}. You need to verify your email. <br>
        Your verification code <b>${otpCode}</b>`,
        [email || user.email],
      );

      logger.info(res);
      return true;
    } catch (error) {
      logger.fatal(error);
      return false;
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

      this.sendVerificationMail(user);

      return ServiceResponse.success({ user }, "Sign-up successful", 201);
    } catch (error) {
      return ServiceResponse.error("An error occurred!", error, 500);
    }
  }

  public async getUser(id: number): Promise<ServiceResponse> {
    const user = await prisma.user.findFirst({ where: { id } });
    return ServiceResponse.success(
      { user },
      "User data retrieved successfully",
      200,
    );
  }

  public async verifyEmail(user: SafeUser, user_code: string) {
    try {
      const code = await cache.get(`email_verification:${user.email}`);

      if (code == user_code) {
        const _user = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            email_verified_at: new Date(),
          },
        });
        return ServiceResponse.success(_user, "E-mail verified successfully");
      }

      return ServiceResponse.error("E-mail verification failed", null, 400);
    } catch (error) {
      logger.error(error);
      return ServiceResponse.error(
        "Unable to verify email. An error occurred",
        error,
      );
    }
  }

  public async saveUserOnboardingDetails(
    user: SafeUser,
    data: OnboardingSchema,
  ) {
    try {
      const r = await prisma.onboardingData.upsert({
        where: {
          userId: user.id,
        },
        create: {
          userId: user.id,
          has_used_previous_tool: data.has_used_previous_tool,
          industry: data.industry,
          role: data.role,
        },
        update: {
          has_used_previous_tool: data.has_used_previous_tool,
          industry: data.industry,
          role: data.role,
        },
      });

      return ServiceResponse.success(r, "Details saved");
    } catch (error) {
      logger.error(error);
      return ServiceResponse.error("Error occurred", error);
    }
  }
}

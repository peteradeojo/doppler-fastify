import { SafeUser } from "@/global";
import { prisma } from "@/lib/prisma";
import { logger, ServiceResponse } from "@/lib/util";
import { CreateAppSchema } from "@/schema/app.schema";

export default class AppService {
  async getApps(userId: number): Promise<ServiceResponse> {
    const data = await prisma.source.findMany({
      where: {
        userId,
      },
    });

    return ServiceResponse.success(data);
  }

  async createApp(
    user: SafeUser,
    data: CreateAppSchema,
  ): Promise<ServiceResponse> {
    try {
      const app = await prisma.source.create({
        data: {
          userId: user.id,
          title: data.title,
        },
      });

      return ServiceResponse.success(app, "App created successfully", 201);
    } catch (error) {
        logger.error(error);
        return ServiceResponse.error("An error occurred", error);
    }
  }
}

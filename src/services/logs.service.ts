import { prisma } from "@/lib/prisma";
import { ServiceResponse } from "@/lib/util";
import { LogQuerySchema } from "@/schema/logs.schema";
import { LogWhereInput } from "generated/prisma/models";

export default class LogService {
  async getLogs(
    token: string,
    options: LogQuerySchema,
  ): Promise<ServiceResponse> {
    const query: LogWhereInput = {
      appToken: token,
    };

    if (options.cursor != 'null' && (options.cursor as unknown as string)?.length >= 1) {
      query.id = {
        gt: Number(options.cursor) || 0,
      };
    }

    console.log(query);

    const logs = await prisma.log.findMany({
      where: query,
      orderBy: {
        createdat: "desc",
      },
      take: options.count,
    });

    return ServiceResponse.success({
      logs,
      cursor: logs[Math.min(logs.length - 1, 0)]?.id ?? 0,
    });
  }

  async deleteAppLogs(token: string) {
    const d = await prisma.log.deleteMany({
      where: {
        appToken: token,
      }
    });

    return ServiceResponse.success(d, "Logs deleted succesfully", 200);
  }
}

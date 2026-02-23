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

    if (options.cursor) {
      query.id = {
        gt: options.cursor,
      };
    }

    const logs = await prisma.log.findMany({
      where: query,
      orderBy: {
        createdat: "desc",
      },
      take: options.count,
    });

    return ServiceResponse.success({ logs, cursor: logs[logs.length].id });
  }
}

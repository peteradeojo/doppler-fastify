import { FastifyReply } from "fastify";
import pino from "pino";

export const handleServiceResponse = (
  reply: FastifyReply,
  data: ServiceResponse,
) => {
  return reply.status(data.statusCode ?? 200).send(data);
};

export class ServiceResponse {
  public readonly statusCode: number;
  public readonly data: any;
  public readonly error: any;
  public readonly message: any;

  constructor(statusCode: number, data: any, message?: any, error?: any) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static success(data: any, message: string = "", code: number = 200) {
    return new ServiceResponse(code, data, message);
  }

  static error<T = any>(
    message: string,
    error: any = null,
    code: number = 500,
  ) {
    return new ServiceResponse(code, null, message, error);
  }

  toJSON() {
    return {
      message: this.message,
      data: this.data,
      error: this.error,
    };
  }
}

export const logger = pino({ name: "Doppler" });

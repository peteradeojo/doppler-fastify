import { createTransport, Transporter } from "nodemailer";
import env from "@/config/env";

export class EmailService {
  private readonly transport: Transporter;
  constructor() {
    this.transport = createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
      secure: env.SMTP_PORT == 465,
    });
  }

  async sendMail(subject: string, message: string, recipients: string[]) {
    return await this.transport.sendMail({
      subject,
      html: message,
      from: env.SMTP_USERNAME,
      to: recipients,
    });
  }
}

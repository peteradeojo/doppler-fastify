import { configDotenv } from "dotenv";
import z from "zod";

if (process.env.APP_ENV != "production") {
  configDotenv();
}

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),
  ALLOWED_ORIGINS: z.string(),
  APP_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  SESSION_SECRET_KEY: z.string(),
  SALT_ROUNDS: z.coerce.number(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().int().positive(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_DATABASE: z.coerce.number().int().max(15).optional(),
});

const parsedData = envSchema.safeParse(process.env);

if (!parsedData.success) {
  console.error("Invalid environment variables: ", parsedData.error.format());
  throw new Error("Invalid configuration. see console for details");
}

export default parsedData.data;
export type Env = z.infer<typeof envSchema>;

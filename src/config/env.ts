import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  ALLOWED_ORIGINS: z.string(),
  APP_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  SESSION_SECRET_KEY: z.string(),
  SALT_ROUNDS: z.coerce.number(),
});

const parsedData = envSchema.safeParse(process.env);

if (!parsedData.success) {
  console.error("Invalid environment variables: ", parsedData.error.format());
  throw new Error("Invalid configuration. see console for details");
}

export default parsedData.data;
export type Env = z.infer<typeof envSchema>;

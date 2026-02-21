import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
    name: z.string(),
  })
  .refine((data) => data.password == data.password_confirmation, {
    error: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const emailVerificationSchema = z.object({
  code: z.string().length(6),
});

export const onboardingSchema = z.object({
  industry: z.string(),
  role: z.string(),
  has_used_previous_tool: z.stringbool(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type EmailVerificationSchema = z.infer<typeof emailVerificationSchema>;
export type OnboardingSchema = z.infer<typeof onboardingSchema>;

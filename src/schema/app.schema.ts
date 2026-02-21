import z from 'zod';

export const createAppSchema = z.object({
    title: z.string(),
});

export type CreateAppSchema = z.infer<typeof createAppSchema>;
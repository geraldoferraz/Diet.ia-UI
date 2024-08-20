import { z } from "zod";

const envSchema = z.object({
    VITE_API_GYMBUD: z.string().url(),
    VITE_ENABLE_API_DELAY: z
        .string()
        .transform((value) => value === 'true'), 
});

export const env = envSchema.parse({
    VITE_API_GYMBUD: import.meta.env.VITE_API_GYMBUD,
    VITE_ENABLE_API_DELAY: import.meta.env.VITE_ENABLE_API_DELAY,
});

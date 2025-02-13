import { z } from 'zod';

export const envSchemaConfiguration = z.object({
    API_NAME: z.string(),
    API_VERSION: z.string(),
    API_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchemaConfiguration>;

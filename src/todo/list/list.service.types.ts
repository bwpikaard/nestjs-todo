import {z} from "zod";

export const getListSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
});

export type ListQuery = z.infer<typeof getListSchema>;

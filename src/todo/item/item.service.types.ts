import {z} from "zod";

export const getItemsSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    listId: z.number().optional(),
});

export type ItemQuery = z.infer<typeof getItemsSchema>;

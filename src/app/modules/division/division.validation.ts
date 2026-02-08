import z from "zod";

export const createDivisionSchema = z.object({
    name: z.string().min(1).max(255),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
})

export const updateDivisionSchema = {
    name: z.string().min(1).max(255).optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
}
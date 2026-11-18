import { z } from "zod";

export const createHighlightSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(150),
  description: z.string().trim().min(10, "Description is too short").max(600),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().min(0).max(9999).optional(),
});

export const updateHighlightSchema = createHighlightSchema.partial();

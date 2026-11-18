import { z } from "zod";
import { imageRef } from "@/lib/validations/shared";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createContentSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(150)
    .regex(slugPattern, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().min(10, "Description is too short"),
  imageUrl: imageRef.optional(),
  isPublished: z.boolean().optional(),
});

export type CreateContentInput = z.infer<typeof createContentSchema>;

export const updateContentSchema = createContentSchema.partial();

export type UpdateContentInput = z.infer<typeof updateContentSchema>;
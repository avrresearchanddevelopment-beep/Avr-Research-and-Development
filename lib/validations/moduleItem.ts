import { z } from "zod";
import { imageRef } from "@/lib/validations/shared";
import { moduleTypeSchema } from "@/lib/validations/domain";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createModuleItemSchema = z.object({
  domainId: z.string().min(1, "Domain is required"),
  title: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(150)
    .regex(slugPattern, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().min(1).max(2000),
  imageUrl: imageRef.optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export type CreateModuleItemInput = z.infer<typeof createModuleItemSchema>;

export const updateModuleItemSchema = createModuleItemSchema.partial();

export type UpdateModuleItemInput = z.infer<typeof updateModuleItemSchema>;

export { moduleTypeSchema };
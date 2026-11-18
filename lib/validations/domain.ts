import { z } from "zod";
import { imageRef } from "@/lib/validations/shared";

export const moduleTypeSchema = z.enum([
  "PROJECTS",
  "TRAINING",
  "INTERNSHIPS",
  "WORKSHOPS",
  "RESEARCH",
]);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createDomainSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(100)
    .regex(slugPattern, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().max(500).optional(),
  logoUrl: imageRef.optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>;

export const updateDomainSchema = createDomainSchema.partial();

export type UpdateDomainInput = z.infer<typeof updateDomainSchema>;

export const assignModulesSchema = z.object({
  modules: z.array(
    z.object({
      module: moduleTypeSchema,
      isActive: z.boolean().default(true),
      displayOrder: z.number().int().default(0),
    }),
  ),
});

export type AssignModulesInput = z.infer<typeof assignModulesSchema>;
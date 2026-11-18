import { z } from "zod";
import { imageRef } from "@/lib/validations/shared";

export const projectDifficultyLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const projectStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const createProjectSchema = z.object({
  domainId: z.string().min(1, "Domain is required"),
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(150),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(150)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  technologies: z.array(z.string().trim().min(1)).default([]),
  difficultyLevel: z.enum(projectDifficultyLevels),
  durationWeeks: z.number().int().positive().nullable().optional(),
  imageUrl: imageRef.nullable().optional(),
  publicationYear: z.number().int().min(1990).max(2100).nullable().optional(),
  price: z.number().int().min(0).nullable().optional(),
  demoUrl: z.string().trim().url("Must be a valid URL").nullable().optional().or(z.literal("")),
  githubUrl: z.string().trim().url("Must be a valid URL").nullable().optional().or(z.literal("")),
  status: z.enum(projectStatuses).default("DRAFT"),
  displayOrder: z.number().int().default(0),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
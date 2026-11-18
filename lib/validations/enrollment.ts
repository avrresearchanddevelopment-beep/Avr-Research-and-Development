import { z } from "zod";

// Exactly one of projectId / moduleItemId must be provided.
export const createEnrollmentSchema = z
  .object({
    projectId: z.string().trim().min(1).optional(),
    moduleItemId: z.string().trim().min(1).optional(),
    note: z.string().trim().max(500, "Note must be under 500 characters").optional(),
  })
  .refine((v) => Boolean(v.projectId) !== Boolean(v.moduleItemId), {
    message: "Provide either projectId or moduleItemId, not both.",
  });

export const updateEnrollmentSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "COMPLETED", "CANCELLED"]),
});

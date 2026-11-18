import { z } from "zod";

export const createServiceRequestSchema = z.object({
  serviceId: z.string().trim().min(1, "Choose a service"),
  message: z
    .string()
    .trim()
    .min(10, "Please describe what you need (at least 10 characters)")
    .max(4000),
});

export const updateServiceRequestSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
});

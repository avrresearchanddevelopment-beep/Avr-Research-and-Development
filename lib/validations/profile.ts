import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  bio: z.string().trim().max(1000, "Bio must be under 1000 characters").optional().or(z.literal("")),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(72, "New password must be under 72 characters"),
});
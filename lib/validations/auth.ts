import { z } from "zod";

// Public self-registration is limited to STUDENT and CLIENT.
// ADMIN accounts are provisioned separately (seed script / another admin),
// never through the public signup endpoint.
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Enter a valid email address").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be under 72 characters"),
  role: z.enum(["STUDENT", "CLIENT"], {
    error: "Role must be either STUDENT or CLIENT",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Enter a valid email address").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

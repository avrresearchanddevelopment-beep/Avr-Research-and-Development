import { z } from "zod";

export const createContactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(150),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
});

export type CreateContactSubmissionInput = z.infer<typeof createContactSubmissionSchema>;
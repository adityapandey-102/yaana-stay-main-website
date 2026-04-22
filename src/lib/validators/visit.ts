import { z } from "zod";

export const visitSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number is required"),
  propertyId: z.string().min(1, "Property is required"),
  visitDate: z.string(),
  visitTime: z.string(),
  message: z.string().optional(),
});

export type VisitInput = z.infer<typeof visitSchema>;

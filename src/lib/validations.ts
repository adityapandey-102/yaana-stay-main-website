// lib/validations.ts
import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  message: z.string().optional(),
  propertyId: z.string().optional(),
  source: z.string().default('website'),
})

export const visitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  propertyId: z.string().optional(),
  visitDate: z.string().min(1, 'Visit date is required'),
  visitTime: z.string().min(1, 'Visit time is required'),
  message: z.string().optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>
export type VisitInput = z.infer<typeof visitSchema>
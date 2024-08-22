import { z } from "zod"

export const leadShareValidation = z.object({
  from: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  to: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  crm: z
    .string()
})


const DateSchema = z.union([
  z.string(), // For single date like "Today"
  z.object({
    start: z.string(), // Expecting ISO date string or similar
    end: z.string(), // Expecting ISO date string or similar
  }),
])

export const FilterFormSchema = z.object({
  status: z.string(),
  user: z.string(),
  source: z.string(),
  location: z.string(),
  date: DateSchema,
})


export const LeadReassignFormSchema = z.object({
  assignTo: z.string().min(1, "Please select a user"),
})
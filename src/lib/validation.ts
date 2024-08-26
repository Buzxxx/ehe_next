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
  crm: z.string(),
})

const DateSchema = z.union([
  z.string(), // For single date like "Today"
  z.object({
    start: z.string(), // Expecting ISO date string or similar
    end: z.string(), // Expecting ISO date string or similar
  }),
])

export const FilterFormSchema = z.object({
  status: z.string().optional(),
  user: z.string().optional(),
  source: z.string().optional(),
  location: z.string().optional(),
  date: DateSchema.optional(),
})

export const LeadReassignFormSchema = z.object({
  assignTo: z.string().min(1, "Please select a user"),
})

export const CreateLeadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Phone number must be at least 10 digits"),
  lead_type: z.enum(["A", "B", "C", "D", "E", "F"]),
  query: z.string().optional(),
  interested_in: z.string().optional(),
  assigned_to: z.string().min(1, "Assigned To is required"), // Assuming this is required
  product_code: z.string().optional(),
  product_type: z.enum(["A", "B", "C", "D", "E", "F"]),
  status: z.number().optional().default(1), // Default value if not provided
  source: z.string().optional().default("4"), // Default value if not provided
  priority: z.enum(["cold", "hot", "C", "D", "E", "F"]),
})
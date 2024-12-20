import { z } from "zod";

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
});

const DateSchema = z.union([
  z.string(), // For single date like "Today"
  z.object({
    start: z.string(), // Expecting ISO date string or similar
    end: z.string(), // Expecting ISO date string or similar
  }),
]);

export const FilterFormSchema = z.object({
  status: z.string().optional(),
  user: z.string().optional(),
  source: z.string().optional(),
  location: z.string().optional(),
  date: DateSchema.optional(),
});

export const LeadReassignFormSchema = z.object({
  assignTo: z.string().min(1, "Please select a user"),
});

export const LeadProfileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Phone number must be at least 10 digits"),
  lead_type: z.enum(["A", "B", "C", "D", "E", "F"]),
  query: z.string().optional(),
  interested_in: z.string().optional(),
  budget: z.string().optional(),
  assigned_to: z.string().min(1, "Assigned To is required"),
  product_code: z.string().optional(),
  received_date: z.date().optional(),
  product_type: z.enum(["A", "B", "C", "D", "E", "F"]),
  status: z.string(),
  source: z.string().optional(),
});

export const LeadCallbackFormValidation = z.object({
  id: z.string(),
  date: z.date(),
  description: z.string().optional(),
});

export const LeadMeetingFormValidation = z.object({
  id: z.string(),
  date: z.date(),
  location: z.string().optional(),
  description: z.string().optional(),
  meeting_reason: z.string(),
});

import { z } from "zod";

export const bookingSchema = z.object({
  // Step 2
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  company: z.string().trim().max(120).optional().nullable(),
  jobTitle: z.string().trim().max(120).optional().nullable(),
  websiteUrl: z.string().trim().max(255).optional().nullable(),

  // Step 3
  businessType: z.string().nullable(),
  teamSize: z.string().nullable(),
  primaryObjective: z.string().nullable(),

  // Step 4
  selectedServices: z.array(z.string()).default([]),

  // Website audit branch
  hasExistingWebsite: z.boolean().nullable(),
  auditWebsiteUrl: z.string().trim().max(255).optional().nullable(),

  // Step 5
  projectType: z.string().nullable(),
  monthlyBudget: z.string().nullable(),

  // Step 6
  timeline: z.string().nullable(),

  // Step 7
  wantsQuote: z.boolean().default(false),

  // Step 8
  contactPreference: z.string().nullable(),
  preferredDate: z.string().nullable(),
  preferredTime: z.string().nullable(),

  // Tracking
  tracking: z.object({
    utm_source: z.string().nullable(),
    utm_medium: z.string().nullable(),
    utm_campaign: z.string().nullable(),
    utm_term: z.string().nullable(),
    utm_content: z.string().nullable(),
    referrer: z.string().nullable(),
    landing_page: z.string().nullable(),
    device_type: z.string().nullable(),
    user_agent: z.string().nullable(),
  }),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

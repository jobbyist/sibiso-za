import { createServerFn } from "@tanstack/react-start";
import { bookingSchema, type BookingPayload } from "./schema";
import { buildQuote } from "./quote";

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }: { data: BookingPayload }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: lead, error: leadErr } = await supabaseAdmin
      .from("leads")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        job_title: data.jobTitle || null,
        website_url: data.websiteUrl || null,
        business_type: data.businessType,
        team_size: data.teamSize,
        primary_objective: data.primaryObjective,
        selected_services: data.selectedServices,
        project_type: data.projectType,
        monthly_budget: data.monthlyBudget,
        timeline: data.timeline,
        has_existing_website: data.hasExistingWebsite,
        audit_website_url: data.auditWebsiteUrl || null,
        wants_quote: data.wantsQuote,
        utm_source: data.tracking.utm_source,
        utm_medium: data.tracking.utm_medium,
        utm_campaign: data.tracking.utm_campaign,
        utm_term: data.tracking.utm_term,
        utm_content: data.tracking.utm_content,
        referrer: data.tracking.referrer,
        landing_page: data.tracking.landing_page,
        device_type: data.tracking.device_type,
        user_agent: data.tracking.user_agent,
      })
      .select("id")
      .single();

    if (leadErr || !lead) throw new Error(leadErr?.message ?? "Failed to save lead");
    const leadId = lead.id;

    if (data.contactPreference || data.preferredDate || data.preferredTime) {
      await supabaseAdmin.from("consultations").insert({
        lead_id: leadId,
        contact_preference: data.contactPreference,
        preferred_date: data.preferredDate || null,
        preferred_time: data.preferredTime,
      });
    }

    if (data.hasExistingWebsite && data.auditWebsiteUrl) {
      await supabaseAdmin.from("website_audits").insert({
        lead_id: leadId,
        website_url: data.auditWebsiteUrl,
        status: "pending",
      });
    }

    if (data.wantsQuote && data.selectedServices.length > 0) {
      const quote = buildQuote(data.selectedServices);
      await supabaseAdmin.from("quote_estimates").insert({
        lead_id: leadId,
        starter_zar: quote.starter,
        recommended_zar: quote.recommended,
        growth_zar: quote.growth,
        line_items: quote.lineItems,
      });
    }

    return { leadId };
  });

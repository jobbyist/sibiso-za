# /bookings Lead-Gen Funnel — Phase 1

A premium Typeform-style wizard at `/bookings` that captures business audit leads, generates instant ZAR quotes, and books consultations. All data persisted to Lovable Cloud.

## In scope (Phase 1)
- New `/bookings` route — 10-step full-screen wizard
- 4 new database tables (leads, consultations, website_audits, quote_estimates)
- Service catalog with categories matching the spec
- Live "estimated investment" indicator
- Quote engine (Starter / Recommended / Growth in ZAR) with full pricing matrix from the spec
- Personalised summary with first-name addressing
- Success screen with all details
- localStorage progress persistence + auto-save
- Mobile-first responsive, keyboard nav, accessibility, smooth transitions, glassmorphism, gradient accents
- Rewire **every** CTA across the site (Home, Footer, Solutions, Navbar, Contact references) to `/bookings`
- UTM / referrer / landing-page / device tracking captured on submit
- Submission stored to `leads`, `consultations`, `quote_estimates`

## Deferred to Phase 2 (explicitly per user)
- Gemini 2.5 Flash AI website audit (the "Do you have a website?" branch still asks the question + stores the URL, but no AI analysis runs)
- Internal lead scoring
- Email automation to hello@sibisomarketing.co.za + sibiso@gravitas.uno (no email infra wired today; data captured in DB instead)
- Solutions page redesign

## Technical approach

### Database (one migration)
```text
public.leads
  id, first_name, last_name, email, phone, company, job_title, website_url,
  business_type, team_size, primary_objective,
  selected_services jsonb, project_type, monthly_budget, timeline,
  contact_preference, preferred_date, preferred_time,
  has_existing_website bool, audit_website_url,
  utm_source/medium/campaign/term/content, referrer, landing_page, device_type, user_agent,
  status text default 'new', created_at

public.consultations
  id, lead_id fk, contact_preference, preferred_date, preferred_time, notes, created_at

public.website_audits
  id, lead_id fk, website_url, score int null, summary text null,
  results jsonb null, created_at  -- populated in Phase 2

public.quote_estimates
  id, lead_id fk, starter_zar numeric, recommended_zar numeric, growth_zar numeric,
  line_items jsonb, created_at
```
- RLS enabled; INSERT allowed to `anon` (public funnel); SELECT only to `admin` via `has_role`. GRANTs included.

### Server function
- `submitBooking` (`createServerFn`) — accepts full wizard payload, Zod-validated, inserts into all 4 tables in one transaction-like batch via `supabaseAdmin` (loaded inside handler). Returns lead id.

### Wizard architecture
- `src/routes/bookings.tsx` — single full-screen wizard route
- `src/lib/bookings/` — `services.ts` (catalog + pricing), `schema.ts` (Zod), `quote.ts` (engine), `state.ts` (reducer + localStorage hook), `tracking.ts` (UTM helpers)
- `src/components/bookings/` — `WizardShell.tsx`, `ProgressBar.tsx`, step components (`StepWelcome`, `StepContact`, `StepProfile`, `StepServices`, `StepWebsite`, `StepProject`, `StepTimeline`, `StepQuoteOpt`, `StepConsultation`, `StepSummary`, `StepSuccess`)
- Motion transitions via existing `framer-motion`; glass via existing `glass` / `gradient-cta` / `gradient-gold` tokens

### CTA rewiring
- `CTAButton to="/contact"` → `/bookings` in: `index.tsx` (3), `Footer.tsx`, `solutions.tsx`, and any other surfaces (Navbar "Client Portal" stays as-is — that's auth, not a CTA)
- `/contact` page kept as-is (still linked from footer "Get in touch" + legal pages)

### Logo fix (already shipped this turn)
- PNGs uploaded, `Logo.tsx` swapped to PNG sources. Header/Footer/Preloader all use the `<Logo />` component so all surfaces are covered.

## Out of scope reminders
- No Solutions page changes
- No AI audit calls — field captured, audit row created empty, picked up in Phase 2
- No email send — DB capture only; admins can view leads via the existing `_authenticated/admin-panel.tsx` (a leads viewer can be added there in Phase 2 if you want)

Approve to proceed and I'll ship it.

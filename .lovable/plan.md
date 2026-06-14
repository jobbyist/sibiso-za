
# Build Plan — Client Portal, Admin Panel, Onboarding & More

The request spans ~25 distinct features. To keep quality high and let you review as we go, I'll ship in 4 phases. After each phase you can test in the preview before I continue.

## Phase 1 — Foundation (this turn)
- Lovable Cloud is now enabled (auth, DB, storage, functions).
- Database schema (single migration):
  - `profiles` (name, surname, company, email, phone, address, avatar_url, approved, account_manager_id, marketing_opt_in, contact_prefs, billing_method)
  - `app_role` enum (`admin`, `client`) + `user_roles` table + `has_role()` security-definer function
  - `client_services` (websites, domains, ads, designs, ai_chatbots, ai_automation, ai_voice, other — boolean toggles)
  - `support_tickets` + `ticket_messages`
  - `payment_methods`, `payment_history`, `documents`, `referrals`
  - Triggers: auto-create profile + default `client` role on signup
  - RLS policies + GRANTs on every table
- Storage buckets: `avatars` (public), `documents` (private), `site-assets` (admin only).
- Email/password + Google sign-in (Lovable's managed Google OAuth).
- Admin seed: server function to provision `admin@sibisomarketing.co.za` with password `Sibiso101$` and `admin` role (one-time, idempotent). Triggered automatically on first app load if missing.
- Navbar CTA: text → "Client Portal", icon → user, route → `/auth`.
- Footer: add Terms, Privacy, Cookies, Accessibility links.
- Legal pages: `/terms`, `/privacy`, `/cookies`, `/accessibility` with standard SA-aligned copy.

## Phase 2 — Client Portal & Onboarding
- `/auth` route (sign in + sign up, Google button).
- `/client-portal/onboarding` — Typeform-style 3-step (Profile → Services → Activation) matching the attached design (progress bar, card, animated steps, "Activate My Account" success modal).
- `/client-portal` — authenticated layout with tabs:
  - **Account** (avatar upload, all profile fields, password change)
  - **Services** (toggles, read-only until admin approval)
  - **Billing** (history, methods, add Payfast/EFT)
  - **Documents** (list from storage, download)
  - **Support** (account manager card + open ticket + ticket history)
- Auth gate: unapproved users see "Pending approval" screen; only approved users see full portal.

## Phase 3 — Admin Panel & Chatbot
- `/admin-panel` (admin-only via `_authenticated` + role check):
  - Dashboard with Google Analytics embed placeholder (you'll add GA4 measurement ID later)
  - Pending approvals queue (one-click approve / reject)
  - Client list (search, edit, suspend)
  - Support ticket inbox
  - Referrals tracker
- AI chatbot:
  - Server route `/api/public/chat` calling Gemini (`google/gemini-2.5-flash` via Lovable AI Gateway — free, no key needed)
  - System prompt seeded with site copy (hero, services, framework, FAQ) so it answers about Sibiso
  - Existing `Chatbot.tsx` wired to the new endpoint

## Phase 4 — Deployment Docs
- `DEPLOYMENT.md` with GitHub Actions workflow, Pages config, CNAME for `sibiso.gravitas.uno`, and required repo secrets.
- Note caveats: GitHub Pages is static-only, so the chatbot/auth/portal need a separate host (Lovable's publish, Cloudflare Pages with Functions, or Vercel). I'll explain this clearly.

## Technical notes (for reference)
- All server-side logic uses `createServerFn` (TanStack Start) — no Supabase Edge Functions except the chat endpoint which uses a TanStack server route at `/api/public/chat`.
- Roles are stored in a separate `user_roles` table to prevent privilege escalation.
- Passwords are validated server-side; the seeded admin password meets the >8 char + mixed-case + number + symbol requirement.
- Payfast is referenced as a billing-method *choice* only — no payment processing is wired up in this build. Tell me when you're ready to integrate Payfast and I'll add Stripe-equivalent flow with their API.

## Confirm to proceed
Reply "go" (or specify changes) and I'll execute Phase 1 immediately, then continue through Phase 2-4 in subsequent turns.


-- LEADS
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  job_title text,
  website_url text,
  business_type text,
  team_size text,
  primary_objective text,
  selected_services jsonb NOT NULL DEFAULT '[]'::jsonb,
  project_type text,
  monthly_budget text,
  timeline text,
  has_existing_website boolean,
  audit_website_url text,
  wants_quote boolean DEFAULT false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  landing_page text,
  device_type text,
  user_agent text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- CONSULTATIONS
CREATE TABLE public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  contact_preference text,
  preferred_date date,
  preferred_time text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultations TO authenticated;
GRANT INSERT ON public.consultations TO anon;
GRANT ALL ON public.consultations TO service_role;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a consultation" ON public.consultations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view consultations" ON public.consultations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update consultations" ON public.consultations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete consultations" ON public.consultations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- WEBSITE AUDITS (Phase 2 populates results)
CREATE TABLE public.website_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  website_url text NOT NULL,
  score integer,
  summary text,
  results jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.website_audits TO authenticated;
GRANT INSERT ON public.website_audits TO anon;
GRANT ALL ON public.website_audits TO service_role;
ALTER TABLE public.website_audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request audit" ON public.website_audits FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view audits" ON public.website_audits FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update audits" ON public.website_audits FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete audits" ON public.website_audits FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- QUOTE ESTIMATES
CREATE TABLE public.quote_estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  starter_zar numeric(12,2),
  recommended_zar numeric(12,2),
  growth_zar numeric(12,2),
  line_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_estimates TO authenticated;
GRANT INSERT ON public.quote_estimates TO anon;
GRANT ALL ON public.quote_estimates TO service_role;
ALTER TABLE public.quote_estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a quote" ON public.quote_estimates FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view quotes" ON public.quote_estimates FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update quotes" ON public.quote_estimates FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete quotes" ON public.quote_estimates FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX leads_email_idx ON public.leads (email);
CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);

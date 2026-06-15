
CREATE POLICY "Admins insert documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update documents" ON public.documents FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete documents" ON public.documents FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert payment history" ON public.payment_history FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update payment history" ON public.payment_history FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete payment history" ON public.payment_history FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.guard_profile_admin_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  IF NEW.approved IS DISTINCT FROM OLD.approved
     OR NEW.onboarding_complete IS DISTINCT FROM OLD.onboarding_complete
     OR NEW.account_manager_id IS DISTINCT FROM OLD.account_manager_id
     OR NEW.account_manager_name IS DISTINCT FROM OLD.account_manager_name
     OR NEW.account_manager_email IS DISTINCT FROM OLD.account_manager_email
     OR NEW.account_manager_phone IS DISTINCT FROM OLD.account_manager_phone THEN
    RAISE EXCEPTION 'Not authorized to modify admin-managed profile fields';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_profile_admin_fields ON public.profiles;
CREATE TRIGGER guard_profile_admin_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.guard_profile_admin_fields();

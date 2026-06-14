
-- Avatars: public read, user owns their folder
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Documents: private, user owns folder, admin can access all
CREATE POLICY "Users view own documents"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'documents' AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.has_role(auth.uid(), 'admin')
  )
);

CREATE POLICY "Admins upload documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage documents"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

-- Site assets: public read, admin write
CREATE POLICY "Site assets public read"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'site-assets');

CREATE POLICY "Admins manage site assets"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

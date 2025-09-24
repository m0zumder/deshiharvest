-- Remove the view entirely and rely on application-level field filtering
-- This should resolve the security definer view linter warning

DROP VIEW IF EXISTS public.public_profiles;

-- Instead, we'll handle field-level security in the application code
-- by only selecting the fields that should be public when querying other users' profiles

-- Update comment on the profiles table to document the security approach
COMMENT ON TABLE public.profiles IS 
'User profiles table. RLS policies ensure users can see their own complete profile, and others can see basic business info. Application code should only select (full_name, business_name, role, location) when displaying other users profiles to avoid exposing sensitive data like phone and address.';
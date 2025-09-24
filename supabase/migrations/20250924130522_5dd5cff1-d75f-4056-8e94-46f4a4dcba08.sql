-- Remove the unnecessary security definer function that's causing the linter warning
-- The public_profiles view is sufficient for our needs

DROP FUNCTION IF EXISTS public.get_public_profile_info(uuid);
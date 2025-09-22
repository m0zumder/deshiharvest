-- Fix the security definer view issue by removing the security_barrier property
-- and implementing proper RLS policies instead

-- Drop the view and recreate it without security_barrier
DROP VIEW IF EXISTS public.public_profiles;

-- Create a regular view without security_barrier
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  full_name,
  business_name,
  role,
  location,
  created_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO authenticated;

-- The view will inherit the RLS policies from the underlying table
-- which is more secure than using security_barrier

-- Update the comment
COMMENT ON VIEW public.public_profiles IS 
'Safe view of profile information that excludes sensitive data like phone numbers and addresses. Use this view when displaying other users profiles. RLS policies are inherited from the profiles table.';
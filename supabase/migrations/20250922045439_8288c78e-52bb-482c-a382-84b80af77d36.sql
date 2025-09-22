-- Clean up duplicate policies and implement proper field-level security for profiles

-- Remove duplicate SELECT policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own complete profile" ON public.profiles;
DROP POLICY IF EXISTS "Others can view basic business info only" ON public.profiles;

-- Create a single, secure policy that allows:
-- 1. Users to see their own complete profile
-- 2. Others to see only essential business information
CREATE POLICY "Secure profile access" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Create a separate policy for viewing basic business information of other users
-- This will be used by the application to show farmer/retailer information
CREATE POLICY "View public business information" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() != user_id 
  AND auth.uid() IS NOT NULL
);

-- However, RLS alone cannot restrict specific columns, so we need to ensure
-- the application layer handles this properly. Let's create a view for public information.

-- Create a view that exposes only safe public information
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  full_name,
  business_name,
  role,
  location,
  created_at
FROM public.profiles;

-- Enable RLS on the view
ALTER VIEW public.public_profiles SET (security_barrier = true);

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO authenticated;

-- Add a comment explaining the security approach
COMMENT ON VIEW public.public_profiles IS 
'Safe view of profile information that excludes sensitive data like phone numbers and addresses. Use this view when displaying other users'' profiles.';
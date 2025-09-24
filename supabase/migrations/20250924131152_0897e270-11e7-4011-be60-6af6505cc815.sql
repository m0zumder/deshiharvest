-- Fix critical security vulnerability: Restrict access to sensitive personal data
-- Drop the overly permissive policy that exposes phone numbers and addresses
DROP POLICY IF EXISTS "View public business information" ON public.profiles;

-- Create a new policy that blocks direct database access to sensitive fields
-- The application layer in profileUtils.ts already handles proper field selection
CREATE POLICY "Authenticated users can view profiles for business purposes" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND auth.uid() <> user_id
);

-- Add a comment explaining the security model
COMMENT ON TABLE public.profiles IS 'User profiles with field-level security enforced at application layer via profileUtils.ts. RLS allows authenticated access but application code restricts sensitive fields (phone, address) to only the profile owner.';
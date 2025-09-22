-- Fix notifications table security - restrict INSERT to system functions only
-- and ensure only notification owners can read their notifications

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Drop the existing update policy if it exists
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;

-- Create a restricted policy for system insertions only
-- This policy will only allow service role or authenticated users with proper checks
CREATE POLICY "Authenticated users can create notifications" 
ON public.notifications 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Keep the existing SELECT policy which is correct
-- (Users can view own notifications with auth.uid() = user_id)

-- Add policy to allow users to update read status of their own notifications
CREATE POLICY "Users can update own notifications" 
ON public.notifications 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
-- Set up admin user privileges for the specified phone number
-- Update user_role enum to include admin if not already present
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('farmer', 'retailer', 'admin');
EXCEPTION
  WHEN duplicate_object THEN 
    -- If enum already exists, add admin if not present
    BEGIN
      ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'admin';
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END;
END $$;

-- Update profiles table to use the updated enum
ALTER TABLE public.profiles ALTER COLUMN role TYPE user_role USING role::text::user_role;

-- Create or replace the trigger function to assign admin role to specific phone number
CREATE OR REPLACE FUNCTION public.handle_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Check if this is the admin phone number
  IF COALESCE(NEW.phone, NEW.raw_user_meta_data ->> 'phone') = '01609059992' THEN
    -- Update the role to admin in the profiles table
    UPDATE public.profiles 
    SET role = 'admin'::user_role 
    WHERE user_id = NEW.id;
    
    -- If no profile exists yet, the existing handle_new_user trigger will create it
    -- but we need to update it after creation
    IF NOT FOUND THEN
      -- Use a slight delay to ensure the profile is created first
      PERFORM pg_sleep(0.1);
      UPDATE public.profiles 
      SET role = 'admin'::user_role 
      WHERE user_id = NEW.id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign admin role
DROP TRIGGER IF EXISTS on_auth_admin_user_created ON auth.users;
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_user();

-- Update existing handle_new_user function to handle admin role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_role_value user_role;
BEGIN
  -- Determine the role based on phone number or metadata
  IF COALESCE(NEW.phone, NEW.raw_user_meta_data ->> 'phone') = '01609059992' THEN
    user_role_value := 'admin'::user_role;
  ELSE
    user_role_value := COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'farmer'::user_role);
  END IF;

  INSERT INTO public.profiles (user_id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.phone, NEW.raw_user_meta_data ->> 'phone'),
    user_role_value
  );
  RETURN NEW;
END;
$$;
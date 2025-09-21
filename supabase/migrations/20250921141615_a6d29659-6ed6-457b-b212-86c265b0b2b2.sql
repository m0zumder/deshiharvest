-- Enable phone authentication and ensure all required features are properly set up
-- This ensures phone-based auth works correctly

-- Enable realtime for relevant tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.community_posts REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;

-- Create trigger for automatic profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.phone, NEW.raw_user_meta_data ->> 'phone'),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'farmer'::user_role)
  );
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for updating order pools when orders are created
CREATE OR REPLACE FUNCTION public.update_order_pool_on_new_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Update order pool if this order is part of a pool
  IF NEW.pool_id IS NOT NULL THEN
    UPDATE public.order_pools 
    SET 
      current_quantity = current_quantity + NEW.quantity,
      status = CASE 
        WHEN current_quantity + NEW.quantity >= target_quantity THEN 'closed'
        ELSE status
      END,
      updated_at = now()
    WHERE id = NEW.pool_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for order pool updates
DROP TRIGGER IF EXISTS update_pool_on_order ON public.orders;
CREATE TRIGGER update_pool_on_order
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_order_pool_on_new_order();

-- Create trigger for reputation updates
DROP TRIGGER IF EXISTS update_farmer_reputation_trigger ON public.orders;
CREATE TRIGGER update_farmer_reputation_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_farmer_reputation();

-- Create trigger for reputation updates on ratings
DROP TRIGGER IF EXISTS update_farmer_reputation_on_rating ON public.ratings;
CREATE TRIGGER update_farmer_reputation_on_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.ratings
  FOR EACH ROW EXECUTE FUNCTION public.update_farmer_reputation();
-- Fix function search path security warnings
-- Update the calculate_suggested_price function to set search_path
CREATE OR REPLACE FUNCTION public.calculate_suggested_price(product_category TEXT, product_unit TEXT)
RETURNS DECIMAL AS $$
DECLARE
  avg_price DECIMAL;
BEGIN
  SELECT AVG(price) INTO avg_price
  FROM public.products
  WHERE category = product_category 
    AND unit = product_unit
    AND created_at >= NOW() - INTERVAL '30 days'
    AND status = 'available';
  
  RETURN COALESCE(avg_price, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update the update_farmer_reputation function to set search_path
CREATE OR REPLACE FUNCTION public.update_farmer_reputation()
RETURNS TRIGGER AS $$
DECLARE
  farmer_stats RECORD;
  trust_score DECIMAL;
BEGIN
  -- Calculate stats for the farmer
  SELECT 
    COUNT(*) as total_orders,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) as completed_orders,
    COUNT(CASE WHEN status = 'delivered' AND delivery_date <= created_at + INTERVAL '2 days' THEN 1 END) as on_time_deliveries,
    COALESCE(AVG(r.rating), 0) as avg_rating
  INTO farmer_stats
  FROM public.orders o
  LEFT JOIN public.ratings r ON o.id = r.order_id
  WHERE o.farmer_id = COALESCE(NEW.farmer_id, OLD.farmer_id);
  
  -- Calculate trust score (0-100)
  trust_score := LEAST(100, (
    (CASE WHEN farmer_stats.total_orders > 0 THEN farmer_stats.completed_orders::DECIMAL / farmer_stats.total_orders * 40 ELSE 0 END) +
    (CASE WHEN farmer_stats.completed_orders > 0 THEN farmer_stats.on_time_deliveries::DECIMAL / farmer_stats.completed_orders * 30 ELSE 0 END) +
    (farmer_stats.avg_rating * 6)
  ));
  
  -- Insert or update reputation
  INSERT INTO public.farmer_reputation (farmer_id, total_orders, completed_orders, average_rating, on_time_deliveries, trust_score)
  VALUES (COALESCE(NEW.farmer_id, OLD.farmer_id), farmer_stats.total_orders, farmer_stats.completed_orders, farmer_stats.avg_rating, farmer_stats.on_time_deliveries, trust_score)
  ON CONFLICT (farmer_id) 
  DO UPDATE SET 
    total_orders = farmer_stats.total_orders,
    completed_orders = farmer_stats.completed_orders,
    average_rating = farmer_stats.avg_rating,
    on_time_deliveries = farmer_stats.on_time_deliveries,
    trust_score = trust_score,
    updated_at = now();
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
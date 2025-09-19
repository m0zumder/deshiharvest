-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('farmer', 'retailer', 'admin');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  role user_role NOT NULL DEFAULT 'farmer',
  location TEXT,
  business_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create farmer reputation table
CREATE TABLE public.farmer_reputation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  total_orders INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.0,
  on_time_deliveries INTEGER DEFAULT 0,
  trust_score DECIMAL(5,2) DEFAULT 0.0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(farmer_id)
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT, -- Bangla name
  description TEXT,
  description_bn TEXT, -- Bangla description
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  suggested_price DECIMAL(10,2),
  unit TEXT NOT NULL, -- kg, piece, dozen etc
  quantity_available INTEGER NOT NULL,
  harvest_date DATE,
  expiry_date DATE,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'urgent_sale', 'sold_out', 'expired')),
  discount_percentage INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'pooled', 'delivered', 'cancelled')),
  delivery_date DATE,
  is_pooled BOOLEAN DEFAULT false,
  pool_id UUID, -- Reference to group orders
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order pools table for group orders
CREATE TABLE public.order_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  target_quantity INTEGER NOT NULL,
  current_quantity INTEGER DEFAULT 0,
  unit_price DECIMAL(10,2) NOT NULL,
  delivery_date DATE NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ratings table
CREATE TABLE public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  retailer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(order_id)
);

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  title_bn TEXT, -- Bangla title
  content TEXT NOT NULL,
  content_bn TEXT, -- Bangla content
  category TEXT DEFAULT 'general' CHECK (category IN ('tips', 'news', 'pest_alert', 'market_info', 'general')),
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post comments table
CREATE TABLE public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table for SMS alerts
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('order_received', 'order_confirmed', 'delivery_reminder', 'payment_received')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  sms_sent BOOLEAN DEFAULT false,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmer_reputation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for farmer reputation
CREATE POLICY "Anyone can view farmer reputation" ON public.farmer_reputation FOR SELECT USING (true);
CREATE POLICY "Only system can update reputation" ON public.farmer_reputation FOR ALL USING (false);

-- Create RLS policies for products
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Farmers can manage own products" ON public.products FOR ALL USING (auth.uid() = farmer_id);

-- Create RLS policies for orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = retailer_id OR auth.uid() = farmer_id);
CREATE POLICY "Retailers can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = retailer_id);
CREATE POLICY "Order parties can update orders" ON public.orders FOR UPDATE USING (auth.uid() = retailer_id OR auth.uid() = farmer_id);

-- Create RLS policies for order pools
CREATE POLICY "Anyone can view order pools" ON public.order_pools FOR SELECT USING (true);
CREATE POLICY "Farmers can manage own pools" ON public.order_pools FOR ALL USING (auth.uid() = farmer_id);

-- Create RLS policies for ratings
CREATE POLICY "Anyone can view ratings" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "Retailers can rate their orders" ON public.ratings FOR INSERT WITH CHECK (auth.uid() = retailer_id);

-- Create RLS policies for community posts
CREATE POLICY "Anyone can view posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Users can manage own posts" ON public.community_posts FOR ALL USING (auth.uid() = author_id);

-- Create RLS policies for post comments
CREATE POLICY "Anyone can view comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can manage own comments" ON public.post_comments FOR ALL USING (auth.uid() = author_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_order_pools_updated_at BEFORE UPDATE ON public.order_pools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate suggested price
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update farmer reputation
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update farmer reputation when orders change
CREATE TRIGGER update_farmer_reputation_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_farmer_reputation();

-- Create trigger to update farmer reputation when ratings change
CREATE TRIGGER update_farmer_reputation_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.ratings
  FOR EACH ROW EXECUTE FUNCTION public.update_farmer_reputation();
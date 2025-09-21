import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SmartPriceSuggestion } from "@/components/features/SmartPriceSuggestion";
import { FarmerReputationBadge } from "@/components/features/FarmerReputationBadge";
import { UrgentSaleProducts } from "@/components/features/UrgentSaleProducts";
import { OrderPooling } from "@/components/features/OrderPooling";
import { 
  Search, 
  Heart, 
  Star, 
  MapPin,
  ShoppingCart,
  SlidersHorizontal,
  Clock,
  TrendingUp
} from "lucide-react";
import vegetablesImage from "@/assets/vegetables-collection.jpg";

interface Product {
  id: string;
  name: string;
  name_bn?: string;
  farmer_id: string;
  price: number;
  suggested_price?: number;
  category: string;
  description?: string;
  description_bn?: string;
  unit: string;
  quantity_available: number;
  status: string;
  image_url?: string;
  harvest_date?: string;
  expiry_date?: string;
  discount_percentage?: number;
  created_at: string;
  profiles?: {
    full_name: string;
    location?: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const categories = ["all", "vegetables", "fruits", "grains", "dairy", "meat"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ৳50", value: "0-50" },
    { label: "৳50 - ৳80", value: "50-80" },
    { label: "Above ৳80", value: "80+" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles:farmer_id (
            full_name,
            location
          )
        `)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products"
      });
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (product: Product, quantity: number = 1) => {
    if (!user || !userProfile) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to place orders"
      });
      return;
    }

    if (userProfile.role !== 'retailer') {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only retailers can place orders"
      });
      return;
    }

    try {
      const totalAmount = product.price * quantity;
      
      const { error } = await supabase
        .from('orders')
        .insert({
          retailer_id: user.id,
          farmer_id: product.farmer_id,
          product_id: product.id,
          quantity,
          unit_price: product.price,
          total_amount: totalAmount,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Order Placed!",
        description: `Order for ${quantity} ${product.unit} of ${product.name} placed successfully`
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to place order"
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const searchText = searchTerm.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchText) ||
                         (product.name_bn && product.name_bn.includes(searchText)) ||
                         (product.profiles?.full_name?.toLowerCase().includes(searchText)) ||
                         (product.profiles?.location?.toLowerCase().includes(searchText));
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(p => p.replace("+", ""));
      if (max) {
        matchesPrice = product.price >= parseInt(min) && product.price <= parseInt(max);
      } else {
        matchesPrice = product.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="p-4 animate-pulse">
                <div className="h-48 bg-muted rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-secondary overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                {t("Fresh Products from", "তাজা পণ্য")}
                <span className="text-primary block">{t("Local Farmers", "স্থানীয় কৃষকদের থেকে")}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("Discover the finest organic vegetables and produce, directly from verified farmers across Bangladesh.", 
                   "বাংলাদেশের যাচাইকৃত কৃষকদের কাছ থেকে সরাসরি সেরা জৈব সবজি এবং পণ্য আবিষ্কার করুন।")}
              </p>
            </div>
            <div className="animate-slide-in">
              <img 
                src={vegetablesImage} 
                alt="Fresh vegetables collection"
                className="w-full h-auto rounded-2xl shadow-custom-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Special Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <UrgentSaleProducts />
          <OrderPooling />
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search products, farmers, or locations...", "পণ্য, কৃষক বা অবস্থান খুঁজুন...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {t("Filters", "ফিল্টার")}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("Category", "বিভাগ")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? t("All Categories", "সব বিভাগ") : t(category, category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("Price Range", "দাম পরিসীমা")} />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {t(range.label, range.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <Card className="p-4 lg:hidden animate-fade-in">
              <div className="space-y-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Category", "বিভাগ")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? t("All Categories", "সব বিভাগ") : t(category, category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Price Range", "দাম পরিসীমা")} />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>
                        {t(range.label, range.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {t("Available Products", "উপলব্ধ পণ্য")} ({filteredProducts.length})
          </h2>
          <Select defaultValue="recent">
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("Sort by", "সাজান")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">{t("Most Recent", "সবচেয়ে সাম্প্রতিক")}</SelectItem>
              <SelectItem value="price-low">{t("Price: Low to High", "দাম: কম থেকে বেশি")}</SelectItem>
              <SelectItem value="price-high">{t("Price: High to Low", "দাম: বেশি থেকে কম")}</SelectItem>
              <SelectItem value="quantity">{t("Most Available", "সবচেয়ে উপলব্ধ")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="p-4 bg-gradient-card hover:shadow-custom-lg transition-all duration-300 hover:scale-105 border-0 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                {/* Product Header */}
                <div className="flex items-start justify-between">
                  <div className="text-4xl">
                    {product.category === 'vegetables' ? '🥬' : 
                     product.category === 'fruits' ? '🍎' : 
                     product.category === 'grains' ? '🌾' : '🥕'}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.status === 'urgent_sale' && (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {t("Urgent", "জরুরি")}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {t(product.name, product.name_bn || product.name)}
                  </h3>
                  {product.suggested_price && (
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="text-xs text-primary">
                        {t("Market avg: ৳", "বাজার গড়: ৳")}{product.suggested_price}/{product.unit}
                      </span>
                    </div>
                  )}
                </div>

                {/* Farmer Info with Reputation */}
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-card-foreground">
                      {product.profiles?.full_name}
                    </p>
                    <FarmerReputationBadge farmerId={product.farmer_id} />
                  </div>
                  {product.profiles?.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{product.profiles.location}</span>
                    </div>
                  )}
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-card-foreground">
                      ৳{product.price}/{product.unit}
                    </span>
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        -{product.discount_percentage}%
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.quantity_available} {product.unit}
                  </Badge>
                </div>

                {/* Smart Price Suggestion for this product */}
                <SmartPriceSuggestion 
                  category={product.category}
                  unit={product.unit}
                  userPrice={product.price}
                />

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-gradient-accent hover:shadow-accent transition-all duration-300"
                    size="sm"
                    onClick={() => createOrder(product)}
                    disabled={!user || userProfile?.role !== 'retailer'}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t("Order Now", "এখনই অর্ডার করুন")}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t("No products found", "কোন পণ্য পাওয়া যায়নি")}
            </h3>
            <p className="text-muted-foreground">
              {t("Try adjusting your search or filter criteria", "আপনার অনুসন্ধান বা ফিল্টার মানদণ্ড সামঞ্জস্য করার চেষ্টা করুন")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
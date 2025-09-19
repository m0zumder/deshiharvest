import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Percent, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow, differenceInDays } from "date-fns";

interface UrgentProduct {
  id: string;
  farmer_id: string;
  name: string;
  name_bn?: string;
  description?: string;
  category: string;
  price: number;
  discount_percentage: number;
  unit: string;
  quantity_available: number;
  expiry_date: string;
  status: string;
  image_url?: string;
  created_at: string;
  profiles: {
    full_name: string;
    business_name?: string;
  };
}

export const UrgentSaleProducts = () => {
  const { t } = useLanguage();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [urgentProducts, setUrgentProducts] = useState<UrgentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrgentProducts();
  }, []);

  const fetchUrgentProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles!products_farmer_id_fkey (full_name, business_name)
        `)
        .eq('status', 'urgent_sale')
        .order('expiry_date', { ascending: true });

      if (error) {
        console.error('Error fetching urgent products:', error);
        return;
      }

      setUrgentProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (product: UrgentProduct, quantity: number) => {
    if (!user || userProfile?.role !== 'retailer') {
      toast({
        title: t("Access Required", "অ্যাক্সেস প্রয়োজন"),
        description: t("Only retailers can place orders", "শুধুমাত্র খুচরা বিক্রেতারা অর্ডার দিতে পারেন"),
        variant: "destructive",
      });
      return;
    }

    try {
      const discountedPrice = product.price * (1 - product.discount_percentage / 100);
      const totalAmount = quantity * discountedPrice;

      const { error } = await supabase
        .from('orders')
        .insert({
          retailer_id: user.id,
          farmer_id: product.farmer_id,
          product_id: product.id,
          quantity: quantity,
          unit_price: discountedPrice,
          total_amount: totalAmount,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast({
        title: t("Order Placed!", "অর্ডার দেওয়া হয়েছে!"),
        description: t("Your urgent order has been placed successfully", "আপনার জরুরি অর্ডার সফলভাবে দেওয়া হয়েছে"),
      });

      fetchUrgentProducts(); // Refresh products
    } catch (error: any) {
      toast({
        title: t("Error", "ত্রুটি"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getUrgencyLevel = (expiryDate: string) => {
    const daysLeft = differenceInDays(new Date(expiryDate), new Date());
    
    if (daysLeft <= 1) {
      return { level: 'critical', color: 'destructive', text: t('Critical', 'ক্রিটিক্যাল') };
    } else if (daysLeft <= 3) {
      return { level: 'high', color: 'warning', text: t('High', 'উচ্চ') };
    } else {
      return { level: 'medium', color: 'secondary', text: t('Medium', 'মাঝারি') };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (urgentProducts.length === 0) {
    return (
      <Card className="text-center p-8">
        <Leaf className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {t("No Urgent Sales", "কোন জরুরি বিক্রয় নেই")}
        </h3>
        <p className="text-muted-foreground">
          {t("All products are fresh! Check back later for deals", "সব পণ্য তাজা! ডিলের জন্য পরে আবার চেক করুন")}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h2 className="text-lg font-semibold">
          {t("Urgent Sale - Prevent Waste!", "জরুরি বিক্রয় - অপচয় রোধ করুন!")}
        </h2>
      </div>

      {urgentProducts.map((product) => {
        const urgency = getUrgencyLevel(product.expiry_date);
        const discountedPrice = product.price * (1 - product.discount_percentage / 100);
        const savings = product.price - discountedPrice;
        const timeLeft = formatDistanceToNow(new Date(product.expiry_date), { addSuffix: true });

        return (
          <Card key={product.id} className="border-l-4 border-l-warning bg-gradient-to-r from-warning/5 to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      {product.name_bn || product.name}
                    </CardTitle>
                    <Badge variant={urgency.color as any} className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {urgency.text}
                    </Badge>
                  </div>
                  <CardDescription>
                    {t("By", "দ্বারা")} {product.profiles.business_name || product.profiles.full_name}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge className="bg-success text-success-foreground text-lg font-bold">
                    -{product.discount_percentage}%
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {t("Expires", "মেয়াদ উত্তীর্ণ")} {timeLeft}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("Original Price", "মূল দাম")}:</span>
                  <div className="line-through text-muted-foreground">৳{product.price.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("Sale Price", "বিক্রয় দাম")}:</span>
                  <div className="font-bold text-success text-lg">৳{discountedPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("You Save", "আপনি সাশ্রয় করুন")}:</span>
                  <div className="font-semibold text-warning">৳{savings.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("Available", "উপলব্ধ")}:</span>
                  <div className="font-semibold">{product.quantity_available} {product.unit}</div>
                </div>
              </div>

              {product.description && (
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              )}

              <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg">
                <Leaf className="h-4 w-4 text-success" />
                <span className="text-xs text-success font-medium">
                  {t("Help reduce food waste - Buy now at discounted price!", "খাদ্য অপচয় কমাতে সাহায্য করুন - এখনই ছাড়ে কিনুন!")}
                </span>
              </div>

              {userProfile?.role === 'retailer' && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="number"
                    min="1"
                    max={product.quantity_available}
                    placeholder={t("Quantity", "পরিমাণ")}
                    className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
                    id={`urgent-quantity-${product.id}`}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById(`urgent-quantity-${product.id}`) as HTMLInputElement;
                      const quantity = parseInt(input.value);
                      if (quantity && quantity > 0 && quantity <= product.quantity_available) {
                        createOrder(product, quantity);
                      }
                    }}
                    className="bg-warning text-warning-foreground hover:bg-warning/90"
                  >
                    <Percent className="h-4 w-4 mr-1" />
                    {t("Buy Now", "এখনই কিনুন")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Package, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface OrderPool {
  id: string;
  farmer_id: string;
  product_id: string;
  target_quantity: number;
  current_quantity: number;
  unit_price: number;
  delivery_date: string;
  status: "open" | "closed" | "delivered";
  created_at: string;
  products: {
    name: string;
    name_bn?: string;
    unit: string;
    category: string;
  };
  profiles: {
    full_name: string;
    business_name?: string;
  };
}

interface OrderPoolingProps {
  productId?: string;
  farmerId?: string;
}

export const OrderPooling = ({ productId, farmerId }: OrderPoolingProps) => {
  const { t } = useLanguage();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [orderPools, setOrderPools] = useState<OrderPool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderPools();
  }, [productId, farmerId]);

  const fetchOrderPools = async () => {
    try {
      let query = supabase
        .from('order_pools')
        .select(`
          *,
          products (name, name_bn, unit, category),
          profiles!order_pools_farmer_id_fkey (full_name, business_name)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (productId) {
        query = query.eq('product_id', productId);
      }
      if (farmerId) {
        query = query.eq('farmer_id', farmerId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching order pools:', error);
        return;
      }

      setOrderPools((data || []) as OrderPool[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinPool = async (poolId: string, quantity: number) => {
    if (!user || userProfile?.role !== 'retailer') {
      toast({
        title: t("Access Required", "অ্যাক্সেস প্রয়োজন"),
        description: t("Only retailers can join order pools", "শুধুমাত্র খুচরা বিক্রেতারা অর্ডার পুলে যোগ দিতে পারেন"),
        variant: "destructive",
      });
      return;
    }

    try {
      const pool = orderPools.find(p => p.id === poolId);
      if (!pool) return;

      // Create order for the pool
      const { error } = await supabase
        .from('orders')
        .insert({
          retailer_id: user.id,
          farmer_id: pool.farmer_id,
          product_id: pool.product_id,
          quantity: quantity,
          unit_price: pool.unit_price,
          total_amount: quantity * pool.unit_price,
          status: 'pooled',
          is_pooled: true,
          pool_id: poolId,
          delivery_date: pool.delivery_date
        });

      if (error) {
        throw error;
      }

      // Update pool current quantity
      const newCurrentQuantity = pool.current_quantity + quantity;
      const { error: updateError } = await supabase
        .from('order_pools')
        .update({
          current_quantity: newCurrentQuantity,
          status: newCurrentQuantity >= pool.target_quantity ? 'closed' : 'open'
        })
        .eq('id', poolId);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: t("Joined Pool!", "পুলে যোগ দিয়েছেন!"),
        description: t("You have successfully joined the order pool", "আপনি সফলভাবে অর্ডার পুলে যোগ দিয়েছেন"),
      });

      fetchOrderPools(); // Refresh the pools
    } catch (error: any) {
      toast({
        title: t("Error", "ত্রুটি"),
        description: error.message,
        variant: "destructive",
      });
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

  if (orderPools.length === 0) {
    return (
      <Card className="text-center p-8">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {t("No Active Order Pools", "কোন সক্রিয় অর্ডার পুল নেই")}
        </h3>
        <p className="text-muted-foreground">
          {t("Check back later for group ordering opportunities", "গ্রুপ অর্ডারিং সুযোগের জন্য পরে আবার চেক করুন")}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">
          {t("Group Orders Available", "গ্রুপ অর্ডার উপলব্ধ")}
        </h2>
      </div>

      {orderPools.map((pool) => {
        const progressPercentage = (pool.current_quantity / pool.target_quantity) * 100;
        const remainingQuantity = pool.target_quantity - pool.current_quantity;
        const timeLeft = formatDistanceToNow(new Date(pool.delivery_date), { addSuffix: true });

        return (
          <Card key={pool.id} className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">
                    {pool.products.name_bn || pool.products.name}
                  </CardTitle>
                  <CardDescription>
                    {t("By", "দ্বারা")} {pool.profiles.business_name || pool.profiles.full_name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {t("Bulk Save", "বাল্ক সেভ")}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {timeLeft}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    {t("Unit Price", "একক দাম")}:
                  </span>
                  <div className="font-semibold">৳{pool.unit_price.toFixed(2)}/{pool.products.unit}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("Delivery", "ডেলিভারি")}:
                  </span>
                  <div className="font-semibold">
                    {new Date(pool.delivery_date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {t("Progress", "অগ্রগতি")}: {pool.current_quantity}/{pool.target_quantity} {pool.products.unit}
                  </span>
                  <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {t("Need", "প্রয়োজন")} {remainingQuantity} {t("more", "আরো")} {pool.products.unit} {t("to complete", "সম্পূর্ণ করতে")}
                </div>
              </div>

              {userProfile?.role === 'retailer' && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="number"
                    min="1"
                    max={remainingQuantity}
                    placeholder={t("Quantity", "পরিমাণ")}
                    className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
                    id={`quantity-${pool.id}`}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById(`quantity-${pool.id}`) as HTMLInputElement;
                      const quantity = parseInt(input.value);
                      if (quantity && quantity > 0 && quantity <= remainingQuantity) {
                        joinPool(pool.id, quantity);
                      }
                    }}
                    className="bg-gradient-accent hover:shadow-accent"
                  >
                    {t("Join Pool", "পুলে যোগ দিন")}
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
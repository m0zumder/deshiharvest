import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SmartPriceSuggestionProps {
  category: string;
  unit: string;
  userPrice?: number;
  onSuggestedPriceUpdate?: (price: number) => void;
}

export const SmartPriceSuggestion = ({ 
  category, 
  unit, 
  userPrice, 
  onSuggestedPriceUpdate 
}: SmartPriceSuggestionProps) => {
  const { t } = useLanguage();
  const [suggestedPrice, setSuggestedPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [marketTrend, setMarketTrend] = useState<"up" | "down" | "stable">("stable");

  useEffect(() => {
    if (category && unit) {
      fetchSuggestedPrice();
    }
  }, [category, unit]);

  const fetchSuggestedPrice = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('calculate_suggested_price', {
          product_category: category,
          product_unit: unit
        });

      if (error) {
        console.error('Error fetching suggested price:', error);
        return;
      }

      const price = parseFloat(data?.toString() || "0");
      setSuggestedPrice(price);
      
      if (onSuggestedPriceUpdate) {
        onSuggestedPriceUpdate(price);
      }

      // Calculate market trend based on user price vs suggested
      if (userPrice && price > 0) {
        const difference = ((userPrice - price) / price) * 100;
        if (difference > 10) setMarketTrend("up");
        else if (difference < -10) setMarketTrend("down");
        else setMarketTrend("stable");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || suggestedPrice === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPriceComparisonBadge = () => {
    if (!userPrice || suggestedPrice === 0) return null;
    
    const difference = ((userPrice - suggestedPrice) / suggestedPrice) * 100;
    
    if (difference > 10) {
      return (
        <Badge variant="destructive" className="text-xs">
          {t("Above Market", "বাজারের উপরে")} (+{Math.round(difference)}%)
        </Badge>
      );
    } else if (difference < -10) {
      return (
        <Badge variant="secondary" className="text-xs">
          {t("Below Market", "বাজারের নিচে")} ({Math.round(difference)}%)
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" className="text-xs bg-success text-success-foreground">
          {t("Market Rate", "বাজার দর")}
        </Badge>
      );
    }
  };

  return (
    <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <CardTitle className="text-sm">
              {t("Smart Price Suggestion", "স্মার্ট দাম সাজেশন")}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {t(
                      "Based on last 30 days average market price",
                      "গত ৩০ দিনের গড় বাজার দরের উপর ভিত্তি করে"
                    )}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {getPriceComparisonBadge()}
        </div>
        <CardDescription className="text-xs">
          {t(
            `For ${category} sold per ${unit}`,
            `${category} প্রতি ${unit} বিক্রয়ের জন্য`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">
              ৳{suggestedPrice.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("Suggested Price", "সাজেস্ট করা দাম")}
            </div>
          </div>
          {userPrice && (
            <div className="text-right">
              <div className="text-lg font-semibold">
                ৳{userPrice.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("Your Price", "আপনার দাম")}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
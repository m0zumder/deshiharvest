import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { Progress } from "@/components/ui/progress";

interface FarmerReputationProps {
  farmerId: string;
  showDetails?: boolean;
}

interface ReputationData {
  total_orders: number;
  completed_orders: number;
  average_rating: number;
  on_time_deliveries: number;
  trust_score: number;
}

export const FarmerReputationBadge = ({ farmerId, showDetails = false }: FarmerReputationProps) => {
  const { t } = useLanguage();
  const [reputation, setReputation] = useState<ReputationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReputationData();
  }, [farmerId]);

  const fetchReputationData = async () => {
    try {
      const { data, error } = await supabase
        .from('farmer_reputation')
        .select('*')
        .eq('farmer_id', farmerId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching reputation:', error);
        return;
      }

      setReputation(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Badge variant="secondary" className="animate-pulse">
        {t("Loading...", "লোড হচ্ছে...")}
      </Badge>
    );
  }

  if (!reputation) {
    return (
      <Badge variant="secondary">
        {t("New Farmer", "নতুন কৃষক")}
      </Badge>
    );
  }

  const getTrustBadge = (score: number) => {
    if (score >= 80) {
      return (
        <Badge className="bg-success text-success-foreground">
          <Award className="h-3 w-3 mr-1" />
          {t("Trusted", "বিশ্বস্ত")}
        </Badge>
      );
    } else if (score >= 60) {
      return (
        <Badge variant="default">
          <CheckCircle className="h-3 w-3 mr-1" />
          {t("Reliable", "নির্ভরযোগ্য")}
        </Badge>
      );
    } else if (score >= 40) {
      return (
        <Badge variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          {t("Developing", "উন্নতিশীল")}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          {t("New", "নতুন")}
        </Badge>
      );
    }
  };

  const completionRate = reputation.total_orders > 0 
    ? (reputation.completed_orders / reputation.total_orders) * 100 
    : 0;

  const onTimeRate = reputation.completed_orders > 0 
    ? (reputation.on_time_deliveries / reputation.completed_orders) * 100 
    : 0;

  if (!showDetails) {
    return (
      <div className="flex items-center gap-2">
        {getTrustBadge(reputation.trust_score)}
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">
            {reputation.average_rating.toFixed(1)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">
            {t("Farmer Reputation", "কৃষকের খ্যাতি")}
          </h3>
          {getTrustBadge(reputation.trust_score)}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t("Trust Score", "বিশ্বাস স্কোর")}</span>
              <span className="font-medium">{reputation.trust_score.toFixed(0)}/100</span>
            </div>
            <Progress value={reputation.trust_score} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{t("Rating", "রেটিং")}</span>
              </div>
              <span className="font-medium">
                {reputation.average_rating.toFixed(1)}/5.0
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle className="h-3 w-3 text-success" />
                <span>{t("Completion", "সমাপ্তি")}</span>
              </div>
              <span className="font-medium">
                {completionRate.toFixed(0)}%
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                <Clock className="h-3 w-3 text-primary" />
                <span>{t("On-time", "সময়মতো")}</span>
              </div>
              <span className="font-medium">
                {onTimeRate.toFixed(0)}%
              </span>
            </div>

            <div>
              <div className="text-muted-foreground mb-1">
                {t("Orders", "অর্ডার")}
              </div>
              <span className="font-medium">
                {reputation.total_orders}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
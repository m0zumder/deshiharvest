import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartPriceSuggestion } from "@/components/features/SmartPriceSuggestion";
import { FarmerReputationBadge } from "@/components/features/FarmerReputationBadge";
import { OrderPooling } from "@/components/features/OrderPooling";
import { UrgentSaleProducts } from "@/components/features/UrgentSaleProducts";
import { CommunityKnowledgeSharing } from "@/components/features/CommunityKnowledgeSharing";
import { NotificationCenter } from "@/components/features/NotificationCenter";
import { 
  TrendingUp, 
  Users, 
  Package, 
  AlertTriangle, 
  MessageSquare, 
  Bell,
  Star,
  ShoppingCart
} from "lucide-react";

const Dashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isFarmer = userProfile?.role === "farmer";
  const isRetailer = userProfile?.role === "retailer";

  const getWelcomeMessage = () => {
    const name = userProfile?.full_name || user.email;
    const role = t(
      isFarmer ? "Farmer" : "Retailer",
      isFarmer ? "কৃষক" : "খুচরা বিক্রেতা"
    );
    
    return {
      title: t(`Welcome back, ${name}!`, `স্বাগতম, ${name}!`),
      subtitle: t(
        `${role} Dashboard - Manage your ${isFarmer ? 'farm' : 'store'} efficiently`,
        `${role} ড্যাশবোর্ড - আপনার ${isFarmer ? 'খামার' : 'দোকান'} দক্ষতার সাথে পরিচালনা করুন`
      )
    };
  };

  const welcome = getWelcomeMessage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {welcome.title}
          </h1>
          <p className="text-muted-foreground">
            {welcome.subtitle}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Overview", "সংক্ষিপ্ত বিবরণ")}</span>
            </TabsTrigger>
            <TabsTrigger value="pool-orders" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Group Orders", "গ্রুপ অর্ডার")}</span>
            </TabsTrigger>
            <TabsTrigger value="urgent-sale" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Urgent Sale", "জরুরি বিক্রয়")}</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Community", "কমিউনিটি")}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Alerts", "সতর্কতা")}</span>
            </TabsTrigger>
            <TabsTrigger value="reputation" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Reputation", "খ্যাতি")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Smart Price Suggestion Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t("Smart Price Suggestion", "স্মার্ট দাম সাজেশন")}
                  </CardTitle>
                  <CardDescription>
                    {t("AI-powered pricing based on market trends", "বাজারের ট্রেন্ডের উপর ভিত্তি করে AI চালিত মূল্য নির্ধারণ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartPriceSuggestion 
                    category="Vegetables" 
                    unit="kg" 
                    userPrice={45}
                  />
                </CardContent>
              </Card>

              {/* Farmer Reputation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    {t("Trust & Reputation", "বিশ্বাস ও খ্যাতি")}
                  </CardTitle>
                  <CardDescription>
                    {t("Build trust through quality service", "মানসম্পন্ন সেবার মাধ্যমে বিশ্বাস তৈরি করুন")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user && (
                    <FarmerReputationBadge 
                      farmerId={user.id} 
                      showDetails={true} 
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("Total Products", "মোট পণ্য")}
                      </p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-8 w-8 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("Orders", "অর্ডার")}
                      </p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("Group Orders", "গ্রুপ অর্ডার")}
                      </p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("Urgent Sales", "জরুরি বিক্রয়")}
                      </p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pool-orders" className="space-y-6">
            <OrderPooling />
          </TabsContent>

          <TabsContent value="urgent-sale" className="space-y-6">
            <UrgentSaleProducts />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <CommunityKnowledgeSharing />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="reputation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("Your Reputation Score", "আপনার খ্যাতি স্কোর")}
                  </CardTitle>
                  <CardDescription>
                    {t("Track your performance and build trust", "আপনার পারফরম্যান্স ট্র্যাক করুন এবং বিশ্বাস তৈরি করুন")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user && (
                    <FarmerReputationBadge 
                      farmerId={user.id} 
                      showDetails={true} 
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("How to Improve", "কিভাবে উন্নতি করবেন")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <p>{t("Complete orders on time", "সময়মতো অর্ডার সম্পূর্ণ করুন")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <p>{t("Maintain product quality", "পণ্যের মান বজায় রাখুন")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <p>{t("Respond to customers promptly", "গ্রাহকদের দ্রুত সাড়া দিন")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">4</span>
                      </div>
                      <p>{t("Participate in community discussions", "কমিউনিটি আলোচনায় অংশগ্রহণ করুন")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
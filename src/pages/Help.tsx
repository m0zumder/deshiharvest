import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Search, Book, Video, MessageCircle, Users, Truck, ShoppingCart, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const Help = () => {
  const { t } = useLanguage();

  const helpCategories = [
    {
      icon: ShoppingCart,
      title: t("Getting Started", "শুরু করা"),
      description: t("Learn how to use DeshiHarvest platform", "দেশি হার্ভেস্ট প্ল্যাটফর্ম কিভাবে ব্যবহার করবেন শিখুন"),
      articles: [
        t("Creating your account", "আপনার অ্যাকাউন্ট তৈরি করা"),
        t("Browsing products", "পণ্য ব্রাউজ করা"),
        t("Understanding pricing", "মূল্য বোঝা"),
        t("Phone verification process", "ফোন যাচাইকরণ প্রক্রিয়া")
      ]
    },
    {
      icon: Users,
      title: t("For Farmers", "কৃষকদের জন্য"),
      description: t("Guide for farmers selling products", "পণ্য বিক্রয়কারী কৃষকদের জন্য গাইড"),
      articles: [
        t("Adding your products", "আপনার পণ্য যোগ করা"),
        t("Setting prices", "দাম নির্ধারণ"),
        t("Managing orders", "অর্ডার পরিচালনা"),
        t("Building reputation", "খ্যাতি তৈরি করা")
      ]
    },
    {
      icon: Truck,
      title: t("For Retailers", "খুচরা বিক্রেতাদের জন্য"),
      description: t("Guide for retailers buying products", "পণ্য ক্রয়কারী খুচরা বিক্রেতাদের জন্য গাইড"),
      articles: [
        t("Finding products", "পণ্য খোঁজা"),
        t("Placing orders", "অর্ডার দেওয়া"),
        t("Payment methods", "পেমেন্ট পদ্ধতি"),
        t("Order pooling benefits", "অর্ডার পুলিং সুবিধা")
      ]
    },
    {
      icon: Settings,
      title: t("Account & Settings", "অ্যাকাউন্ট এবং সেটিংস"),
      description: t("Manage your account preferences", "আপনার অ্যাকাউন্ট পছন্দ পরিচালনা করুন"),
      articles: [
        t("Profile management", "প্রোফাইল পরিচালনা"),
        t("Notification settings", "বিজ্ঞপ্তি সেটিংস"),
        t("Language preferences", "ভাষা পছন্দ"),
        t("Security settings", "নিরাপত্তা সেটিংস")
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t("Help Center", "সহায়তা কেন্দ্র")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t(
                "Find answers to your questions and learn how to make the most of DeshiHarvest",
                "আপনার প্রশ্নের উত্তর খুঁজুন এবং দেশি হার্ভেস্টের সর্বোচ্চ ব্যবহার কিভাবে করবেন শিখুন"
              )}
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t("Search help articles...", "সহায়তা নিবন্ধ খুঁজুন...")}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center p-6">
              <Video className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("Video Tutorials", "ভিডিও টিউটোরিয়াল")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("Watch step-by-step guides", "ধাপে ধাপে গাইড দেখুন")}
              </p>
              <Button variant="outline">
                {t("Watch Videos", "ভিডিও দেখুন")}
              </Button>
            </Card>

            <Card className="text-center p-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("Live Chat", "লাইভ চ্যাট")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("Chat with our support team", "আমাদের সাপোর্ট টিমের সাথে চ্যাট করুন")}
              </p>
              <Button>
                {t("Start Chat", "চ্যাট শুরু করুন")}
              </Button>
            </Card>

            <Card className="text-center p-6">
              <Book className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("User Guide", "ব্যবহারকারী গাইড")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("Complete platform guide", "সম্পূর্ণ প্ল্যাটফর্ম গাইড")}
              </p>
              <Button variant="outline">
                {t("Download PDF", "PDF ডাউনলোড করুন")}
              </Button>
            </Card>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <span>{category.title}</span>
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                            {article}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Popular Articles */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t("Popular Articles", "জনপ্রিয় নিবন্ধ")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("How to verify your phone number", "আপনার ফোন নম্বর কিভাবে যাচাই করবেন")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {t("Step-by-step guide to verify your phone number for account security", "অ্যাকাউন্ট নিরাপত্তার জন্য আপনার ফোন নম্বর যাচাই করার ধাপে ধাপে গাইড")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("Understanding order pooling", "অর্ডার পুলিং বোঝা")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {t("Learn how order pooling can help you get better prices and reduce costs", "অর্ডার পুলিং কিভাবে আপনাকে ভাল দাম পেতে এবং খরচ কমাতে সাহায্য করতে পারে তা শিখুন")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("Farmer reputation system", "কৃষক খ্যাতি সিস্টেম")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {t("How farmer ratings work and why they matter for quality assurance", "কৃষক রেটিং কিভাবে কাজ করে এবং কেন তারা গুণমান নিশ্চিতকরণের জন্য গুরুত্বপূর্ণ")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Still Need Help */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>
                  {t("Still need help?", "এখনও সাহায্য প্রয়োজন?")}
                </CardTitle>
                <CardDescription>
                  {t("Our support team is here to assist you", "আমাদের সাপোর্ট টিম আপনাকে সাহায্য করার জন্য এখানে আছে")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>
                    {t("Contact Support", "সাপোর্টের সাথে যোগাযোগ করুন")}
                  </Button>
                  <Button variant="outline">
                    {t("Call Us", "আমাদের কল করুন")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
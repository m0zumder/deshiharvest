import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Cookie, Settings, BarChart, Shield, Eye } from "lucide-react";

const CookiePolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t("Cookie Policy", "কুকি নীতি")}
            </h1>
            <p className="text-muted-foreground">
              {t("Last updated: January 2024", "সর্বশেষ আপডেট: জানুয়ারি ২০২৪")}
            </p>
          </div>

          <div className="space-y-8">
            {/* What Are Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  <span>{t("What Are Cookies?", "কুকি কি?")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(
                    "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services. DeshiHarvest uses cookies to enhance your agricultural marketplace experience.",
                    "কুকি হল ছোট টেক্সট ফাইল যা আপনি আমাদের ওয়েবসাইট দেখার সময় আপনার ডিভাইসে সংরক্ষিত হয়। এগুলি আপনার পছন্দগুলি মনে রেখে এবং আমাদের সেবা উন্নত করে আপনাকে একটি ভাল অভিজ্ঞতা প্রদান করতে সাহায্য করে। দেশি হার্ভেস্ট আপনার কৃষি বাজারের অভিজ্ঞতা বাড়াতে কুকি ব্যবহার করে।"
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>{t("Types of Cookies We Use", "আমরা যে ধরনের কুকি ব্যবহার করি")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>{t("Essential Cookies", "প্রয়োজনীয় কুকি")}</span>
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    {t("These cookies are necessary for the website to function properly:", "এই কুকিগুলি ওয়েবসাইটের সঠিকভাবে কাজ করার জন্য প্রয়োজনীয়:")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>{t("User authentication and login sessions", "ব্যবহারকারী প্রমাণীকরণ এবং লগইন সেশন")}</li>
                    <li>{t("Shopping cart functionality", "শপিং কার্ট কার্যকারিতা")}</li>
                    <li>{t("Security and fraud prevention", "নিরাপত্তা এবং জালিয়াতি প্রতিরোধ")}</li>
                    <li>{t("Language preferences", "ভাষা পছন্দ")}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <BarChart className="h-4 w-4 text-blue-500" />
                    <span>{t("Analytics Cookies", "বিশ্লেষণ কুকি")}</span>
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    {t("These cookies help us understand how you use our platform:", "এই কুকিগুলি আমাদের বুঝতে সাহায্য করে যে আপনি কিভাবে আমাদের প্ল্যাটফর্ম ব্যবহার করেন:")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>{t("Page views and user interactions", "পৃষ্ঠা দেখা এবং ব্যবহারকারীর মিথস্ক্রিয়া")}</li>
                    <li>{t("Popular products and features", "জনপ্রিয় পণ্য এবং বৈশিষ্ট্য")}</li>
                    <li>{t("Platform performance monitoring", "প্ল্যাটফর্ম পারফরমেন্স মনিটরিং")}</li>
                    <li>{t("User journey analysis", "ব্যবহারকারীর যাত্রা বিশ্লেষণ")}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <span>{t("Functional Cookies", "কার্যকরী কুকি")}</span>
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    {t("These cookies enhance your experience with personalized features:", "এই কুকিগুলি ব্যক্তিগতকৃত বৈশিষ্ট্যের সাথে আপনার অভিজ্ঞতা বাড়ায়:")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>{t("Remembering your location preferences", "আপনার অবস্থান পছন্দ মনে রাখা")}</li>
                    <li>{t("Customized product recommendations", "কাস্টমাইজড পণ্যের সুপারিশ")}</li>
                    <li>{t("Saved search filters", "সংরক্ষিত অনুসন্ধান ফিল্টার")}</li>
                    <li>{t("Dashboard layout preferences", "ড্যাশবোর্ড লেআউট পছন্দ")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>{t("How We Use Cookies", "আমরা কিভাবে কুকি ব্যবহার করি")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("We use cookies to:", "আমরা কুকি ব্যবহার করি:")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t("Keep you signed in to your account", "আপনাকে আপনার অ্যাকাউন্টে সাইন ইন রাখতে")}</li>
                  <li>{t("Remember your language preference (Bangla/English)", "আপনার ভাষা পছন্দ মনে রাখতে (বাংলা/ইংরেজি)")}</li>
                  <li>{t("Improve platform performance and speed", "প্ল্যাটফর্ম পারফরমেন্স এবং গতি উন্নত করতে")}</li>
                  <li>{t("Provide relevant product suggestions", "প্রাসঙ্গিক পণ্য সুপারিশ প্রদান করতে")}</li>
                  <li>{t("Analyze usage patterns to improve our services", "আমাদের সেবা উন্নত করতে ব্যবহারের ধরন বিশ্লেষণ করতে")}</li>
                  <li>{t("Prevent fraud and ensure platform security", "জালিয়াতি প্রতিরোধ এবং প্ল্যাটফর্ম নিরাপত্তা নিশ্চিত করতে")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookie Duration */}
            <Card>
              <CardHeader>
                <CardTitle>{t("How Long Do Cookies Last?", "কুকি কতক্ষণ স্থায়ী হয়?")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t("Session Cookies", "সেশন কুকি")}
                    </h4>
                    <p className="text-muted-foreground">
                      {t(
                        "These are temporary cookies that expire when you close your browser. They help with authentication and navigation during your current session.",
                        "এগুলি অস্থায়ী কুকি যা আপনি আপনার ব্রাউজার বন্ধ করলে মেয়াদ শেষ হয়ে যায়। এগুলি আপনার বর্তমান সেশনের সময় প্রমাণীকরণ এবং নেভিগেশনে সাহায্য করে।"
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t("Persistent Cookies", "স্থায়ী কুকি")}
                    </h4>
                    <p className="text-muted-foreground">
                      {t(
                        "These cookies remain on your device for a set period (typically 30 days to 1 year) and help remember your preferences across visits.",
                        "এই কুকিগুলি একটি নির্ধারিত সময়ের জন্য (সাধারণত ৩০ দিন থেকে ১ বছর) আপনার ডিভাইসে থাকে এবং দেখার জুড়ে আপনার পছন্দগুলি মনে রাখতে সাহায্য করে।"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Managing Your Cookie Preferences", "আপনার কুকি পছন্দ পরিচালনা করা")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("You have control over cookie usage:", "কুকি ব্যবহারের উপর আপনার নিয়ন্ত্রণ রয়েছে:")}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t("Browser Settings", "ব্রাউজার সেটিংস")}
                    </h4>
                    <p className="text-muted-foreground mb-2">
                      {t("You can control cookies through your browser settings:", "আপনি আপনার ব্রাউজার সেটিংসের মাধ্যমে কুকি নিয়ন্ত্রণ করতে পারেন:")}
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>{t("Block all cookies", "সব কুকি ব্লক করুন")}</li>
                      <li>{t("Allow only first-party cookies", "শুধুমাত্র ফার্স্ট-পার্টি কুকি অনুমতি দিন")}</li>
                      <li>{t("Delete existing cookies", "বিদ্যমান কুকি মুছে ফেলুন")}</li>
                      <li>{t("Set notifications for new cookies", "নতুন কুকির জন্য বিজ্ঞপ্তি সেট করুন")}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 text-sm">
                      <strong>{t("Important Note", "গুরুত্বপূর্ণ নোট")}:</strong> {t(
                        "Disabling essential cookies may affect the functionality of DeshiHarvest platform, including login and cart features.",
                        "প্রয়োজনীয় কুকি নিষ্ক্রিয় করলে লগইন এবং কার্ট বৈশিষ্ট্য সহ দেশি হার্ভেস্ট প্ল্যাটফর্মের কার্যকারিতা প্রভাবিত হতে পারে।"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Third-Party Services", "তৃতীয় পক্ষের সেবা")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("We may use third-party services that set their own cookies:", "আমরা তৃতীয় পক্ষের সেবা ব্যবহার করতে পারি যারা তাদের নিজস্ব কুকি সেট করে:")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("Google Analytics for website analytics", "ওয়েবসাইট বিশ্লেষণের জন্য গুগল অ্যানালিটিক্স")}</li>
                  <li>{t("Payment processors for secure transactions", "নিরাপদ লেনদেনের জন্য পেমেন্ট প্রসেসর")}</li>
                  <li>{t("Customer support chat services", "গ্রাহক সহায়তা চ্যাট সেবা")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Updates to Policy */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Updates to This Policy", "এই নীতির আপডেট")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(
                    "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any significant changes by posting the updated policy on our website.",
                    "আমরা আমাদের অনুশীলনের পরিবর্তন বা আইনগত কারণে সময়ে সময়ে এই কুকি নীতি আপডেট করতে পারি। আমরা আমাদের ওয়েবসাইটে আপডেট করা নীতি পোস্ট করে যেকোনো গুরুত্বপূর্ণ পরিবর্তনের বিষয়ে আপনাকে অবহিত করব।"
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Questions About Cookies?", "কুকি সম্পর্কে প্রশ্ন?")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "If you have any questions about our use of cookies, please contact us:",
                    "আমাদের কুকি ব্যবহার সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:"
                  )}
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>{t("Email", "ইমেইল")}:</strong> cookies@deshiharvest.com</p>
                  <p><strong>{t("Phone", "ফোন")}:</strong> +880 1XXX-XXXXXX</p>
                </div>
                
                <div className="mt-6">
                  <Button>
                    {t("Manage Cookie Preferences", "কুকি পছন্দ পরিচালনা করুন")}
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

export default CookiePolicy;
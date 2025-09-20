import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, Eye, Phone, Database, Share2, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t("Privacy Policy", "গোপনীয়তা নীতি")}
            </h1>
            <p className="text-muted-foreground">
              {t("Last updated: January 2024", "সর্বশেষ আপডেট: জানুয়ারি ২০২৪")}
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <span>{t("Introduction", "ভূমিকা")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  {t(
                    "At DeshiHarvest, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our agricultural marketplace platform.",
                    "দেশি হার্ভেস্টে, আমরা আপনার গোপনীয়তা রক্ষা করতে এবং আপনার ব্যক্তিগত তথ্যের নিরাপত্তা নিশ্চিত করতে প্রতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আপনি আমাদের কৃষি বাজার প্ল্যাটফর্ম ব্যবহার করার সময় আমরা কিভাবে আপনার ডেটা সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি।"
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>{t("Information We Collect", "আমরা যে তথ্য সংগ্রহ করি")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t("Personal Information", "ব্যক্তিগত তথ্য")}
                    </h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>{t("Full name and contact details", "পূর্ণ নাম এবং যোগাযোগের বিবরণ")}</li>
                      <li>{t("Phone number for verification and communication", "যাচাইকরণ এবং যোগাযোগের জন্য ফোন নম্বর")}</li>
                      <li>{t("Location and address information", "অবস্থান এবং ঠিকানার তথ্য")}</li>
                      <li>{t("Business information (for farmers and retailers)", "ব্যবসায়িক তথ্য (কৃষক এবং খুচরা বিক্রেতাদের জন্য)")}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t("Usage Information", "ব্যবহারের তথ্য")}
                    </h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>{t("Platform usage patterns and preferences", "প্ল্যাটফর্ম ব্যবহারের ধরন এবং পছন্দ")}</li>
                      <li>{t("Transaction history and order details", "লেনদেনের ইতিহাস এবং অর্ডারের বিবরণ")}</li>
                      <li>{t("Communication records with other users", "অন্যান্য ব্যবহারকারীদের সাথে যোগাযোগের রেকর্ড")}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  <span>{t("How We Use Your Information", "আমরা কিভাবে আপনার তথ্য ব্যবহার করি")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t("To provide and improve our marketplace services", "আমাদের বাজার সেবা প্রদান এবং উন্নত করতে")}</li>
                  <li>{t("To verify user accounts and prevent fraud", "ব্যবহারকারী অ্যাকাউন্ট যাচাই করতে এবং জালিয়াতি প্রতিরোধ করতে")}</li>
                  <li>{t("To facilitate transactions between farmers and retailers", "কৃষক এবং খুচরা বিক্রেতাদের মধ্যে লেনদেন সহজ করতে")}</li>
                  <li>{t("To send important notifications via SMS", "SMS এর মাধ্যমে গুরুত্বপূর্ণ বিজ্ঞপ্তি পাঠাতে")}</li>
                  <li>{t("To calculate farmer reputation scores", "কৃষক খ্যাতি স্কোর গণনা করতে")}</li>
                  <li>{t("To provide customer support", "গ্রাহক সহায়তা প্রদান করতে")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Phone Number Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{t("Phone Number Usage", "ফোন নম্বর ব্যবহার")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "Your phone number is essential for our service and is used for:",
                    "আপনার ফোন নম্বর আমাদের সেবার জন্য অপরিহার্য এবং এটি ব্যবহৃত হয়:"
                  )}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("Account verification and security", "অ্যাকাউন্ট যাচাইকরণ এবং নিরাপত্তা")}</li>
                  <li>{t("Order confirmations and updates", "অর্ডার নিশ্চিতকরণ এবং আপডেট")}</li>
                  <li>{t("Urgent notifications about your transactions", "আপনার লেনদেন সম্পর্কে জরুরি বিজ্ঞপ্তি")}</li>
                  <li>{t("Direct communication between farmers and retailers", "কৃষক এবং খুচরা বিক্রেতাদের মধ্যে সরাসরি যোগাযোগ")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <span>{t("Data Security", "ডেটা নিরাপত্তা")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "We implement industry-standard security measures to protect your personal information:",
                    "আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে শিল্প-মানের নিরাপত্তা ব্যবস্থা প্রয়োগ করি:"
                  )}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("Encrypted data transmission and storage", "এনক্রিপ্টেড ডেটা ট্রান্সমিশন এবং স্টোরেজ")}</li>
                  <li>{t("Secure authentication and access controls", "নিরাপদ প্রমাণীকরণ এবং অ্যাক্সেস নিয়ন্ত্রণ")}</li>
                  <li>{t("Regular security audits and updates", "নিয়মিত নিরাপত্তা অডিট এবং আপডেট")}</li>
                  <li>{t("Limited employee access to personal data", "ব্যক্তিগত তথ্যে সীমিত কর্মচারী অ্যাক্সেস")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Your Rights", "আপনার অধিকার")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("You have the following rights regarding your personal data:", "আপনার ব্যক্তিগত তথ্য সম্পর্কে আপনার নিম্নলিখিত অধিকার রয়েছে:")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("Access and review your personal information", "আপনার ব্যক্তিগত তথ্য অ্যাক্সেস এবং পর্যালোচনা করা")}</li>
                  <li>{t("Update or correct inaccurate information", "ভুল তথ্য আপডেট বা সংশোধন করা")}</li>
                  <li>{t("Request deletion of your data (subject to legal requirements)", "আপনার ডেটা মুছে ফেলার অনুরোধ করা (আইনি প্রয়োজনীয়তার সাপেক্ষে)")}</li>
                  <li>{t("Opt-out of certain communications", "নির্দিষ্ট যোগাযোগ থেকে অপ্ট-আউট করা")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Contact Us", "আমাদের সাথে যোগাযোগ করুন")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "If you have any questions about this Privacy Policy or your personal data, please contact us:",
                    "এই গোপনীয়তা নীতি বা আপনার ব্যক্তিগত তথ্য সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:"
                  )}
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>{t("Email", "ইমেইল")}:</strong> privacy@deshiharvest.com</p>
                  <p><strong>{t("Phone", "ফোন")}:</strong> +880 1XXX-XXXXXX</p>
                  <p><strong>{t("Address", "ঠিকানা")}:</strong> {t("DeshiHarvest, Dhaka, Bangladesh", "দেশি হার্ভেস্ট, ঢাকা, বাংলাদেশ")}</p>
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

export default PrivacyPolicy;
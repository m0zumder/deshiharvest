import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { FileText, Users, ShoppingCart, AlertTriangle, Scale, Phone } from "lucide-react";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t("Terms of Service", "সেবার শর্তাবলী")}
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
                  <FileText className="h-5 w-5 text-primary" />
                  <span>{t("Agreement to Terms", "শর্তাবলীতে সম্মতি")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(
                    "By accessing and using DeshiHarvest, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our agricultural marketplace platform that connects farmers with retailers in Bangladesh.",
                    "দেশি হার্ভেস্ট অ্যাক্সেস এবং ব্যবহার করার মাধ্যমে, আপনি এই চুক্তির শর্তাবলী এবং বিধান দ্বারা আবদ্ধ হতে স্বীকার করেন এবং সম্মত হন। এই সেবার শর্তাবলী বাংলাদেশে কৃষক এবং খুচরা বিক্রেতাদের সংযোগকারী আমাদের কৃষি বাজার প্ল্যাটফর্মের আপনার ব্যবহার নিয়ন্ত্রণ করে।"
                  )}
                </p>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{t("User Accounts and Registration", "ব্যবহারকারী অ্যাকাউন্ট এবং নিবন্ধন")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("Account Creation", "অ্যাকাউন্ট তৈরি")}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>{t("You must provide accurate and complete information during registration", "নিবন্ধনের সময় আপনাকে অবশ্যই সঠিক এবং সম্পূর্ণ তথ্য প্রদান করতে হবে")}</li>
                    <li>{t("Phone number verification is required for all accounts", "সকল অ্যাকাউন্টের জন্য ফোন নম্বর যাচাইকরণ প্রয়োজন")}</li>
                    <li>{t("You are responsible for maintaining account security", "অ্যাকাউন্ট নিরাপত্তা বজায় রাখার দায়িত্ব আপনার")}</li>
                    <li>{t("One account per person or business entity", "প্রতি ব্যক্তি বা ব্যবসায়িক প্রতিষ্ঠানের জন্য একটি অ্যাকাউন্ট")}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("Account Types", "অ্যাকাউন্টের ধরন")}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>{t("Farmer Accounts", "কৃষক অ্যাকাউন্ট")}:</strong> {t("For agricultural producers selling products", "কৃষি পণ্য বিক্রয়কারী উৎপাদকদের জন্য")}</li>
                    <li><strong>{t("Retailer Accounts", "খুচরা বিক্রেতা অ্যাকাউন্ট")}:</strong> {t("For businesses purchasing agricultural products", "কৃষি পণ্য ক্রয়কারী ব্যবসার জন্য")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Platform Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <span>{t("Platform Usage", "প্ল্যাটফর্ম ব্যবহার")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("For Farmers", "কৃষকদের জন্য")}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>{t("List only genuine agricultural products you own or represent", "শুধুমাত্র আপনার মালিকানাধীন বা প্রতিনিধিত্বকারী প্রকৃত কৃষি পণ্য তালিকাভুক্ত করুন")}</li>
                    <li>{t("Provide accurate product descriptions, quantities, and prices", "সঠিক পণ্যের বিবরণ, পরিমাণ এবং দাম প্রদান করুন")}</li>
                    <li>{t("Honor all confirmed orders and delivery commitments", "সকল নিশ্চিত অর্ডার এবং ডেলিভারি প্রতিশ্রুতি সম্মান করুন")}</li>
                    <li>{t("Maintain product quality standards", "পণ্যের মান নিয়ন্ত্রণ বজায় রাখুন")}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("For Retailers", "খুচরা বিক্রেতাদের জন্য")}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>{t("Place orders only for legitimate business purposes", "শুধুমাত্র বৈধ ব্যবসায়িক উদ্দেশ্যে অর্ডার দিন")}</li>
                    <li>{t("Make timely payments as per agreed terms", "সম্মত শর্ত অনুযায়ী সময়মতো পেমেন্ট করুন")}</li>
                    <li>{t("Communicate professionally with farmers", "কৃষকদের সাথে পেশাদারভাবে যোগাযোগ করুন")}</li>
                    <li>{t("Provide fair and honest feedback", "ন্যায্য এবং সৎ মতামত প্রদান করুন")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>{t("Prohibited Activities", "নিষিদ্ধ কার্যকলাপ")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("The following activities are strictly prohibited:", "নিম্নলিখিত কার্যকলাপগুলি কঠোরভাবে নিষিদ্ধ:")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("Listing fake, counterfeit, or non-existent products", "জাল, নকল বা অস্তিত্বহীন পণ্য তালিকাভুক্ত করা")}</li>
                  <li>{t("Manipulating prices or engaging in price fixing", "দাম ম্যানিপুলেট করা বা দাম নির্ধারণে জড়িত হওয়া")}</li>
                  <li>{t("Creating multiple accounts to manipulate ratings", "রেটিং ম্যানিপুলেট করার জন্য একাধিক অ্যাকাউন্ট তৈরি করা")}</li>
                  <li>{t("Harassing or threatening other users", "অন্যান্য ব্যবহারকারীদের হয়রানি বা হুমকি দেওয়া")}</li>
                  <li>{t("Sharing false information about products or services", "পণ্য বা সেবা সম্পর্কে মিথ্যা তথ্য শেয়ার করা")}</li>
                  <li>{t("Using the platform for any illegal activities", "যেকোনো অবৈধ কার্যকলাপের জন্য প্ল্যাটফর্ম ব্যবহার করা")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Payment and Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{t("Payment and Transactions", "পেমেন্ট এবং লেনদেন")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t("All transactions are conducted directly between farmers and retailers", "সকল লেনদেন সরাসরি কৃষক এবং খুচরা বিক্রেতাদের মধ্যে পরিচালিত হয়")}</li>
                  <li>{t("Payment methods include mobile banking (bKash, Nagad, Rocket) and cash on delivery", "পেমেন্ট পদ্ধতির মধ্যে মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট) এবং ক্যাশ অন ডেলিভারি রয়েছে")}</li>
                  <li>{t("DeshiHarvest does not process payments but facilitates connections", "দেশি হার্ভেস্ট পেমেন্ট প্রক্রিয়া করে না কিন্তু সংযোগ সহজ করে")}</li>
                  <li>{t("Users are responsible for resolving payment disputes", "পেমেন্ট বিরোধ সমাধানের দায়িত্ব ব্যবহারকারীদের")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Liability and Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="h-5 w-5 text-primary" />
                  <span>{t("Liability and Disclaimers", "দায়বদ্ধতা এবং দাবিমুক্তি")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t("DeshiHarvest is a marketplace platform and not responsible for product quality", "দেশি হার্ভেস্ট একটি বাজার প্ল্যাটফর্ম এবং পণ্যের মানের জন্য দায়ী নয়")}</li>
                  <li>{t("We do not guarantee the accuracy of product listings", "আমরা পণ্য তালিকার সঠিকতার গ্যারান্টি দিই না")}</li>
                  <li>{t("Users transact at their own risk", "ব্যবহারকারীরা তাদের নিজস্ব ঝুঁকিতে লেনদেন করেন")}</li>
                  <li>{t("Platform availability may be subject to maintenance and technical issues", "প্ল্যাটফর্ম প্রাপ্যতা রক্ষণাবেক্ষণ এবং প্রযুক্তিগত সমস্যার সাপেক্ষে হতে পারে")}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Account Termination", "অ্যাকাউন্ট বন্ধকরণ")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("We reserve the right to suspend or terminate accounts that violate these terms:", "আমরা এই শর্তাবলী লঙ্ঘনকারী অ্যাকাউন্টগুলি স্থগিত বা বন্ধ করার অধিকার সংরক্ষণ করি:")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>{t("Violation of prohibited activities", "নিষিদ্ধ কার্যকলাপের লঙ্ঘন")}</li>
                  <li>{t("Repeated complaints from other users", "অন্যান্য ব্যবহারকারীদের থেকে বারবার অভিযোগ")}</li>
                  <li>{t("Fraudulent or suspicious activities", "জালিয়াতি বা সন্দেহজনক কার্যকলাপ")}</li>
                  <li>{t("Non-compliance with verification requirements", "যাচাইকরণ প্রয়োজনীয়তার সাথে অসামঞ্জস্য")}</li>
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
                    "If you have questions about these Terms of Service, please contact us:",
                    "এই সেবার শর্তাবলী সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:"
                  )}
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>{t("Email", "ইমেইল")}:</strong> legal@deshiharvest.com</p>
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

export default Terms;
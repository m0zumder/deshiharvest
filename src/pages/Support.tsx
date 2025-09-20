import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Phone, Mail, MessageCircle, Clock, User, FileText } from "lucide-react";

const Support = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t("Customer Support", "গ্রাহক সহায়তা")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                "We're here to help you with any questions about DeshiHarvest platform",
                "দেশি হার্ভেস্ট প্ল্যাটফর্ম সম্পর্কে আপনার যেকোনো প্রশ্নে আমরা এখানে সাহায্য করার জন্য আছি"
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>{t("Phone Support", "ফোন সাপোর্ট")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("Call us for immediate assistance", "তাৎক্ষণিক সহায়তার জন্য আমাদের কল করুন")}
                  </p>
                  <p className="font-semibold">+880 1XXX-XXXXXX</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Daily 9 AM - 8 PM", "দৈনিক সকাল ৯টা - রাত ৮টা")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>{t("WhatsApp", "হোয়াটসঅ্যাপ")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("Chat with us on WhatsApp", "হোয়াটসঅ্যাপে আমাদের সাথে চ্যাট করুন")}
                  </p>
                  <Button className="w-full">
                    {t("Start WhatsApp Chat", "হোয়াটসঅ্যাপ চ্যাট শুরু করুন")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>{t("Email Support", "ইমেইল সাপোর্ট")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("Send us an email for detailed inquiries", "বিস্তারিত জিজ্ঞাসার জন্য আমাদের ইমেইল পাঠান")}
                  </p>
                  <p className="font-semibold">support@deshiharvest.com</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Response within 24 hours", "২৪ ঘন্টার মধ্যে উত্তর")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("Send us a Message", "আমাদের একটি বার্তা পাঠান")}</CardTitle>
                  <CardDescription>
                    {t(
                      "Fill out the form below and we'll get back to you as soon as possible",
                      "নিচের ফর্মটি পূরণ করুন এবং আমরা যত তাড়াতাড়ি সম্ভব আপনার কাছে ফিরে আসব"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("Full Name", "পূর্ণ নাম")}</Label>
                        <Input id="name" placeholder={t("Enter your name", "আপনার নাম লিখুন")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("Phone Number", "ফোন নম্বর")}</Label>
                        <Input id="phone" placeholder="+880 1XXX-XXXXXX" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("Email Address", "ইমেইল ঠিকানা")}</Label>
                      <Input id="email" type="email" placeholder={t("Enter your email", "আপনার ইমেইল লিখুন")} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("Subject", "বিষয়")}</Label>
                      <Input id="subject" placeholder={t("What is this about?", "এটি কি সম্পর্কে?")} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("Message", "বার্তা")}</Label>
                      <Textarea 
                        id="message" 
                        rows={6}
                        placeholder={t("Describe your issue or question in detail", "আপনার সমস্যা বা প্রশ্ন বিস্তারিত বর্ণনা করুন")} 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      {t("Send Message", "বার্তা পাঠান")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t("Frequently Asked Questions", "প্রায়শই জিজ্ঞাসিত প্রশ্ন")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("How do I create an account?", "আমি কিভাবে একটি অ্যাকাউন্ট তৈরি করব?")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Click on 'Sign Up' and follow the registration process. You'll need to provide your phone number for verification.",
                      "'সাইন আপ' এ ক্লিক করুন এবং নিবন্ধন প্রক্রিয়া অনুসরণ করুন। যাচাইকরণের জন্য আপনাকে আপনার ফোন নম্বর প্রদান করতে হবে।"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("How does payment work?", "পেমেন্ট কিভাবে কাজ করে?")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "We support mobile banking (bKash, Nagad, Rocket) and cash on delivery for secure transactions.",
                      "নিরাপদ লেনদেনের জন্য আমরা মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট) এবং ক্যাশ অন ডেলিভারি সাপোর্ট করি।"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("What areas do you serve?", "আপনারা কোন এলাকায় সেবা দেন?")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "We currently serve all major districts in Bangladesh. Check our coverage area during checkout.",
                      "আমরা বর্তমানে বাংলাদেশের সকল প্রধান জেলায় সেবা দিই। চেকআউটের সময় আমাদের কভারেজ এলাকা চেক করুন।"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("How do I track my order?", "আমি কিভাবে আমার অর্ডার ট্র্যাক করব?")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "You can track your order status in your dashboard or receive SMS updates on your registered phone number.",
                      "আপনি আপনার ড্যাশবোর্ডে আপনার অর্ডারের স্ট্যাটাস ট্র্যাক করতে পারেন বা আপনার নিবন্ধিত ফোন নম্বরে SMS আপডেট পেতে পারেন।"
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
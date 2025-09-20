import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Heart, Users, Sprout, Target, Award, Truck, Phone, Mail, Eye } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: "রহিম উদ্দিন",
      role: t("Founder & CEO", "প্রতিষ্ঠাতা এবং সিইও"),
      description: t("Agricultural technology expert with 15+ years experience", "১৫+ বছরের অভিজ্ঞতা সহ কৃষি প্রযুক্তি বিশেষজ্ঞ")
    },
    {
      name: "ফাতেমা খাতুন",
      role: t("Head of Operations", "অপারেশন প্রধান"),
      description: t("Supply chain and logistics specialist", "সাপ্লাই চেইন এবং লজিস্টিক্স বিশেষজ্ঞ")
    },
    {
      name: "করিম মিয়া",
      role: t("Technology Director", "প্রযুক্তি পরিচালক"),
      description: t("Full-stack developer and platform architect", "ফুল-স্ট্যাক ডেভেলপার এবং প্ল্যাটফর্ম আর্কিটেক্ট")
    }
  ];

  const values = [
    {
      icon: Heart,
      title: t("Farmer-First", "কৃষক-প্রথম"),
      description: t("We prioritize farmer welfare and fair pricing", "আমরা কৃষকের কল্যাণ এবং ন্যায্য মূল্যকে অগ্রাধিকার দিই")
    },
    {
      icon: Users,
      title: t("Community", "সম্প্রদায়"),
      description: t("Building strong agricultural communities", "শক্তিশালী কৃষি সম্প্রদায় গড়ে তোলা")
    },
    {
      icon: Target,
      title: t("Transparency", "স্বচ্ছতা"),
      description: t("Open and honest transactions for all", "সকলের জন্য খোলা এবং সৎ লেনদেন")
    },
    {
      icon: Award,
      title: t("Quality", "গুণমান"),
      description: t("Ensuring the highest quality produce", "সর্বোচ্চ মানের পণ্য নিশ্চিত করা")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sprout className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
                {t("About DeshiHarvest", "দেশি হার্ভেস্ট সম্পর্কে")}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                {t(
                  "Connecting Bangladesh's farmers directly with retailers through technology, creating a fairer and more efficient agricultural marketplace.",
                  "প্রযুক্তির মাধ্যমে বাংলাদেশের কৃষকদের সরাসরি খুচরা বিক্রেতাদের সাথে সংযুক্ত করে একটি ন্যায্য এবং আরও দক্ষ কৃষি বাজার তৈরি করা।"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl">
                    {t("Our Mission", "আমাদের লক্ষ্য")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(
                      "To eliminate middlemen and create direct connections between farmers and retailers, ensuring fair prices for farmers and fresh produce for consumers while building sustainable agricultural communities.",
                      "মধ্যস্বত্বভোগীদের দূর করা এবং কৃষক ও খুচরা বিক্রেতাদের মধ্যে সরাসরি সংযোগ তৈরি করা, কৃষকদের জন্য ন্যায্য দাম এবং ভোক্তাদের জন্য তাজা পণ্য নিশ্চিত করার পাশাপাশি টেকসই কৃষি সম্প্রদায় গড়ে তোলা।"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardHeader className="text-center">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl">
                    {t("Our Vision", "আমাদের দৃষ্টিভঙ্গি")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(
                      "To become Bangladesh's leading agricultural marketplace, empowering every farmer with technology and creating a transparent, efficient food supply chain that benefits everyone from farm to table.",
                      "বাংলাদেশের শীর্ষস্থানীয় কৃষি বাজার হয়ে ওঠা, প্রতিটি কৃষককে প্রযুক্তির মাধ্যমে ক্ষমতায়ন করা এবং একটি স্বচ্ছ, দক্ষ খাদ্য সরবরাহ চেইন তৈরি করা যা খামার থেকে টেবিল পর্যন্ত সবার উপকার করে।"
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">
                {t("Our Story", "আমাদের গল্প")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "DeshiHarvest was born from a simple observation: farmers in Bangladesh were struggling to get fair prices for their produce, while retailers were paying high costs due to multiple intermediaries. Our founders, coming from agricultural backgrounds themselves, decided to leverage technology to solve this age-old problem.",
                  "দেশি হার্ভেস্ট একটি সহজ পর্যবেক্ষণ থেকে জন্ম: বাংলাদেশের কৃষকরা তাদের পণ্যের জন্য ন্যায্য দাম পেতে সংগ্রাম করছিলেন, যখন খুচরা বিক্রেতারা একাধিক মধ্যস্বত্বভোগীর কারণে উচ্চ খরচ দিচ্ছিলেন। আমাদের প্রতিষ্ঠাতারা, নিজেরাই কৃষি পটভূমি থেকে এসে, এই পুরানো সমস্যার সমাধানে প্রযুক্তি ব্যবহার করার সিদ্ধান্ত নিয়েছিলেন।"
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2023</span>
                  </div>
                  <CardTitle>{t("Foundation", "প্রতিষ্ঠা")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {t("DeshiHarvest was founded with the vision of revolutionizing Bangladesh's agricultural supply chain", "বাংলাদেশের কৃষি সরবরাহ চেইনে বিপ্লব আনার দৃষ্টিভঙ্গি নিয়ে দেশি হার্ভেস্ট প্রতিষ্ঠিত হয়েছিল")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">500+</span>
                  </div>
                  <CardTitle>{t("Farmers Joined", "কৃষক যোগদান")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {t("Over 500 farmers across Bangladesh have joined our platform to sell their produce directly", "বাংলাদেশ জুড়ে ৫০০+ কৃষক তাদের পণ্য সরাসরি বিক্রয়ের জন্য আমাদের প্ল্যাটফর্মে যোগ দিয়েছেন")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">50+</span>
                  </div>
                  <CardTitle>{t("Districts Covered", "জেলা কভার")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {t("We now serve farmers and retailers across 50+ districts in Bangladesh", "আমরা এখন বাংলাদেশের ৫০+ জেলায় কৃষক এবং খুচরা বিক্রেতাদের সেবা দিচ্ছি")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">
                {t("Our Values", "আমাদের মূল্যবোধ")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {t(
                  "These core values guide everything we do and shape our commitment to the agricultural community",
                  "এই মূল মূল্যবোধগুলি আমাদের সবকিছু পরিচালনা করে এবং কৃষি সম্প্রদায়ের প্রতি আমাদের প্রতিশ্রুতি গঠন করে"
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center p-6">
                    <CardHeader>
                      <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">
                {t("Our Team", "আমাদের দল")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {t(
                  "Meet the passionate individuals working to transform Bangladesh's agricultural landscape",
                  "বাংলাদেশের কৃষি প্রাকৃতিক দৃশ্য রূপান্তরিত করতে কাজ করা আবেগপ্রবণ ব্যক্তিদের সাথে পরিচিত হন"
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center p-6">
                  <CardHeader>
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-primary font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">
                {t("Our Impact", "আমাদের প্রভাব")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">১০,০০০+</div>
                <div className="text-muted-foreground">
                  {t("Successful Transactions", "সফল লেনদেন")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">৳৫ কোটি+</div>
                <div className="text-muted-foreground">
                  {t("Farmer Earnings", "কৃষকদের আয়")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">২৪ ঘন্টা</div>
                <div className="text-muted-foreground">
                  {t("Average Delivery Time", "গড় ডেলিভারি সময়")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">৯৮%</div>
                <div className="text-muted-foreground">
                  {t("Customer Satisfaction", "গ্রাহক সন্তুষ্টি")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                {t("Join Our Mission", "আমাদের মিশনে যোগ দিন")}
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                {t(
                  "Be part of the agricultural revolution in Bangladesh. Whether you're a farmer or retailer, DeshiHarvest is here to support your growth.",
                  "বাংলাদেশের কৃষি বিপ্লবের অংশ হন। আপনি কৃষক হোন বা খুচরা বিক্রেতা, দেশি হার্ভেস্ট আপনার বৃদ্ধিকে সমর্থন করার জন্য এখানে আছে।"
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent-hover">
                  {t("Start Selling", "বিক্রয় শুরু করুন")}
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("Contact Us", "আমাদের সাথে যোগাযোগ করুন")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Sprout } from "lucide-react";

export default function Auth() {
  const { user, loading, signUp, signIn } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"farmer" | "retailer">("farmer");
  const [isLoading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signUp(email, password, fullName, role);
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 flex flex-col">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("DeshiHarvest BD", "দেশি হার্ভেস্ট বিডি")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {t(
                "Connecting farmers directly with retailers",
                "কৃষকদের সরাসরি খুচরা বিক্রেতাদের সাথে সংযুক্ত করা"
              )}
            </p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>
                {t("Welcome to DeshiHarvest", "দেশি হার্ভেস্ট এ স্বাগতম")}
              </CardTitle>
              <CardDescription>
                {t(
                  "Join our agricultural marketplace",
                  "আমাদের কৃষি বাজারে যোগ দিন"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">
                    {t("Sign In", "সাইন ইন")}
                  </TabsTrigger>
                  <TabsTrigger value="signup">
                    {t("Sign Up", "সাইন আপ")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">
                        {t("Email", "ইমেইল")}
                      </Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder={t("Enter your email", "আপনার ইমেইল লিখুন")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">
                        {t("Password", "পাসওয়ার্ড")}
                      </Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={t("Enter your password", "আপনার পাসওয়ার্ড লিখুন")}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t("Signing In...", "সাইন ইন হচ্ছে...") : t("Sign In", "সাইন ইন")}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">
                        {t("Full Name", "পূর্ণ নাম")}
                      </Label>
                      <Input
                        id="fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder={t("Enter your full name", "আপনার পূর্ণ নাম লিখুন")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">
                        {t("Email", "ইমেইল")}
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder={t("Enter your email", "আপনার ইমেইল লিখুন")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">
                        {t("Password", "পাসওয়ার্ড")}
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={t("Enter your password", "আপনার পাসওয়ার্ড লিখুন")}
                        minLength={6}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>{t("I am a", "আমি একজন")}</Label>
                      <RadioGroup value={role} onValueChange={(value: "farmer" | "retailer") => setRole(value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="farmer" id="farmer" />
                          <Label htmlFor="farmer">
                            {t("Farmer", "কৃষক")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="retailer" id="retailer" />
                          <Label htmlFor="retailer">
                            {t("Retailer", "খুচরা বিক্রেতা")}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t("Creating Account...", "অ্যাকাউন্ট তৈরি হচ্ছে...") : t("Create Account", "অ্যাকাউন্ট তৈরি করুন")}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
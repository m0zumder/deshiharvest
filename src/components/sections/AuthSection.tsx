import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  MapPin,
  Tractor,
  Store,
  Shield
} from "lucide-react";

export const AuthSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("farmer");

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-gradient-card shadow-custom-xl border-0 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-gradient-primary rounded-xl shadow-custom-md mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                {isLogin ? "Welcome Back" : "Join DeshiHarvest"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to your account" : "Create your account today"}
              </p>
            </div>

            {/* Role Selection for Registration */}
            {!isLogin && (
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Account Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={userRole === "farmer" ? "default" : "outline"}
                    className={`p-4 h-auto flex-col space-y-2 ${
                      userRole === "farmer" 
                        ? "bg-gradient-primary text-primary-foreground" 
                        : ""
                    }`}
                    onClick={() => setUserRole("farmer")}
                  >
                    <Tractor className="h-6 w-6" />
                    <span className="text-sm font-medium">Farmer</span>
                    <span className="text-xs opacity-80">কৃষক</span>
                  </Button>
                  <Button
                    variant={userRole === "retailer" ? "default" : "outline"}
                    className={`p-4 h-auto flex-col space-y-2 ${
                      userRole === "retailer" 
                        ? "bg-gradient-primary text-primary-foreground" 
                        : ""
                    }`}
                    onClick={() => setUserRole("retailer")}
                  >
                    <Store className="h-6 w-6" />
                    <span className="text-sm font-medium">Retailer</span>
                    <span className="text-xs opacity-80">খুচরা বিক্রেতা</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    className="pl-10"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="area">Area/District</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Select>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="chittagong">Chittagong</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                        <SelectItem value="rajshahi">Rajshahi</SelectItem>
                        <SelectItem value="khulna">Khulna</SelectItem>
                        <SelectItem value="barishal">Barishal</SelectItem>
                        <SelectItem value="rangpur">Rangpur</SelectItem>
                        <SelectItem value="mymensingh">Mymensingh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:shadow-accent transition-all duration-300"
                size="lg"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Toggle */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  className="p-0 ml-1 text-primary hover:text-primary-hover"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>

            {/* Admin Login Note */}
            {isLogin && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">Admin Access</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Email: mynulhossainrafi@gmail.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Password: deshi@admin
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
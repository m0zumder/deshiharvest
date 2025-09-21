import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Truck, Shield } from "lucide-react";
import heroImage from "@/assets/hero-harvest.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Fresh from Farm to
                <span className="text-accent"> Your Market</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-lg">
                Connect directly with local farmers in Bangladesh. Get the freshest produce 
                with fair pricing and transparent transactions.
              </p>
              <p className="text-primary-foreground/80 font-medium">
                কৃষক থেকে বাজার - সরাসরি সংযোগ
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-accent transition-all duration-300 hover:scale-105"
              >
                <a href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="/auth">
                  Join as Farmer (কৃষক)
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-primary-foreground/80">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">1000+</div>
                <div className="text-sm text-primary-foreground/80">Daily Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-primary-foreground/80">Districts</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in">
            <div className="relative overflow-hidden rounded-3xl shadow-custom-xl">
              <img 
                src={heroImage} 
                alt="Fresh vegetables and farmers at DeshiHarvest marketplace"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card/95 backdrop-blur p-4 rounded-xl shadow-custom-lg animate-float">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-success" />
                <div>
                  <div className="text-sm font-medium">Verified Farmers</div>
                  <div className="text-xs text-muted-foreground">Quality Assured</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card/95 backdrop-blur p-4 rounded-xl shadow-custom-lg animate-float delay-300">
              <div className="flex items-center space-x-3">
                <Truck className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-sm font-medium">Fast Delivery</div>
                  <div className="text-xs text-muted-foreground">Same Day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};
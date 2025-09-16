import { 
  Users, 
  ShoppingCart, 
  Truck, 
  Shield, 
  DollarSign, 
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Direct Connection",
    description: "Connect directly with verified farmers across Bangladesh",
    bengali: "সরাসরি কৃষকের সাথে যোগাযোগ"
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description: "Farmers set their own prices, ensuring fair compensation",
    bengali: "ন্যায্য মূল্য নির্ধারণ"
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All products verified for freshness and quality",
    bengali: "গুণগত মান নিশ্চিত"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery for most locations in Bangladesh",
    bengali: "দ্রুত ডেলিভারি সেবা"
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Track your orders from farm to your doorstep",
    bengali: "অর্ডার ট্র্যাকিং সুবিধা"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support in Bengali",
    bengali: "২৪/৭ গ্রাহক সেবা"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose DeshiHarvest?
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Experience the best of local agriculture with modern technology
          </p>
          <p className="text-muted-foreground font-medium">
            আধুনিক প্রযুক্তির সাথে স্থানীয় কৃষির সেরা অভিজ্ঞতা
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card hover:shadow-custom-lg transition-all duration-300 hover:scale-105 border-0 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-gradient-primary rounded-xl shadow-custom-md group-hover:shadow-accent transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-1">
                    {feature.description}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {feature.bengali}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-accent text-accent-foreground px-6 py-3 rounded-full shadow-accent">
            <Star className="h-5 w-5" />
            <span className="font-medium">Join thousands of satisfied customers today!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
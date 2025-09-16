import { Link } from "react-router-dom";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-accent p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">DeshiHarvest</h3>
                <p className="text-xs text-primary-foreground/80">ফসল থেকে বাজার</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-xs">
              Connecting farmers and retailers across Bangladesh for a fairer, 
              more transparent agricultural marketplace.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/products" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Products
              </Link>
              <Link to="/dashboard" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Dashboard
              </Link>
              <Link to="/about" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Users</h4>
            <div className="space-y-2">
              <Link to="/farmers" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Join as Farmer (কৃষক)
              </Link>
              <Link to="/retailers" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Join as Retailer (খুচরা বিক্রেতা)
              </Link>
              <Link to="/support" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Customer Support
              </Link>
              <Link to="/help" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">support@deshiharvest.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 DeshiHarvest. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
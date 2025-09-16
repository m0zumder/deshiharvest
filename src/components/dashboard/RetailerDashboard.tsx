import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Package, 
  Truck,
  Clock,
  Search,
  Heart,
  Star,
  MapPin
} from "lucide-react";

const retailerStats = [
  {
    title: "Total Orders",
    value: "156",
    change: "+8 this week",
    icon: ShoppingCart,
    color: "text-primary"
  },
  {
    title: "Active Orders",
    value: "23",
    change: "In progress",
    icon: Clock,
    color: "text-warning"
  },
  {
    title: "Delivered",
    value: "133",
    change: "98% success rate",
    icon: Truck,
    color: "text-success"
  }
];

const availableProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "আব্দুল করিম",
    location: "Savar, Dhaka",
    price: "৳80/kg",
    originalPrice: "৳90/kg",
    stock: "150 kg",
    rating: 4.8,
    image: "🍅"
  },
  {
    id: 2,
    name: "Fresh Spinach",
    farmer: "রহিমা খাতুন", 
    location: "Manikganj",
    price: "৳40/kg",
    originalPrice: "৳45/kg",
    stock: "75 kg",
    rating: 4.9,
    image: "🥬"
  },
  {
    id: 3,
    name: "Red Carrots",
    farmer: "মোহাম্মদ আলী",
    location: "Tangail",
    price: "৳60/kg",
    originalPrice: "৳65/kg", 
    stock: "200 kg",
    rating: 4.7,
    image: "🥕"
  }
];

const recentOrders = [
  {
    id: "ORD-156",
    items: "Organic Tomatoes, Fresh Spinach",
    farmer: "আব্দুল করিম",
    total: "৳1,200",
    status: "delivered",
    date: "2 days ago"
  },
  {
    id: "ORD-155", 
    items: "Red Carrots",
    farmer: "মোহাম্মদ আলী",
    total: "৳600",
    status: "in-transit",
    date: "1 day ago"
  }
];

export const RetailerDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Retailer Dashboard</h1>
          <p className="text-muted-foreground">Browse products and manage your orders</p>
          <p className="text-sm text-primary font-medium">পণ্য ব্রাউজ করুন এবং অর্ডার পরিচালনা করুন</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {retailerStats.map((stat, index) => (
          <Card 
            key={index}
            className="p-6 bg-gradient-card hover:shadow-custom-lg transition-all duration-300 border-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 bg-gradient-primary rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search & Browse Products */}
      <Card className="p-6 bg-gradient-card border-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">Available Products</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10 w-64" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProducts.map((product) => (
            <Card 
              key={product.id}
              className="p-4 bg-background/50 hover:bg-background/70 transition-all duration-300 hover:shadow-custom-md border-0 group"
            >
              <div className="space-y-4">
                {/* Product Header */}
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{product.image}</div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                </div>

                {/* Farmer Info */}
                <div>
                  <p className="text-sm font-medium text-card-foreground">{product.farmer}</p>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{product.location}</span>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-card-foreground">{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">{product.originalPrice}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{product.stock} available</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-gradient-accent hover:shadow-accent transition-all duration-300"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="p-6 bg-gradient-card border-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">Recent Orders</h2>
          <Button variant="outline" size="sm">View All Orders</Button>
        </div>
        
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div 
              key={order.id}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
            >
              <div>
                <p className="font-medium text-card-foreground">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.items}</p>
                <p className="text-xs text-muted-foreground">From: {order.farmer}</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-card-foreground">{order.total}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              
              <Badge 
                className={
                  order.status === "delivered" 
                    ? "bg-success/10 text-success border-success/20" 
                    : "bg-warning/10 text-warning border-warning/20"
                }
              >
                {order.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
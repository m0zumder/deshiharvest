import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Truck,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Active Products",
    value: "1,234",
    change: "+8%",
    icon: Package,
    color: "text-success"
  },
  {
    title: "Total Orders",
    value: "5,678",
    change: "+24%",
    icon: ShoppingCart,
    color: "text-accent"
  },
  {
    title: "Deliveries",
    value: "4,891",
    change: "+18%",
    icon: Truck,
    color: "text-warning"
  }
];

const recentOrders = [
  {
    id: "ORD-001",
    farmer: "আব্দুল করিম",
    retailer: "Dhaka Fresh Market",
    product: "Organic Tomatoes",
    amount: "৳2,400",
    status: "delivered"
  },
  {
    id: "ORD-002",
    farmer: "রহিমা খাতুন",
    retailer: "Green Valley Store",
    product: "Fresh Spinach",
    amount: "৳800",
    status: "in-transit"
  },
  {
    id: "ORD-003",
    farmer: "মোহাম্মদ আলী",
    retailer: "City Mart",
    product: "Red Carrots",
    amount: "৳1,200",
    status: "pending"
  }
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and performance</p>
        </div>
        <Badge className="bg-gradient-primary text-primary-foreground">
          System Status: Active
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="p-6 bg-gradient-card hover:shadow-custom-lg transition-all duration-300 border-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm text-success font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 bg-gradient-primary rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="p-6 bg-gradient-card border-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">Recent Orders</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div 
              key={order.id}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium text-card-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.product}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {order.farmer} → {order.retailer}
                </p>
                <p className="font-medium text-card-foreground">{order.amount}</p>
              </div>
              
              <Badge 
                className={
                  order.status === "delivered" 
                    ? "bg-success/10 text-success border-success/20" 
                    : order.status === "in-transit"
                    ? "bg-warning/10 text-warning border-warning/20"
                    : "bg-muted text-muted-foreground"
                }
              >
                {order.status === "delivered" && <CheckCircle className="h-3 w-3 mr-1" />}
                {order.status === "in-transit" && <Truck className="h-3 w-3 mr-1" />}
                {order.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                {order.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
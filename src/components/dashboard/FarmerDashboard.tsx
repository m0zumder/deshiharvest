import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Plus,
  Edit,
  Trash2,
  TrendingUp
} from "lucide-react";

const farmerStats = [
  {
    title: "Active Products",
    value: "12",
    change: "+2 this week",
    icon: Package,
    color: "text-primary"
  },
  {
    title: "Total Earnings",
    value: "৳45,600",
    change: "+15% this month",
    icon: DollarSign,
    color: "text-success"
  },
  {
    title: "Orders Received",
    value: "89",
    change: "+23 this week",
    icon: ShoppingCart,
    color: "text-accent"
  }
];

const myProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: "৳80/kg",
    stock: "150 kg",
    orders: 24,
    status: "active"
  },
  {
    id: 2,
    name: "Fresh Spinach",
    category: "Leafy Greens", 
    price: "৳40/kg",
    stock: "75 kg",
    orders: 18,
    status: "active"
  },
  {
    id: 3,
    name: "Red Carrots",
    category: "Root Vegetables",
    price: "৳60/kg", 
    stock: "0 kg",
    orders: 0,
    status: "out-of-stock"
  }
];

export const FarmerDashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and track earnings</p>
          <p className="text-sm text-primary font-medium">আপনার পণ্য পরিচালনা করুন</p>
        </div>
        <Button 
          onClick={() => setShowAddProduct(true)}
          className="bg-gradient-accent hover:shadow-accent transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {farmerStats.map((stat, index) => (
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

      {/* Products Management */}
      <Card className="p-6 bg-gradient-card border-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">My Products</h2>
          <Badge className="bg-primary/10 text-primary">
            {myProducts.length} Products Listed
          </Badge>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {myProducts.map((product) => (
            <div 
              key={product.id}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-card-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium text-card-foreground">{product.price}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="font-medium text-card-foreground">{product.stock}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="font-medium text-card-foreground">{product.orders}</p>
                </div>
                
                <Badge 
                  className={
                    product.status === "active" 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }
                >
                  {product.status}
                </Badge>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Add Product Form */}
      {showAddProduct && (
        <Card className="p-6 bg-gradient-card border-0 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Add New Product</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAddProduct(false)}
            >
              Cancel
            </Button>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" placeholder="e.g., Organic Tomatoes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (per kg)</Label>
              <Input id="price" placeholder="৳ 0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock (kg)</Label>
              <Input id="stock" placeholder="0" />
            </div>
            <div className="md:col-span-3 flex justify-end space-x-2 pt-4">
              <Button 
                type="submit"
                className="bg-gradient-accent hover:shadow-accent transition-all duration-300"
              >
                Add Product
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
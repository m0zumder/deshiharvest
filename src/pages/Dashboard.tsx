import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { RetailerDashboard } from "@/components/dashboard/RetailerDashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Tractor, 
  Store,
  LogOut 
} from "lucide-react";

const Dashboard = () => {
  const [currentRole, setCurrentRole] = useState<"admin" | "farmer" | "retailer">("farmer");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Role Switcher for Demo */}
        <div className="mb-8 p-4 bg-gradient-card rounded-xl border-0 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-2">Demo Role Switcher</h2>
              <p className="text-xs text-muted-foreground">Switch between different user roles to see their dashboards</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={currentRole === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentRole("admin")}
                className={currentRole === "admin" ? "bg-gradient-primary" : ""}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
              <Button
                variant={currentRole === "farmer" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentRole("farmer")}
                className={currentRole === "farmer" ? "bg-gradient-primary" : ""}
              >
                <Tractor className="h-4 w-4 mr-2" />
                Farmer
              </Button>
              <Button
                variant={currentRole === "retailer" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentRole("retailer")}
                className={currentRole === "retailer" ? "bg-gradient-primary" : ""}
              >
                <Store className="h-4 w-4 mr-2" />
                Retailer
              </Button>
              
              <div className="border-l border-border h-8 mx-2"></div>
              
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="animate-fade-in">
          {currentRole === "admin" && <AdminDashboard />}
          {currentRole === "farmer" && <FarmerDashboard />}
          {currentRole === "retailer" && <RetailerDashboard />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
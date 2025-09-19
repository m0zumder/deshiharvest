import { Sprout, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { LanguageToggle } from "@/components/ui/language-toggle";

export const Header = () => {
  const { t } = useLanguage();
  const { user, userProfile, signOut } = useAuth();
  
  const navigation = [
    { name: t("Products", "পণ্য"), href: "/products" },
    { name: t("Dashboard", "ড্যাশবোর্ড"), href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-custom-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">
                {t("DeshiHarvest", "দেশি হার্ভেস্ট")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled className="font-medium">
                    {userProfile?.full_name || user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    {t(
                      userProfile?.role === "farmer" ? "Farmer" : "Retailer",
                      userProfile?.role === "farmer" ? "কৃষক" : "খুচরা বিক্রেতা"
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("Logout", "লগআউট")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">{t("Login", "লগইন")}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    {user ? (
                      <>
                        <div className="text-sm font-medium text-foreground">
                          {userProfile?.full_name || user.email}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {t(
                            userProfile?.role === "farmer" ? "Farmer" : "Retailer",
                            userProfile?.role === "farmer" ? "কৃষক" : "খুচরা বিক্রেতা"
                          )}
                        </div>
                        <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                          <LogOut className="h-4 w-4 mr-2" />
                          {t("Logout", "লগআউট")}
                        </Button>
                      </>
                    ) : (
                      <Button asChild className="w-full">
                        <Link to="/auth">{t("Login", "লগইন")}</Link>
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
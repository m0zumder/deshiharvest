import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Heart, 
  Star, 
  MapPin,
  ShoppingCart,
  SlidersHorizontal
} from "lucide-react";
import vegetablesImage from "@/assets/vegetables-collection.jpg";

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "আব্দুল করিম",
    location: "Savar, Dhaka",
    price: 80,
    originalPrice: 90,
    unit: "kg",
    stock: 150,
    rating: 4.8,
    reviews: 24,
    category: "Vegetables",
    image: "🍅",
    organic: true,
    freshness: "Harvested today"
  },
  {
    id: 2,
    name: "Fresh Spinach",
    farmer: "রহিমা খাতুন",
    location: "Manikganj",
    price: 40,
    originalPrice: 45,
    unit: "kg",
    stock: 75,
    rating: 4.9,
    reviews: 18,
    category: "Leafy Greens",
    image: "🥬",
    organic: true,
    freshness: "2 hours ago"
  },
  {
    id: 3,
    name: "Red Carrots",
    farmer: "মোহাম্মদ আলী",
    location: "Tangail",
    price: 60,
    originalPrice: 65,
    unit: "kg",
    stock: 200,
    rating: 4.7,
    reviews: 31,
    category: "Root Vegetables",
    image: "🥕",
    organic: false,
    freshness: "Yesterday"
  },
  {
    id: 4,
    name: "Sweet Potatoes",
    farmer: "ফাতেমা বেগম",
    location: "Cumilla",
    price: 50,
    originalPrice: 55,
    unit: "kg",
    stock: 120,
    rating: 4.6,
    reviews: 15,
    category: "Root Vegetables",
    image: "🍠",
    organic: true,
    freshness: "This morning"
  },
  {
    id: 5,
    name: "Fresh Okra",
    farmer: "জাহিদুল ইসলাম",
    location: "Jessore",
    price: 35,
    originalPrice: 40,
    unit: "kg",
    stock: 80,
    rating: 4.5,
    reviews: 12,
    category: "Vegetables",
    image: "🌶️",
    organic: false,
    freshness: "6 hours ago"
  },
  {
    id: 6,
    name: "Green Beans",
    farmer: "সালমা খাতুন",
    location: "Bogura",
    price: 45,
    originalPrice: 50,
    unit: "kg",
    stock: 95,
    rating: 4.8,
    reviews: 20,
    category: "Vegetables",
    image: "🫘",
    organic: true,
    freshness: "This morning"
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["all", "Vegetables", "Leafy Greens", "Root Vegetables", "Fruits"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ৳50", value: "0-50" },
    { label: "৳50 - ৳80", value: "50-80" },
    { label: "Above ৳80", value: "80+" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.includes(searchTerm) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(p => p.replace("+", ""));
      if (max) {
        matchesPrice = product.price >= parseInt(min) && product.price <= parseInt(max);
      } else {
        matchesPrice = product.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-secondary overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Fresh Products from
                <span className="text-primary block">Local Farmers</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover the finest organic vegetables and produce, directly from verified farmers across Bangladesh.
              </p>
              <p className="text-primary font-medium">
                স্থানীয় কৃষকদের থেকে তাজা পণ্য
              </p>
            </div>
            <div className="animate-slide-in">
              <img 
                src={vegetablesImage} 
                alt="Fresh vegetables collection"
                className="w-full h-auto rounded-2xl shadow-custom-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, farmers, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <Card className="p-4 lg:hidden animate-fade-in">
              <div className="space-y-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Available Products ({filteredProducts.length})
          </h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="freshness">Freshness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="p-4 bg-gradient-card hover:shadow-custom-lg transition-all duration-300 hover:scale-105 border-0 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                {/* Product Header */}
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{product.image}</div>
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.organic && (
                      <Badge className="bg-success/10 text-success border-success/20 text-xs">
                        Organic
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <p className="text-xs text-success mt-1">{product.freshness}</p>
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
                    <span className="text-lg font-bold text-card-foreground">
                      ৳{product.price}/{product.unit}
                    </span>
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ৳{product.originalPrice}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.stock} {product.unit}
                  </Badge>
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
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
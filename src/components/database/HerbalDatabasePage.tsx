import { useState } from "react";
import { Search, Filter, Star, MapPin, Leaf, Clock, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HerbalDatabasePageProps {
  onNavigate?: (page: string) => void;
}

interface HerbEntry {
  id: string;
  name: string;
  scientificName: string;
  localNames: string[];
  region: string;
  category: string;
  primaryUses: string[];
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  verified: boolean;
  lastUpdated: string;
}

export function HerbalDatabasePage({ onNavigate }: HerbalDatabasePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock data
  const herbs: HerbEntry[] = [
    {
      id: "1",
      name: "African Potato",
      scientificName: "Hypoxis hemerocallidea",
      localNames: ["Inkomfe", "Ilabatheka", "Mokgalo"],
      region: "Southern Africa",
      category: "Immune Support",
      primaryUses: ["Immune system", "Prostate health", "General wellness"],
      rating: 4.6,
      reviewCount: 234,
      verified: true,
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      name: "Sutherlandia",
      scientificName: "Sutherlandia frutescens",
      localNames: ["Kankerbos", "Insiswa", "Phetola"],
      region: "Southern Africa",
      category: "Adaptogen",
      primaryUses: ["Stress relief", "Cancer support", "Diabetes"],
      rating: 4.8,
      reviewCount: 189,
      verified: true,
      lastUpdated: "2024-01-12"
    },
    {
      id: "3",
      name: "Buchu",
      scientificName: "Agathosma betulina",
      localNames: ["Boegoe", "Bookoo"],
      region: "Western Cape",
      category: "Urinary Health",
      primaryUses: ["UTI treatment", "Kidney support", "Anti-inflammatory"],
      rating: 4.4,
      reviewCount: 156,
      verified: true,
      lastUpdated: "2024-01-10"
    },
    {
      id: "4",
      name: "Aloe Ferox",
      scientificName: "Aloe ferox",
      localNames: ["Bitter Aloe", "Bergaalwyn"],
      region: "Eastern Cape",
      category: "Digestive Health",
      primaryUses: ["Digestive issues", "Skin healing", "Detoxification"],
      rating: 4.7,
      reviewCount: 298,
      verified: true,
      lastUpdated: "2024-01-08"
    },
    {
      id: "5",
      name: "Kanna",
      scientificName: "Sceletium tortuosum",
      localNames: ["Channa", "Kougoed"],
      region: "Northern Cape",
      category: "Mental Health",
      primaryUses: ["Anxiety relief", "Mood enhancement", "Stress reduction"],
      rating: 4.3,
      reviewCount: 127,
      verified: false,
      lastUpdated: "2024-01-05"
    },
    {
      id: "6",
      name: "Wild Garlic",
      scientificName: "Tulbaghia violacea",
      localNames: ["Wilde-knoffel", "Sweet Garlic"],
      region: "KwaZulu-Natal",
      category: "Cardiovascular",
      primaryUses: ["Blood pressure", "Heart health", "Respiratory infections"],
      rating: 4.2,
      reviewCount: 89,
      verified: true,
      lastUpdated: "2024-01-03"
    }
  ];

  const categories = [
    "Immune Support", "Adaptogen", "Urinary Health", "Digestive Health", 
    "Mental Health", "Cardiovascular", "Respiratory", "Skin Care"
  ];

  const regions = [
    "Southern Africa", "Western Cape", "Eastern Cape", "Northern Cape", 
    "KwaZulu-Natal", "Gauteng", "Limpopo", "North West"
  ];

  const filteredHerbs = herbs.filter(herb => {
    const matchesSearch = searchQuery === "" || 
      herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.localNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      herb.primaryUses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || herb.category === selectedCategory;
    const matchesRegion = selectedRegion === "all" || herb.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Herbal Medicine Database</h1>
          <p className="text-lg text-muted-foreground">
            Explore verified traditional remedies from across Africa
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-herb mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by plant name, uses, or local names..."
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Recently Updated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {filteredHerbs.length} of {herbs.length} traditional remedies
          </p>
          <Tabs defaultValue="grid" className="w-auto">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Herbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHerbs.map((herb, index) => (
            <Card 
              key={herb.id} 
              className="group cursor-pointer shadow-herb hover:shadow-natural transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => console.log("View herb details:", herb.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-forest rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-primary-foreground" />
                    </div>
                    {herb.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-muted-foreground">{herb.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {herb.name}
                </CardTitle>
                <CardDescription className="text-sm italic">
                  {herb.scientificName}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{herb.region}</span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Local Names:</h4>
                  <div className="flex flex-wrap gap-1">
                    {herb.localNames.slice(0, 2).map((name, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-herb-primary/10 text-herb-primary">
                        {name}
                      </Badge>
                    ))}
                    {herb.localNames.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{herb.localNames.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Primary Uses:</h4>
                  <ul className="space-y-1">
                    {herb.primaryUses.slice(0, 3).map((use, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-herb-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-foreground">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{herb.reviewCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(herb.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="p-2">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHerbs.length === 0 && (
          <Card className="shadow-herb">
            <CardContent className="p-12 text-center">
              <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No herbs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedRegion("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="shadow-herb mt-12 bg-gradient-forest text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Know a Traditional Remedy?</h3>
            <p className="text-lg mb-6 opacity-90">
              Help preserve African healing wisdom by sharing your knowledge with the community
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => onNavigate?.("submit")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Submit a Remedy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
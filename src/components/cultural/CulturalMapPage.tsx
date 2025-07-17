import { useState } from "react";
import { Map, Filter, Users, Leaf, MapPin, Globe, Search, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CulturalMapPageProps {
  onNavigate?: (page: string) => void;
}

export function CulturalMapPage({ onNavigate }: CulturalMapPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedTribe, setSelectedTribe] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const regions = [
    { id: "east-africa", name: "East Africa", tribes: 15, herbs: 234 },
    { id: "west-africa", name: "West Africa", tribes: 22, herbs: 456 },
    { id: "southern-africa", name: "Southern Africa", tribes: 18, herbs: 189 },
    { id: "central-africa", name: "Central Africa", tribes: 12, herbs: 167 },
  ];

  const featuredTribes = [
    {
      id: "maasai",
      name: "Maasai",
      region: "East Africa",
      herbs: 45,
      specialty: "Livestock medicine",
      description: "Traditional cattle herding community with extensive knowledge of veterinary herbs",
      verified: true
    },
    {
      id: "yoruba",
      name: "Yoruba",
      region: "West Africa", 
      herbs: 89,
      specialty: "Spiritual healing",
      description: "Rich tradition of herbal medicine combined with spiritual practices",
      verified: true
    },
    {
      id: "zulu",
      name: "Zulu",
      region: "Southern Africa",
      herbs: 67,
      specialty: "Wound healing",
      description: "Warriors' knowledge of battle wound treatment and pain management",
      verified: true
    },
    {
      id: "kikuyu",
      name: "Kikuyu",
      region: "East Africa",
      herbs: 52,
      specialty: "Agricultural medicine",
      description: "Farming community with deep knowledge of crop-related health remedies",
      verified: false
    }
  ];

  const culturalHerbs = [
    {
      name: "African Potato",
      tribes: ["Zulu", "Xhosa"],
      uses: ["Immunity", "Prostate health"],
      ritual: "Harvest during full moon",
      sacredness: "High"
    },
    {
      name: "Moringa",
      tribes: ["Hausa", "Fulani"],
      uses: ["Nutrition", "Blood pressure"],
      ritual: "Planted near family compounds",
      sacredness: "Medium"
    },
    {
      name: "Kanna",
      tribes: ["Khoi", "San"],
      uses: ["Mood", "Stress relief"],
      ritual: "Prepared by elders only",
      sacredness: "Very High"
    },
    {
      name: "Buchu",
      tribes: ["Khoi"],
      uses: ["Kidney health", "Urinary tract"],
      ritual: "Gathered at dawn",
      sacredness: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-earth text-primary-foreground py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Map className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Cultural Herb Map</h1>
              <p className="text-primary-foreground/80">Explore traditional medicine by tribe, region, and cultural significance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Explore by Region & Culture</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Herbs</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by plant name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tribe/Community</label>
                <Select value={selectedTribe} onValueChange={setSelectedTribe}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tribe" />
                  </SelectTrigger>
                  <SelectContent>
                    {featuredTribes.map((tribe) => (
                      <SelectItem key={tribe.id} value={tribe.id}>
                        {tribe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {regions.map((region) => (
            <Card 
              key={region.id} 
              className="cursor-pointer hover:shadow-natural transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedRegion(region.id)}
            >
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{region.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>{region.tribes} tribes</div>
                  <div>{region.herbs} documented herbs</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tribes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Featured Tribal Knowledge</span>
            </CardTitle>
            <CardDescription>
              Explore traditional healing practices from different African communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTribes.map((tribe) => (
                <Card key={tribe.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg flex items-center space-x-2">
                          <span>{tribe.name}</span>
                          {tribe.verified && (
                            <Badge className="bg-herb-primary text-primary-foreground">
                              <Crown className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{tribe.region}</p>
                      </div>
                      <Badge variant="outline">{tribe.herbs} herbs</Badge>
                    </div>
                    <p className="text-sm mb-3">{tribe.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-forest text-primary-foreground">
                        {tribe.specialty}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Explore Knowledge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cultural Herbs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <span>Sacred & Cultural Plants</span>
            </CardTitle>
            <CardDescription>
              Plants with deep cultural significance and ritual importance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {culturalHerbs.map((herb, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{herb.name}</h3>
                        <Badge 
                          variant={herb.sacredness === "Very High" ? "default" : "secondary"}
                          className={herb.sacredness === "Very High" ? "bg-gradient-sunset text-primary-foreground" : ""}
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {herb.sacredness} Sacred
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Tribes:</span>
                          <div className="mt-1">
                            {herb.tribes.map((tribe, idx) => (
                              <Badge key={idx} variant="outline" className="mr-1 mb-1">
                                {tribe}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Traditional Uses:</span>
                          <div className="mt-1 text-muted-foreground">
                            {herb.uses.join(", ")}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Ritual Practice:</span>
                          <div className="mt-1 text-muted-foreground">
                            {herb.ritual}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
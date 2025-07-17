import { Search, Leaf, Database, PlusCircle, BookOpen, Camera, Users, Star, Mic, Bot, MapPin, Zap, Crown, TrendingUp, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import heroImage from "@/assets/hero-herbal.jpg";
import herbsImage from "@/assets/herbs-collection.jpg";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const quickActions = [
    {
      id: "identify",
      title: "Identify Plant",
      description: "Take a photo to identify medicinal plants",
      icon: Camera,
      color: "bg-herb-primary",
      gradient: "bg-gradient-forest"
    },
    {
      id: "database",
      title: "Browse Herbs",
      description: "Explore our herbal medicine database",
      icon: Database,
      color: "bg-earth-brown",
      gradient: "bg-gradient-earth"
    },
    {
      id: "submit",
      title: "Submit Remedy",
      description: "Share traditional healing knowledge",
      icon: PlusCircle,
      color: "bg-herb-secondary",
      gradient: "bg-gradient-sunset"
    },
    {
      id: "learn",
      title: "Learn",
      description: "Discover traditional healing practices",
      icon: BookOpen,
      color: "bg-primary",
      gradient: "bg-gradient-forest"
    }
  ];

  const featuredStats = [
    { label: "Traditional Remedies", value: "1,247", icon: Leaf },
    { label: "AI Identifications", value: "25,892", icon: Bot },
    { label: "Elder Stories", value: "342", icon: Star },
    { label: "Community Members", value: "15,420", icon: Users },
  ];

  const aiFeatures = [
    {
      id: "ai-herbalist",
      title: "AI Herbalist Chat",
      description: "Ask our AI questions about African herbal medicine",
      icon: Bot,
      gradient: "bg-gradient-forest",
      badge: "New"
    },
    {
      id: "cultural-map",
      title: "Cultural Map",
      description: "Explore herbs by tribe and region",
      icon: MapPin,
      gradient: "bg-gradient-earth",
      badge: "Popular"
    },
    {
      id: "elder-stories",
      title: "Elder Stories",
      description: "Listen to traditional healing wisdom",
      icon: Heart,
      gradient: "bg-gradient-sunset",
      badge: "Featured"
    },
    {
      id: "premium",
      title: "Premium Research",
      description: "Access advanced analytics and exports",
      icon: Crown,
      gradient: "bg-gradient-forest",
      badge: "Pro"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-forest">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Traditional African herbal medicine" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Leaf className="w-10 h-10 text-primary-foreground animate-leaf-float" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
              DawaYetu
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Preserving African Traditional Medicine Knowledge for Future Generations
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover, identify, and share traditional herbal remedies from across Africa. 
              Connect with ancestral wisdom and contribute to our collective healing knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative -mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <Card className="shadow-natural border-0 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <SearchBar
              placeholder="Search for a plant, remedy, or ailment..."
              onSearch={(query) => console.log("Search:", query)}
              onCameraClick={() => onNavigate?.("identify")}
              onVoiceClick={() => console.log("Voice search")}
            />
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center shadow-herb hover:shadow-natural transition-all duration-300 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-forest rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* AI Features Section */}
      <section className="bg-gradient-earth/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-forest text-primary-foreground">DawaYetu 2.0</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">AI-Powered Heritage Preservation</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of traditional medicine preservation with advanced AI features 
              and community-driven wisdom sharing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.id} 
                  className="group cursor-pointer shadow-herb hover:shadow-natural transition-all duration-300 hover:scale-105 animate-grow-in border-0 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => onNavigate?.(feature.id)}
                >
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2 text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Explore Traditional Medicine</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're seeking healing knowledge or contributing your own, start your journey here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id} 
                className="group cursor-pointer shadow-herb hover:shadow-natural transition-all duration-300 hover:scale-105 animate-grow-in border-0"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onNavigate?.(action.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${action.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg mb-2 text-foreground">{action.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {action.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Traditional Knowledge, Modern Access</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                DawaYetu bridges generations of healing wisdom with today's technology. Our platform 
                empowers communities to preserve, share, and access traditional African herbal medicine 
                knowledge, ensuring this invaluable heritage continues to heal and inspire.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-herb-primary rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">AI-powered plant identification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-earth-brown rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">Community-verified remedies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-herb-secondary rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">Cultural preservation & storytelling</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-herb"
                onClick={() => onNavigate?.("learn")}
              >
                Learn More About Our Mission
              </Button>
            </div>
            <div className="relative">
              <img 
                src={herbsImage} 
                alt="Traditional herbs and remedies" 
                className="w-full h-96 object-cover rounded-2xl shadow-natural"
              />
              <div className="absolute inset-0 bg-gradient-forest opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
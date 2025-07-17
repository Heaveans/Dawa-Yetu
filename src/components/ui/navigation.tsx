import { useState } from "react";
import { Search, Menu, X, Leaf, Home, Database, PlusCircle, Users, BookOpen, User, Map, Mic, Bot, Star, Settings, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export function Navigation({ currentPage = "home", onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "identify", label: "Identify", icon: Leaf },
    { id: "database", label: "Database", icon: Database },
    { id: "submit", label: "Submit", icon: PlusCircle },
    { id: "community", label: "Community", icon: Users },
    { id: "learn", label: "Learn", icon: BookOpen },
  ];

  const advancedNavItems = [
    { id: "cultural-map", label: "Cultural Map", icon: Map },
    { id: "ai-herbalist", label: "AI Herbalist", icon: Bot },
    { id: "elder-stories", label: "Elder Stories", icon: Star },
    { id: "offline-mode", label: "Offline Mode", icon: Settings },
    { id: "premium", label: "Premium", icon: Crown },
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange?.(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-card border-b border-border shadow-natural">
      {/* Advanced Menu Bar */}
      <div className="bg-gradient-earth border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-1 py-2 overflow-x-auto">
            {advancedNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex items-center space-x-1 text-xs shrink-0 text-muted-foreground hover:text-foreground transition-colors",
                    currentPage === item.id && "text-primary font-medium"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:block">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-forest rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground animate-leaf-float" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DawaYetu</h1>
              <p className="text-xs text-muted-foreground">Traditional Healing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex items-center space-x-2 transition-all duration-300",
                    currentPage === item.id && "bg-primary text-primary-foreground shadow-herb"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:block">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="grid grid-cols-2 gap-2 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "outline"}
                    className={cn(
                      "flex flex-col items-center space-y-1 h-16 transition-all duration-300",
                      currentPage === item.id && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
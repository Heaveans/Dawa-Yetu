import { useState } from "react";
import { Search, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onCameraClick?: () => void;
  onVoiceClick?: () => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search for a plant or remedy...", 
  onSearch, 
  onCameraClick, 
  onVoiceClick,
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="flex items-center space-x-2 bg-card border border-border rounded-lg shadow-natural overflow-hidden">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-4 py-3 border-0 focus:ring-0 focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="flex items-center space-x-1 px-2">
          {onCameraClick && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCameraClick}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Take photo to identify plant"
            >
              <Camera className="w-5 h-5 text-herb-primary" />
            </Button>
          )}
          
          {onVoiceClick && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onVoiceClick}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Voice search"
            >
              <Mic className="w-5 h-5 text-herb-primary" />
            </Button>
          )}
          
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 transition-all duration-300"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
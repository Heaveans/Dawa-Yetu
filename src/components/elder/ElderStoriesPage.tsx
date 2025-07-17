import { useState } from "react";
import { Play, Pause, Star, Heart, Share2, Filter, Search, Volume2, User, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ElderStoriesPageProps {
  onNavigate?: (page: string) => void;
}

interface Story {
  id: string;
  title: string;
  elder: {
    name: string;
    tribe: string;
    age: number;
    avatar?: string;
    verified: boolean;
  };
  herb: string;
  duration: string;
  language: string;
  category: string;
  likes: number;
  plays: number;
  uploadedDate: string;
  description: string;
  tags: string[];
}

export function ElderStoriesPage({ onNavigate }: ElderStoriesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [playingStory, setPlayingStory] = useState<string | null>(null);

  const categories = [
    "Healing Rituals",
    "Plant Medicine",
    "Spiritual Practices",
    "Family Remedies",
    "Cultural Legends",
    "Preparation Methods"
  ];

  const languages = [
    { code: "sw", name: "Kiswahili" },
    { code: "yo", name: "Yoruba" },
    { code: "zu", name: "isiZulu" },
    { code: "xh", name: "isiXhosa" },
    { code: "lg", name: "Luganda" },
    { code: "ha", name: "Hausa" }
  ];

  const stories: Story[] = [
    {
      id: "1",
      title: "How My Grandmother Cured Malaria with Cinchona Bark",
      elder: {
        name: "Mama Esther Wanjiku",
        tribe: "Kikuyu",
        age: 78,
        verified: true
      },
      herb: "Cinchona Bark",
      duration: "8:42",
      language: "Kikuyu/English",
      category: "Family Remedies",
      likes: 234,
      plays: 1456,
      uploadedDate: "2024-01-15",
      description: "A powerful story about traditional fever treatment passed down through generations in the Kikuyu community.",
      tags: ["malaria", "fever", "traditional", "kikuyu"]
    },
    {
      id: "2", 
      title: "Sacred Kanna Ceremony for Spiritual Healing",
      elder: {
        name: "Elder Thabo Molefe",
        tribe: "San",
        age: 82,
        verified: true
      },
      herb: "Kanna",
      duration: "12:15",
      language: "San/English",
      category: "Spiritual Practices",
      likes: 189,
      plays: 892,
      uploadedDate: "2024-01-10",
      description: "Ancient wisdom about the sacred use of Kanna for emotional healing and spiritual connection.",
      tags: ["spiritual", "ceremony", "san", "emotional"]
    },
    {
      id: "3",
      title: "Moringa: The Tree of Life in Hausa Culture",
      elder: {
        name: "Mallam Ibrahim Danladi",
        tribe: "Hausa",
        age: 71,
        verified: true
      },
      herb: "Moringa",
      duration: "6:28",
      language: "Hausa/English",
      category: "Plant Medicine",
      likes: 156,
      plays: 743,
      uploadedDate: "2024-01-08",
      description: "Traditional knowledge about Moringa's nutritional and medicinal properties in Northern Nigeria.",
      tags: ["nutrition", "moringa", "hausa", "tree-of-life"]
    }
  ];

  const handlePlayPause = (storyId: string) => {
    if (playingStory === storyId) {
      setPlayingStory(null);
    } else {
      setPlayingStory(storyId);
    }
  };

  const featuredElder = stories[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-sunset text-primary-foreground py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Elder Stories Archive</h1>
              <p className="text-primary-foreground/80">
                Preserving ancestral wisdom through storytelling and oral tradition
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Volume2 className="w-3 h-3 mr-1" />
              Audio Stories
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Award className="w-3 h-3 mr-1" />
              Verified Elders
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Heart className="w-3 h-3 mr-1" />
              Cultural Heritage
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Discover Stories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stories or herbs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Story */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <Badge className="bg-gradient-sunset text-primary-foreground">Featured Story</Badge>
            </div>
            <CardTitle className="text-xl">{featuredElder.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-muted-foreground">{featuredElder.description}</p>
                
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => handlePlayPause(featuredElder.id)}
                    className="bg-gradient-forest text-primary-foreground"
                  >
                    {playingStory === featuredElder.id ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {playingStory === featuredElder.id ? "Pause" : "Play Story"}
                  </Button>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredElder.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featuredElder.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {featuredElder.elder.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{featuredElder.elder.name}</h4>
                      {featuredElder.elder.verified && (
                        <Badge className="bg-herb-primary text-primary-foreground">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {featuredElder.elder.tribe} Elder, Age {featuredElder.elder.age}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{featuredElder.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Plant Focus:</span>
                    <span className="font-medium">{featuredElder.herb}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">{featuredElder.language}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{featuredElder.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>{featuredElder.plays}</span>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.slice(1).map((story) => (
            <Card key={story.id} className="hover:shadow-natural transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="bg-gradient-earth/10">
                    {story.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{story.duration}</span>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{story.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {story.description}
                </p>

                <div className="flex items-center space-x-2 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {story.elder.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{story.elder.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {story.elder.tribe} • Age {story.elder.age}
                    </p>
                  </div>
                  {story.elder.verified && (
                    <Award className="w-4 h-4 text-herb-primary" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={() => handlePlayPause(story.id)}
                    className="bg-gradient-forest text-primary-foreground"
                  >
                    {playingStory === story.id ? (
                      <Pause className="w-3 h-3 mr-1" />
                    ) : (
                      <Play className="w-3 h-3 mr-1" />
                    )}
                    {playingStory === story.id ? "Pause" : "Play"}
                  </Button>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{story.likes}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="p-1">
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-earth/5">
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Share Your Elder's Wisdom</h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Help preserve traditional knowledge by recording and uploading stories from elders in your community. 
              Every story is a precious piece of our cultural heritage.
            </p>
            <Button onClick={() => onNavigate?.("submit")} className="bg-primary hover:bg-primary-hover">
              Record a Story
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
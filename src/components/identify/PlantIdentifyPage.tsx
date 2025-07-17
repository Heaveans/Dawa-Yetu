import { useState, useRef } from "react";
import { Camera, Upload, Loader2, CheckCircle, AlertTriangle, Star, MapPin, Mic, Bot, Globe, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlantIdentifyPageProps {
  onNavigate?: (page: string) => void;
}

interface IdentificationResult {
  plantName: string;
  localNames: string[];
  scientificName: string;
  confidence: number;
  traditionalUses: string[];
  warnings: string[];
  region: string;
  communityRating: number;
  ratingCount: number;
}

export function PlantIdentifyPage({ onNavigate }: PlantIdentifyPageProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [textInput, setTextInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "sw", name: "Kiswahili" },
    { code: "yo", name: "Yoruba" },
    { code: "zu", name: "isiZulu" },
    { code: "xh", name: "isiXhosa" },
    { code: "lg", name: "Luganda" },
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setTextInput("African potato");
      setIsListening(false);
    }, 2000);
  };

  // Mock identification function
  const identifyPlant = async () => {
    setIsIdentifying(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock result
    setResult({
      plantName: "African Potato",
      localNames: ["Inkomfe (Zulu)", "Ilabatheka (Xhosa)", "Mokgalo (Tswana)"],
      scientificName: "Hypoxis hemerocallidea",
      confidence: 92,
      traditionalUses: [
        "Immune system support",
        "Prostate health",
        "General wellness tonic",
        "Digestive issues"
      ],
      warnings: [
        "Consult healthcare provider before use",
        "May interact with certain medications",
        "Not recommended during pregnancy"
      ],
      region: "Southern Africa",
      communityRating: 4.6,
      ratingCount: 234
    });
    
    setIsIdentifying(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const suggestions = [
    "Aloe vera", "African potato", "Sutherlandia", "Buchu", 
    "Kanna", "Wild garlic", "Fever tree", "Bitter aloe"
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Plant Identification</h1>
          <p className="text-lg text-muted-foreground">
            Use AI to identify medicinal plants and discover their traditional uses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="shadow-herb">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-herb-primary" />
                  <span>Upload Plant Image</span>
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the plant, including leaves and any distinctive features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!image ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Drag and drop an image or click to browse</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Take Photo</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload File</span>
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={image} 
                        alt="Plant to identify" 
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-2"
                      >
                        Change Image
                      </Button>
                    </div>
                    
                    <Button
                      onClick={identifyPlant}
                      disabled={isIdentifying}
                      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                    >
                      {isIdentifying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Identifying Plant...
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          Identify Plant
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Voice Search */}
            <Card className="shadow-herb border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <span>AI Voice Search</span>
                  <Badge className="bg-gradient-forest text-primary-foreground">New</Badge>
                </CardTitle>
                <CardDescription>
                  Speak in your local language - AI understands Swahili, Yoruba, Zulu and more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="language">Language</Label>
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
                  <div className="flex items-end">
                    <Button
                      onClick={handleVoiceSearch}
                      disabled={isListening}
                      className="w-full bg-gradient-forest hover:opacity-90"
                    >
                      {isListening ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Listening...
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Voice Search
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Text Search Alternative */}
            <Card className="shadow-herb">
              <CardHeader>
                <CardTitle>Or Search by Name</CardTitle>
                <CardDescription>
                  Enter the plant name in any language you know
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="plant-name">Plant Name</Label>
                  <div className="relative">
                    <Input
                      id="plant-name"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter plant name..."
                      className="mt-1 pr-20"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleVoiceSearch}
                      disabled={isListening}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Badge 
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setTextInput(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate?.("database")}
                >
                  Browse Full Database
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isIdentifying && (
              <Card className="shadow-herb">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-forest rounded-full flex items-center justify-center mx-auto">
                      <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
                    </div>
                    <h3 className="text-lg font-semibold">Analyzing Plant...</h3>
                    <Progress value={66} className="w-full" />
                    <p className="text-muted-foreground">
                      Our AI is comparing your image with traditional knowledge
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className="shadow-herb animate-grow-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <CardTitle>Identification Result</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {result.confidence}% Confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plant Info */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{result.plantName}</h3>
                    <p className="text-sm text-muted-foreground italic mb-2">{result.scientificName}</p>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-herb-primary" />
                        <span className="text-sm text-muted-foreground">{result.region}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">
                          {result.communityRating} ({result.ratingCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Local Names:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.localNames.map((name, index) => (
                          <Badge key={index} variant="outline" className="bg-herb-primary/10 text-herb-primary">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Traditional Uses */}
                  <div>
                    <h4 className="font-semibold mb-3">Traditional Uses:</h4>
                    <ul className="space-y-2">
                      {result.traditionalUses.map((use, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-herb-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-foreground">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <strong>Important Warnings:</strong>
                          {result.warnings.map((warning, index) => (
                            <div key={index} className="text-sm">• {warning}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => onNavigate?.("database")}
                    >
                      View in Database
                    </Button>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary-hover"
                      onClick={() => onNavigate?.("community")}
                    >
                      Community Stories
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
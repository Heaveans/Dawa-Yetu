import { useState } from "react";
import { Smartphone, Download, Wifi, WifiOff, Database, Bluetooth, Phone, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface OfflineModePageProps {
  onNavigate?: (page: string) => void;
}

export function OfflineModePage({ onNavigate }: OfflineModePageProps) {
  const [isOffline, setIsOffline] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedUSSD, setSelectedUSSD] = useState<string | null>(null);

  const offlineFeatures = [
    {
      title: "Plant Database",
      description: "500+ plants with images and uses",
      size: "45 MB",
      downloaded: true,
      icon: Database
    },
    {
      title: "Basic AI Identification", 
      description: "Lightweight plant recognition model",
      size: "15 MB",
      downloaded: false,
      icon: Smartphone
    },
    {
      title: "Audio Stories",
      description: "50 essential elder stories",
      size: "120 MB", 
      downloaded: false,
      icon: Download
    }
  ];

  const ussdCommands = [
    { code: "*123*1#", action: "Search Plants", description: "Find plant by name" },
    { code: "*123*2#", action: "Common Remedies", description: "Browse top remedies" },
    { code: "*123*3#", action: "Emergency Help", description: "First aid herbs" },
    { code: "*123*4#", action: "Submit Remedy", description: "Share knowledge via SMS" },
  ];

  const handleDownload = (featureName: string) => {
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateUSSD = (command: string) => {
    setSelectedUSSD(command);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-earth text-primary-foreground py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              {isOffline ? (
                <WifiOff className="w-8 h-8 text-primary-foreground" />
              ) : (
                <Wifi className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">Offline Mode</h1>
              <p className="text-primary-foreground/80">
                Access traditional medicine knowledge without internet connection
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Database className="w-3 h-3 mr-1" />
              Offline Database
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Phone className="w-3 h-3 mr-1" />
              USSD Support
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Bluetooth className="w-3 h-3 mr-1" />
              P2P Sharing
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Offline Status Toggle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Connection Status</span>
              <Button
                onClick={() => setIsOffline(!isOffline)}
                variant={isOffline ? "destructive" : "default"}
                className="flex items-center space-x-2"
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-4 h-4" />
                    <span>Go Online</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4" />
                    <span>Go Offline</span>
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${isOffline ? 'bg-destructive/10' : 'bg-green-50'}`}>
              <div className="flex items-center space-x-2">
                {isOffline ? (
                  <WifiOff className="w-5 h-5 text-destructive" />
                ) : (
                  <Wifi className="w-5 h-5 text-green-600" />
                )}
                <span className={`font-medium ${isOffline ? 'text-destructive' : 'text-green-600'}`}>
                  {isOffline ? 'Offline Mode Active' : 'Online - All Features Available'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {isOffline 
                  ? 'You can still access downloaded content and use basic features'
                  : 'Download content for offline access when you need it'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Downloadable Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Offline Content</span>
            </CardTitle>
            <CardDescription>
              Download essential content to use DawaYetu without internet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {offlineFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {feature.size}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {feature.downloaded ? (
                        <Badge className="bg-green-100 text-green-800">
                          Downloaded
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleDownload(feature.title)}
                          disabled={isDownloading}
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {isDownloading && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Downloading...</span>
                  <span className="text-sm text-muted-foreground">{downloadProgress}%</span>
                </div>
                <Progress value={downloadProgress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* USSD Interface Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>USSD Commands</span>
              </CardTitle>
              <CardDescription>
                For feature phones and areas with limited data connectivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ussdCommands.map((command, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => simulateUSSD(command.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                          {command.code}
                        </code>
                        <h4 className="font-medium mt-1">{command.action}</h4>
                        <p className="text-sm text-muted-foreground">{command.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Try
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* USSD Simulation Screen */}
          <Card>
            <CardHeader>
              <CardTitle>USSD Simulation</CardTitle>
              <CardDescription>
                See how DawaYetu works on basic phones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg min-h-64">
                {selectedUSSD ? (
                  <div className="space-y-2">
                    <div>DawaYetu USSD Service</div>
                    <div>Command: {selectedUSSD}</div>
                    <div>---------------------------</div>
                    {selectedUSSD === "*123*1#" && (
                      <div className="space-y-1">
                        <div>1. African Potato</div>
                        <div>2. Aloe Vera</div>
                        <div>3. Moringa</div>
                        <div>4. Sutherlandia</div>
                        <div>--</div>
                        <div>Enter plant number or</div>
                        <div>type plant name:</div>
                      </div>
                    )}
                    {selectedUSSD === "*123*2#" && (
                      <div className="space-y-1">
                        <div>Common Remedies:</div>
                        <div>1. Cough - Ginger tea</div>
                        <div>2. Fever - Willow bark</div>
                        <div>3. Cuts - Aloe vera gel</div>
                        <div>4. Headache - Fever tree</div>
                        <div>--</div>
                        <div>Reply with number for</div>
                        <div>more details</div>
                      </div>
                    )}
                    {selectedUSSD === "*123*3#" && (
                      <div className="space-y-1">
                        <div>Emergency First Aid:</div>
                        <div>1. Bleeding - Calendula</div>
                        <div>2. Burns - Aloe vera</div>
                        <div>3. Poison - Activated char</div>
                        <div>4. Shock - Ginkgo</div>
                        <div>--</div>
                        <div>ALWAYS seek medical help</div>
                        <div>for serious injuries!</div>
                      </div>
                    )}
                    <div className="mt-4 pt-2 border-t border-green-600">
                      <div>Reply to continue</div>
                      <div>0 - Main menu</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>Welcome to DawaYetu</div>
                    <div>Traditional Medicine USSD</div>
                    <div>---------------------------</div>
                    <div>Please select a command</div>
                    <div>from the left panel to</div>
                    <div>see how it works</div>
                    <div> </div>
                    <div>Available commands:</div>
                    <div>*123*1# - Search Plants</div>
                    <div>*123*2# - Common Remedies</div>
                    <div>*123*3# - Emergency Help</div>
                    <div>*123*4# - Submit Remedy</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bluetooth Sharing */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bluetooth className="w-5 h-5" />
              <span>Bluetooth Herb Sharing</span>
            </CardTitle>
            <CardDescription>
              Share plant information with nearby devices without internet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Signal className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-medium mb-2">Discover</h4>
                <p className="text-sm text-muted-foreground">
                  Find other DawaYetu users nearby with Bluetooth enabled
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-medium mb-2">Share</h4>
                <p className="text-sm text-muted-foreground">
                  Exchange plant information, remedies, and cultural stories
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-medium mb-2">Sync</h4>
                <p className="text-sm text-muted-foreground">
                  Update your local database with new knowledge from others
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button className="bg-gradient-forest text-primary-foreground">
                <Bluetooth className="w-4 h-4 mr-2" />
                Enable Bluetooth Sharing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
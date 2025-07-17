import { useState } from "react";
import { Crown, Download, BarChart3, Users, TrendingUp, FileText, Star, Award, Settings, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface PremiumDashboardProps {
  onNavigate?: (page: string) => void;
}

export function PremiumDashboard({ onNavigate }: PremiumDashboardProps) {
  const [isPremium] = useState(false);

  const premiumFeatures = [
    {
      title: "Advanced Analytics",
      description: "Deep insights into remedy effectiveness and usage patterns",
      icon: BarChart3,
      available: true
    },
    {
      title: "Bulk Data Export", 
      description: "Export verified remedies in CSV, JSON, or PDF formats",
      icon: Download,
      available: true
    },
    {
      title: "Expert Verification",
      description: "Priority review by certified herbalists and researchers",
      icon: Award,
      available: true
    },
    {
      title: "Cultural Story Archive",
      description: "Access to 500+ premium elder stories and rituals",
      icon: Star,
      available: false
    },
    {
      title: "AI Consultation Priority",
      description: "Skip the queue for AI herbalist consultations",
      icon: Settings,
      available: false
    },
    {
      title: "Research Collaboration",
      description: "Partner with universities and NGOs on studies",
      icon: Users,
      available: false
    }
  ];

  const analyticsData = [
    { metric: "Total Remedies Accessed", value: "1,247", change: "+12%" },
    { metric: "Unique Plant Species", value: "342", change: "+8%" },
    { metric: "Community Contributions", value: "89", change: "+15%" },
    { metric: "Verification Rate", value: "94%", change: "+3%" }
  ];

  const exportOptions = [
    {
      name: "Verified Remedies Database",
      format: "CSV/Excel",
      size: "2.3 MB",
      lastUpdated: "2024-01-20"
    },
    {
      name: "Cultural Stories Archive", 
      format: "JSON",
      size: "15.7 MB",
      lastUpdated: "2024-01-18"
    },
    {
      name: "Plant Classification Data",
      format: "PDF Report", 
      size: "5.1 MB",
      lastUpdated: "2024-01-15"
    }
  ];

  const pricingPlans = [
    {
      name: "Researcher",
      price: "$29",
      period: "month",
      description: "For academic researchers and students",
      features: [
        "Advanced analytics dashboard",
        "Bulk data export (CSV, JSON)",
        "Priority verification queue",
        "Email support"
      ]
    },
    {
      name: "Institution", 
      price: "$99",
      period: "month",
      description: "For NGOs, universities, and healthcare organizations",
      features: [
        "Everything in Researcher",
        "API access for integration",
        "Custom data exports", 
        "Collaboration tools",
        "Dedicated account manager"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations and governments",
      features: [
        "Everything in Institution",
        "On-premise deployment",
        "Custom AI training",
        "White-label solutions",
        "24/7 priority support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-sunset text-primary-foreground py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Premium Research Dashboard</h1>
                <p className="text-primary-foreground/80">
                  Advanced tools for researchers, institutions, and healthcare organizations
                </p>
              </div>
            </div>
            
            {!isPremium && (
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Upgrade to Premium
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <BarChart3 className="w-3 h-3 mr-1" />
              Analytics
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Download className="w-3 h-3 mr-1" />
              Data Export
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Users className="w-3 h-3 mr-1" />
              Collaboration
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!isPremium ? (
          /* Upgrade Prompt */
          <div className="space-y-8">
            <Card className="border-primary/20">
              <CardContent className="p-8 text-center">
                <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Unlock Premium Features</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Access advanced analytics, bulk data exports, and collaboration tools designed 
                  for researchers, institutions, and healthcare organizations working with traditional medicine data.
                </p>
                <Button size="lg" className="bg-gradient-sunset text-primary-foreground">
                  View Pricing Plans
                </Button>
              </CardContent>
            </Card>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className={`relative ${!feature.available ? 'opacity-60' : ''}`}>
                    {!feature.available && (
                      <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                        <Badge className="bg-primary text-primary-foreground">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium Only
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pricing Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-forest text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-center">
                      <div className="text-2xl font-bold">{plan.name}</div>
                      <div className="text-3xl font-bold text-primary mt-2">
                        {plan.price}
                        {plan.period && <span className="text-lg text-muted-foreground">/{plan.period}</span>}
                      </div>
                    </CardTitle>
                    <CardDescription className="text-center">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Premium Dashboard */
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="exports">Data Export</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              {/* Analytics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analyticsData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.metric}</p>
                          <p className="text-2xl font-bold">{item.value}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          {item.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Trends</CardTitle>
                  <CardDescription>
                    Plant identification and remedy access patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exports" className="space-y-6">
              {/* Data Export */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Exports</CardTitle>
                  <CardDescription>
                    Download verified data in various formats for research and analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exportOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{option.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Format: {option.format}</span>
                            <span>Size: {option.size}</span>
                            <span>Updated: {option.lastUpdated}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaboration" className="space-y-6">
              {/* Collaboration Tools */}
              <Card>
                <CardHeader>
                  <CardTitle>Research Collaboration</CardTitle>
                  <CardDescription>
                    Connect with other researchers and institutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Collaboration features would be displayed here, including project sharing,
                    team management, and research partnership tools.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your premium subscription and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Premium account settings and configuration options would appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
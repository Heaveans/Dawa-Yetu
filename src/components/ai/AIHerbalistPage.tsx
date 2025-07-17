import { useState } from "react";
import { Bot, Send, Mic, Loader2, Sparkles, MessageSquare, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIHerbalistPageProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AIHerbalistPage({ onNavigate }: AIHerbalistPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Habari! I am your AI Herbalist assistant, trained on thousands of traditional African remedies. Ask me about medicinal plants, healing practices, or specific ailments. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "What herbs help with stomach pain?",
    "Tell me about Aloe Vera uses in African medicine",
    "What plants are good for fever?",
    "How to prepare moringa for health?",
    "Traditional remedies for headaches",
    "Plants that boost immunity"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on traditional African herbal knowledge, here's what I can tell you about "${inputMessage}": This is a simulated response. In the real implementation, this would connect to an AI model trained on African herbal medicine data.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-forest text-primary-foreground py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Herbalist Assistant</h1>
              <p className="text-primary-foreground/80">Your personal guide to African traditional medicine</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <Heart className="w-3 h-3 mr-1" />
              Traditional Knowledge
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              Swahili Supported
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Questions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Popular Questions</span>
            </CardTitle>
            <CardDescription>
              Get started with these commonly asked questions about traditional medicine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-wrap"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Container */}
        <Card className="h-96">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about traditional remedies, plants, or healing practices..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => console.log("Voice input")}
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send • Voice input supports Swahili, Yoruba, and other African languages
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Responses</h3>
              <p className="text-sm text-muted-foreground">
                AI trained on verified traditional African medicine knowledge
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Mic className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Voice Support</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions in Swahili, Yoruba, and other local languages
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Cultural Context</h3>
              <p className="text-sm text-muted-foreground">
                Understand traditional uses, rituals, and cultural significance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
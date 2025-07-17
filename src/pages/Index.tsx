import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HomePage } from "@/components/home/HomePage";
import { PlantIdentifyPage } from "@/components/identify/PlantIdentifyPage";
import { HerbalDatabasePage } from "@/components/database/HerbalDatabasePage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "identify":
        return <PlantIdentifyPage onNavigate={setCurrentPage} />;
      case "database":
        return <HerbalDatabasePage onNavigate={setCurrentPage} />;
      case "submit":
        return <div className="min-h-screen bg-background p-8"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Submit Remedy</h1><p className="text-muted-foreground">Share your traditional healing knowledge (Coming Soon)</p></div></div>;
      case "community":
        return <div className="min-h-screen bg-background p-8"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Community Stories</h1><p className="text-muted-foreground">Cultural stories and community discussions (Coming Soon)</p></div></div>;
      case "learn":
        return <div className="min-h-screen bg-background p-8"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Learn</h1><p className="text-muted-foreground">Educational content about traditional medicine (Coming Soon)</p></div></div>;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Index;

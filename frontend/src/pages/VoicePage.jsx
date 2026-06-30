import Navbar from "@/components/Navbar";
import FeatureCards from "@/components/voice/FeatureCards";
import ChatWidget from "@/components/voice/VapiWidget";
import WelcomeSection from "@/components/voice/WelcomeSection";

function VoicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24 min-h-screen">
        <WelcomeSection />
        <FeatureCards />
        <ChatWidget />
      </div>
    </div>
  );
}

export default VoicePage;

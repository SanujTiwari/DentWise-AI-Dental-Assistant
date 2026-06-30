import { useAuth } from "@/contexts/AuthContext";

export default function WelcomeSection() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "morning";
    if (hours < 18) return "afternoon";
    return "evening";
  };

  return (
    <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <div className="size-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">Online & Ready</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Good {getGreeting()}, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Your personal AI dental assistant is ready to help you maintain perfect oral health.
          </p>
        </div>
      </div>

      <div className="lg:flex hidden flex-col items-center justify-center size-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl gap-1">
        <img src="/logo.svg" alt="DentWise" className="w-12 h-12 object-contain" />
        <span className="text-[10px] font-bold tracking-wider text-primary uppercase">DentWise</span>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="relative flex flex-col items-center justify-center">
        {/* Pulsing glow rings */}
        <div className="absolute w-24 h-24 rounded-full border border-primary/30 animate-ping opacity-75"></div>
        <div className="absolute w-28 h-28 rounded-full border-2 border-primary/10 animate-pulse"></div>

        {/* Rotating outline spinner */}
        <div className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-primary border-b-primary animate-spin duration-1000"></div>

        {/* Brand logo in the center (pulsing) */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center shadow-md animate-pulse">
          <img
            src="/logo.svg"
            alt="DentWise Loading"
            className="w-10 h-auto object-contain"
          />
        </div>

        {/* Text indicators */}
        <div className="mt-8 flex flex-col items-center gap-1.5">
          <span className="text-sm font-bold tracking-widest text-primary uppercase animate-pulse">
            DentWise
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase animate-bounce duration-700">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, SparklesIcon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("custom");
    else setTheme("light");
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center justify-center gap-0.5 -mt-0.5">
          <img src="/logo.svg" alt="DentWise Logo" className="w-8 h-auto" />
          <span className="text-[10px] font-bold tracking-wider text-primary uppercase">DentWise</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">How it Works</a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#about" className="text-muted-foreground hover:text-foreground">About</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 relative overflow-hidden focus:outline-none mr-1"
            title={`Switch theme (current: ${theme})`}
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {theme === "light" && <SunIcon className="w-5 h-5 text-amber-500 animate-spin-in" />}
              {theme === "dark" && <MoonIcon className="w-5 h-5 text-indigo-400 animate-spin-in" />}
              {theme === "custom" && <SparklesIcon className="w-5 h-5 text-sky-500 animate-spin-in" />}
            </div>
          </button>

          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;

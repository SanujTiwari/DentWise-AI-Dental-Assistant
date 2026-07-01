import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  CalendarIcon,
  CrownIcon,
  HomeIcon,
  MessageSquareIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  LogOutIcon,
  ShieldIcon,
} from "lucide-react";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("custom");
    else setTheme("light");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex flex-col items-center justify-center -mt-1">
            <img src="/logo.svg" alt="DentWise Logo" className="w-8 h-auto" />
            <span className="text-[9px] font-bold tracking-wider text-primary uppercase mt-0.5">
              DentWise
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 transition-colors ${
                pathname === "/dashboard"
                  ? "text-foreground hover:text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            <Link
              to="/appointments"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/appointments" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">Appointments</span>
            </Link>

            <Link
              to="/chatbot"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/chatbot" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <MessageSquareIcon className="w-4 h-4" />
              <span className="hidden md:inline">Chatbot</span>
            </Link>

            <Link
              to="/pro"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/pro" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CrownIcon className="w-4 h-4" />
              <span className="hidden md:inline">Pro</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/profile" ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              <span className="hidden md:inline">Profile</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                  pathname === "/admin" ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                <ShieldIcon className="w-4 h-4" />
                <span className="hidden md:inline">Admin</span>
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>

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

            {/* User avatar + Logout */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                title="Logout"
              >
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, Plus, Mic, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden bg-background">
      {/* Landing page background styles */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-25"></div>
      </div>
      
      {/* Decorative blurred blobs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl min-h-[720px] grid lg:grid-cols-12 bg-card border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 gap-6">
        
        {/* Left Side: 3D Character Card */}
        <div className="lg:col-span-6 flex flex-col justify-between p-8 bg-[#FAF7EE] rounded-[2rem] relative overflow-hidden group min-h-[450px]">
          {/* Animated decorative lines inside card */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          {/* Top Logo */}
          <div className="relative z-10 flex items-center w-full">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.svg" alt="DentWise Logo" className="w-8 h-auto select-none" />
              <span className="text-sm font-bold tracking-wider text-primary uppercase">
                DentWise
              </span>
            </Link>
          </div>

          {/* 3D Character Container */}
          <div className="relative flex-1 flex flex-col items-center justify-center my-6">
            <img 
              src="/hero.png" 
              alt="DentWise AI 3D Character" 
              className="w-64 md:w-72 h-auto object-contain select-none drop-shadow-2xl animate-float"
            />
          </div>

          {/* Prompt input styled container at the bottom */}
          <div className="relative z-10 bg-background border border-border/40 backdrop-blur-md rounded-2xl p-4 shadow-lg space-y-3 transition-all duration-300 group-hover:shadow-xl">
            <p className="text-xs text-foreground/85 font-medium leading-relaxed italic">
              "Check dental symptom: I have a sudden sensitivity in my left molars when drinking cold water..."
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-border/30">
              <div className="flex gap-2">
                <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Plus className="w-3.5 h-3.5" />
                </span>
                <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Mic className="w-3.5 h-3.5" />
                </span>
              </div>
              <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Pagination Carousel Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            <span className="w-4 h-1.5 rounded-full bg-primary/80 transition-all duration-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all duration-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all duration-300" />
          </div>
        </div>

        {/* Right Side: Clean Form */}
        <div className="lg:col-span-6 flex flex-col justify-center px-4 py-8 lg:p-12">
          <div className="w-full max-w-md mx-auto space-y-8 animate-slide-up">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Login to your account</h2>
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="h-11 pl-4 pr-10 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <label htmlFor="rememberMe" className="text-sm font-medium text-muted-foreground select-none cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-xs text-primary hover:underline font-semibold">Forgot Password?</a>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-bold bg-black text-white hover:bg-slate-900 rounded-full transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">or login with</span>
              </div>
            </div>

            {/* Google Login */}
            <button 
              type="button"
              className="w-full h-12 border border-border/80 bg-background hover:bg-muted/40 text-sm font-medium text-foreground rounded-full flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

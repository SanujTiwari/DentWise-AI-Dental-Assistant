import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, LogInIcon, Sparkles, Activity, ShieldCheck, HeartPulse } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen w-full grid lg:grid-cols-12 bg-background overflow-x-hidden animate-fade-in">
      {/* Left Panel: Aesthetic branding, visible on lg and up */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-slate-950 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Decorative backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-950 to-emerald-950/20 z-0" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        
        {/* Animated pattern lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

        {/* Logo and Brand */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <img src="/logo.svg" alt="DentWise" className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent uppercase">
              DentWise
            </span>
          </Link>
        </div>

        {/* Dynamic Marketing Card */}
        <div className="relative z-10 space-y-8 my-auto">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Dental Assistant
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight lg:text-5xl">
              Intelligent Care for Every{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Smile
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md">
              Connect with specialized doctors, manage appointments, and check your symptoms with our AI companion.
            </p>
          </div>

          {/* Interactive Feature list */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Dental Diagnostics</h3>
                <p className="text-xs text-slate-400">Evaluate symptoms and get instant dental guidance.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Expert Specialists</h3>
                <p className="text-xs text-slate-400">Book appointments with certified dentists in seconds.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Secure Encrypted Data</h3>
                <p className="text-xs text-slate-400">Your dental records and conversations are fully protected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} DentWise Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center px-6 py-12 lg:px-16 xl:px-24 bg-gradient-to-b from-background to-background via-primary/5">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Logo visible only on mobile */}
          <div className="text-center lg:hidden flex flex-col items-center gap-2 mb-4">
            <Link to="/" className="inline-flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                  <img src="/logo.svg" alt="DentWise" className="w-7 h-7" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-wider text-primary uppercase">DentWise</span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">
              Please enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-xl shadow-primary/5 backdrop-blur-sm relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="h-11 pl-4 pr-10 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOffIcon className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-sky-600 hover:from-primary/95 hover:to-sky-600/95 shadow-md shadow-primary/20 cursor-pointer transition-all duration-200" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-primary-foreground font-semibold">
                    <LogInIcon className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border/40 pt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline hover:text-primary-dark transition-colors">
                Create one now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, Plus, Mic, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.firstName) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to register");
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
              "Analyze oral health: How often should I get a professional dental cleanup, and is bleeding gums normal?"
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
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all duration-300" />
            <span className="w-4 h-1.5 rounded-full bg-primary/80 transition-all duration-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all duration-300" />
          </div>
        </div>

        {/* Right Side: Clean Form */}
        <div className="lg:col-span-6 flex flex-col justify-center px-4 py-8 lg:p-12">
          <div className="w-full max-w-md mx-auto space-y-6 animate-slide-up">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Create your account</h2>
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="yourname@mail.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91-98100-10101"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="h-11 px-4 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all duration-200"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-bold bg-black text-white hover:bg-slate-900 rounded-full transition-all duration-200 shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

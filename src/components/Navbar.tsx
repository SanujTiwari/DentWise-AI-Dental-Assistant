"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, CrownIcon, HomeIcon, MicIcon, SunIcon, MoonIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const pathname = usePathname();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("custom");
    else setTheme("light");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex flex-col items-center justify-center -mt-1">
            <Image src="/logo.svg" alt="DentWise Logo" width={28} height={28} className="w-8 h-auto" />
            <span className="text-[9px] font-bold tracking-wider text-primary uppercase mt-0.5">DentWise</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
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
              href="/appointments"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/appointments" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">Appointments</span>
            </Link>

            <Link
              href="/voice"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/voice" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <MicIcon className="w-4 h-4" />
              <span className="hidden md:inline">Voice</span>
            </Link>
            <Link
              href="/pro"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/pro" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CrownIcon className="w-4 h-4" />
              <span className="hidden md:inline">Pro</span>
            </Link>
            <Link
              href="/profile"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/profile" ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              <span className="hidden md:inline">Profile</span>
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 relative overflow-hidden focus:outline-none mr-1"
              title={`Switch theme (current: ${theme})`}
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {theme === "light" && (
                  <SunIcon className="w-5 h-5 text-amber-500 animate-in spin-in-45 duration-300" />
                )}
                {theme === "dark" && (
                  <MoonIcon className="w-5 h-5 text-indigo-400 animate-in spin-in-45 duration-300" />
                )}
                {theme === "custom" && (
                  <SparklesIcon className="w-5 h-5 text-sky-500 animate-in spin-in-45 duration-300" />
                )}
              </div>
            </button>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

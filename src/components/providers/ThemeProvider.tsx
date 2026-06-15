"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { updateUserTheme } from "@/lib/actions/users";

type Theme = "light" | "dark" | "custom";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "custom") {
        return savedTheme as Theme;
      }
    }
    return "light";
  });
  const { user, isLoaded } = useUser();

  useEffect(() => {
    async function fetchTheme() {
      if (isLoaded && user) {
        try {
          const response = await fetch('/api/user/profile');
          const data = await response.json();
          if (data.chatTheme && (data.chatTheme === "light" || data.chatTheme === "dark" || data.chatTheme === "custom")) {
            setThemeState(data.chatTheme as Theme);
            window.localStorage.setItem("theme", data.chatTheme);
          }
        } catch (error) {
          console.error("Failed to fetch theme", error);
        }
      }
    }
    fetchTheme();
  }, [isLoaded, user]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "custom");
    root.classList.add(theme);
  }, [theme]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
    }
    if (isLoaded && user) {
      try {
        await updateUserTheme(newTheme);
      } catch (error) {
        console.error("Failed to sync theme to DB", error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

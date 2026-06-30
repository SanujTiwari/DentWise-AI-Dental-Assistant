import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usersAPI } from "@/lib/api";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "custom") {
        return savedTheme;
      }
    }
    return "light";
  });
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchTheme() {
      if (isAuthenticated && user) {
        try {
          const data = await usersAPI.getProfile();
          if (data.chatTheme && ["light", "dark", "custom"].includes(data.chatTheme)) {
            setThemeState(data.chatTheme);
            window.localStorage.setItem("theme", data.chatTheme);
          }
        } catch (error) {
          console.error("Failed to fetch theme", error);
        }
      }
    }
    fetchTheme();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "custom");
    root.classList.add(theme);
  }, [theme]);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
    }
    if (isAuthenticated && user) {
      try {
        await usersAPI.updateTheme(newTheme);
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

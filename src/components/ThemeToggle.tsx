"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="border p-1.5 rounded-full">
      {mounted && theme === "dark" ? (
        <Moon className="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black" size={18} strokeWidth={2.5}/>
      ) : (
        <Sun className="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black" size={18} strokeWidth={2.5}/>
      )}
    </button>
  );
}

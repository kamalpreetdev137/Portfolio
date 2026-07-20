"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === "dark") {
      gsap.to(moonRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(sunRef.current, { scale: 0, rotation: -180, duration: 0.3, ease: "power2.inOut" });
    } else {
      gsap.to(sunRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(moonRef.current, { scale: 0, rotation: 180, duration: 0.3, ease: "power2.inOut" });
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/50 text-text-secondary transition-all hover:border-primary/30 hover:text-primary"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div ref={moonRef} className="absolute">
        <Moon size={18} />
      </div>
      <div ref={sunRef} className="absolute">
        <Sun size={18} />
      </div>
    </button>
  );
}

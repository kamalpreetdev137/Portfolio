"use client";

import { useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function useHashNavigation() {
  const scrollToSection = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      // Update URL hash without triggering scroll
      window.history.pushState(null, "", hash);

      gsap.to(window, {
        scrollTo: { y: el, offsetY: 64 },
        duration: 1.2,
        ease: "power3.inOut",
      });
    }
  }, []);

  // Scroll to hash section on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          gsap.to(window, {
            scrollTo: { y: el, offsetY: 64 },
            duration: 0,
            ease: "none",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          gsap.to(window, {
            scrollTo: { y: el, offsetY: 64 },
            duration: 1,
            ease: "power3.inOut",
          });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return { scrollToSection };
}

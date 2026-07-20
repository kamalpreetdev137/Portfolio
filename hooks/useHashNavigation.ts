"use client";

import { useEffect, useCallback } from "react";
import { gsap, ScrollToPlugin } from "@/lib/gsap";

export function useHashNavigation() {
  const scrollToSection = useCallback((hash: string) => {
    if (!/^#[a-zA-Z0-9_-]+$/.test(hash)) return;
    const el = document.querySelector(hash);
    if (el) {
      window.history.pushState(null, "", hash);

      gsap.to(window, {
        scrollTo: { y: el, offsetY: 64 },
        duration: 1.2,
        ease: "power3.inOut",
      });
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && /^#[a-zA-Z0-9_-]+$/.test(hash)) {
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
      if (hash && /^#[a-zA-Z0-9_-]+$/.test(hash)) {
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

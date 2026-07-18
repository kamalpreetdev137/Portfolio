"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X, Download } from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHashNavigation } from "@/hooks/useHashNavigation";
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const activeSection = useActiveSection(
    NAV_ITEMS.map((item) => item.href.slice(1))
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const { scrollToSection } = useHashNavigation();

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, backdropFilter: "blur(0px)" },
          { opacity: 1, backdropFilter: "blur(24px)", duration: 0.4, ease: "power2.out" }
        );

        mobileLinksRef.current.forEach((link, i) => {
          if (link) {
            gsap.fromTo(
              link,
              { opacity: 0, y: 50, rotationX: -90 },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.6,
                delay: 0.1 + i * 0.08,
                ease: "back.out(1.7)",
              }
            );
          }
        });
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-border shadow-lg"
            : "bg-transparent"
        )}
      >
        <LayoutContainer>
          <nav className="flex h-16 items-center justify-between">
            <MagneticButton strength={0.2}>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#home");
                }}
                className="group flex items-center gap-2"
              >
                <img
                  src="/profile.jpg"
                  alt="Kamalpreet"
                  className="h-8 w-8 rounded-lg object-cover ring-2 ring-primary/30 transition-all group-hover:ring-primary group-hover:shadow-lg group-hover:shadow-primary/20"
                />
                <span className="text-lg font-semibold text-text-primary">
                  Kamalpreet<span className="text-primary">.dev</span>
                </span>
              </a>
            </MagneticButton>

            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => (
                <MagneticButton key={item.href} strength={0.15}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                      activeSection === item.href.slice(1)
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                    )}
                  >
                    {item.label}
                  </a>
                </MagneticButton>
              ))}
              <ThemeToggle />
              <MagneticButton strength={0.2}>
                <a
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                >
                  <Download size={14} />
                  Resume
                </a>
              </MagneticButton>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </LayoutContainer>
      </header>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden"
        >
          <nav className="flex flex-col items-center justify-center gap-8 pt-24">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                ref={(el) => { mobileLinksRef.current[i] = el; }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "text-3xl font-medium transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              ref={(el) => { mobileLinksRef.current[NAV_ITEMS.length] = el; }}
              href="/resume"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-medium text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
            >
              <Download size={20} />
              Resume
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

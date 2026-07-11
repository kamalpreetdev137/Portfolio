"use client";

import { Github, Linkedin, Instagram, Twitter, Mail, Heart } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/constants";
import LayoutContainer from "./LayoutContainer";

const socialIconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
};

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-surface/30">
      <LayoutContainer>
        <div className="flex flex-col items-center gap-8 py-12 sm:flex-row sm:justify-between">
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
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-primary/30 transition-all group-hover:ring-primary"
            />
            <span className="text-lg font-semibold text-text-primary">
              Kamalpreet<span className="text-primary">.dev</span>
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.filter((s) => s.name !== "Email").map((social) => {
              const Icon = socialIconMap[social.icon] || Github;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                  aria-label={social.name}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} Kamalpreet.dev. All rights
              reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-text-secondary">
              Made with <Heart size={14} className="text-red-500" fill="currentColor" /> using Next.js
            </p>
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
}

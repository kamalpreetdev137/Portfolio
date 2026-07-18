"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_STACK, TECH_CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

function TechIcon({ name }: { name: string }) {
  const colors: Record<string, string> = {
    HTML: "#E34F26",
    CSS: "#1572B6",
    JavaScript: "#F7DF1E",
    React: "#61DAFB",
    Nodejs: "#339933",
    "Express.js": "#FFFFFF",
    MySQL: "#4479A1",
    MongoDB: "#47A248",
    ChatGPT: "#10A37F",
    "Google Mini": "#4285F4",
    "Adobe Express": "#FF61F6",
    GitHub: "#FFFFFF",
    "VS Code": "#007ACC",
    Figma: "#F24E1E",
  };

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface/50 text-xs font-bold transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10"
      style={{ color: colors[name] || "#94A3B8" }}
      title={name}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "all"
      ? TECH_STACK
      : TECH_STACK.filter((t) => t.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Horizontal scroll on desktop
      if (horizontalRef.current && trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth - horizontalRef.current.offsetWidth;

        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top 20%",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // Filter buttons stagger
      gsap.from(".filter-btn", {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".filter-btn",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (activeCategory === "all" && trackRef.current) {
      // Reset horizontal position when switching to "all"
      gsap.set(trackRef.current, { x: 0 });
    }

    if (trackRef.current) {
      const items = trackRef.current.querySelectorAll(".tech-item");
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.5, rotation: -15 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: {
            each: 0.04,
            from: "center",
            grid: "auto",
          },
          ease: "back.out(1.7)",
        }
      );
    }
  }, [activeCategory]);

  return (
    <section className="py-24">
      <LayoutContainer>
        <div ref={sectionRef} className="flex flex-col gap-16">
          <div className="tech-title text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Tech Stack
            </p>
            <TextReveal tag="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Technologies I Use
            </TextReveal>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "filter-btn rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                activeCategory === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-primary/30"
              )}
            >
              All
            </button>
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "filter-btn rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-primary/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Desktop: horizontal scroll gallery */}
          <div ref={horizontalRef} className="hidden lg:block overflow-hidden">
            <div ref={trackRef} className="flex gap-6 w-max">
              {[...filtered, ...filtered, ...filtered].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="tech-item group flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5 w-36 shrink-0"
                >
                  <TechIcon name={tech.name} />
                  <span className="w-full truncate text-center text-xs text-text-secondary transition-colors group-hover:text-text-primary">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: grid */}
          <div ref={trackRef} className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:hidden">
            {filtered.map((tech) => (
              <div
                key={tech.name}
                className="tech-item group flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-card"
              >
                <TechIcon name={tech.name} />
                <span className="w-full truncate text-center text-xs text-text-secondary transition-colors group-hover:text-text-primary">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

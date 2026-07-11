"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TECH_STACK, TECH_CATEGORIES } from "@/constants";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";

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
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/50 text-xs font-bold transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary"
      style={{ color: colors[name] || "#94A3B8" }}
      title={name}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref, isInView } = useInView(0.1);

  const filtered =
    activeCategory === "all"
      ? TECH_STACK
      : TECH_STACK.filter((t) => t.category === activeCategory);

  return (
    <section className="py-24">
      <LayoutContainer ref={ref}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Tech Stack
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Technologies I Use
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "border border-border bg-surface text-text-secondary hover:text-text-primary"
              )}
            >
              All
            </button>
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat.key
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-text-secondary hover:text-text-primary"
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:grid-cols-7">
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/30 hover:bg-card"
              >
                <TechIcon name={tech.name} />
                <span className="w-full truncate text-center text-xs text-text-secondary transition-colors group-hover:text-text-primary">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

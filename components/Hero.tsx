"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

function Particles() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Particles />

      <LayoutContainer className="relative z-10 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 self-center lg:self-start rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-text-secondary backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </motion.div>

            <div className="flex flex-col gap-3">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Hi, I&apos;m{" "}
                <span className="text-primary">Kamalpreet</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl"
              >
                Full Stack Developer &amp;{" "}
                <br className="hidden sm:block" />
                AI Engineer
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mx-auto max-w-lg text-lg leading-relaxed text-text-secondary lg:mx-0 lg:text-xl"
            >
              I build modern web applications, AI-powered solutions,
              automation systems, and scalable digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                <Eye size={16} />
                View Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-primary/30 hover:bg-card backdrop-blur-sm"
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
              
              {/* Profile image */}
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-border bg-card">
                <img
                  src="/profile.jpg"
                  alt="Kamalpreet - Full Stack Developer"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -right-4 top-8 rounded-xl border border-border bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-semibold text-primary">Full Stack</span>
              </motion.div>
              
              <motion.div
                className="absolute -left-4 bottom-12 rounded-xl border border-border bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <span className="text-sm font-semibold text-primary">AI Engineer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center lg:mt-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-text-secondary">Scroll</span>
            <div className="flex h-6 w-4 justify-center rounded-full border border-border p-1">
              <div className="h-2 w-full animate-pulse-slow rounded-full bg-primary" />
            </div>
          </motion.div>
        </motion.div>
      </LayoutContainer>
    </section>
  );
}

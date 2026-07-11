"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

function Particles() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
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
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
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

function GlowingOrb() {
  return (
    <motion.div
      className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/20 blur-[128px]"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Particles />
      <GlowingOrb />

      <LayoutContainer className="relative z-10 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 self-center lg:self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm"
            >
              <Sparkles size={14} className="animate-pulse" />
              Available for new projects
            </motion.div>

            <div className="flex flex-col gap-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Kamalpreet
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl"
              >
                Full Stack Developer &amp;{" "}
                <br className="hidden sm:block" />
                <span className="text-primary">AI Engineer</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mx-auto max-w-lg text-lg leading-relaxed text-text-secondary lg:mx-0 lg:text-xl"
            >
              I build modern web applications, AI-powered solutions,
              automation systems, and scalable digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                <Eye size={16} className="relative z-10" />
                <span className="relative z-10">View Projects</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-primary/30 hover:bg-card backdrop-blur-sm"
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-12 rounded-full border border-dashed border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Glowing background */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
              
              {/* Profile image */}
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-primary/30 bg-card shadow-2xl shadow-primary/20">
                <img
                  src="/profile.jpg"
                  alt="Kamalpreet - Full Stack Developer"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -right-6 top-8 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-bold text-primary">Full Stack</span>
              </motion.div>
              
              <motion.div
                className="absolute -left-6 bottom-12 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-bold text-primary">AI Engineer</span>
              </motion.div>

              <motion.div
                className="absolute -right-2 bottom-4 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-bold text-green-400">● Available</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center lg:mt-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-text-secondary">Scroll</span>
            <div className="flex h-6 w-4 justify-center rounded-full border border-border p-1">
              <motion.div
                className="h-2 w-full rounded-full bg-primary"
                animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </LayoutContainer>
    </section>
  );
}

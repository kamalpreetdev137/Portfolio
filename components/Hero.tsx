"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import LayoutContainer from "./LayoutContainer";
import MagneticButton from "./MagneticButton";
import { useHashNavigation } from "@/hooks/useHashNavigation";

gsap.registerPlugin(ScrollTrigger);

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(arr);
  }, []);

  useEffect(() => {
    if (!containerRef.current || particles.length === 0) return;
    const els = containerRef.current.querySelectorAll(".particle");
    els.forEach((p) => {
      gsap.to(p, {
        opacity: gsap.utils.random(0.2, 0.8),
        scale: gsap.utils.random(1, 1.5),
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(5, 15),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 5),
      });
    });
  }, [particles]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-primary/30 opacity-0"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}

function GlowingOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current) return;
    gsap.to(orbRef.current, {
      scale: 1.3,
      opacity: 0.6,
      x: 20,
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={orbRef}
      className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/20 blur-[128px] opacity-30"
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const { scrollToSection } = useHashNavigation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Text split animation for heading
      const headingChars = headingRef.current?.querySelectorAll(".hero-char");
      if (headingChars) {
        tl.from(headingChars, {
          opacity: 0,
          y: 60,
          rotateX: -90,
          duration: 0.8,
          stagger: 0.02,
        });
      }

      // Subtitle reveal
      tl.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
      }, "-=0.4");

      // Description
      tl.from(".hero-desc", {
        opacity: 0,
        y: 20,
        duration: 0.5,
      }, "-=0.3");

      // CTA buttons with magnetic
      tl.from(".hero-cta", {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
      }, "-=0.2");

      // Profile image - dramatic entrance
      tl.from(profileRef.current, {
        opacity: 0,
        scale: 0.6,
        rotation: -10,
        duration: 1,
        ease: "back.out(1.4)",
      }, "-=0.6");

      // Floating badges pop in
      tl.from([badge1Ref.current, badge2Ref.current, badge3Ref.current], {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "elastic.out(1, 0.5)",
      }, "-=0.4");

      // Ring rotations - continuous
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      // Floating badges - organic movement
      gsap.to(badge1Ref.current, {
        y: -12,
        x: 5,
        rotation: 3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(badge2Ref.current, {
        y: 15,
        x: -8,
        rotation: -2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });
      gsap.to(badge3Ref.current, {
        y: -10,
        x: 3,
        rotation: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      // Profile parallax on scroll
      gsap.to(profileRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Hero content fade out on scroll
      gsap.to(".hero-content", {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll indicator
      gsap.from(".scroll-indicator", {
        opacity: 0,
        y: 20,
        delay: 1.5,
        duration: 0.8,
      });
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Hi, I'm Kamalpreet";

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Particles />
      <GlowingOrb />

      <LayoutContainer className="relative z-10 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="hero-content flex flex-col gap-8 text-center lg:text-left">
            <div className="inline-flex w-fit mx-auto lg:mx-0 items-center gap-2 self-center lg:self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              Available for new projects
            </div>

            <div ref={headingRef} className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {headingText.split("").map((char, i) => (
                  <span key={i} className="hero-char inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <h2 className="hero-subtitle text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                Full Stack Developer &amp;{" "}
                <br className="hidden sm:block" />
                <span className="text-primary">AI Engineer</span>
              </h2>
            </div>

            <p className="hero-desc mx-auto max-w-lg text-lg leading-relaxed text-text-secondary lg:mx-0 lg:text-xl">
              I build modern web applications, AI-powered solutions,
              automation systems, and scalable digital experiences.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <MagneticButton className="hero-cta">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#projects");
                  }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  <Eye size={16} className="relative z-10" />
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>

              <MagneticButton className="hero-cta">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contact");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-primary/30 hover:bg-card backdrop-blur-sm"
                >
                  Let&apos;s Talk
                </a>
              </MagneticButton>
            </div>
          </div>

          <div
            ref={profileRef}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <div ref={ring1Ref} className="absolute -inset-8 rounded-full border border-primary/20" />
              <div ref={ring2Ref} className="absolute -inset-12 rounded-full border border-dashed border-primary/10" />

              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />

              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-primary/30 bg-card shadow-2xl shadow-primary/20">
                <img
                  src="/profile.jpg"
                  alt="Kamalpreet - Full Stack Developer"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              <div ref={badge1Ref} className="absolute -right-6 top-8 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                <span className="text-sm font-bold text-primary">Full Stack</span>
              </div>

              <div ref={badge2Ref} className="absolute -left-6 bottom-12 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                <span className="text-sm font-bold text-primary">AI Engineer</span>
              </div>

              <div ref={badge3Ref} className="absolute -right-2 bottom-4 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                <span className="text-sm font-bold text-green-400">● Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator mt-16 flex justify-center lg:mt-24">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-text-secondary">Scroll</span>
            <div className="flex h-6 w-4 justify-center rounded-full border border-border p-1">
              <div className="h-2 w-full rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

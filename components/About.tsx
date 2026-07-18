"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/constants";
import LayoutContainer from "./LayoutContainer";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const numStr = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const target = parseInt(numStr, 10);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (animated.current) return;
        animated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          delay,
          ease: "power2.out",
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [target, delay]);

  return (
    <div
      ref={ref}
      className="stat-card group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 text-center transition-all hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="text-3xl font-bold text-primary transition-transform group-hover:scale-110 sm:text-4xl">
          {count}{suffix}
        </div>
        <div className="mt-1 text-sm text-text-secondary">{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.from(".about-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content slide in
      gsap.from(".about-text > *", {
        opacity: 0,
        x: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
      });

      // Skill tags pop
      gsap.from(".skill-tag", {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".skill-tag",
          start: "top 90%",
        },
      });

      // Stat cards
      gsap.from(".stat-card", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stat-card",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24">
      <LayoutContainer>
        <div ref={sectionRef} className="flex flex-col gap-16">
          <div className="about-title text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              About Me
            </p>
            <TextReveal tag="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Crafting Digital Experiences
            </TextReveal>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div ref={imageRef} className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src="/profile.jpg"
                  alt="Kamalpreet - Full Stack Developer"
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>

            <div className="about-text flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-text-primary">
                My Journey
              </h3>
              <p className="leading-relaxed text-text-secondary">
                I&apos;m Kamalpreet, a passionate Full Stack Developer and AI
                Engineer with over 4 years of experience building modern web
                applications. I specialize in creating AI-powered solutions,
                scalable SaaS products, and exceptional digital experiences.
              </p>
              <p className="leading-relaxed text-text-secondary">
                My mission is to help businesses and individuals transform their
                ideas into reality through clean code, innovative technology, and
                thoughtful design. I believe in writing software that not only
                works but is maintainable, accessible, and performant.
              </p>
              <p className="leading-relaxed text-text-secondary">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, and sharing
                knowledge with the developer community.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Next.js", "TypeScript", "Node.js", "AI/ML"].map((tag) => (
                  <span
                    key={tag}
                    className="skill-tag rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20 hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

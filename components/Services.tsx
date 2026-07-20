"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import {
  Code,
  Brain,
  Rocket,
  Database,
  Palette,
  Zap,
} from "lucide-react";
import { SERVICES } from "@/constants";
import LayoutContainer from "./LayoutContainer";
import { TextReveal } from "./TextReveal";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Brain,
  Rocket,
  Database,
  Palette,
  Zap,
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Advanced stagger - cards come from different directions
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.from(card, {
          opacity: 0,
          x: direction * 60,
          y: 30,
          rotation: direction * 5,
          scale: 0.9,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });

      // Icon spin on scroll
      gsap.from(".service-icon", {
        rotation: -180,
        scale: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".service-card",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-24">
      <LayoutContainer>
        <div ref={sectionRef} className="flex flex-col gap-16">
          <div className="services-title text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Services
            </p>
            <TextReveal tag="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What I Do
            </TextReveal>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Delivering end-to-end solutions from concept to deployment, with a
              focus on performance, scalability, and exceptional user experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <TiltCard
                  key={service.title}
                  className="service-card group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5 sm:p-8"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 transition-all group-hover:scale-150 group-hover:bg-primary/10" />
                  <div className="relative z-10">
                    <div className="service-icon mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

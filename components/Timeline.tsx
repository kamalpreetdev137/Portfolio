"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import { EXPERIENCES } from "@/constants";
import LayoutContainer from "./LayoutContainer";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Line draw with scrub
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });

        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1.5,
          },
        });
      }

      // Timeline items - alternating slide
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item, i) => {
        const isEven = i % 2 === 0;

        gsap.from(item, {
          opacity: 0,
          x: isEven ? -50 : 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
        });
      });

      // Dots pop with elastic
      gsap.from(".timeline-dot", {
        scale: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".timeline-dot",
          start: "top 85%",
        },
      });

      // Tech tags slide in
      gsap.from(".timeline-tech", {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-tech",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24">
      <LayoutContainer>
        <div ref={sectionRef} className="flex flex-col gap-16">
          <div className="timeline-title text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Experience
            </p>
            <TextReveal tag="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              My Journey
            </TextReveal>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-0 relative">
            <div
              ref={lineRef}
              className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent"
            />
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="timeline-item grid grid-cols-[auto_1fr] gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="timeline-dot flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-background z-10 shadow-lg shadow-primary/10">
                    <Briefcase size={16} className="text-primary" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-10">
                  <p className="text-sm font-medium text-primary">
                    {exp.period}
                  </p>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {exp.company}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {exp.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="timeline-tech rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-all hover:bg-primary/20 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

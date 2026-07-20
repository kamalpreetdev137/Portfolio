"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  tag: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !mounted) return;

    const chars = ref.current.querySelectorAll(".char");

    gsap.from(chars, {
      opacity: 0,
      y: 40,
      rotateX: -90,
      duration: 0.6,
      stagger,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    });
  }, [mounted, delay, stagger]);

  const words = children.split(" ");

  return (
    // @ts-expect-error Tag is a valid HTML tag
    <Tag ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

interface SplitLinesProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p";
}

export function SplitLines({
  children,
  className = "",
  delay = 0,
  tag: Tag = "h2",
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const lines = ref.current.querySelectorAll(".line");

    gsap.from(lines, {
      y: "100%",
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    });
  }, [delay]);

  return (
    // @ts-expect-error Tag is a valid HTML tag
    <Tag ref={ref} className={`${className} overflow-hidden`}>
      <span className="line inline-block">{children}</span>
    </Tag>
  );
}

export function ParallaxText({
  children,
  className = "",
  speed = 0.5,
}: {
  children: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: speed * -100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

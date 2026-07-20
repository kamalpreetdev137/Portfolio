"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (cursorDotRef.current) {
        gsap.set(cursorDotRef.current, { x: e.clientX, y: e.clientY });
      }
    };

    const onHover = () => {
      gsap.to(cursorRef.current, { scale: 2, opacity: 0.5, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    });

    let rafId: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (cursorRef.current) {
        gsap.set(cursorRef.current, { x: pos.current.x, y: pos.current.y });
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 lg:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary lg:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}

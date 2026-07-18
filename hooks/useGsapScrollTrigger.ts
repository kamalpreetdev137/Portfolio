"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapScrollTriggerOptions {
  trigger?: string | React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  animation: gsap.core.Tween | gsap.core.Timeline;
  dependencies?: unknown[];
}

export function useGsapScrollTrigger({
  trigger,
  start = "top 80%",
  end = "bottom 20%",
  scrub = false,
  pin = false,
  onEnter,
  onLeave,
  animation,
  dependencies = [],
}: UseGsapScrollTriggerOptions) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const triggerEl =
      typeof trigger === "string"
        ? document.querySelector(trigger)
        : trigger?.current;

    if (!triggerEl || !animation) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      scrub,
      pin,
      onEnter: onEnter ?? undefined,
      onLeave: onLeave ?? undefined,
      animation,
    });

    return () => {
      triggerRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return triggerRef;
}

export function useScrollReveal(
  selector: string,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    start?: string;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: options?.y ?? 40,
        opacity: options?.opacity ?? 0,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.1,
        delay: options?.delay ?? 0,
        ease: options?.ease ?? "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: options?.start ?? "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

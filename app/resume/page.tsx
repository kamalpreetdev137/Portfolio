"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, FileText, Clock, Mail } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".resume-icon", { opacity: 0, scale: 0, duration: 0.6, ease: "back.out(2)" })
        .from(".resume-badge", { opacity: 0, scale: 0.9, duration: 0.4 }, "-=0.3")
        .from(".resume-heading", { opacity: 0, y: 15, duration: 0.5 }, "-=0.2")
        .from(".resume-desc", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from(".resume-features", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from(".resume-list-item", { opacity: 0, x: -15, duration: 0.3, stagger: 0.1 }, "-=0.2")
        .from(".resume-cta", { opacity: 0, y: 15, duration: 0.4 }, "-=0.2")
        .from(".resume-back", { opacity: 0, y: 15, duration: 0.4 }, "-=0.2");

      gsap.to(".resume-icon-circle", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div ref={containerRef} className="max-w-md text-center">
        <div className="resume-icon mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 resume-icon-circle">
          <FileText size={40} className="text-primary" />
        </div>

        <div className="resume-badge mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <Clock size={14} className="text-primary" />
          <span className="text-sm font-medium text-primary">Coming Soon</span>
        </div>

        <h1 className="resume-heading mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
          Resume Under Development
        </h1>

        <p className="resume-desc mb-8 text-lg leading-relaxed text-text-secondary">
          I&apos;m currently crafting a comprehensive resume to showcase my
          journey, skills, and experiences. Stay tuned for something amazing!
        </p>

        <div className="resume-features mb-8 rounded-2xl border border-border bg-card/50 p-6 text-left backdrop-blur-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            What to Expect
          </h2>
          <ul className="space-y-3">
            {[
              "Professional experience & achievements",
              "Technical skills & certifications",
              "Education & qualifications",
              "Featured projects & contributions",
            ].map((item, i) => (
              <li
                key={i}
                className="resume-list-item flex items-center gap-3 text-sm text-text-secondary"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="resume-cta mb-8 rounded-xl border border-border bg-surface/50 p-4">
          <p className="text-sm text-text-secondary">
            Need my resume urgently?{" "}
            <a
              href="mailto:kamalpreet.dev137@gmail.com"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              <Mail size={14} />
              Email me
            </a>
          </p>
        </div>

        <div className="resume-back">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

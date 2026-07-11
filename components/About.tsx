"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants";
import { useInView } from "@/hooks/useInView";
import LayoutContainer from "./LayoutContainer";

export default function About() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="about" className="py-24">
      <LayoutContainer ref={ref}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              About Me
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Crafting Digital Experiences
            </h2>
          </motion.div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="/profile.jpg"
                alt="Kamalpreet - Full Stack Developer"
                className="aspect-square w-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
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
                {["React", "Next.js", "TypeScript", "Node.js", "AI/ML"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.08 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/50 p-6 text-center transition-colors hover:border-primary/30 hover:bg-card"
              >
                <div className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </LayoutContainer>
    </section>
  );
}

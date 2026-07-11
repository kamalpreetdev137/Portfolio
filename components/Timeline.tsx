"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCES } from "@/constants";
import { useInView } from "@/hooks/useInView";
import LayoutContainer from "./LayoutContainer";

export default function Timeline() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24">
      <LayoutContainer ref={ref}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Experience
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              My Journey
            </h2>
          </motion.div>

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-0">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="grid grid-cols-[auto_1fr] gap-6 sm:grid-cols-[auto_1fr]"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                    <Briefcase size={16} className="text-primary" />
                  </div>
                  {i < EXPERIENCES.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
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
                        className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

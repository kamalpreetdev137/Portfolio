"use client";

import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Rocket,
  Database,
  Palette,
  Zap,
} from "lucide-react";
import { SERVICES } from "@/constants";
import { useInView } from "@/hooks/useInView";
import LayoutContainer from "./LayoutContainer";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Brain,
  Rocket,
  Database,
  Palette,
  Zap,
};

export default function Services() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="services" className="py-24">
      <LayoutContainer ref={ref}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What I Do
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Delivering end-to-end solutions from concept to deployment, with a
              focus on performance, scalability, and exceptional user experience.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/30 hover:bg-card sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

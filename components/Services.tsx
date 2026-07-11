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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What I{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Do
              </span>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5 sm:p-8"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 transition-all group-hover:scale-150 group-hover:bg-primary/10" />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

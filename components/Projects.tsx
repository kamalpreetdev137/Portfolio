"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Loader2 } from "lucide-react";
import { fetchGitHubRepos, getLanguageColor, type Project } from "@/lib/github";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "kamalpreetdev137";

const CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "other", label: "Other" },
] as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isInView } = useInView(0.1);

  useEffect(() => {
    async function loadRepos() {
      try {
        setLoading(true);
        const repos = await fetchGitHubRepos(GITHUB_USERNAME);
        setProjects(repos);
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24">
      <LayoutContainer ref={ref}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Projects
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured Work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              A selection of projects that showcase my expertise in full-stack
              development, AI integration, and modern web technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat.key
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-text-secondary hover:text-text-primary"
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
              <span className="ml-3 text-text-secondary">Loading projects from GitHub...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors hover:border-primary/30 hover:bg-card"
                >
                  <div className="aspect-video overflow-hidden bg-surface">
                    <div className="flex h-full w-full items-center justify-center border-b border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 transition-transform duration-500 group-hover:scale-105">
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-xl text-white text-xl font-bold"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        >
                          {project.language?.charAt(0) || "?"}
                        </div>
                        <p className="text-sm font-medium text-text-secondary">
                          {project.language || "Various"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {project.title}
                      </h3>
                      <div className="flex shrink-0 items-center gap-1">
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1 rounded-md bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500">
                            <Star size={12} fill="currentColor" />
                            {project.stars}
                          </span>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
                          aria-label={`GitHub - ${project.title}`}
                        >
                          <Github size={16} />
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
                            aria-label={`Live demo - ${project.title}`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
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
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-secondary">No projects found in this category.</p>
            </div>
          )}
        </div>
      </LayoutContainer>
    </section>
  );
}

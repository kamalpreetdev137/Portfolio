"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Star, Loader2 } from "lucide-react";
import { fetchGitHubRepos, getLanguageColor, type Project } from "@/lib/github";
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "kamalpreetdev137";

const CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "other", label: "Other" },
] as const;

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });

    // Move shine effect
    const shine = cardRef.current.querySelector(".card-shine") as HTMLElement;
    if (shine) {
      gsap.to(shine, {
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(59,130,246,0.15), transparent 60%)`,
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors hover:border-primary/30 hover:bg-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="card-shine absolute inset-0 pointer-events-none z-10 rounded-2xl" />

      <div className="aspect-video overflow-hidden bg-surface">
        <div className="flex h-full w-full items-center justify-center border-b border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 transition-transform duration-500 group-hover:scale-110">
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl text-white text-xl font-bold transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
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

      <div className="flex flex-1 flex-col gap-3 p-6 relative z-20">
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
              className="rounded-lg p-2 text-text-secondary transition-all hover:text-text-primary hover:bg-primary/10 hover:scale-110"
              aria-label={`GitHub - ${project.title}`}
            >
              <Github size={16} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-text-secondary transition-all hover:text-text-primary hover:bg-primary/10 hover:scale-110"
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
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-all hover:bg-primary/20 hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (loading || error) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Filter buttons
      gsap.from(".proj-filter", {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".proj-filter",
          start: "top 90%",
        },
      });

      // Cards - wave stagger
      gsap.from(".project-card", {
        opacity: 0,
        y: 60,
        rotationX: -15,
        scale: 0.9,
        duration: 0.7,
        stagger: {
          each: 0.12,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeCategory, projects]);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24">
      <LayoutContainer>
        <div ref={sectionRef} className="flex flex-col gap-16">
          <div className="projects-title text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Projects
            </p>
            <TextReveal tag="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured Work
            </TextReveal>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              A selection of projects that showcase my expertise in full-stack
              development, AI integration, and modern web technologies.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "proj-filter rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-primary/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

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
            <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
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

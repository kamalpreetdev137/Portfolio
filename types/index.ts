export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  techStack: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export type ProjectCategory =
  | "all"
  | "fullstack"
  | "ai"
  | "frontend"
  | "backend"
  | "saas";

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: TechCategory;
}

export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "tools";

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

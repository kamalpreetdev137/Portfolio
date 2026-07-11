import type {
  NavItem,
  Project,
  Service,
  TechItem,
  Experience,
  Stat,
  SocialLink,
} from "@/types";

export const SITE_CONFIG = {
  name: "Kamalpreet.dev",
  title: "Kamalpreet.dev | Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Kamalpreet, a Full Stack Developer specializing in AI applications, modern web development, automation, and scalable digital products.",
  url: "https://kamalpreet.dev",
  email: "hello@kamalpreet.dev",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web Developer",
    "Portfolio",
    "AI Automation",
    "JavaScript",
    "Tailwind CSS",
  ],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "AI Content Studio",
    description:
      "An AI-powered content creation platform that generates blog posts, social media content, and marketing copy using advanced language models with real-time collaboration.",
    image: "/projects/ai-content-studio.svg",
    category: "ai",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "PostgreSQL"],
    github: "https://github.com/kamalpreet",
    live: "https://ai-content-studio.vercel.app",
    featured: true,
  },
  {
    id: "2",
    title: "CloudDeploy Dashboard",
    description:
      "A modern cloud deployment dashboard for managing infrastructure, monitoring performance metrics, and automating CI/CD pipelines with real-time analytics.",
    image: "/projects/cloud-deploy.svg",
    category: "fullstack",
    techStack: ["React", "Node.js", "Docker", "Redis", "WebSocket"],
    github: "https://github.com/kamalpreet",
    live: "https://clouddeploy.vercel.app",
    featured: true,
  },
  {
    id: "3",
    title: "FinTrack SaaS",
    description:
      "A comprehensive financial tracking SaaS application with expense management, budget planning, investment portfolio tracking, and automated reporting.",
    image: "/projects/fintrack.svg",
    category: "saas",
    techStack: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Chart.js"],
    github: "https://github.com/kamalpreet",
    featured: true,
  },
  {
    id: "4",
    title: "NeuralChat",
    description:
      "An intelligent chat application powered by AI that provides contextual responses, document analysis, and multi-language support with streaming responses.",
    image: "/projects/neural-chat.svg",
    category: "ai",
    techStack: ["Next.js", "LangChain", "Pinecone", "OpenAI", "Tailwind CSS"],
    live: "https://neuralchat.vercel.app",
  },
  {
    id: "5",
    title: "TaskFlow API",
    description:
      "A RESTful API service for project management with authentication, rate limiting, webhook support, and comprehensive documentation.",
    image: "/projects/taskflow-api.svg",
    category: "backend",
    techStack: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
    github: "https://github.com/kamalpreet",
  },
  {
    id: "6",
    title: "PixelCraft UI",
    description:
      "A modern component library and design system built for React applications with accessibility-first approach and customizable themes.",
    image: "/projects/pixelcraft.svg",
    category: "frontend",
    techStack: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Radix UI"],
    github: "https://github.com/kamalpreet",
    live: "https://pixelcraft.vercel.app",
  },
];

export const SERVICES: Service[] = [
  {
    icon: "Code",
    title: "Full Stack Development",
    description:
      "Building end-to-end web applications with modern frameworks, databases, and deployment strategies that scale with your business.",
  },
  {
    icon: "Brain",
    title: "AI Integrations",
    description:
      "Implementing intelligent features using machine learning models, natural language processing, and computer vision to automate workflows.",
  },
  {
    icon: "Rocket",
    title: "SaaS Development",
    description:
      "Creating scalable SaaS products with multi-tenancy, subscription billing, analytics dashboards, and robust API architecture.",
  },
  {
    icon: "Database",
    title: "REST APIs",
    description:
      "Designing and building RESTful APIs with authentication, rate limiting, caching, and comprehensive documentation for seamless integration.",
  },
  {
    icon: "Palette",
    title: "UI Engineering",
    description:
      "Crafting pixel-perfect, accessible interfaces with smooth animations, responsive layouts, and exceptional user experiences.",
  },
  {
    icon: "Zap",
    title: "Performance Optimization",
    description:
      "Optimizing applications for Core Web Vitals, achieving 95+ Lighthouse scores, lazy loading, code splitting, and caching strategies.",
  },
];

export const TECH_STACK: TechItem[] = [
  { name: "HTML", icon: "HTML", category: "frontend" },
  { name: "CSS", icon: "CSS", category: "frontend" },
  { name: "JavaScript", icon: "JavaScript", category: "frontend" },
  { name: "React", icon: "React", category: "frontend" },
  { name: "Node.js", icon: "Nodejs", category: "backend" },
  { name: "Express.js", icon: "Express", category: "backend" },
  { name: "MySQL", icon: "MySQL", category: "database" },
  { name: "MongoDB", icon: "MongoDB", category: "database" },
  { name: "ChatGPT", icon: "ChatGPT", category: "ai" },
  { name: "Google Mini", icon: "GoogleMini", category: "ai" },
  { name: "Adobe Express", icon: "AdobeExpress", category: "tools" },
  { name: "GitHub", icon: "GitHub", category: "tools" },
  { name: "VS Code", icon: "VSCode", category: "tools" },
  { name: "Figma", icon: "Figma", category: "tools" },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2023 — Present",
    description:
      "Working independently with clients to build modern, responsive websites and web applications. Handling complete project lifecycle from client requirements to deployment and maintenance.",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Freelance Projects",
    period: "2022 — 2023",
    description:
      "Built and delivered multiple client projects including landing pages, e-commerce stores, and business websites. Focused on creating clean, responsive UIs with modern frameworks.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Figma"],
  },
  {
    id: "3",
    role: "Web Development Learner",
    company: "Self-Learning",
    period: "2021 — 2022",
    description:
      "Started my web development journey by learning core technologies like HTML, CSS, JavaScript, and React. Built personal projects to practice and improve my skills.",
    technologies: ["HTML", "CSS", "JavaScript", "Git", "VS Code"],
  },
];

export const STATS: Stat[] = [
  { value: "30+", label: "Projects Completed" },
  { value: "15+", label: "Technologies" },
  { value: "50+", label: "Happy Clients" },
  { value: "4+", label: "Years Learning" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/kamalpreetdev137",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kamalpreet",
    icon: "Linkedin",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/kamalpreet.dev",
    icon: "Instagram",
  },
  {
    name: "X",
    url: "https://x.com/kamalpreet_dev",
    icon: "Twitter",
  },
  {
    name: "Email",
    url: "mailto:hello@kamalpreet.dev",
    icon: "Mail",
  },
];

export const TECH_CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "ai", label: "AI" },
  { key: "tools", label: "Tools" },
] as const;

export const PROJECT_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Full Stack" },
  { key: "ai", label: "AI" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "saas", label: "SaaS" },
] as const;

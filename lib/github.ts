export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  github: string;
  live?: string;
  featured: boolean;
  stars: number;
  language: string | null;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function categorizeByLanguage(language: string | null): string {
  if (!language) return "other";
  const lang = language.toLowerCase();
  if (["javascript", "typescript", "vue", "svelte", "html", "css"].includes(lang)) return "frontend";
  if (["python", "java", "go", "rust", "c", "c++", "ruby", "php", "kotlin", "swift", "dart", "shell"].includes(lang)) return "backend";
  return "other";
}

function extractTechStack(repo: GitHubRepo): string[] {
  const techs: string[] = [];
  if (repo.language) techs.push(repo.language);
  if (repo.topics) techs.push(...repo.topics.slice(0, 4));
  return [...new Set(techs)].slice(0, 5);
}

export async function fetchGitHubRepos(username: string): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error("GitHub API error:", response.status);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();

    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        id: repo.id.toString(),
        title: repo.name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        description: repo.description || "No description provided",
        image: "",
        category: categorizeByLanguage(repo.language),
        techStack: extractTechStack(repo),
        github: repo.html_url,
        live: repo.homepage || undefined,
        featured: repo.stargazers_count > 0 || repo.topics?.length > 0,
        stars: repo.stargazers_count,
        language: repo.language,
      }))
      .sort((a, b) => b.stars - a.stars);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export function getLanguageColor(language: string | null): string {
  if (!language) return "#6b7280";
  return LANGUAGE_COLORS[language] || "#6b7280";
}

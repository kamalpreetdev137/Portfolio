import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kamalpreet Singh | Full Stack Developer & AI Engineer",
    template: "%s | Kamalpreet.dev",
  },
  description:
    "Kamalpreet Singh - Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, and AI-powered applications. Building modern web experiences and scalable digital products.",
  keywords: [
    "Kamalpreet Singh",
    "Kamalpreet",
    "Kamalpreet Developer",
    "Kamalpreet.dev",
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
    "Node.js",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Kamalpreet Singh" }],
  creator: "Kamalpreet Singh",
  publisher: "Kamalpreet Singh",
  metadataBase: new URL("https://kamalpreet.dev"),
  alternates: {
    canonical: "https://kamalpreet.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kamalpreet.dev",
    siteName: "Kamalpreet.dev",
    title: "Kamalpreet Singh | Full Stack Developer & AI Engineer",
    description:
      "Kamalpreet Singh - Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, and AI-powered applications.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kamalpreet Singh - Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamalpreet Singh | Full Stack Developer & AI Engineer",
    description:
      "Kamalpreet Singh - Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, and AI-powered applications.",
    images: ["/og-image.svg"],
    creator: "@kamalpreet_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kamalpreet Singh",
  alternateName: "Kamalpreet",
  url: "https://kamalpreet.dev",
  image: "https://kamalpreet.dev/profile.jpg",
  jobTitle: "Full Stack Developer & AI Engineer",
  description: "Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, and AI-powered applications.",
  email: "kamalpreet.dev137@gmail.com",
  sameAs: [
    "https://github.com/kamalpreetdev137",
    "https://linkedin.com/in/kamalpreet",
    "https://x.com/kamalpreet_dev",
    "https://instagram.com/kamalpreet.dev",
  ],
  knowsAbout: [
    "Full Stack Development",
    "AI Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Machine Learning",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050816" />
        <link rel="canonical" href="https://kamalpreet.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

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
  title: "Kamalpreet.dev | Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Kamalpreet, a Full Stack Developer specializing in AI applications, modern web development, automation, and scalable digital products.",
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
  authors: [{ name: "Kamalpreet" }],
  creator: "Kamalpreet",
  metadataBase: new URL("https://kamalpreet.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kamalpreet.dev",
    siteName: "Kamalpreet.dev",
    title: "Kamalpreet.dev | Full Stack Developer & AI Engineer",
    description:
      "Portfolio of Kamalpreet, a Full Stack Developer specializing in AI applications, modern web development, automation, and scalable digital products.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kamalpreet.dev - Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamalpreet.dev | Full Stack Developer & AI Engineer",
    description:
      "Portfolio of Kamalpreet, a Full Stack Developer specializing in AI applications, modern web development, automation, and scalable digital products.",
    images: ["/og-image.svg"],
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
  name: "Kamalpreet",
  url: "https://kamalpreet.dev",
  jobTitle: "Full Stack Developer & AI Engineer",
  sameAs: [
    "https://github.com/kamalpreet",
    "https://linkedin.com/in/kamalpreet",
    "https://x.com/kamalpreet_dev",
  ],
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

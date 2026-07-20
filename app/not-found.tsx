"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-8xl font-bold text-[#3B82F6]">404</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-white">Page Not Found</h1>
        <p className="mb-8 text-lg text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#60A5FA]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

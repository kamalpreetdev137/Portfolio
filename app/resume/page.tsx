"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Clock, Mail } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        {/* Animated Icon */}
        <motion.div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FileText size={40} className="text-primary" />
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
        >
          <Clock size={14} className="text-primary" />
          <span className="text-sm font-medium text-primary">Coming Soon</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl"
        >
          Resume Under Development
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-lg leading-relaxed text-text-secondary"
        >
          I&apos;m currently crafting a comprehensive resume to showcase my
          journey, skills, and experiences. Stay tuned for something amazing!
        </motion.p>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 rounded-2xl border border-border bg-card/50 p-6 text-left backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            What to Expect
          </h2>
          <ul className="space-y-3">
            {[
              "Professional experience & achievements",
              "Technical skills & certifications",
              "Education & qualifications",
              "Featured projects & contributions",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-text-secondary"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8 rounded-xl border border-border bg-surface/50 p-4"
        >
          <p className="text-sm text-text-secondary">
            Need my resume urgently?{" "}
            <a
              href="mailto:kamalpreet.dev137@gmail.com"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              <Mail size={14} />
              Email me
            </a>
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

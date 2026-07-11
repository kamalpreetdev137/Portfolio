"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialIconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { ref, isInView } = useInView(0.1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("idle");
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24">
      <LayoutContainer ref={ref}>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Let&apos;s Work Together
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Have a project in mind? Let&apos;s discuss how we can bring your
              ideas to life.
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-semibold text-text-primary">
                  Get in Touch
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <p className="text-text-primary">kamalpreet.dev137@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Location</p>
                      <p className="text-text-primary">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-text-primary">
                  Follow Me
                </h3>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = socialIconMap[social.icon] || Github;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/50 text-text-secondary transition-colors hover:border-primary/30 hover:text-primary"
                        aria-label={social.name}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-text-secondary"
                  >
                    Name
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className={cn(
                      "w-full rounded-xl border bg-surface/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary",
                      errors.name ? "border-red-500" : "border-border"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-text-secondary"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className={cn(
                      "w-full rounded-xl border bg-surface/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary",
                      errors.email ? "border-red-500" : "border-border"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-text-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={cn(
                      "w-full resize-none rounded-xl border bg-surface/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary",
                      errors.message ? "border-red-500" : "border-border"
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors",
                    status === "sent"
                      ? "bg-green-500"
                      : "bg-primary hover:bg-primary-light",
                    "disabled:opacity-70"
                  )}
                >
                  {status === "idle" && (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

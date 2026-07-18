"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { cn } from "@/lib/utils";
import LayoutContainer from "./LayoutContainer";
import { TextReveal } from "./TextReveal";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

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

function AnimatedInput({
  label,
  error,
  textarea,
  ...props
}: {
  label: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const handleFocus = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(ref.current.querySelector(".input-glow"), {
      opacity: 1,
      duration: 0.3,
    });
  }, []);

  const handleBlur = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(ref.current.querySelector(".input-glow"), {
      opacity: 0,
      duration: 0.3,
    });
  }, []);

  const fieldClassName = cn(
    "relative z-10 w-full rounded-xl border bg-surface/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary",
    error ? "border-red-500" : "border-border"
  );

  return (
    <div ref={ref} className="relative flex flex-col gap-2">
      <div className="input-glow absolute -inset-1 rounded-xl bg-primary/10 opacity-0 blur-sm" />
      <label className="relative text-sm font-medium text-text-secondary z-10">
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${fieldClassName} resize-none`}
        />
      ) : (
        <input
          ref={inputRef as React.Ref<HTMLInputElement>}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={fieldClassName}
        />
      )}
      {error && (
        <p className="relative z-10 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Left info slide in
      gsap.from(".contact-info > *", {
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
        },
      });

      // Form slide in
      gsap.from(".contact-form-wrap", {
        opacity: 0,
        x: 50,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-wrap",
          start: "top 80%",
        },
      });

      // Form inputs stagger
      gsap.from(".form-field", {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".form-field",
          start: "top 90%",
        },
      });

      // Social links
      gsap.from(".social-link", {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".social-link",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

      // Success animation
      gsap.fromTo(
        ".send-btn",
        { scale: 1 },
        { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }
      );

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("idle");
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24">
      <LayoutContainer>
        <div ref={sectionRef} className="flex flex-col gap-16">
          <div className="contact-title text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Contact
            </p>
            <TextReveal tag="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Let&apos;s Work Together
            </TextReveal>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Have a project in mind? Let&apos;s discuss how we can bring your
              ideas to life.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="contact-info flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/profile.jpg"
                    alt="Kamalpreet"
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">
                      Kamalpreet Singh
                    </h3>
                    <p className="text-sm text-text-secondary">Full Stack Developer & AI Engineer</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Get in Touch
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <p className="text-text-primary">kamalpreet.dev137@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white">
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
                      <MagneticButton key={social.name} strength={0.4}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/50 text-text-secondary transition-all duration-300 hover:border-primary/30 hover:text-primary hover:bg-primary/10 hover:scale-110 hover:shadow-lg hover:shadow-primary/10"
                          aria-label={social.name}
                        >
                          <Icon size={18} />
                        </a>
                      </MagneticButton>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8"
              >
                <div className="form-field">
                  <AnimatedInput
                    label="Name"
                    error={errors.name?.message}
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-field">
                  <AnimatedInput
                    label="Email"
                    error={errors.email?.message}
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-field">
                  <AnimatedInput
                    label="Message"
                    error={errors.message?.message}
                    {...register("message")}
                    id="message"
                    textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <MagneticButton strength={0.2}>
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    className={cn(
                      "send-btn flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300",
                      status === "sent"
                        ? "bg-green-500"
                        : "bg-primary hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25",
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
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

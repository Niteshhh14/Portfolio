"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, MapPin, Send } from "lucide-react";
import canvasConfetti from "canvas-confetti";
import emailjs from '@emailjs/browser';
import { GlowCard } from "@/components/ui/spotlight-card";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const emailAddress = "niteshreddy148@gmail.com";
  
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    canvasConfetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.8 },
      colors: ["#3B82F6", "#22D3EE"],
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in the required fields (Name, Email, Message).");
      return;
    }

    setStatus("submitting");

    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        console.error("EmailJS configuration is missing in environment variables.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
        message: formData.message,
        to_email: "niteshreddy148@gmail.com",
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Optional confetti
      canvasConfetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[95px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">
            08 / Communication
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Get In Touch
          </h2>
          <div className="w-12 h-[2px] bg-accent-cyan mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-text-primary text-xl tracking-tight mb-4">
                Let&apos;s talk about your project
              </h3>
              
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-8">
                I am open to recruiting inquiries, research collaborations, systems explorations, or network automation projects. Reach out via the form, directly through email, or connect via socials.
              </p>

              <div className="space-y-6">
                
                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-surface-1 border border-surface-2 text-accent-cyan">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-text-primary text-sm font-medium">
                      Hyderabad, India
                    </span>
                  </div>
                </div>

                {/* Direct Email with copy utility using GlowCard */}
                <GlowCard
                  customSize={true}
                  glowColor="blue"
                  className="flex items-center justify-between p-4 max-w-sm cursor-default w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-1 border border-surface-2 text-accent-cyan">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider block">
                        Direct Email
                      </span>
                      <span className="text-text-primary text-xs sm:text-sm font-medium font-mono">
                        {emailAddress}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg hover:bg-surface-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer z-10"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </GlowCard>

              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 lg:mt-0 flex items-center gap-4">
              <a
                href="#"
                className="p-3 rounded-xl bg-surface-1 hover:bg-surface-2 border border-surface-2 hover:border-accent-blue/30 text-text-muted hover:text-text-primary transition-all duration-200"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-surface-1 hover:bg-surface-2 border border-surface-2 hover:border-accent-cyan/30 text-text-muted hover:text-text-primary transition-all duration-200"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7">
            <GlowCard
              customSize={true}
              glowColor="blue"
              className="p-6 sm:p-8 cursor-default w-full"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-full h-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                      Your Name <span className="text-accent-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                      className="px-4 py-3 rounded-xl bg-surface-1 border border-surface-2 focus:border-accent-blue text-text-primary text-sm outline-none transition-all placeholder:text-text-muted/30 z-10"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                      Your Email <span className="text-accent-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className="px-4 py-3 rounded-xl bg-surface-1 border border-surface-2 focus:border-accent-blue text-text-primary text-sm outline-none transition-all placeholder:text-text-muted/30 z-10"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                    className="px-4 py-3 rounded-xl bg-surface-1 border border-surface-2 focus:border-accent-blue text-text-primary text-sm outline-none transition-all placeholder:text-text-muted/30 z-10"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    Message <span className="text-accent-cyan">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    className="px-4 py-3 rounded-xl bg-surface-1 border border-surface-2 focus:border-accent-blue text-text-primary text-sm outline-none transition-all resize-none placeholder:text-text-muted/30 z-10"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-blue text-text-primary text-xs font-mono font-medium tracking-wider uppercase hover:bg-accent-blue/80 hover:shadow-lg hover:shadow-accent-blue/15 transition-all duration-200 cursor-pointer z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Error! Try Again" : "Send Message"}
                  {status === "idle" && <Send className="w-4 h-4" />}
                </button>

              </form>
            </GlowCard>
          </div>

        </div>

      </div>
    </section>
  );
}

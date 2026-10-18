"use client";

import Button from "../componantes/Button";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
export default function Contact({ content }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables.",
        );
      }
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey,
      );
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitStatus({
        type: "error",
        message: err.text || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" className="container mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 text-center">
        <span className="section-kicker animate-fade-in">{content.label}</span>
        <h2 className="mx-auto mb-5 mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white animate-fade-in animation-delay-100 md:text-6xl">
          {content.headingLead}{" "}
          <span className="font-serif font-normal italic text-primary">
            {content.headingEmphasis}
          </span>
        </h2>
        <p className="mx-auto max-w-2xl leading-7 text-muted-foreground animate-fade-in animation-delay-200">
          {content.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="cyber-panel rounded-3xl p-6 animate-fade-in animation-delay-300 sm:p-9">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Start a conversation
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Send a transmission
              </h3>
            </div>
            <div className="hidden h-12 w-12 place-items-center rounded-full border border-primary/20 bg-primary/[0.08] text-primary sm:grid">
              <Send className="h-5 w-5" />
            </div>
          </div>
          <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Your name..."
                id="name"
                type="text"
                className="admin-input"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="Your email..."
                type="email"
                id="email"
                className="admin-input"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                placeholder="Your message..."
                id="message"
                className="admin-input resize-none"
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>
            {submitStatus.type && (
              <div
                className={`flex items-center gap-3
                     p-4 rounded-xl ${
                       submitStatus.type === "success"
                         ? "bg-green-500/10 border border-green-500/20 text-green-400"
                         : "bg-red-500/10 border border-red-500/20 text-red-400"
                     }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}
          </form>
        </div>
        <div className="space-y-6 animate-fade-in animation-delay-400">
          <div className="cyber-panel rounded-3xl p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Direct coordinates
            </p>
            <h3 className="mb-5 mt-2 text-xl font-semibold text-white">
              Contact information
            </h3>
            <div className="space-y-2">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: content.email,
                  href: `mailto:${content.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: content.phone,
                  href: `tel:${content.phone.replaceAll(" ", "")}`,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: content.location,
                  href: "#contact",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-white/[0.07] hover:bg-white/[0.025]"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/[0.06] transition group-hover:bg-primary/15">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-1 break-all text-sm font-medium text-foreground">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability Card */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.055] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative mb-4 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                {content.availabilityTitle}
              </span>
            </div>
            <p className="relative text-sm leading-6 text-muted-foreground">
              {content.availabilityDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar({ content }) {
  const [inMobile, setInMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={`nav-glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:rounded-full sm:px-6 ${
          isScrolled ? "py-2.5" : "py-3"
        }`}
      >
        <Link
          href="/home"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/25 bg-primary/10 font-mono text-sm text-primary transition group-hover:bg-primary group-hover:text-background">
            {content.name?.charAt(0) || "A"}
          </span>
          <span>
            {content.name}
            <span className="text-primary"> {content.surname}</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.025] p-1 md:flex">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          aria-label={inMobile ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={inMobile}
          onClick={() => {
            setInMobile(!inMobile);
          }}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-foreground transition hover:border-primary/40 hover:text-primary md:hidden"
        >
          {inMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_rgb(var(--color-primary)/18%)] transition hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgb(var(--color-primary)/30%)] md:flex"
        >
          Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
        </a>
      </nav>
      {inMobile && (
        <div
          className="nav-glass mx-3 mt-2 flex flex-col gap-1 rounded-2xl p-3 animate-fade-in sm:mx-6 md:hidden"
        >
          {content.links.map((link) => (
            <a
              onClick={() => setInMobile(false)}
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setInMobile(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
          >
            Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}

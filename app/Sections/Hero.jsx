import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Aurora from "../components/Aurora";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Hero({ content }) {
  const socials = [
    { icon: Github, href: content.githubUrl, label: "GitHub" },
    { icon: Linkedin, href: content.linkedinUrl, label: "LinkedIn" },
  ].filter((social) => social.href);

  const skills = content.skills ?? [];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto flex w-full items-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-20"
    >
      {/* Atmosphere: one image texture, one aurora, one fade into the page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src={content.backgroundImage || "/assets/hero-bg.jpg"}
          alt=""
          className="h-full w-full scale-105 object-cover opacity-20"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 motion-reduce:hidden">
          <Aurora
            className="pointer-events-none absolute inset-0 opacity-[0.65] mix-blend-screen"
            colorStops={["#4ef2d2", "#5ca8ff", "#a885ff"]}
            amplitude={0.9}
            blend={0.55}
            speed={0.4}
            height={0.32}
            scale={1.15}
            glow={0.65}
            brightness={0.85}
            layers={1}
            opacity={0.72}
            dpr={1}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="container relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Text column */}
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-sm text-muted-foreground motion-safe:animate-fade-in">
              <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
              {content.role}
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-balance text-[clamp(2.75rem,6.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.05em] motion-safe:animate-fade-in animation-delay-100"
            >
              {/* NOTE: the trailing "s" is hard-coded; remove it if it's a typo */}
              <span className="block">{content.titleLead}</span>
              <span className="text-gradient block pb-[0.08em]">
                {content.titleAccent}
              </span>
              <span className="mt-3 block text-[0.4em] font-medium leading-snug tracking-[-0.02em] text-foreground/75">
                {content.titleSupporting}{" "}
                <em className="font-serif text-[1.15em] font-normal italic text-foreground">
                  {content.titleEmphasis}
                </em>
              </span>
            </h1>

            <p className="mt-7 max-w-[34rem] text-pretty text-base leading-relaxed text-muted-foreground motion-safe:animate-fade-in animation-delay-200 md:text-lg md:leading-8">
              {content.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={`group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-[0_0_38px_rgb(var(--color-primary)/18%)] transition duration-300 hover:shadow-[0_0_48px_rgb(var(--color-primary)/32%)] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
              >
                View projects
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/[0.06] ${focusRing}`}
              >
                Get in touch
              </a>
            </div>

            {socials.length > 0 && (
              <ul className="mt-8 flex items-center gap-6">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition hover:text-primary ${focusRing}`}
                    >
                      <social.icon aria-hidden="true" className="h-4 w-4" />
                      {social.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Portrait: the one memorable element */}
          <div className="relative mx-auto w-full max-w-[420px] motion-safe:animate-fade-in animation-delay-300 lg:max-w-[470px]">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-primary/20 blur-[90px] motion-safe:animate-pulse-glow"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[2%] rounded-full border border-dashed border-primary/20 motion-safe:animate-orbit"
            >
              <span className="absolute left-[12%] top-[17%] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_#4ef2d2]" />
              <span className="absolute bottom-[14%] right-[13%] h-1.5 w-1.5 rounded-full bg-highlight shadow-[0_0_18px_#a885ff]" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full border border-white/[0.06] motion-safe:animate-orbit"
              style={{
                animationDirection: "reverse",
                animationDuration: "48s",
              }}
            >
              <span className="absolute right-[6%] top-[35%] h-1.5 w-1.5 rounded-full bg-highlight shadow-[0_0_16px_#a885ff]" />
            </div>

            <div className="hud-frame cyber-panel relative mx-auto w-[78%] overflow-hidden rounded-t-[11rem] rounded-b-[3rem] p-2.5 shadow-[0_35px_100px_rgba(0,0,0,0.55)]">
              <div
                className="scanline motion-reduce:hidden"
                aria-hidden="true"
              />
              <Image
                src={content.profileImage}
                alt={content.profileAlt ?? "Portrait of Al-Hassan Soliman"}
                className="aspect-[4/5] w-full rounded-t-[10rem] rounded-b-[2.4rem] object-cover"
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 370px, 70vw"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-2.5 bottom-2.5 h-1/3 rounded-b-[2.4rem] bg-gradient-to-t from-background/70 to-transparent"
              />
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-primary/25 bg-background/80 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-xl">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for work
              </div>
            </div>

            <div className="absolute -left-2 top-[18%] rounded-2xl border border-white/10 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-8">
              <span className="text-gradient block text-3xl font-semibold leading-none tracking-tight">
                {content.yearsExperience}
              </span>
              <span className="mt-1.5 block text-xs text-muted-foreground">
                Years building
              </span>
            </div>
          </div>
        </div>

        {/* Stack */}
        {skills.length > 0 && (
          <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-6 md:flex-row md:items-center md:gap-8 lg:mt-20">
            <p className="shrink-0 text-sm text-muted-foreground">Core stack</p>
            <ul className="flex flex-1 flex-wrap gap-2">
              {skills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/80 sm:text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <a
              href="#about"
              aria-label="Scroll to About section"
              className={`hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-muted-foreground transition hover:border-primary/50 hover:text-primary md:grid ${focusRing}`}
            >
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

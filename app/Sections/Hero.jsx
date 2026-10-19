"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react";

import Aurora from "../components/Aurora";
import SplitText from "../components/SplitText";
import DecryptedText from "../components/DecryptedText";
import BlurText from "../components/BlurText";
import Magnet from "../components/Magnet";
import StarBorder from "../components/StarBorder";
import ShinyText from "../components/ShinyText";
import SpotlightCard from "../components/SpotlightCard";
import CountUp from "../components/CountUp";
import LogoLoop from "../components/LogoLoop";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const ghostButton = `inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/[0.06] ${focusRing}`;

const pill =
  "rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/80 sm:text-sm";

const descriptionClass =
  "mt-7 max-w-[34rem] text-pretty text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8";

/** JS-driven effects (GSAP, motion, rAF) can't use Tailwind's motion-safe:, so gate them here. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function Hero({ content }) {
  const reduced = usePrefersReducedMotion();

  const socials = [
    { icon: Github, href: content.githubUrl, label: "GitHub" },
    { icon: Linkedin, href: content.linkedinUrl, label: "LinkedIn" },
  ].filter((social) => social.href);

  const skills = content.skills ?? [];
  const skillLogos = useMemo(
    () =>
      skills.map((skill) => ({
        title: skill,
        node: <span className={pill}>{skill}</span>,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content.skills],
  );

  // Replaces the old "test" placeholder. Add `focusSentence` to your content, or edit the fallback.

  // "6+" -> number 6, suffix "+", so CountUp has something numeric to animate.
  const yearsRaw = String(content.yearsExperience ?? "");
  const yearsNumber = parseInt(yearsRaw, 10);
  const yearsSuffix = yearsRaw.replace(/^\d+/, "");
  const hasYearsNumber = Number.isFinite(yearsNumber);

  const primaryCta = (
    <a
      href="#projects"
      className={`group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-[0_0_38px_rgb(var(--color-primary)/18%)] transition duration-300 hover:shadow-[0_0_48px_rgb(var(--color-primary)/32%)] ${focusRing}`}
    >
      View projects
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
      />
    </a>
  );

  const contactCta = reduced ? (
    <a href="#contact" className={ghostButton}>
      Get in touch
    </a>
  ) : (
    <StarBorder
      as="a"
      href="#contact"
      color="#4ef2d2"
      speed="7s"
      thickness={1}
      className={`rounded-full ${focusRing}`}
    >
      Get in touch
    </StarBorder>
  );

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
              className="mt-6 text-balance text-[clamp(2.75rem,6.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
            >
              {/* Line 1: chars rise in. Wrapper span keeps it a block; pb stops SplitText's overflow-hidden clipping descenders. */}
              <span className="block">
                {reduced ? (
                  content.titleLead
                ) : (
                  <SplitText
                    text={content.titleLead}
                    tag="span"
                    className="pb-[0.12em]"
                    splitType="chars"
                    delay={28}
                    duration={0.9}
                    ease="power3.out"
                    from={{ opacity: 0, y: 36 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="left"
                  />
                )}
              </span>

              {/* Line 2: scrambles into place, left to right, keeping your gradient */}
              <span className="block pb-[0.08em]">
                {reduced ? (
                  <span className="text-gradient">{content.titleAccent}</span>
                ) : (
                  <DecryptedText
                    text={content.titleAccent}
                    animateOn="view"
                    sequential
                    revealDirection="start"
                    speed={55}
                    parentClassName="text-gradient"
                  />
                )}
              </span>

              <span className="mt-3 block text-[0.4em] font-medium leading-snug tracking-[-0.02em] text-foreground/75 motion-safe:animate-fade-in animation-delay-300">
                {content.titleSupporting}{" "}
                <em className="font-serif text-[1.15em] font-normal italic text-foreground">
                  {content.titleEmphasis}
                </em>
              </span>
            </h1>

            {reduced ? (
              <p className={descriptionClass}>{content.description}</p>
            ) : (
              <BlurText
                text={content.description}
                animateBy="words"
                direction="top"
                delay={40}
                className={descriptionClass}
              />
            )}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {reduced ? (
                primaryCta
              ) : (
                <Magnet padding={50} magnetStrength={5}>
                  {primaryCta}
                </Magnet>
              )}
              <Link href="/home/cv" className={ghostButton}>
                View CV
              </Link>
              {contactCta}
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
                {reduced ? (
                  "Available for work"
                ) : (
                  <ShinyText text="Available for work" speed={3} />
                )}
              </div>
            </div>

            {/* Years badge: spotlight follows the cursor, number counts up on view */}
            <div className="absolute -left-2 top-[18%] sm:-left-8">
              <SpotlightCard
                spotlightColor="rgba(78, 242, 210, 0.22)"
                className="!rounded-2xl !border-white/10 !bg-background/80 !px-4 !py-3 shadow-xl backdrop-blur-xl"
              >
                <span className="text-gradient block text-3xl font-semibold leading-none tracking-tight">
                  {hasYearsNumber && !reduced ? (
                    <CountUp from={0} to={yearsNumber} duration={2} />
                  ) : hasYearsNumber ? (
                    yearsNumber
                  ) : null}
                  {hasYearsNumber ? yearsSuffix : content.yearsExperience}
                </span>
                <span className="mt-1.5 block text-xs text-muted-foreground">
                  Years building
                </span>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Stack: infinite marquee, falls back to the static list for reduced motion */}
        {skills.length > 0 && (
          <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-6 md:flex-row md:items-center md:gap-8 lg:mt-20">
            <p className="shrink-0 text-sm text-muted-foreground">Core stack</p>
            <div className="min-w-0 flex-1">
              {reduced ? (
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <li key={`${skill}-${index}`} className={pill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <LogoLoop
                  logos={skillLogos}
                  speed={40}
                  direction="left"
                  logoHeight={32}
                  gap={12}
                  pauseOnHover
                  fadeOut
                  fadeOutColor="rgb(var(--color-background))"
                  ariaLabel="Core stack"
                />
              )}
            </div>
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

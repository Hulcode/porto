"use client";

import { useEffect, useState } from "react";
import "./TrueFocus.css";

export default function TrueFocus({
  sentence,
  manualMode = false,
  blurAmount = 4,
  borderColor = "#4ef2d2",
  glowColor = "rgb(78 242 210 / 35%)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) {
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || manualMode || words.length < 2) return;

    const interval = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % words.length),
      (animationDuration + pauseBetweenAnimations) * 1000,
    );
    return () => window.clearInterval(interval);
  }, [
    animationDuration,
    manualMode,
    pauseBetweenAnimations,
    reducedMotion,
    words.length,
  ]);

  const isAnimating = !reducedMotion && !manualMode && words.length > 1;

  return (
    <span
      className="true-focus"
      aria-hidden="true"
      style={{
        "--true-focus-duration": `${animationDuration}s`,
        "--true-focus-border": borderColor,
        "--true-focus-glow": glowColor,
      }}
    >
      {words.map((word, index) => {
        const active = index === activeIndex;
        return (
          <span
            key={`${word}-${index}`}
            className={`true-focus__word${isAnimating && !active ? " true-focus__word--blurred" : ""}${active ? " true-focus__word--active" : ""}`}
            style={{ "--true-focus-blur": `${blurAmount}px` }}
            onMouseEnter={
              manualMode && !reducedMotion
                ? () => setActiveIndex(index)
                : undefined
            }
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

"use client";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(78, 242, 210, 0.18)",
}) {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handleMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

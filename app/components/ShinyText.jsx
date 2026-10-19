export default function ShinyText({
  text,
  speed = 3,
  className = "",
  color = "rgb(255 255 255 / 0.55)",
  shineColor = "#ffffff",
}) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent motion-safe:animate-[shiny_var(--shiny-speed)_linear_infinite] ${className}`}
      style={{
        "--shiny-speed": `${speed}s`,
        backgroundImage: `linear-gradient(110deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
      }}
    >
      {text}
    </span>
  );
}

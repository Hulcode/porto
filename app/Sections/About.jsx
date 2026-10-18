import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const icons = { Code2, Lightbulb, Rocket, Users };

export default function About({ content }) {
  return (
    <section
      id="about"
      className="container relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 overflow-hidden px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
    >
      <div className="animate-fade-in animation-delay-100">
        <span className="section-kicker">{content.label}</span>
        <h2 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
          {content.headingLead}{" "}
          <span className="font-serif font-normal italic text-primary">
            {content.headingEmphasis}
          </span>
        </h2>
        <div className="mt-7 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 border-l-2 border-primary/60 pl-5">
          <p className="font-serif text-lg italic leading-7 text-foreground/90">
            &ldquo;{content.quote}&rdquo;
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {content.highlights.map((item, key) => {
          const Icon = Object.hasOwn(icons, item.icon)
            ? icons[item.icon]
            : Code2;
          return (
            <div
              key={key}
              className="cyber-panel group rounded-2xl p-6 animate-fade-in"
              style={{ animationDelay: `${(key + 1) * 100}ms` }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary transition group-hover:bg-primary group-hover:text-background">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground/60">
                  0{key + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

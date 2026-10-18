// First four-digit year in a period string like "Mar 2023 – Present"
const getYear = (period = "") => period.match(/\b(?:19|20)\d{2}\b/)?.[0];

export default function Experience({ content }) {
  const items = content.items ?? [];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Intro stays in view while the timeline scrolls past it */}
          <div className="motion-safe:animate-fade-in lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker">{content.label}</span>
            <h2
              id="experience-heading"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl"
            >
              {content.headingLead}{" "}
              <span className="font-serif font-normal italic text-primary">
                {content.headingEmphasis}
              </span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-base leading-8 text-muted-foreground">
              {content.description}
            </p>
          </div>

          <ol>
            {items.map((exp, idx) => {
              const year = getYear(exp.period);
              const isCurrent =
                exp.current ?? /present|now|current/i.test(exp.period ?? "");

              return (
                <li
                  key={idx}
                  className="group grid gap-0 motion-safe:animate-fade-in sm:grid-cols-[9rem_1fr] sm:gap-8"
                  style={{ animationDelay: `${(idx + 1) * 120}ms` }}
                >
                  {/* Year gutter: the large numeral is the visual anchor */}
                  <div className="hidden pt-1 text-right sm:block">
                    {year && (
                      <span
                        aria-hidden="true"
                        className={`block text-6xl font-semibold leading-none tracking-tighter transition-colors duration-300 ${
                          isCurrent
                            ? "text-gradient"
                            : "text-foreground/15 group-hover:text-foreground/40"
                        }`}
                      >
                        {year}
                      </span>
                    )}
                    <span className="mt-3 block text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>

                  {/* Timeline rail: lit for the current role, dim for the past */}
                  <div
                    className={`relative border-l pb-14 pl-7 last:pb-0 sm:pl-9 ${
                      isCurrent ? "border-primary/50" : "border-white/10"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-px top-2 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-background sm:top-5 ${
                        isCurrent
                          ? "bg-primary shadow-[0_0_18px_#4ef2d2]"
                          : "bg-white/25 transition-colors group-hover:bg-primary/70"
                      }`}
                    />

                    <div
                      className={
                        isCurrent
                          ? "cyber-panel rounded-2xl border border-primary/25 p-6 md:p-7"
                          : "py-1"
                      }
                    >
                      <p className="text-sm text-muted-foreground sm:hidden">
                        {exp.period}
                      </p>

                      {isCurrent && (
                        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                          <span
                            className="relative flex h-2 w-2"
                            aria-hidden="true"
                          >
                            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                          </span>
                          Current role
                        </p>
                      )}

                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:mt-0">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-base font-medium text-primary">
                        {exp.company}
                      </p>
                      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                        {exp.description}
                      </p>

                      {(exp.technologies ?? []).length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIdx) => (
                            <li
                              key={techIdx}
                              className={`rounded-full border px-3 py-1 text-xs ${
                                isCurrent
                                  ? "border-primary/25 bg-primary/[0.06] text-foreground/85"
                                  : "border-white/10 text-foreground/70"
                              }`}
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

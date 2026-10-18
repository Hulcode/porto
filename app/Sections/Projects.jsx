import { AnimatedBorderButton } from "../componantes/AnimatedButton";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function ExternalLink({ href, className = "", children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} ${focusRing}`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

// Clicking the screenshot opens the project. Hidden from keyboard/screen readers
// because the text links below do the same job.
function Thumb({ project, sizes, className = "" }) {
  if (!project.image) return null;
  const base = `relative block overflow-hidden ${className}`;
  const image = (
    <Image
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
    />
  );
  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={base}
    >
      {image}
    </a>
  ) : (
    <div className={base}>{image}</div>
  );
}

function Tags({ tags = [] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <li
          key={`${tag}-${i}`}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/75"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function Projects({ content }) {
  const items = content.items ?? [];
  const [lead, ...others] = items.slice(0, 4);
  const additionalProjects = items.slice(4);

  const restGrid =
    others.length === 2
      ? "md:grid-cols-2"
      : others.length === 1
        ? "md:grid-cols-1"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="container relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8"
    >
      {/* Header: heading on the left, the "all projects" action on the right */}
      <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl motion-safe:animate-fade-in">
          <span className="section-kicker">{content.label}</span>
          <h2
            id="projects-heading"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {content.headingLead}{" "}
            <span className="font-serif font-normal italic text-primary">
              {content.headingEmphasis}
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {content.description}
          </p>
        </div>

        {additionalProjects.length > 0 && (
          <div className="shrink-0 motion-safe:animate-fade-in animation-delay-200">
            <AnimatedBorderButton>
              <Link href="/home/projects" className="flex items-center gap-2">
                View all projects
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            </AnimatedBorderButton>
          </div>
        )}
      </div>

      {/* Lead project: the largest thing on the page */}
      {lead && (
        <article className="cyber-panel group grid overflow-hidden rounded-3xl motion-safe:animate-fade-in animation-delay-100 lg:grid-cols-[1.35fr_1fr]">
          <Thumb
            project={lead}
            sizes="(min-width: 1024px) 700px, 100vw"
            className="aspect-[16/10] lg:aspect-auto lg:min-h-[440px]"
          />
          <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
            <p className="text-sm font-medium text-primary">Featured project</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              {lead.title}
            </h3>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              {lead.description}
            </p>
            <div className="mt-6">
              <Tags tags={lead.tags} />
            </div>
            {(lead.link || lead.github) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {lead.link && (
                  <ExternalLink
                    href={lead.link}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:shadow-[0_0_32px_rgb(var(--color-primary)/30%)]"
                  >
                    View project
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </ExternalLink>
                )}
                {lead.github && (
                  <ExternalLink
                    href={lead.github}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/[0.06]"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    Source code
                  </ExternalLink>
                )}
              </div>
            )}
          </div>
        </article>
      )}

      {/* The rest: compact cards, links always visible */}
      {others.length > 0 && (
        <div className={`mt-6 grid gap-6 ${restGrid}`}>
          {others.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="cyber-panel group flex flex-col overflow-hidden rounded-2xl motion-safe:animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <Thumb
                project={project}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="aspect-[16/10]"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-5">
                  <Tags tags={project.tags} />
                </div>
                {(project.link || project.github) && (
                  <div className="mt-6 flex items-center gap-5 border-t border-white/[0.08] pt-4">
                    {project.link && (
                      <ExternalLink
                        href={project.link}
                        className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        View project
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </ExternalLink>
                    )}
                    {project.github && (
                      <ExternalLink
                        href={project.github}
                        className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition hover:text-primary"
                      >
                        <Github aria-hidden="true" className="h-4 w-4" />
                        Source code
                      </ExternalLink>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

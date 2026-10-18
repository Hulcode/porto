import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getPortfolio } from "../../../lib/portfolio-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects | Al-Hassan Soliman",
  description: "Browse all projects by Al-Hassan Soliman.",
};

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

// Clicking the screenshot opens the project; the text links do the same job
// for keyboard and screen-reader users, so this one is skipped for them.
function Thumb({ project }) {
  if (!project.image)
    return <div className="aspect-[16/10] rounded-xl bg-white/[0.04]" />;

  const image = (
    <Image
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      fill
      sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 100vw"
      className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
    />
  );
  const base =
    "relative block aspect-[16/10] overflow-hidden rounded-xl border border-white/10";

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

export default async function MoreProjectsPage() {
  const portfolio = await getPortfolio();
  const projects = portfolio.projects?.items ?? [];

  return (
    <main className="site-shell relative min-h-screen px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl py-12 sm:py-16">
        <Link
          href="/home#projects"
          className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary ${focusRing}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mt-14 flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 sm:flex-row sm:items-end motion-safe:animate-fade-in">
          <div>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-7xl">
              All{" "}
              <span className="font-serif font-normal italic text-primary">
                projects
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Everything I&apos;ve built, from featured work to smaller
              experiments.
            </p>
          </div>
          {projects.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="text-2xl font-semibold text-foreground">
                {projects.length}
              </span>{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          )}
        </header>

        {projects.length > 0 ? (
          <ul className="divide-y divide-white/[0.08]">
            {projects.map((project, index) => (
              <li
                key={`${project.title}-${index}`}
                className="group grid gap-6 py-8 md:grid-cols-[260px_1fr_11rem] md:items-center md:gap-10 lg:grid-cols-[300px_1fr_11rem]"
              >
                <Thumb project={project} />

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                  {(project.tags ?? []).length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <li
                          key={`${tag}-${tagIndex}`}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/75"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {(project.link || project.github) && (
                  <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-stretch">
                    {project.link && (
                      <ExternalLink
                        href={project.link}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:shadow-[0_0_32px_rgb(var(--color-primary)/30%)]"
                      >
                        View project
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </ExternalLink>
                    )}
                    {project.github && (
                      <ExternalLink
                        href={project.github}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/[0.06]"
                      >
                        <Github aria-hidden="true" className="h-4 w-4" />
                        Source code
                      </ExternalLink>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="cyber-panel mt-12 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">
              No projects to show yet. Check back soon.
            </p>
            <Link
              href="/home#projects"
              className={`mt-5 inline-flex items-center gap-2 rounded-sm text-primary transition hover:text-foreground ${focusRing}`}
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

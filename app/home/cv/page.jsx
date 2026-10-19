import { Download, ExternalLink } from "lucide-react";

const cvUrl = "/assets/FullStack_Developer_CV.pdf";

export default function CV() {
  return (
    <section
      id="cv"
      aria-labelledby="cv-heading"
      className="container mx-auto max-w-7xl px-6 py-24 lg:py-28"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">Curriculum vitae</span>
          <h2
            id="cv-heading"
            className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl"
          >
            My{" "}
            <span className="font-serif font-normal italic text-primary">
              CV
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            Explore my experience, skills, and background.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            Open in new tab
          </a>
          <a
            href={cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:shadow-[0_0_28px_rgb(var(--color-primary)/25%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </div>

      <div className="cyber-panel mt-8 overflow-hidden rounded-2xl p-2 sm:p-3">
        <iframe
          src={cvUrl}
          title="Curriculum vitae"
          className="h-[65vh] min-h-[32rem] w-full rounded-xl bg-white"
          loading="lazy"
        />
      </div>
    </section>
  );
}

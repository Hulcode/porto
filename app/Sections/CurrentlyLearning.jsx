import Image from "next/image";
import { FileCode, Server, Component, Database, Play } from "lucide-react";

const icons = { FileCode, Server, Component, Database };

export default function CurrentlyLearning({ content }) {
  return (
    <section
      id="currentlylearning"
      className="container mx-auto max-w-7xl px-6 py-28 text-center"
    >
      <span className="section-kicker animate-fade-in">{content.label}</span>
      <h2 className="mx-auto mb-5 mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white animate-fade-in animation-delay-100 md:text-5xl">
        {content.headingLead}{" "}
        <span className="font-serif font-normal italic text-primary">
          {content.headingEmphasis}
        </span>
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-sm leading-7 text-muted-foreground animate-fade-in animation-delay-200">
        Curiosity is part of the process. Here&apos;s what I&apos;m exploring
        and building with right now.
      </p>
      <div className="grid grid-cols-1 gap-5 text-start md:grid-cols-2">
        {content.items.map((item, dex) => {
          const Icon = Object.hasOwn(icons, item.icon)
            ? icons[item.icon]
            : FileCode;
          return (
            <div
              className="cyber-panel group relative flex flex-col overflow-hidden rounded-2xl animate-fade-in"
              key={dex}
              style={{ animationDelay: `${(dex + 1) * 100}ms` }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    target="_blank"
                    href={item.recommendedResources}
                    rel="noreferrer"
                    aria-label={`Open ${item.title} learning resource`}
                    className="rounded-full border border-white/20 bg-background/70 p-4 text-primary backdrop-blur-lg transition hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Play className="w-7 h-7" />
                  </a>
                </div>
              </div>
              <div className="flex flex-1 items-start gap-4 p-5 sm:p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/[0.08]">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.why}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

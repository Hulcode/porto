import { Github, Linkedin } from "lucide-react";

const socialIcons = { Github, Linkedin };

export const Footer = ({ content, navigation }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] py-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
          <div className="text-center md:text-left">
            <a href="/home" className="text-lg font-bold tracking-tight">
              {navigation.name}{" "}
              <span className="text-primary">{navigation.surname}</span>
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              © {currentYear} {content.copyrightName}. All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {content.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {content.socials.map((social) => {
              const Icon = Object.hasOwn(socialIcons, social.icon)
                ? socialIcons[social.icon]
                : Github;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

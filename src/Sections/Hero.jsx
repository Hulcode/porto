import { ArrowRight, ChevronDown, Github, Linkedin } from "lucide-react";
import Button from "../componantes/Button";
import { AnimatedBorderButton } from "../componantes/AnimatedButton";
import heroBg from "../assets/hero-bg.jpg";
import profilePhoto from "../assets/image.png";
import { useMemo } from "react";

const skills = [
  "React",
  "JavaScript",
  "C#",
  "C++",
  "SQL",
  "Sass",

  "Tailwind CSS",

  "Jest",

  "GitHub Actions",
];
export default function Hero() {
  const stars = useMemo(() => {
    return [...Array(30)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
  }, []);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden  mx-auto">
      <div className="absolute inset-0 -z-50">
        <img
          src={heroBg}
          alt="hero "
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map((star, index) => (
            <div
              key={index}
              className="absolute w-1.5 h-1.5 rounded-full opacity-60"
              style={{
                backgroundColor: "#20b2a6",
                left: `${star.left}%`,
                top: `${star.top}%`,
                animation: `slow-drift ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      </div>{" "}
      {/* content */}
      <div className="container mx-auto px-6 pt-32 pb-20  relative  max-w-6xl z-10">
        <div className=" grid lg:grid-cols-2 gap-12  items-center">
          {/* left text */}
          <div className="space-y-8">
            <span className="h-2 w-2  text-primary bg-secondary/50 rounded-full px-3 py-2 animate-fade-in  ">
              <span className="h-2 w-2 rounded-full bg-primary inline-block mr-1 animate-pulse  " />
              Software Engineer.
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100 mt-6">
              Crafting <span className="text-primary glow-text">digital</span>
              <br />
              experiences with
              <br />
              <span className="italic font-normal font-serif text-white">
                Precision.
              </span>
            </h1>
            <p className=" text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
              I’m a frontend developer (currently) focused on building modern,
              responsive, and user-friendly web applications using React and
              JavaScript. I enjoy turning ideas into clean, interactive
              interfaces that provide a smooth user experience.
            </p>
            <div className="gap-2.5 flex">
              <Button size={"lg"}>
                Contact Me <ArrowRight size={20} />
              </Button>
              <AnimatedBorderButton>
                <a
                  href="#projects
            "
                >
                  My Projects
                </a>{" "}
              </AnimatedBorderButton>
            </div>
            <div className="flex flex-row items-center gap-2 animate-fade-in animation-delay-300 ">
              <span className="">Follow: </span>
              {[
                { icon: Github, href: "https://github.com/Hulcode" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/al-hassan-soliman-/?skipRedirect=true",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  target="_blank"
                  href={social.href}
                  className="p-2 rounded-full glass  hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
          {/* right */}
          <div>
            <div className="relative animate-fade-in animation-delay-300 max-w-md mx-auto glass rounded-3xl p-2 mt-10 glow-border">
              <div
                className="absolute inset-0 
              rounded-3xl bg-gradient-to-br 
              from-primary/30 via-transparent 
              to-primary/10 blur-2xl animate-pulse"
              />
              <img
                src={profilePhoto}
                alt="alhassan "
                className="w-full aspect-[4/5] object-cover rounded-2xl"
              />

              <div className="absolute -bottom-5 glass right-0 p-2 rounded-2xl animate-float">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block mr-2 animate-pulse " />
                <span>Not available for work</span>
              </div>
              <div className="absolute -top-10 glass left-0 p-4 rounded-2xl animate-float">
                <span className=" text-primary block text-3xl font-bold">
                  2+
                </span>
                <span className="text-muted-foreground text-sm">
                  Years Exp.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-section mt-24 overflow-hidden max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>

          <div className="flex gap-7 animate-marquee whitespace-nowrap">
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={index}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

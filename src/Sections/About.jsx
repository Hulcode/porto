import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
];
export default function About() {
  return (
    <section
      id="about"
      className=" container max-w-5xl mx-auto py-20  relative overflow-hidden px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      {/* left */}
      <div className="space-y-8 animate-fade-in animation-delay-100">
        <span className="mb-5 inline-block uppercase text-secondary-foreground text-sm font-medium tracking-wider">
          About Me
        </span>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
          Building the future,
          <span className="font-serif italic font-normal text-white">
            one component at a time.
          </span>
        </h2>
        <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
          <p>
            I’m a frontend developer (currently) focused on building modern,
            responsive, and user-friendly web applications using React and
            JavaScript. I enjoy turning ideas into clean, interactive interfaces
            that provide a smooth user experience.
          </p>
          <p>
            My background in desktop development with C# helped me build a
            strong foundation in problem-solving and object-oriented
            programming, which I now apply to frontend development to write
            clean, maintainable code.
          </p>
          <p>
            {" "}
            Currently, I’m focused on improving my skills in frontend
            architecture, performance optimization, and building real-world
            projects that reflect best practices.
          </p>
          <p>
            I’m always open to learning new technologies, collaborating with
            others, and taking on projects that challenge me to grow as a
            developer.
          </p>
        </div>
        <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
          <p className="text-lg font-medium italic text-foreground">
            "My mission is to create digital experiences that are not just
            functional, but truly delightful — products that users love to use
            and developers love to maintain."
          </p>
        </div>
      </div>

      {/* right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {highlights.map((item, key) => {
          return (
            <div
              key={key}
              className="p-5 bg-primary/5 rounded-2xl glass animate-fade-in"
              style={{ animationDelay: `${(key + 1) * 100}ms` }}
            >
              <div className="p-3 w-fit rounded-lg bg-primary/20 mb-2">
                <item.icon className="   h-6 w-6" />
              </div>

              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

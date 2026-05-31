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
      className=" container max-w-6xl mx-auto py-20  relative overflow-hidden px-3 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
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
            I’m a Full-Stack Developer with experience building both desktop and
            web applications. My core technologies include C#, JavaScript,
            Node.js, Express.js, MongoDB, and React. I enjoy developing
            solutions that address real-world problems and continuously
            improving my skills through hands-on projects and practical
            experience.
          </p>

          <p>
            Currently, I’m focused on strengthening my full-stack development
            expertise by building real-world applications and exploring modern
            frameworks and tools such as Next.js and NestJS. I aim to deepen my
            understanding of scalable architecture and best practices in
            software development.
          </p>

          <p>
            I’m always open to learning new technologies, collaborating with
            other developers, and taking on challenging projects that help me
            grow as a software engineer.
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

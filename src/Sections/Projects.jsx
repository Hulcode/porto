import sudoco from "../assets/Screenshot 2026-03-10 162834.png";
import pray from "../assets/Screenshot 2026-03-10 164138.png";
import protofolio from "../assets/Screenshot 2026-03-13 213953.png";
import { AnimatedBorderButton } from "../componantes/AnimatedButton";
import weather from "../assets/1772483995753.jfif";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "Weather",
    description:
      "A responsive web application that displays real-time weather information for different cities. The app fetches live weather data from an external API and presents temperature, conditions, and other details through a clean and user-friendly interface.",
    image: weather,
    tags: ["React", "JavaScript", "Weather API"],
    link: "https://imaginative-kulfi-e9e769.netlify.app/",
    github: "https://github.com/Hulcode/weather",
  },
  {
    title: "Prayer Times App",
    description:
      "A web application that displays daily Islamic prayer times based on the selected city. The project fetches real-time data from an external API and presents it in a clean, user-friendly interface.",
    image: pray,
    tags: ["React", "API Integration", "JavaScript", "CSS"],
    link: "https://hulcode-prayes-time.netlify.app/",
    github: "https://github.com/Hulcode/prayTime",
  },
  {
    title: "Sudoku Game",
    description:
      "A fully interactive Sudoku puzzle built with JavaScript that allows users to solve puzzles directly in the browser. The project focuses on implementing game logic, validating user input, and creating a clean and responsive interface for an engaging puzzle-solving experience.",
    image: sudoco,
    tags: ["JS", "TailwindCSS", "Html/CSS", "Sass"],
    link: "https://hulcode.github.io/sudoku/",
    github: "https://github.com/Hulcode/sudoku",
  },
  {
    title: "My first Portfolio",
    description:
      "A modern portfolio website built with React and Tailwind CSS to showcase my projects, skills, and experience.",
    image: protofolio,
    tags: ["React", "Tailwind", "JavaScript"],
    link: "https://portfolio-tes.netlify.app/#projects",
    github: "https://github.com/Hulcode/portofolio-1",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className=" container max-w-5xl mx-auto py-20  relative overflow-hidden px-6 items-center"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="text-center mx-auto max-w-3xl mb-16 ">
        <span className="text-secondary-foreground text-sm font-md tracking-wider animate-fade-in">
          Featured Work
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
          Projects that{" "}
          <span className="font-serif italic font-normal text-white">
            make an impact.
          </span>
        </h2>
        <p className="text-muted-foreground animate-fade-in animation-delay-200">
          {" "}
          A selection of my recent work, from complex web applications to
          innovative tools that solve real-world problems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((pro, index) => {
          return (
            <div
              key={index}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1 pb-2.5 flex justify-around flex-col"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="overflow-hidden aspect-video relative">
                <img
                  src={pro.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center  gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a
                    target="_blank"
                    href={pro.link}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <a
                    target="_blank"
                    href={pro.github}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all "
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="text flex flex-col  gap-4 p-3">
                <h1 className="text-lg font-semibold text-white ">
                  {pro.title}
                </h1>
                <p className=" text-muted-foreground text-sm">
                  {pro.description}
                </p>
              </div>
              <div className="flex gap-2  mx-2">
                {pro.tags.map((tag, key) => {
                  return (
                    <span
                      key={key}
                      className="px-4 py-1.5 rounded-full  bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 "
                    >
                      {tag}{" "}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-12 animate-fade-in animation-delay-500">
        {" "}
        <AnimatedBorderButton>
          <a
            href="https://github.com/Hulcode"
            target="_blank"
            className="flex flex-row gap-2 items-center"
          >
            View all projects
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </AnimatedBorderButton>
      </div>
    </section>
  );
}

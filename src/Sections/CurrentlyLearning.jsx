import TypeScript from "../assets/type-script.jpg";
import Nodejs from "../assets/Screenshot 2026-03-14 221438.png";
import ShadCNUI from "../assets/hqdefault.jpg";
import TanStackQuery from "../assets/Screenshot 2026-03-14 222001.png";

import { FileCode, Server, Component, Database, Play } from "lucide-react";

const learning = [
  {
    title: "TypeScript",
    why: "Learning static typing to write safer, more maintainable JavaScript and improve React applications.",
    icon: FileCode,
    recommendedResources:
      "https://youtube.com/playlist?list=PLDoPjvoNmBAy532K9M_fjiAmrJ0gkCyLJ&si=ImPR2_yYeqVyaJ71",
    image: TypeScript,
  },
  {
    title: "Node.js",
    why: "Learning backend development with Node.js to build scalable server-side applications.",
    icon: Server,
    recommendedResources: "https://youtu.be/Oe421EPjeBE?si=OgFvx-uSaHndiU8d",
    image: Nodejs,
  },
  {
    title: "ShadCN UI",
    why: "Learning to build accessible, customizable UI components using ShadCN, Tailwind CSS, and Radix UI.",
    icon: Component,
    recommendedResources:
      "https://youtube.com/playlist?list=PL4cUxeGkcC9h1NXLUuiAQ7c4UtdEInqma&si=qz6ju_lQHDJxcfNj",
    image: ShadCNUI,
  },
  {
    title: "TanStack Query",
    why: "Learning advanced data fetching and caching techniques to optimize React applications.",
    icon: Database,
    recommendedResources: "https://youtu.be/8K1N3fE-cDs?si=FT1WLV9MxNowlD9J",
    image: TanStackQuery,
  },
];
export default function CurrentlyLearning() {
  return (
    <section className=" container max-w-5xl mx-auto py-20 px-6 text-center">
      <span className="text-secondary-foreground text-sm font-md tracking-wider animate-fade-in ">
        Featured Work
      </span>
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-secondary-foreground mt-5">
        Technologies I'm
        <span className="font-serif italic text-white">
          {" "}
          Currently Learning
        </span>
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1  gap-4  text-start">
        {learning.map((item, dex) => {
          return (
            <div
              className="group overflow-hidden rounded-2xl glass animate-fade-in pb-2 flex justify-around gap-2 flex-col relative"
              key={dex}
              style={{ animationDelay: `${(dex + 1) * 100}ms` }}
            >
              <div className="overflow-hidden aspect-video relative">
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={item.title}
                />
                <div className="absolute inset-0 flex items-center justify-center  opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a
                    target="_blank"
                    href={item.recommendedResources}
                    className="p-3 rounded-full  hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Play className="w-7 h-7" />
                  </a>
                </div>
              </div>
              <div className="bg-background border border-border rounded-full p-3 shadow-lg">
                <item.icon className="text-primary h-6 w-6" />
              </div>
              <div className="p-3 flex justify-around gap-2 flex-col">
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-sm">{item.why}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

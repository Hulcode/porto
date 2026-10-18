import About from "../Sections/About";
import Contact from "../Sections/Contact";
import Experience from "../Sections/Experience";
import Hero from "../Sections/Hero";
import Projects from "../Sections/Projects";
import CurrentlyLearning from "../Sections/CurrentlyLearning";
import { getPortfolio } from "../../lib/portfolio-store";
export default async function Portfolio() {
  const content = await getPortfolio();
  return (
    <div className="site-shell min-h-screen overflow-x-clip">
      <main>
        <Hero content={content.hero} />
        <About content={content.about} />
        <Projects content={content.projects} />
        <Experience content={content.experience} />
        <CurrentlyLearning content={content.learning} />
        <Contact content={content.contact} />
      </main>
    </div>
  );
}

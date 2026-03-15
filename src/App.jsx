import { Footer } from "./layout/Footer";
import Navbar from "./layout/Navbar";
import About from "./Sections/About";
import Contact from "./Sections/Contact";
import Experience from "./Sections/Experience";
import Hero from "./Sections/Hero";
import Projects from "./Sections/Projects";
import CurrentlyLearning from "./Sections/CurrentlyLearning";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <CurrentlyLearning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

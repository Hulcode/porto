import { Menu, X } from "lucide-react";
import Button from "../componantes/Button";
import { useState, useEffect } from "react";
const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];
export default function Navbar() {
  const [inMobile, setInMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-transparent py-3">
      <nav
        className={`container mx-auto px-6 flex justify-between items-center transition-all duration-500 ${isScrolled ? "glass py-3" : "bg-transparent py-5"}  `}
      >
        <a
          href="#"
          className="text-xl text-foreground font-bold tracking-tight hover:text-primary "
        >
          Al-Hassan<span className="text-primary"> Soliman</span>
        </a>
        <div className=" items-center md:flex gap-1 hidden glass rounded-full px-2 py-1   ">
          {navLinks.map((link, key) => {
            return (
              <a
                key={key}
                href={link.href}
                className="px-4 text-sm  py-2 text-muted-foreground  hover:text-foreground rounded-full hover:bg-surface "
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="md:block hidden">
          <Button size={"sm"}>
            {" "}
            <a href="#contact"> Contact Me</a>
          </Button>
        </div>
        <button
          onClick={() => {
            setInMobile(!inMobile);
          }}
          className="md:hidden p-2 text-foreground "
        >
          {inMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {/* {mobile section} */}
      {inMobile && (
        <div
          className={`md:hidden animate-fade-in   glass-strong container mx-auto px-6 py-6 flex flex-col gap-4`}
        >
          {navLinks.map((link, key) => {
            return (
              <a
                onClick={() => {
                  setInMobile(false);
                }}
                key={key}
                href={link.href}
                className="text-lg py-2 text-muted-foreground  hover:text-foreground rounded-full hover:bg-surface "
              >
                {link.label}
              </a>
            );
          })}
          <div className="md:hidden block">
            <Button className="w-full">
              <a
                href="#contact"
                onClick={() => {
                  setInMobile(false);
                }}
              >
                Contact Me
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

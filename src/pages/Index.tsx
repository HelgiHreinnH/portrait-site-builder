import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Intro } from "@/components/Intro";
import { Hero } from "@/components/Hero";
import { Fields } from "@/components/Fields";
import { Method } from "@/components/Method";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { GlobalAmbientLayer } from "@/components/GlobalAmbientLayer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <>
      {/* <GlobalAmbientLayer /> */}
      <div className="relative z-10 snap-container">
        <div className="snap-section">
          <Hero />
        </div>
        <div className="snap-section" id="intro">
          <Intro />
        </div>
        <div className="snap-section flow" id="fields">
          <Fields />
        </div>
        <div className="snap-section flow" id="method">
          <Method />
        </div>
        <div className="snap-section-hscroll flow">
          <Projects />
        </div>
        <div className="snap-section flow">
          <About />
        </div>
        <div className="snap-section flow">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Index;

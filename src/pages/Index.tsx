import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Intro } from "@/components/Intro";
import { QuoteBreak } from "@/components/QuoteBreak";
import { Services } from "@/components/Services";
import { Methodology } from "@/components/Methodology";
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
          <QuoteBreak />
        </div>
        <div className="snap-section" id="sub-hero">
          <Hero />
        </div>
        <div className="snap-section">
          <Services />
        </div>
        <div className="snap-section">
          <Methodology />
        </div>
        <div className="snap-section-hscroll">
          <Projects />
        </div>
        <div className="snap-section">
          <About />
        </div>
        <div className="snap-section">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Index;

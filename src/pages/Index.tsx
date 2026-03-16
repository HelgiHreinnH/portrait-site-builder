import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
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
      <GlobalAmbientLayer />
      <div className="relative z-10">
        <QuoteBreak />
        <div id="sub-hero">
          <Hero />
        </div>
        <Services />
        <Methodology />
        <Projects />
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Index;

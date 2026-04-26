import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import portraitImage from "@/assets/portrait_image.png";

const smooth = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
const fade = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

type ActiveView = "image" | "what" | "who";

export function Intro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [activeView, setActiveView] = useState<ActiveView>("image");

  return (
    <section className="relative h-full overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-16 left-6 right-6 h-px bg-foreground/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 pt-12 md:pt-16 pb-6 h-full flex flex-col">
        {/* Breathing room where heading used to be */}
        <div className="my-6 md:my-[48px]" />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center min-h-0">
          {/* Left column - buttons */}
          <div className="flex flex-row md:flex-col gap-4 md:gap-8 items-center justify-center shrink-0">
            <button
              onMouseEnter={() => setActiveView("what")}
              onMouseLeave={() => setActiveView("image")}
              onClick={() => setActiveView(activeView === "what" ? "image" : "what")}
              className={`whitespace-nowrap font-display text-lg md:text-3xl lg:text-4xl tracking-tight transition-colors duration-300 px-2 md:px-6 py-2 md:py-3 border-b-2 ${
                activeView === "what"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
            >
              What I do<span className="text-user-blue">.</span>
            </button>
            <button
              onMouseEnter={() => setActiveView("who")}
              onMouseLeave={() => setActiveView("image")}
              onClick={() => setActiveView(activeView === "who" ? "image" : "who")}
              className={`whitespace-nowrap font-display text-lg md:text-3xl lg:text-4xl tracking-tight transition-colors duration-300 px-2 md:px-6 py-2 md:py-3 border-b-2 ${
                activeView === "who"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
            >
              Who I am<span className="text-user-blue">.</span>
            </button>
          </div>

          {/* Right column - image or content */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0.1 } : { ...smooth, delay: 0.3 }}
            className="relative flex-1 min-h-0 h-full md:h-[calc(100vh-200px)] md:min-h-[300px] md:-mt-36"
          >
            <div className="relative overflow-hidden h-full">
              <AnimatePresence mode="wait">
                {activeView === "image" && (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fade}
                    className="w-full h-full relative flex flex-col items-center -mt-8 md:mt-0"
                  >
                    <img
                      src={portraitImage}
                      alt="Helgi Hreinn Hjálmarsson"
                      className="w-full flex-1 min-h-0 object-cover object-top"
                    />
                    {/* Name overlay at bottom of image */}
                    <div className="w-full bg-gradient-to-t from-background/80 to-transparent px-4 py-3 -mt-16 relative z-10">
                      <p className="font-display text-foreground md:text-user-blue text-sm md:text-base font-medium">Helgi Hreinn Hjálmarsson</p>
                      <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/70 md:text-user-blue/70">
                        Architect · Copenhagen
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeView === "what" && (
                  <motion.div
                    key="what"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={fade}
                    className="flex flex-col items-center justify-center p-2 md:p-6 h-full overflow-y-auto"
                  >
                    <div className="flex flex-col gap-0 text-center">
                      <div className="font-display text-2xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
                        <span className="text-muted-foreground font-light">I turn </span>
                        <span>knowledge</span>
                      </div>
                      <div className="font-display text-2xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
                        <span className="text-muted-foreground font-light">into </span>
                        <span>design</span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-6 flex flex-col items-center">
                      <p className="text-sm md:text-lg leading-relaxed text-muted-foreground max-w-md text-center">
                        I use experience across three disciplines — architecture, digital product, and workplace strategy — to help teams move from a complex problem to a clear solution. I've spent ten years working on problems that don't fit neatly into one box: spaces that need to work better for the people using them, digital tools that need to fit how teams actually operate, strategies that need to survive contact with reality. My approach is analytical and collaborative — and I stay involved long enough to see it through.
                      </p>

                      <div className="flex gap-4 md:gap-8 mt-4 md:mt-6">
                        {[
                          { v: "10+", l: "Years" },
                          { v: "10K+", l: "People impacted" },
                          { v: "3", l: "Countries" },
                        ].map(({ v, l }) => (
                          <div key={l} className="text-center">
                            <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{v}</div>
                            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                              {l}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeView === "who" && (
                  <motion.div
                    key="who"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={fade}
                    className="flex flex-col justify-center p-2 md:p-6 h-full overflow-y-auto"
                  >
                    <div className="mb-4 md:mb-6">
                      <span className="font-display text-xl md:text-3xl font-light italic text-muted-foreground tracking-tight">
                        Who I am
                      </span>
                      <span className="font-display text-xl md:text-3xl font-light text-user-blue tracking-tight">
                        .
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-4 md:mb-10">
                      Helgi Hreinn
                      <br />
                      Hjálmarsson
                    </h2>

                    <p className="text-sm md:text-lg leading-relaxed text-muted-foreground mb-3 max-w-md">
                      Architect by training, designer by instinct.
                      What drives me is curiosity — about how people work, how spaces behave, and how digital tools either fit or fail the people using them.
                    </p>
                    <p className="text-sm md:text-lg leading-relaxed text-muted-foreground mb-3 max-w-md">
                      Over ten years I've built a practice across architecture, workplace strategy, and digital product, always drawn to problems that sit at the edges of disciplines.
                      I'm always engaged when the problem isn't fully defined yet, and the work starts with good questions rather than assumed answers. I always try to work with the same drive — to understand a problem carefully, then make something worth making.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import portraitImage from "@/assets/portrait_image.png";

const smooth = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
const fade = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };


type ActiveView = "image" | "what" | "who";

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeView, setActiveView] = useState<ActiveView>("image");

  return (
    <section className="relative h-full overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-16 left-6 right-6 h-px bg-foreground/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 pt-12 md:pt-16 pb-6 h-full flex flex-col">
        {/* Standardized header */}
        <div className="my-[48px]">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2 px-[4px]">
            About
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-3 px-[4px]">
            Introduction
          </h2>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8 md:gap-12 items-center min-h-0">
          {/* Left column - buttons */}
          <div className="flex flex-col gap-8 items-center justify-center">
            <button
              onMouseEnter={() => setActiveView("what")}
              onMouseLeave={() => setActiveView("image")}
              onClick={() => setActiveView(activeView === "what" ? "image" : "what")}
              className={`font-display text-2xl md:text-3xl tracking-tight transition-colors duration-300 px-6 py-3 border-b-2 ${
                activeView === "what"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              What do I do<span className="text-user-blue">?</span>
            </button>
            <button
              onMouseEnter={() => setActiveView("who")}
              onMouseLeave={() => setActiveView("image")}
              onClick={() => setActiveView(activeView === "who" ? "image" : "who")}
              className={`font-display text-2xl md:text-3xl tracking-tight transition-colors duration-300 px-6 py-3 border-b-2 ${
                activeView === "who"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Who am I<span className="text-user-blue">?</span>
            </button>
          </div>

          {/* Right column - image or content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...smooth, delay: 0.3 }}
            className="relative h-[calc(100vh-380px)] min-h-[300px]"
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
                    className="w-full h-full relative"
                  >
                    <img
                      src={portraitImage}
                      alt="Helgi Hreinn Hjálmarsson"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Name overlay at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent px-4 py-3">
                      <p className="font-display text-user-blue text-base font-medium">Helgi Hreinn Hjálmarsson</p>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-user-blue/70">Architect · Copenhagen</p>
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
                    className="flex flex-col justify-center p-4 md:p-6 h-full"
                  >
                    <div className="mb-6">
                      <span className="font-display text-xl md:text-3xl font-light italic text-muted-foreground tracking-tight">
                        What do I do
                      </span>
                      <span className="font-display text-xl md:text-3xl font-light text-user-blue tracking-tight">?</span>
                    </div>

                    <div className="flex flex-col gap-0">
                      <div className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
                        <span className="text-muted-foreground font-light">I turn </span>
                        <span>knowledge</span>
                      </div>
                      <div className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
                        <span className="text-muted-foreground font-light">into </span>
                        <span>design</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                        Architect with 10+ years across workplace strategy, digital product, and hands-on design.
                      </p>

                      <div className="flex gap-8 mt-6">
                        {[
                          { v: "10+", l: "Years" },
                          { v: "10K+", l: "People impacted" },
                          { v: "3", l: "Countries" },
                        ].map(({ v, l }) => (
                          <div key={l} className="text-center">
                            <div className="font-display text-3xl font-bold text-foreground">{v}</div>
                            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{l}</div>
                          </div>
                        ))}
                      </div>

                      <p className="font-mono text-[10px] leading-relaxed text-muted-foreground max-w-md mt-6">
                        Architect by training. Working across the boundary between physical space, organisational thinking, and digital product.
                      </p>
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
                    className="flex flex-col justify-center p-8 md:p-12 h-full"
                  >
                    <div className="mb-6">
                      <span className="font-display text-xl md:text-3xl font-light italic text-muted-foreground tracking-tight">
                        Who am I
                      </span>
                      <span className="font-display text-xl md:text-3xl font-light text-user-blue tracking-tight">?</span>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5">
                      Helgi Hreinn<br />Hjálmarsson
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-3 max-w-md">
                      Architect (MAA) from the Aarhus School of Architecture with 10+ years across workplace strategy, digital product development, and hands-on design.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-3 max-w-md">
                      I grew up in Iceland and have worked across many professional and cultural contexts. That shaped a fundamental sense that the same challenges look very different depending on perspective.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5 max-w-md">
                      I work with my hands as well as with data and strategy. Carpentry, joinery, surface treatment. The same analytical approach, a different material.
                    </p>

                    <div className="space-y-2">
                      {[
                        { l: "Email", v: "helgihreinn@me.com" },
                        { l: "Phone", v: "+45 4083 1842" },
                        { l: "Base", v: "Copenhagen, Denmark" },
                      ].map(({ l, v }) => (
                        <div key={l} className="flex items-center gap-4 border-b border-border pb-2">
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-14">{l}</span>
                          <span className="text-sm text-foreground">{v}</span>
                        </div>
                      ))}
                    </div>
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

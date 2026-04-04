import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import portraitImage from "@/assets/portrait_image.png";

const smooth = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

const CLIENTS = [
  "Global Brand HQ", "International Finance", "Industrial Group", "Colliers", "Ubiqisense", "Bygningsstyrelsen",
  "Global Brand HQ", "International Finance", "Industrial Group", "Colliers", "Ubiqisense", "Bygningsstyrelsen",
];

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState<"what" | "who">("what");

  return (
    <section className="relative h-full overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-16 left-6 right-6 h-px bg-foreground/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-6 h-full flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start min-h-0">
          {/* Left column — Header + Buttons */}
          <div className="flex flex-col justify-start pt-8">
            {/* Standardized header */}
            <div className="my-[48px]">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2 px-[4px]">
                01 — Introduction
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-3 px-[4px]">
                <span className="text-muted-foreground font-light">I turn </span>knowledge<br />
                <span className="text-muted-foreground font-light">into </span>design
              </h2>
              <p className="max-w-xl leading-relaxed text-muted-foreground text-base px-[4px]">
                Architect with 10+ years across workplace strategy, digital product, and hands-on design.
              </p>
            </div>

            {/* Toggle buttons */}
            <div className="flex gap-3 px-[4px]">
              <button
                onClick={() => setActiveTab("what")}
                onMouseEnter={() => setActiveTab("what")}
                className={`font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeTab === "what"
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                }`}
              >
                What I do
              </button>
              <button
                onClick={() => setActiveTab("who")}
                onMouseEnter={() => setActiveTab("who")}
                className={`font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeTab === "who"
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                }`}
              >
                Who am I
              </button>
            </div>
          </div>

          {/* Right column — Portrait + overlay content + name below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...smooth, delay: 0.3 }}
            className="relative flex flex-col min-h-0"
          >
            {/* Image container with overlay */}
            <div className="relative overflow-hidden flex-1 min-h-0 -mt-8">
              <img
                src={portraitImage}
                alt="Helgi Hreinn Hjálmarsson"
                className="w-full h-full object-cover object-top"
                style={{ maxHeight: "calc(100vh - 320px)" }}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-end">
                <AnimatePresence mode="wait">
                  {activeTab === "what" ? (
                    <motion.div
                      key="what-overlay"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full bg-gradient-to-t from-background via-background/90 to-transparent p-6 pt-16"
                    >
                      <div className="flex gap-8 mb-4">
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
                      <p className="font-mono text-[10px] leading-relaxed text-muted-foreground max-w-md">
                        Architect by training. Working across the boundary between physical space, organisational thinking, and digital product.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="who-overlay"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full bg-gradient-to-t from-background via-background/90 to-transparent p-6 pt-16"
                    >
                      <p className="text-sm leading-relaxed text-muted-foreground mb-3 max-w-md">
                        Architect (MAA) from the Aarhus School of Architecture with 10+ years across workplace strategy, digital product development, and hands-on design.
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground mb-4 max-w-md">
                        I grew up in Iceland and have worked across many professional and cultural contexts.
                      </p>
                      <div className="space-y-2">
                        {[
                          { l: "Email", v: "helgihreinn@me.com" },
                          { l: "Phone", v: "+45 4083 1842" },
                          { l: "Base", v: "Copenhagen, Denmark" },
                        ].map(({ l, v }) => (
                          <div key={l} className="flex items-center gap-4 border-b border-border/40 pb-2">
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-14">{l}</span>
                            <span className="text-sm text-foreground">{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Name below image */}
            <div className="mt-3">
              <p className="font-display text-user-blue text-base font-medium">Helgi Hreinn Hjálmarsson</p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-user-blue/70">Architect · Copenhagen</p>
            </div>
          </motion.div>
        </div>

        {/* Client marquee */}
        <div className="pt-4 overflow-hidden shrink-0">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span key={i} className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/20 mx-4">
                {client}
                <span className="ml-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

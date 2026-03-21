import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const smooth = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

const PORTRAIT =
  "https://images.unsplash.com/photo-1571059314690-91e84c43dc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBtYW4lMjBwb3J0cmFpdCUyMG1pbmltYWx8ZW58MXx8fHwxNzczMTQxNjYwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const CLIENTS = [
  "LEGO", "Barclays", "Beumer Group", "Colliers", "Ubiqisense", "Bygningsstyrelsen",
  "LEGO", "Barclays", "Beumer Group", "Colliers", "Ubiqisense", "Bygningsstyrelsen",
];

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative h-full overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-16 left-6 right-6 h-px bg-foreground/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-6 h-full flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-0">
          {/* Left side - Typography */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...smooth, delay: 0.1 }}
              className="mb-6"
            >
              <span className="font-display text-xl md:text-3xl font-light italic text-muted-foreground tracking-tight">
                What do I do
              </span>
              <span className="font-display text-xl md:text-3xl font-light text-user-blue tracking-tight">?</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ ...smooth, delay: 0.3 }}
              className="flex flex-col gap-0"
            >
              <div className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
                <span className="text-muted-foreground font-light">I turn </span>
                <span>knowledge</span>
              </div>
              <div className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
                <span className="text-muted-foreground font-light">into </span>
                <span>design</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...smooth, delay: 0.6 }}
              className="mt-6"
            >
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-md">
                Architect with 10+ years across workplace strategy, digital product, and hands-on design.
              </p>

              <div className="flex gap-8 mt-6">
                {[
                  { v: "10+", l: "Years" },
                  { v: "10K+", l: "People impacted" },
                  { v: "3", l: "Countries" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-2xl font-bold text-foreground">{v}</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...smooth, delay: 0.3 }}
            className="relative flex flex-col min-h-0"
          >
            <p className="font-mono text-[10px] leading-relaxed text-muted-foreground max-w-xs mb-3 text-right ml-auto">
              Architect by training. Working across the boundary between physical space, organisational thinking, and digital product.
            </p>

            <div className="relative overflow-hidden flex-1 min-h-0" style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}>
              <img
                src={PORTRAIT}
                alt="Helgi Hreinn Hjálmarsson"
                className="w-full h-full object-cover"
                style={{ maxHeight: "calc(100vh - 280px)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent">
                <p className="font-display text-primary-foreground text-base font-medium">Helgi Hreinn Hjálmarsson</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">Architect · Copenhagen</p>
              </div>
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1.5 text-center">
                <div className="font-display text-lg font-bold text-foreground">580</div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Largest project</div>
              </div>
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

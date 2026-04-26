import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_BASE = "https://pcubpqskliewraygeosc.supabase.co/storage/v1/object/public/site-images";

const smooth = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

const services = [
  {
    number: "01",
    title: "People",
    discipline: "Strategy & User Experience",
    tags: ["User Research", "Workshops", "Change Management", "Stakeholder Management"],
    description:
      "Analysis of human behaviour, workshop facilitation, organisational understanding, change management, and user involvement as a methodological foundation.",
    image: `${STORAGE_BASE}/People.png`,
  },
  {
    number: "02",
    title: "Buildings",
    discipline: "Architecture & Workplace",
    tags: ["Space Planning", "Zone Strategy", "Workplace Design", "Design Briefs"],
    description:
      "Space planning, workplace strategy, zone design, user experience in physical environments, and architectural advisory from brief to delivery.",
    image: `${STORAGE_BASE}/Buildings.png`,
  },
  {
    number: "03",
    title: "Technology",
    discipline: "Digital Product & UI/UX",
    tags: ["UI/UX", "Data Visualisation", "Product Development", "PropTech"],
    description:
      "UI/UX design, data visualisation, digital product development, and PropTech. From concept sketch to fully built product.",
    image: `${STORAGE_BASE}/Technology.png`,
  },
];

export function Fields() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="fields" className="relative h-full flex flex-col overflow-hidden">
      <div className="section-inner">
        {/* Row 1: Header */}
        <div className="shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-3"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5">
              Three Fields. One Approach.
            </h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground text-base">
              I've worked across three disciplines for over 10 years. Not as a generalist without depth — but because the best solutions emerge where people, physical space, and digital systems meet.
            </p>
          </motion.div>
        </div>

        {/* Row 2: Cards */}
        <div className="flex-1 min-h-0 flex items-end">
          {/* Desktop grid — unchanged */}
          <div className="hidden md:grid grid-cols-3 gap-12 w-full">
            {services.map((service, i) => {
              const isActive = active === i;
              const isInactive = active !== null && !isActive;
              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: i * 0.1 }}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    opacity: isInactive ? 0.5 : 1,
                  }}
                  className={`relative rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-500 bg-background overflow-hidden flex flex-col items-center justify-start h-[560px] border ${
                    isActive
                      ? "border-[hsl(var(--user-blue)/0.4)] shadow-[0_0_0_1px_hsl(var(--user-blue)/0.15),0_4px_20px_-4px_hsl(var(--user-blue)/0.1)]"
                      : "border-border"
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  {/* Image */}
                  <div className="w-full h-[146px] md:h-[166px] flex items-center justify-center rounded-lg overflow-hidden mb-6 shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                    {service.title}
                  </h3>

                  {/* Discipline */}
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
                    {service.discipline}
                  </span>

                  {/* Description */}
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground leading-relaxed mt-1"
                  >
                    {service.description}
                  </motion.p>

                  {/* Tags — bottom aligned */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] md:text-[11px] tracking-wider uppercase rounded-full px-2.5 py-1 border border-border bg-muted/50 text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile accordion */}
          <div className="flex md:hidden flex-col gap-2.5 w-full max-w-md flex-1 min-h-0 overflow-y-auto pb-4 -mx-2 px-2">
            {services.map((service, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: i * 0.1 }}
                  className={`rounded-2xl p-4 border-2 bg-background cursor-pointer transition-colors ${
                    isActive ? "border-[hsl(var(--user-blue)/0.5)]" : "border-border"
                  }`}
                  onClick={() => setActive(isActive ? null : i)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display text-foreground text-xl font-bold opacity-20 shrink-0">
                        {service.number}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-foreground text-lg font-bold tracking-tight truncate">
                          {service.title}
                        </h3>
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground truncate block">
                          {service.discipline}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-foreground/40 text-xl leading-none shrink-0"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-border">
                          <div className="w-full h-[120px] flex items-center justify-center rounded-lg overflow-hidden mb-3">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[9px] tracking-wider uppercase rounded-full px-2 py-0.5 text-foreground/70 border border-border bg-muted/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Workplace Strategy",
    discipline: "People + Buildings",
    tags: ["Analysis", "Strategy", "Design Brief"],
    description:
      "From analysis to design brief. Activity-based environments, employee experience, and spatial strategy grounded in how people actually use space.",
    accent: "#D5DEF4",
  },
  {
    number: "02",
    title: "Digital Product Development",
    discipline: "People + Technology",
    tags: ["UX Research", "Product Strategy", "UI/UX"],
    description:
      "User research, product strategy, and interface design. From user insight to working prototype — applying the same analytical method to digital tools.",
    accent: "#B8C9EE",
  },
  {
    number: "03",
    title: "Full-Scope Projects",
    discipline: "All Three Fields",
    tags: ["End-to-End", "Brief to Delivery", "Cross-discipline"],
    description:
      "End-to-end from brief to delivery. For teams that need someone who understands the whole picture — people, buildings, and technology together.",
    accent: "#DCE8E6",
  },
  {
    number: "04",
    title: "Innovation & PropTech",
    discipline: "Buildings + Technology",
    tags: ["PropTech", "Data Tools", "AI"],
    description:
      "Building tools that connect spatial design with data. Occupancy analytics, AR tools, and platforms that make better design decisions possible.",
    accent: "#C5D5EC",
  },
  {
    number: "05",
    title: "Strategic Advisory",
    discipline: "Knowledge Transfer",
    tags: ["Workshops", "Briefs", "Frameworks"],
    description:
      "Analytical, strategic, and design briefs for teams who need clarity before committing to a direction. The first three phases are where the most expensive mistakes get prevented.",
    accent: "#D5DEF4",
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-foreground">
            What I Do
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
            Working at the intersection of people, buildings, and technology. The same method applies regardless of the medium.
          </p>
        </div>

        {/* Service rows */}
        <div className="border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              className="relative cursor-default overflow-hidden border-b border-border"
            >
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{ opacity: active === i ? 0.3 : 0 }}
                style={{ background: service.accent }}
                transition={{ duration: 0.3 }}
              />

              {/* Main row */}
              <div className="relative flex items-center gap-4 md:gap-8 py-6 md:py-8">
                {/* Number + discipline */}
                <div className="w-20 md:w-28 shrink-0">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    {service.number}
                  </span>
                  <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/60 mt-1 hidden md:block">
                    {service.discipline}
                  </p>
                </div>

                {/* Title */}
                <h3 className="flex-1 font-display text-lg md:text-2xl font-semibold text-foreground">
                  {service.title}
                </h3>

                {/* Tags */}
                <div className="hidden md:flex gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <ArrowUpRight size={16} className="text-muted-foreground shrink-0" />
              </div>

              {/* Expanding description */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[14px] leading-relaxed text-muted-foreground pb-6 pl-20 md:pl-28 max-w-2xl">
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex justify-between items-center">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
            People · Buildings · Technology
          </span>
        </div>
      </div>
    </section>
  );
}

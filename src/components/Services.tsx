import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Digital Product Design & Development",
    discipline: "Product & Tech",
    tags: ["PropTech", "DesignTech", "AI Tools"],
    description:
      "Building tools that transform how spaces are created. Behavioral analytics platforms, spatial optimization tools powered by AI, and digital twins for spatial planning.",
    accent: "#D5DEF4",
  },
  {
    number: "02",
    title: "Behavioral Intelligence as a Service",
    discipline: "Data & Intelligence",
    tags: ["APIs", "Data Platform", "Automation"],
    description:
      "Packaging expertise into scalable digital tools. Behavioral pattern recognition, space utilization prediction models, and automated behavioral analysis workflows.",
    accent: "#B8C9EE",
  },
  {
    number: "03",
    title: "Innovation Partnerships",
    discipline: "Co-creation",
    tags: ["Co-creation", "UX Design", "Pilots"],
    description:
      "Co-creating next-generation design technology. User research for design tech products, interface design for complex spatial data, and pilot program validation.",
    accent: "#DCE8E6",
  },
  {
    number: "04",
    title: "Design System Development",
    discipline: "Systems & Patterns",
    tags: ["Libraries", "Parametric", "Patterns"],
    description:
      "Creating reusable, intelligent design components. Pre-validated spatial configurations, evidence-based design pattern databases, and parametric design templates.",
    accent: "#C5D5EC",
  },
  {
    number: "05",
    title: "Education & Enablement",
    discipline: "Knowledge Transfer",
    tags: ["Workshops", "Training", "Frameworks"],
    description:
      "Enabling teams to apply behavioral design principles. Workshops, train-the-trainer programs, and self-service frameworks for internal teams.",
    accent: "#D5DEF4",
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] text-foreground">
            What I Build
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-lg">
            Five disciplines that turn behavioral insight into tangible products, tools, and systems.
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
            5 Core Disciplines
          </span>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const smooth = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
const smoothFast = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

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
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-foreground"
          >
            What I Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, duration: 0.8, delay: 0.1 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl"
          >
            Working at the intersection of people, buildings, and technology. The same method applies regardless of the medium.
          </motion.p>
        </div>

        {/* Service rows */}
        <div className="border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...smooth, delay: i * 0.06 }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              className="relative cursor-default overflow-hidden border-b border-border"
            >
              {/* Hover background */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: active === i ? 0.3 : 0 }}
                style={{ background: service.accent }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Main row */}
              <div className="relative flex items-center gap-4 md:gap-8 py-7 md:py-10">
                {/* Number + discipline */}
                <div className="w-20 md:w-32 shrink-0">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                    {service.number}
                  </span>
                  <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground/60 mt-1 hidden md:block">
                    {service.discipline}
                  </p>
                </div>

                {/* Title */}
                <motion.h3
                  animate={{ x: active === i ? 8 : 0 }}
                  transition={smoothFast}
                  className="flex-1 font-display text-xl md:text-3xl lg:text-4xl font-semibold text-foreground"
                >
                  {service.title}
                </motion.h3>

                {/* Tags */}
                <div className="hidden md:flex gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: active === i ? 4 : 0, y: active === i ? -4 : 0 }}
                  transition={smoothFast}
                >
                  <ArrowUpRight size={20} className="text-muted-foreground shrink-0" />
                </motion.div>
              </div>

              {/* Expanding description */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-base leading-relaxed text-muted-foreground pb-8 pl-20 md:pl-32 max-w-2xl">
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
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/50">
            People · Buildings · Technology
          </span>
        </div>
      </div>
    </section>
  );
}

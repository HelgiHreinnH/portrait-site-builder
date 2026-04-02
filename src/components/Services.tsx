import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const smooth = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

const services = [
  {
    number: "01",
    title: "People",
    discipline: "Strategy & User Experience",
    tags: ["User Research", "Workshops", "Change Management", "Stakeholder Management"],
    description:
      "Analysis of human behaviour, workshop facilitation, organisational understanding, change management, and user involvement as a methodological foundation.",
    accent: "#D5DEF4",
  },
  {
    number: "02",
    title: "Buildings",
    discipline: "Architecture & Workplace",
    tags: ["Space Planning", "Zone Strategy", "Workplace Design", "Design Briefs"],
    description:
      "Space planning, workplace strategy, zone design, user experience in physical environments, and architectural advisory from brief to delivery.",
    accent: "#B8C9EE",
  },
  {
    number: "03",
    title: "Technology",
    discipline: "Digital Product & UI/UX",
    tags: ["UI/UX", "Data Visualisation", "Product Development", "PropTech"],
    description:
      "UI/UX design, data visualisation, digital product development, and PropTech. From concept sketch to fully built product.",
    accent: "#DCE8E6",
  },
];

function ServiceCard({ service, index: i, active, setActive }: {
  service: typeof services[number]; index: number; active: number | null; setActive: (v: number | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...smooth, delay: i * 0.08 }}
      onHoverStart={() => setActive(i)}
      onHoverEnd={() => setActive(null)}
      className="relative group cursor-default flex flex-col"
    >
      {/* Number + rule */}
      <div className="flex items-end gap-2 mb-2">
        <motion.span
          className="font-display text-foreground leading-none"
          style={{ fontWeight: 700, fontSize: "clamp(28px, 3vw, 36px)" }}
          animate={{ opacity: active === i ? 0.3 : 0.1 }}
          transition={{ duration: 0.3 }}
        >
          {service.number}
        </motion.span>
        <div className="flex-1 h-px bg-border mb-1.5" />
      </div>

      {/* Card */}
      <div className="relative rounded-xl overflow-hidden border border-border bg-background flex-1">
        <div className="p-4 flex flex-col h-full min-h-[140px]">
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase mb-1">
            {service.discipline}
          </span>
          <motion.h3
            className="font-display text-foreground tracking-tight leading-tight mb-2 text-base md:text-lg font-bold"
            animate={{ y: active === i ? -2 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: active === i ? 1 : 0, height: active === i ? "auto" : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed text-xs mb-2">{service.description}</p>
          </motion.div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {service.tags.map((tag) => (
              <motion.span
                key={tag}
                animate={{ opacity: active === i ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[8px] tracking-wider uppercase rounded-full px-2 py-0.5 bg-foreground/[0.08] text-foreground"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-end mt-2">
            <motion.div
              animate={{ rotate: active === i ? 0 : 45, opacity: active === i ? 1 : 0.15 }}
              transition={{ duration: 0.3 }}
              className="text-foreground"
            >
              <ArrowUpRight size={14} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative h-full flex flex-col justify-center py-12 md:py-16 px-6 md:px-14 overflow-hidden"
    >
      {/* Section header */}
      <div className="mb-8 max-w-[1400px] mx-auto w-full shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display tracking-tight text-foreground mb-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95]">
            Three Fields. One Approach.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground text-base">
            I've worked across three disciplines for over 10 years. Not as a generalist without depth — but because the best solutions emerge where people, physical space, and digital systems meet.
          </p>
        </motion.div>
      </div>

      {/* Card Grid */}
      <div className="max-w-[1400px] mx-auto w-full space-y-4 flex-1 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} active={active} setActive={setActive} />
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 flex items-center gap-4 max-w-[1400px] mx-auto w-full shrink-0"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
          People · Buildings · Technology
        </span>
      </motion.div>
    </section>
  );
}

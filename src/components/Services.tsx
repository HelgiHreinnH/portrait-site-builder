import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smooth = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

const services = [
  {
    number: "01",
    title: "People",
    discipline: "Strategy & User Experience",
    tags: ["User Research", "Workshops", "Change Management", "Stakeholder Management"],
    description:
      "Analysis of human behaviour, workshop facilitation, organisational understanding, change management, and user involvement as a methodological foundation.",
  },
  {
    number: "02",
    title: "Buildings",
    discipline: "Architecture & Workplace",
    tags: ["Space Planning", "Zone Strategy", "Workplace Design", "Design Briefs"],
    description:
      "Space planning, workplace strategy, zone design, user experience in physical environments, and architectural advisory from brief to delivery.",
  },
  {
    number: "03",
    title: "Technology",
    discipline: "Digital Product & UI/UX",
    tags: ["UI/UX", "Data Visualisation", "Product Development", "PropTech"],
    description:
      "UI/UX design, data visualisation, digital product development, and PropTech. From concept sketch to fully built product.",
  },
];

const BLOCK_W = 260;
const BLOCK_H = 170;

const blockPositions = [
  { x: 0, y: 0 },
  { x: 100, y: 130 },
  { x: 280, y: 60 },
];

function WireframeBlock({
  service,
  position,
  index,
  active,
  onHover,
  onLeave,
}: {
  service: typeof services[0];
  position: { x: number; y: number };
  index: number;
  active: number | null;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isActive = active === index;
  const isDimmed = active !== null && !isActive;
  const dashArray = index === 0 ? "6 4" : index === 2 ? "3 3" : "none";

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: position.x, top: position.y, width: BLOCK_W, height: BLOCK_H }}
      animate={{
        y: isActive ? -6 : 0,
        opacity: isDimmed ? 0.2 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <svg width={BLOCK_W} height={BLOCK_H} viewBox={`0 0 ${BLOCK_W} ${BLOCK_H}`} fill="none">
        <rect
          x={0.5}
          y={0.5}
          width={BLOCK_W - 1}
          height={BLOCK_H - 1}
          stroke="hsl(var(--foreground))"
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={dashArray}
          fill={isActive ? "hsl(var(--foreground) / 0.03)" : "transparent"}
        />
        {/* Number */}
        <text
          x={10}
          y={18}
          className="font-mono"
          style={{ fontSize: 10, userSelect: "none" }}
          fill="hsl(var(--foreground))"
          opacity={0.3}
        >
          {service.number}
        </text>
        {/* Title */}
        <text
          x={BLOCK_W / 2}
          y={BLOCK_H / 2 + 5}
          textAnchor="middle"
          className="font-display"
          style={{ fontSize: 16, fontWeight: 600, userSelect: "none" }}
          fill="hsl(var(--foreground))"
          opacity={isActive ? 1 : 0.55}
        >
          {service.title}
        </text>
      </svg>
    </motion.div>
  );
}

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const activeService = active !== null ? services[active] : null;

  return (
    <section
      id="services"
      className="relative h-full flex flex-col justify-center py-12 md:py-16 px-6 md:px-10 overflow-hidden"
    >
      <div className="mb-6 max-w-7xl mx-auto w-full shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-[48px]"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2 px-[4px]">
            02 — Three Fields
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-3 px-[4px]">
            Three Fields. One Approach.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground text-base px-[4px]">
            I've worked across three disciplines for over 10 years. Not as a generalist without depth — but because the best solutions emerge where people, physical space, and digital systems meet.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 min-h-0 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...smooth, delay: 0.1 }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="relative" style={{ width: 560, height: 340 }}>
            {services.map((service, i) => (
              <WireframeBlock
                key={i}
                service={service}
                position={blockPositions[i]}
                index={i}
                active={active}
                onHover={() => setActive(i)}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>
        </motion.div>

        <div className="w-full md:w-1/2 min-h-[180px] flex items-center">
          <AnimatePresence mode="wait">
            {activeService ? (
              <motion.div
                key={activeService.number}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {activeService.discipline}
                </span>
                <h3 className="font-display text-foreground text-2xl md:text-3xl font-bold tracking-tight mt-1 mb-3">
                  {activeService.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base mb-4 max-w-md">
                  {activeService.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase rounded-full px-3 py-1 bg-foreground/[0.06] text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <p className="text-muted-foreground/50 text-base font-mono tracking-wide">
                  Hover a block to explore
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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

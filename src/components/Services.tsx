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

const blockPositions = [
  { x: 0, y: 0 },
  { x: 100, y: 75 },
  { x: 200, y: 25 },
];

const BLOCK_W = 130;
const BLOCK_H = 85;
const BLOCK_D = 55;

function IsometricBlock({
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
  const strokeColor = "hsl(var(--foreground))";
  const dashArray = index === 1 ? "none" : "4 3";

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: position.x,
        top: position.y,
        width: BLOCK_W + BLOCK_D * 0.58,
        height: BLOCK_H + BLOCK_D * 0.58,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: isActive ? -10 : 0,
        opacity: isDimmed ? 0.25 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <svg
        width={BLOCK_W + BLOCK_D * 0.58 + 2}
        height={BLOCK_H + BLOCK_D * 0.58 + 2}
        viewBox={`-1 -1 ${BLOCK_W + BLOCK_D * 0.58 + 2} ${BLOCK_H + BLOCK_D * 0.58 + 2}`}
        fill="none"
        className="overflow-visible"
      >
        {/* Top face */}
        <polygon
          points={`0,${BLOCK_D * 0.58} ${BLOCK_D * 0.58},0 ${BLOCK_W + BLOCK_D * 0.58},0 ${BLOCK_W},${BLOCK_D * 0.58}`}
          fill={isActive ? "hsl(var(--foreground) / 0.04)" : "transparent"}
          stroke={strokeColor}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={dashArray}
          strokeLinejoin="round"
        />
        {/* Front face */}
        <polygon
          points={`0,${BLOCK_D * 0.58} ${BLOCK_W},${BLOCK_D * 0.58} ${BLOCK_W},${BLOCK_D * 0.58 + BLOCK_H} 0,${BLOCK_D * 0.58 + BLOCK_H}`}
          fill={isActive ? "hsl(var(--foreground) / 0.03)" : "transparent"}
          stroke={strokeColor}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={dashArray}
          strokeLinejoin="round"
        />
        {/* Right face */}
        <polygon
          points={`${BLOCK_W},${BLOCK_D * 0.58} ${BLOCK_W + BLOCK_D * 0.58},0 ${BLOCK_W + BLOCK_D * 0.58},${BLOCK_H} ${BLOCK_W},${BLOCK_D * 0.58 + BLOCK_H}`}
          fill={isActive ? "hsl(var(--foreground) / 0.06)" : "hsl(var(--foreground) / 0.02)"}
          stroke={strokeColor}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={dashArray}
          strokeLinejoin="round"
        />
        {/* Label on front face */}
        <text
          x={BLOCK_W / 2}
          y={BLOCK_D * 0.58 + BLOCK_H / 2 + 4}
          textAnchor="middle"
          className="font-display"
          style={{ fontSize: 13, fontWeight: 600, userSelect: "none" }}
          fill="hsl(var(--foreground))"
          opacity={isActive ? 1 : 0.6}
        >
          {service.title}
        </text>
        {/* Number label — small, top-left of front face */}
        <text
          x={8}
          y={BLOCK_D * 0.58 + 16}
          className="font-mono"
          style={{ fontSize: 9, userSelect: "none" }}
          fill="hsl(var(--foreground))"
          opacity={0.35}
        >
          {service.number}
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
      className="relative h-full flex flex-col justify-center py-12 md:py-16 px-6 md:px-14 overflow-hidden"
    >
      {/* Section header */}
      <div className="mb-6 max-w-[1400px] mx-auto w-full shrink-0">
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

      {/* Isometric blocks + detail panel */}
      <div className="max-w-[1400px] mx-auto w-full flex-1 min-h-0 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...smooth, delay: 0.1 }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="relative" style={{ width: 380, height: 230 }}>
            {services.map((service, i) => (
              <IsometricBlock
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

        {/* Detail panel */}
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
                <p className="text-muted-foreground leading-relaxed text-sm mb-4 max-w-md">
                  {activeService.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-wider uppercase rounded-full px-3 py-1 bg-foreground/[0.06] text-foreground/70"
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
                <p className="text-muted-foreground/50 text-sm font-mono tracking-wide">
                  Hover a block to explore
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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

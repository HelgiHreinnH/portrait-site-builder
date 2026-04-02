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

const intersections = [
  { id: "01-02", label: "Workplace Strategy", x: 250, y: 295 },
  { id: "02-03", label: "Smart Environments", x: 350, y: 295 },
  { id: "01-03", label: "Digital Experience", x: 300, y: 210 },
  { id: "center", label: "Where the best\nsolutions emerge", x: 300, y: 258 },
];

// Circle positions — equilateral triangle arrangement
const circles = [
  { cx: 300, cy: 200, service: services[0] }, // People — top
  { cx: 240, cy: 310, service: services[1] }, // Buildings — bottom-left
  { cx: 360, cy: 310, service: services[2] }, // Technology — bottom-right
];

const RADIUS = 110;

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [hoveredIntersection, setHoveredIntersection] = useState<string | null>(null);

  const activeService = active !== null ? services[active] : null;
  const activeIntersection = hoveredIntersection
    ? intersections.find((i) => i.id === hoveredIntersection)
    : null;

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

      {/* Venn diagram + detail panel */}
      <div className="max-w-[1400px] mx-auto w-full flex-1 min-h-0 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* SVG Venn diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...smooth, delay: 0.1 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <svg
            viewBox="120 100 360 300"
            className="w-full max-w-[420px]"
            style={{ mixBlendMode: "multiply" }}
          >
            {/* Circles */}
            {circles.map((c, i) => (
              <motion.circle
                key={i}
                cx={c.cx}
                cy={c.cy}
                r={RADIUS}
                fill={c.service.accent}
                fillOpacity={active === null ? 0.55 : active === i ? 0.75 : 0.2}
                stroke={active === i ? c.service.accent : "transparent"}
                strokeWidth={active === i ? 2 : 0}
                style={{ cursor: "pointer", mixBlendMode: "multiply" }}
                animate={{
                  fillOpacity: active === null ? 0.55 : active === i ? 0.75 : 0.2,
                  r: active === i ? RADIUS + 4 : RADIUS,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => { setActive(i); setHoveredIntersection(null); }}
                onMouseLeave={() => setActive(null)}
              />
            ))}

            {/* Circle labels */}
            {circles.map((c, i) => {
              const labelOffset = i === 0 ? { dx: 0, dy: -RADIUS - 14 } : i === 1 ? { dx: -RADIUS - 8, dy: 20 } : { dx: RADIUS + 8, dy: 20 };
              return (
                <motion.text
                  key={`label-${i}`}
                  x={c.cx + labelOffset.dx}
                  y={c.cy + labelOffset.dy}
                  textAnchor={i === 0 ? "middle" : i === 1 ? "end" : "start"}
                  className="font-display"
                  style={{ fontSize: 13, fontWeight: 700, pointerEvents: "none", userSelect: "none" }}
                  fill="hsl(var(--foreground))"
                  animate={{ opacity: active === null ? 0.8 : active === i ? 1 : 0.25 }}
                  transition={{ duration: 0.3 }}
                >
                  {c.service.title}
                </motion.text>
              );
            })}

            {/* Intersection labels */}
            {intersections.map((inter) => (
              <motion.text
                key={inter.id}
                x={inter.x}
                y={inter.y}
                textAnchor="middle"
                style={{
                  fontSize: inter.id === "center" ? 9 : 8,
                  fontWeight: inter.id === "center" ? 600 : 400,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                fill="hsl(var(--foreground))"
                animate={{
                  opacity: active === null ? (inter.id === "center" ? 0.5 : 0.3) : 0.1,
                }}
                transition={{ duration: 0.3 }}
              >
                {inter.id === "center" ? (
                  <>
                    <tspan x={inter.x} dy="0">Where the best</tspan>
                    <tspan x={inter.x} dy="12">solutions emerge</tspan>
                  </>
                ) : (
                  inter.label
                )}
              </motion.text>
            ))}
          </svg>
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
                  Hover a field to explore
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

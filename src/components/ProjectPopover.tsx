import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectData } from "@/data/projects";

const PHASES = ["Analyse", "Strategise", "Design", "Deliver"] as const;

interface ProjectPopoverProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectPopover({ project, onClose }: ProjectPopoverProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Full-screen overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-3 md:inset-6 z-50 bg-background border border-border overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/90 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors border border-border"
            >
              <X size={18} />
            </button>

            {/* === HEADER STRIP === */}
            <div className="border-b border-border px-6 md:px-10 py-5 flex items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {project.number} — {project.client}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/60">{project.year}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-[-0.02em] leading-tight">
                  {project.title}
                </h2>
              </div>
              <div className="hidden md:flex flex-wrap gap-2 pb-1">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase bg-muted text-muted-foreground px-2.5 py-1">
                  {project.categoryLabel}
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase text-muted-foreground border border-border px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* === HERO IMAGE + BRIEF === */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-border">
              {/* Hero image — 3 cols */}
              <div className="md:col-span-3 relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Brief text — 2 cols */}
              <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border">
                <div>
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-muted-foreground mb-6">
                    {project.subtitle}
                  </p>
                  <div className="mb-6">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                      The Challenge
                    </p>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      {project.brief.challenge}
                    </p>
                  </div>
                </div>

                {/* Process Arc */}
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    Method Phases
                  </p>
                  <div className="flex gap-1">
                    {PHASES.map((phase) => {
                      const isLed = project.phasesLed.includes(phase);
                      return (
                        <div
                          key={phase}
                          className={`flex-1 text-center py-2.5 font-mono text-[9px] tracking-[0.1em] uppercase transition-colors ${
                            isLed
                              ? "bg-user-blue text-primary-foreground"
                              : "bg-muted text-muted-foreground/40"
                          }`}
                        >
                          {phase}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* === APPROACH + METHODS BENTO === */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
              {/* Approach statement — spans 1 col, tall */}
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Approach
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                  {project.approach.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {project.approach.description}
                </p>
              </div>

              {/* Methods grid — 2 cols */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2">
                {project.approach.methods.map((method, i) => (
                  <div
                    key={i}
                    className={`p-6 md:p-8 ${
                      i < project.approach.methods.length - 1
                        ? "border-b md:border-b-0 border-border"
                        : ""
                    } ${i % 2 === 0 && i < project.approach.methods.length - 1 ? "md:border-r border-border" : ""}`}
                  >
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-user-blue mb-3">
                      0{i + 1}
                    </div>
                    <h4 className="font-display text-base font-semibold text-foreground mb-2">{method.name}</h4>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{method.description}</p>
                  </div>
                ))}

                {/* Fill last cell with a quote or context if odd number of methods */}
                {project.approach.methods.length % 2 !== 0 && (
                  <div className="p-6 md:p-8 bg-muted/30 flex items-center border-t md:border-t-0 md:border-l border-border">
                    <p className="text-[13px] leading-relaxed text-muted-foreground italic">
                      {project.brief.context}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* === IMPACT METRICS + GALLERY === */}
            <div className="grid grid-cols-1 md:grid-cols-5 border-b border-border">
              {/* Impact numbers — 2 cols */}
              <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-border">
                <div className="p-6 md:p-8">
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
                    Impact
                  </p>
                  <div className="space-y-6">
                    {project.impact.map((item, i) => (
                      <div key={i}>
                        <div className="font-display text-3xl font-bold text-foreground mb-1">{item.value}</div>
                        <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">{item.metric}</div>
                        <p className="text-[12px] text-muted-foreground/70">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery mosaic — 3 cols */}
              <div className="md:col-span-3 grid grid-cols-2 grid-rows-2">
                {project.gallery.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden ${
                      i === 0 ? "row-span-2" : ""
                    } ${i > 0 ? "border-l border-border" : ""} ${i === 2 ? "border-t border-border" : ""}`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} — ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* === INSIGHTS STRIP === */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
              {project.insights.slice(0, 3).map((insight, i) => (
                <div
                  key={i}
                  className={`p-6 md:p-8 ${
                    i < 2 ? "border-b md:border-b-0 md:border-r border-border" : ""
                  }`}
                >
                  {insight.stat && (
                    <div className="font-display text-2xl font-bold text-user-blue mb-2">{insight.stat}</div>
                  )}
                  <h4 className="font-display text-base font-semibold text-foreground mb-2">{insight.title}</h4>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>

            {/* === SOLUTION + QUOTE === */}
            <div className="grid grid-cols-1 md:grid-cols-5 border-b border-border">
              {/* Solution — 3 cols */}
              <div className="md:col-span-3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Solution
                </p>
                <p className="text-[14px] leading-relaxed text-muted-foreground mb-6">
                  {project.solution.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.solution.interventions.map((intervention, i) => (
                    <div key={i} className="border border-border p-4">
                      <h4 className="font-display text-sm font-semibold text-foreground mb-2">{intervention.title}</h4>
                      <p className="text-[12px] leading-relaxed text-muted-foreground">{intervention.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote or context — 2 cols */}
              <div className="md:col-span-2 p-6 md:p-8 bg-muted/20 flex flex-col justify-center">
                {project.quote ? (
                  <>
                    <p className="font-display text-lg md:text-xl italic text-foreground/80 mb-4 leading-relaxed">
                      "{project.quote.text}"
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                      {project.quote.author}
                    </p>
                    <p className="font-mono text-[8px] tracking-[0.15em] uppercase text-muted-foreground/60">
                      {project.quote.role}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                      Context
                    </p>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {project.brief.context}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* === FOOTER CTA === */}
            <div className="p-6 md:p-8 flex items-center justify-between">
              <Link
                to={`/projects/${project.id}`}
                onClick={onClose}
                className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-foreground hover:text-user-blue transition-colors group"
              >
                <span>View Full Case Study</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                onClick={onClose}
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
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
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Popover card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[640px] md:max-h-[80vh] z-50 bg-background border border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-1.5 bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            {/* Hero image */}
            <div className="relative h-48 md:h-56 overflow-hidden">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60">
                    {project.number} — {project.client}
                  </span>
                  <span className="font-mono text-[9px] text-primary-foreground/40">{project.year}</span>
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-primary-foreground leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 space-y-6">
              {/* Category + Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase bg-muted text-muted-foreground px-2 py-1">
                  {project.categoryLabel}
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase text-muted-foreground border border-border px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtitle / Brief */}
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {project.subtitle}
              </p>

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
                        className={`flex-1 text-center py-2 font-mono text-[9px] tracking-[0.1em] uppercase transition-colors ${
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

              {/* Scale Card */}
              <div className="grid grid-cols-3 gap-3">
                {project.impact.map((item, i) => (
                  <div key={i} className="text-center border border-border p-3">
                    <div className="font-display text-xl font-bold text-foreground">{item.value}</div>
                    <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-muted-foreground mt-1">{item.metric}</div>
                  </div>
                ))}
              </div>

              {/* Challenge */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  The Challenge
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {project.brief.challenge}
                </p>
              </div>

              {/* CTA */}
              <Link
                to={`/projects/${project.id}`}
                onClick={onClose}
                className="flex items-center justify-between w-full py-3 px-4 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors group"
              >
                <span>View Full Project</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

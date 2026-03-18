import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectOrder, type ProjectData } from "@/data/projects";
import { ProjectPopover } from "./ProjectPopover";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

/* Each card gets a size class for the bento feel */
type CardSize = "tall" | "wide" | "large" | "standard";

const sizePattern: CardSize[] = [
  "large", "standard", "tall", "wide",
  "standard", "tall", "large", "standard",
  "wide", "standard", "tall",
];

const sizeClasses: Record<CardSize, string> = {
  tall: "w-[280px] md:w-[320px] h-full",        // full height, narrow
  wide: "w-[420px] md:w-[480px] h-[48%]",        // half height, wide
  large: "w-[380px] md:w-[440px] h-full",        // full height, wide
  standard: "w-[260px] md:w-[300px] h-[48%]",    // half height, narrow
};

interface BentoCardProps {
  project: ProjectData;
  size: CardSize;
  delay?: number;
  onClick: () => void;
}

function BentoCard({ project, size, delay = 0, onClick }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ ...smooth, delay }}
      className={`flex-shrink-0 ${sizeClasses[size]}`}
    >
      <button
        onClick={onClick}
        className="group relative block overflow-hidden rounded-xl w-full h-full text-left"
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-xl transition-opacity duration-500 group-hover:from-foreground/80" />

        {/* Top meta */}
        <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">
            {project.number}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {project.outcome}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-3 left-4 right-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-3px]">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">
            {project.client}
          </p>
          <h3 className="font-display text-base md:text-lg font-semibold text-primary-foreground mb-1.5 leading-tight">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/50 border border-primary-foreground/20 px-1.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
          initial={false}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ArrowUpRight size={18} className="text-primary-foreground" />
        </motion.div>
      </button>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const allProjects = projectOrder.map((id) => projects[id]).filter(Boolean);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  /* Arrange cards into two rows for the bento mosaic */
  const topRow: { project: ProjectData; size: CardSize; index: number }[] = [];
  const bottomRow: { project: ProjectData; size: CardSize; index: number }[] = [];

  allProjects.forEach((project, i) => {
    const size = sizePattern[i % sizePattern.length];
    const entry = { project, size, index: i };
    // tall and large cards span full height → top row only
    // wide and standard cards are half height → alternate between rows
    if (size === "tall" || size === "large") {
      topRow.push(entry);
    } else if (i % 2 === 0) {
      topRow.push(entry);
    } else {
      bottomRow.push(entry);
    }
  });

  return (
    <>
      <section id="projects" className="h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col h-full py-8 md:py-12">
          {/* Header */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={smooth}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-foreground"
              >
                Examples
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smooth, delay: 0.1 }}
                className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground max-w-lg"
              >
                {allProjects.length} projects across workplace strategy, digital product, and making.
              </motion.p>
            </div>

            {/* Scroll arrows — desktop */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal scroll bento */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-3 h-full min-w-max pr-10">
              {allProjects.map((project, i) => {
                const size = sizePattern[i % sizePattern.length];
                const isFull = size === "tall" || size === "large";

                if (isFull) {
                  return (
                    <BentoCard
                      key={project.id}
                      project={project}
                      size={size}
                      delay={i * 0.04}
                      onClick={() => setSelectedProject(project)}
                    />
                  );
                }

                /* For half-height cards, pair them in a column */
                /* Find next half-height card */
                const nextIdx = allProjects.findIndex(
                  (_, j) => j > i && (sizePattern[j % sizePattern.length] === "wide" || sizePattern[j % sizePattern.length] === "standard")
                );

                // Only render column from the first of the pair
                const isFirstOfPair = (() => {
                  let halfCount = 0;
                  for (let j = 0; j <= i; j++) {
                    const s = sizePattern[j % sizePattern.length];
                    if (s === "wide" || s === "standard") halfCount++;
                  }
                  return halfCount % 2 === 1;
                })();

                if (!isFirstOfPair) return null;

                const pairProject = nextIdx >= 0 ? allProjects[nextIdx] : null;
                const pairSize = pairProject ? sizePattern[nextIdx % sizePattern.length] : null;
                const colWidth = size === "wide" || pairSize === "wide" ? "w-[420px] md:w-[480px]" : "w-[260px] md:w-[300px]";

                return (
                  <div key={project.id} className={`flex-shrink-0 flex flex-col gap-3 h-full ${colWidth}`}>
                    <div className="flex-1">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="group relative block overflow-hidden rounded-xl w-full h-full text-left"
                      >
                        <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-xl transition-opacity duration-500 group-hover:from-foreground/80" />
                        <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">{project.number}</span>
                          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-2 py-0.5 rounded-full">{project.outcome}</span>
                        </div>
                        <div className="absolute bottom-3 left-4 right-4 transition-transform duration-500 group-hover:translate-y-[-3px]">
                          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">{project.client}</p>
                          <h3 className="font-display text-base font-semibold text-primary-foreground leading-tight">{project.title}</h3>
                        </div>
                        <motion.div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" initial={false} transition={{ duration: 0.4 }}>
                          <ArrowUpRight size={18} className="text-primary-foreground" />
                        </motion.div>
                      </button>
                    </div>
                    {pairProject && (
                      <div className="flex-1">
                        <button
                          onClick={() => setSelectedProject(pairProject)}
                          className="group relative block overflow-hidden rounded-xl w-full h-full text-left"
                        >
                          <img src={pairProject.heroImage} alt={pairProject.title} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-xl transition-opacity duration-500 group-hover:from-foreground/80" />
                          <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">{pairProject.number}</span>
                            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-2 py-0.5 rounded-full">{pairProject.outcome}</span>
                          </div>
                          <div className="absolute bottom-3 left-4 right-4 transition-transform duration-500 group-hover:translate-y-[-3px]">
                            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">{pairProject.client}</p>
                            <h3 className="font-display text-base font-semibold text-primary-foreground leading-tight">{pairProject.title}</h3>
                          </div>
                          <motion.div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" initial={false} transition={{ duration: 0.4 }}>
                            <ArrowUpRight size={18} className="text-primary-foreground" />
                          </motion.div>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <ProjectPopover
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

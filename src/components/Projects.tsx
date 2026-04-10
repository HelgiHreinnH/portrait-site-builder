import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectOrder, type ProjectData } from "@/data/projects";
import { ProjectPopover } from "./ProjectPopover";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

function ProjectCard({ project, onClick, index }: { project: ProjectData; onClick: () => void; index: number }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...smooth, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl w-full h-full text-left border border-border/40"
    >
      <div className="relative w-full flex-[1.2] min-h-0 overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ filter: "grayscale(10%) contrast(1.02)" }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "hsla(var(--foreground) / 0.05)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)" }} />
        <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/70">
            {project.number}
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            {project.outcome}
          </span>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={16} className="text-primary-foreground" />
        </div>
      </div>

      <div className="flex-[0.8] bg-background px-5 py-3 flex flex-col justify-start gap-1">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
          {project.client}
        </p>
        <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold text-foreground leading-tight">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {project.subtitle}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground border border-border rounded-full px-2 py-0.5 bg-muted/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allProjects = projectOrder.map((id) => projects[id]).filter(Boolean);
  const pageSize = 6;
  const totalPages = Math.ceil(allProjects.length / pageSize);
  const page1 = allProjects.slice(0, pageSize);
  const page2 = allProjects.slice(pageSize, pageSize * 2);
  const pages = [page1, page2].filter((p) => p.length > 0);

  const scrollToPage = useCallback((p: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = p * el.clientWidth;
    el.scrollTo({ left: target, behavior: "smooth" });
    setPage(p);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const currentPage = Math.round(el.scrollLeft / el.clientWidth);
    setPage(currentPage);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <section id="projects" className="h-full flex flex-col overflow-hidden">
        <div className="section-inner">
          {/* Header */}
          <div className="flex items-end justify-between mb-4 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smooth}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-1">
                Examples
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground max-w-lg">
                {allProjects.length} projects across workplace strategy, digital product, and making.
              </p>
            </motion.div>

            <div className="hidden md:flex items-center gap-3">
              {/* Page dots */}
              <div className="flex gap-1.5 mr-2">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      page === i ? "bg-foreground scale-110" : "bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => scrollToPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollToPage(Math.min(totalPages - 1, page + 1))}
                disabled={page === totalPages - 1}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal snap scroll with 2 pages */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide h-full snap-x snap-mandatory"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex h-full" style={{ width: `${pages.length * 100}%` }}>
                {pages.map((pageProjects, pi) => (
                  <div
                    key={pi}
                    className="snap-start w-full h-full shrink-0 grid grid-cols-2 md:grid-cols-3 gap-4 pr-4"
                    style={{ width: `${100 / pages.length}%` }}
                  >
                    {pageProjects.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                        index={i}
                      />
                    ))}
                  </div>
                ))}
              </div>
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

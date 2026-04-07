import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectOrder, type ProjectData } from "@/data/projects";
import { ProjectPopover } from "./ProjectPopover";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const featuredIds = ["felles", "archi-ar", "a-place-to-work"];

type TileType =
  | { kind: "project"; project: ProjectData; w: number; h: number }
  | { kind: "quote"; text: string; author?: string; h: number }
  | { kind: "stat"; value: string; label: string; sublabel?: string; h: number };

type FillerBase =
  | { kind: "quote"; text: string; author?: string }
  | { kind: "stat"; value: string; label: string; sublabel?: string };

const fillerContent: FillerBase[] = [
  { kind: "quote", text: "Good work starts with understanding the problem — not the solution." },
  { kind: "stat", value: "12", label: "Projects", sublabel: "People · Buildings · Tech" },
  { kind: "quote", text: "Strategy without making is just commentary. Making without strategy is just decoration.", author: "— Method" },
  { kind: "stat", value: "4", label: "Phases", sublabel: "Analyse · Strategise · Design · Deliver" },
  { kind: "quote", text: "The building should be the best workplace in the world for the people who use it." },
  { kind: "stat", value: "10k+", label: "People impacted", sublabel: "Across three continents" },
];

type Column = { widthPx: number; tiles: TileType[]; offsetY?: number };

function buildBentoLayout(restProjects: ProjectData[]): Column[] {
  let fi = 0;
  const filler = (h: number): TileType => {
    const f = fillerContent[fi++ % fillerContent.length];
    return { ...f, h } as TileType;
  };

  const columns: Column[] = [];
  const chunks: ProjectData[][] = [];
  for (let i = 0; i < restProjects.length; i += 2) {
    chunks.push(restProjects.slice(i, i + 2));
  }

  const widths = [400, 320, 360, 280, 340];
  const offsets = [0, 24, 8, 36, 16];

  chunks.forEach((chunk, ci) => {
    const w = widths[ci % widths.length];
    const offset = offsets[ci % offsets.length];
    const tiles: TileType[] = [];

    if (ci % 3 === 0) tiles.push(filler(0.18));

    chunk.forEach((p, pi) => {
      tiles.push({
        kind: "project",
        project: p,
        w,
        h: pi === 0 ? 0.5 : 0.34,
      });
    });

    if (ci % 2 === 1) tiles.push(filler(0.22));

    columns.push({ widthPx: w, offsetY: offset, tiles });
  });

  return columns;
}

function FeaturedCard({ project, onClick }: { project: ProjectData; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl w-full h-full text-left border border-border/40"
    >
      <div className="relative w-full flex-[1.2] min-h-0 overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ filter: 'grayscale(10%) contrast(1.02)' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsla(var(--foreground) / 0.05)' }} />
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
    </button>
  );
}

function ProjectTile({ tile, onClick }: { tile: TileType & { kind: "project" }; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative block overflow-hidden rounded-xl w-full h-full text-left"
    >
      <img
        src={tile.project.heroImage}
        alt={tile.project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{ filter: 'grayscale(10%) contrast(1.02)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-xl transition-opacity duration-500 group-hover:from-foreground/80" />

      <div className="absolute top-2.5 left-3 right-3 flex justify-between items-start">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/70">
          {tile.project.number}
        </span>
        <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
          {tile.project.outcome}
        </span>
      </div>

      <div className="absolute bottom-2.5 left-3 right-3 transition-transform duration-500 group-hover:translate-y-[-2px]">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-0.5">
          {tile.project.client}
        </p>
        <h3 className="font-display text-sm md:text-base font-semibold text-primary-foreground leading-tight">
          {tile.project.title}
        </h3>
      </div>

      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight size={14} className="text-primary-foreground" />
      </div>
    </button>
  );
}

function QuoteTile({ tile }: { tile: TileType & { kind: "quote" } }) {
  return (
    <div className="flex flex-col justify-center items-start rounded-xl bg-muted/60 border border-border px-5 py-4 h-full">
      <p className="font-display text-sm md:text-[15px] leading-relaxed text-foreground/80 italic">
        "{tile.text}"
      </p>
      {tile.author && (
        <span className="mt-2 font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
          {tile.author}
        </span>
      )}
    </div>
  );
}

function StatTile({ tile }: { tile: TileType & { kind: "stat" } }) {
  return (
    <div className="flex flex-col justify-center items-center text-center rounded-xl bg-foreground px-5 py-4 h-full">
      <span className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
        {tile.value}
      </span>
      <span className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">
        {tile.label}
      </span>
      {tile.sublabel && (
        <span className="mt-0.5 font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/40">
          {tile.sublabel}
        </span>
      )}
    </div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showIndicator, setShowIndicator] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allProjects = projectOrder.map((id) => projects[id]).filter(Boolean);
  const featured = allProjects.filter((p) => featuredIds.includes(p.id));
  const rest = allProjects.filter((p) => !featuredIds.includes(p.id));
  const bentoColumns = buildBentoLayout(rest);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollLeft > 200) {
      setShowIndicator(false);
    } else {
      setShowIndicator(true);
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="projects" className="h-full flex flex-col overflow-hidden">
        <div className="section-inner">
          {/* Row 1: Header */}
          <div className="flex items-end justify-between mb-3 shrink-0">
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
              <div className="w-24 h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-foreground/50 rounded-full"
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Row 2: Horizontal scroll */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide h-full"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex gap-4 h-full min-w-max pr-10 items-start">
                {featured.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ ...smooth, delay: i * 0.08 }}
                    className="flex-shrink-0 h-full"
                    style={{ width: "calc((min(100vw - 112px, 1280px) - 32px) / 3)" }}
                  >
                    <FeaturedCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}

                <div className="flex-shrink-0 w-8" />

                {bentoColumns.map((col, ci) => (
                  <motion.div
                    key={`bento-${ci}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ ...smooth, delay: (featured.length + ci) * 0.06 }}
                    className="flex-shrink-0 flex flex-col gap-3"
                    style={{
                      width: col.widthPx,
                      height: `calc(100% - ${col.offsetY || 0}px)`,
                      marginTop: col.offsetY || 0,
                    }}
                  >
                    {col.tiles.map((tile, ti) => (
                      <div
                        key={ti}
                        className="min-h-0 overflow-hidden rounded-xl"
                        style={{ flex: `${tile.h} 0 0%` }}
                      >
                        {tile.kind === "project" && (
                          <ProjectTile
                            tile={tile}
                            onClick={() => setSelectedProject(tile.project)}
                          />
                        )}
                        {tile.kind === "quote" && <QuoteTile tile={tile as TileType & { kind: "quote" }} />}
                        {tile.kind === "stat" && <StatTile tile={tile as TileType & { kind: "stat" }} />}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="absolute top-0 right-0 bottom-0 w-[120px] pointer-events-none flex items-center justify-end pr-4 transition-opacity duration-500"
              style={{
                background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
                opacity: showIndicator ? 1 : 0,
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap">
                More projects →
              </span>
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

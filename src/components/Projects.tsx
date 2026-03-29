import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectOrder, type ProjectData } from "@/data/projects";
import { ProjectPopover } from "./ProjectPopover";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

/* ── Tile types ── */
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

function buildLayout(allProjects: ProjectData[]): Column[] {
  const byTier: Record<number, ProjectData[]> = { 1: [], 2: [], 3: [] };
  allProjects.forEach((p) => byTier[p.tier]?.push(p));

  let fi = 0;
  const filler = (h: number): TileType => {
    const f = fillerContent[fi++ % fillerContent.length];
    return { ...f, h } as TileType;
  };

  const t1 = byTier[1];
  const t2 = byTier[2];
  const t3 = byTier[3];

  const columns: Column[] = [];

  // — Before the fold: 4 Tier-1 projects prominent —

  columns.push({ widthPx: 360, offsetY: 0, tiles: [
    { kind: "project", project: t1[0], w: 360, h: 0.6 },
    filler(0.32),
  ]});

  columns.push({ widthPx: 280, offsetY: 32, tiles: [
    filler(0.2),
    { kind: "project", project: t1[1], w: 280, h: 0.52 },
    { kind: "project", project: t2[0], w: 280, h: 0.22 },
  ]});

  columns.push({ widthPx: 400, offsetY: 8, tiles: [
    { kind: "project", project: t1[2], w: 400, h: 0.58 },
    { kind: "project", project: t2[1], w: 400, h: 0.34 },
  ]});

  columns.push({ widthPx: 300, offsetY: 44, tiles: [
    { kind: "project", project: t1[3], w: 300, h: 0.5 },
    filler(0.2),
    { kind: "project", project: t2[2], w: 300, h: 0.22 },
  ]});

  // — Behind the fold: Tier 2 + 3 projects —

  columns.push({ widthPx: 340, offsetY: 16, tiles: [
    filler(0.18),
    { kind: "project", project: t2[3] || t2[0], w: 340, h: 0.44 },
    { kind: "project", project: t3[0], w: 340, h: 0.3 },
  ]});

  columns.push({ widthPx: 240, offsetY: 28, tiles: [
    { kind: "project", project: t3[1], w: 240, h: 0.34 },
    filler(0.26),
    { kind: "project", project: t3[2], w: 240, h: 0.32 },
  ]});

  columns.push({ widthPx: 320, offsetY: 4, tiles: [
    { kind: "project", project: t3[3] || t3[0], w: 320, h: 0.42 },
    filler(0.22),
    { kind: "project", project: t2[2] || t2[0], w: 320, h: 0.28 },
  ]});

  return columns;
}

/* ── Sub-components ── */

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
        <span className="mt-0.5 font-mono text-[8px] tracking-[0.1em] uppercase text-primary-foreground/40">
          {tile.sublabel}
        </span>
      )}
    </div>
  );
}

/* ── Main section ── */

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const allProjects = projectOrder.map((id) => projects[id]).filter(Boolean);
  const columns = buildLayout(allProjects);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="projects" className="h-full flex flex-col justify-center px-6 md:px-10 overflow-hidden py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="flex items-end justify-between mb-4 shrink-0">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={smooth}
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground"
              >
                Examples
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smooth, delay: 0.1 }}
                className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-lg"
              >
                {allProjects.length} projects across workplace strategy, digital product, and making.
              </motion.p>
            </div>

            <div className="hidden md:flex gap-2">
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

          {/* Horizontal scroll — organic bento */}
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide flex-1 min-h-0"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-4 h-full min-w-max pr-10 items-start">
              {columns.map((col, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ ...smooth, delay: ci * 0.06 }}
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
        </div>
      </section>

      <ProjectPopover
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectOrder, type ProjectData } from "@/data/projects";
import { ProjectPopover } from "./ProjectPopover";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

/* ── Bento tile types ── */
type TileType =
  | { kind: "project"; project: ProjectData; span: "1x1" | "2x1" | "1x2" }
  | { kind: "quote"; text: string; author?: string }
  | { kind: "stat"; value: string; label: string; sublabel?: string };

type ColWidth = "narrow" | "medium" | "wide";
type ColumnDef = { tiles: TileType[]; width: ColWidth };

/* Quote / stat filler content */
const fillerTiles: Exclude<TileType, { kind: "project" }>[] = [
  { kind: "quote", text: "Good work starts with understanding the problem — not the solution." },
  { kind: "stat", value: "12", label: "Projects", sublabel: "People · Buildings · Tech" },
  { kind: "quote", text: "Strategy without making is just commentary. Making without strategy is just decoration.", author: "— Method" },
  { kind: "stat", value: "4", label: "Phases", sublabel: "Analyse · Strategise · Design · Deliver" },
  { kind: "quote", text: "The building should be the best workplace in the world.", author: "— Jørgen Vig Knudstorp" },
  { kind: "stat", value: "10k+", label: "People impacted", sublabel: "Across three continents" },
];

/*
 * Layout: 3 rows, horizontal scroll.
 * Each column is one of: single-span (1 col × 1 row), double-wide (2 cols × 1 row), or tall (1 col × 2 rows).
 * No tile ever fills all 3 rows.
 *
 * We define the layout as an explicit sequence of "columns".
 * Each column entry says what goes in rows 0, 1, 2 of that column.
 */

function buildTiles(allProjects: ProjectData[]): ColumnDef[] {
  let pi = 0;
  let fi = 0;

  const next = (): ProjectData => allProjects[pi++ % allProjects.length];
  const nextFiller = () => fillerTiles[fi++ % fillerTiles.length];

  const columns: ColumnDef[] = [];

  // Col 1: narrow, 3 stacked
  columns.push({ width: "narrow", tiles: [
    { kind: "project", project: next(), span: "1x1" },
    { kind: "project", project: next(), span: "1x1" },
    { kind: "project", project: next(), span: "1x1" },
  ]});

  // Col 2: wide, tall project + filler
  columns.push({ width: "wide", tiles: [
    { kind: "project", project: next(), span: "1x2" },
    nextFiller(),
  ]});

  // Col 3: medium, quote + 2 projects
  columns.push({ width: "medium", tiles: [
    nextFiller(),
    { kind: "project", project: next(), span: "1x1" },
    { kind: "project", project: next(), span: "1x1" },
  ]});

  // Col 4: wide, 3 stacked
  columns.push({ width: "wide", tiles: [
    { kind: "project", project: next(), span: "1x1" },
    nextFiller(),
    { kind: "project", project: next(), span: "1x1" },
  ]});

  // Col 5: narrow, filler + tall
  columns.push({ width: "narrow", tiles: [
    nextFiller(),
    { kind: "project", project: next(), span: "1x2" },
  ]});

  // Col 6: medium, 3 stacked
  columns.push({ width: "medium", tiles: [
    { kind: "project", project: next(), span: "1x1" },
    { kind: "project", project: next(), span: "1x1" },
    nextFiller(),
  ]});

  // Col 7: wide, remaining
  if (pi < allProjects.length) {
    columns.push({ width: "wide", tiles: [
      { kind: "project", project: next(), span: "1x1" },
      nextFiller(),
      pi < allProjects.length ? { kind: "project", project: next(), span: "1x1" } : nextFiller(),
    ]});
  }

  return columns;
}

/* ── Sub-components ── */

function ProjectTile({ tile, onClick }: { tile: TileType & { kind: "project" }; onClick: () => void }) {
  const isTall = tile.span === "1x2";
  return (
    <button
      onClick={onClick}
      className={`group relative block overflow-hidden rounded-xl w-full h-full text-left ${isTall ? "row-span-2" : ""}`}
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
  const columns = buildTiles(allProjects);

  const widthClasses: Record<ColWidth, string> = {
    narrow: "w-[200px] md:w-[240px]",
    medium: "w-[260px] md:w-[300px]",
    wide: "w-[320px] md:w-[380px]",
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="projects" className="h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col h-full py-8 md:py-12">
          {/* Header */}
          <div className="flex items-end justify-between mb-5">
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

          {/* Horizontal scroll — 3-row grid */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-3 h-full min-w-max pr-10">
              {columns.map((colDef, ci) => {
                return (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ ...smooth, delay: ci * 0.05 }}
                    className={`flex-shrink-0 flex flex-col gap-3 h-full ${widthClasses[colDef.width]}`}
                  >
                    {colDef.tiles.map((tile, ti) => {
                      const isTallProject = tile.kind === "project" && tile.span === "1x2";
                      return (
                        <div
                          key={ti}
                          className={`min-h-0 overflow-hidden ${isTallProject ? "flex-[2]" : "flex-1"}`}
                        >
                          {tile.kind === "project" && (
                            <ProjectTile
                              tile={tile}
                              onClick={() => setSelectedProject(tile.project)}
                            />
                          )}
                          {tile.kind === "quote" && <QuoteTile tile={tile} />}
                          {tile.kind === "stat" && <StatTile tile={tile} />}
                        </div>
                      );
                    })}
                  </motion.div>
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

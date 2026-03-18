import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, projectOrder, type ProjectData } from "@/data/projects";
import { ProjectPopover } from "./ProjectPopover";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

interface BentoCardProps {
  project: ProjectData;
  delay?: number;
  className?: string;
  onClick: () => void;
}

function BentoCard({ project, delay = 0, className = "", onClick }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ ...smooth, delay }}
    >
      <button
        onClick={onClick}
        className={`group relative block overflow-hidden rounded-xl w-full text-left ${className}`}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-xl transition-opacity duration-500 group-hover:from-foreground/80" />

        {/* Top meta */}
        <div className="absolute top-2 left-3 right-3 flex justify-between items-start">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/70">
            {project.number}
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            {project.outcome}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-2 left-3 right-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-0.5">
            {project.client}
          </p>
          <h3 className="font-display text-sm md:text-base font-semibold text-primary-foreground mb-1 leading-tight">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[8px] tracking-[0.1em] uppercase text-primary-foreground/50 border border-primary-foreground/20 px-1.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
          initial={false}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ArrowUpRight size={16} className="text-primary-foreground" />
        </motion.div>
      </button>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const allProjects = projectOrder.map((id) => projects[id]).filter(Boolean);

  // Desktop: show first 8 in a 4-col bento, remaining 3 as smaller row
  const mainProjects = allProjects.slice(0, 8);
  const extraProjects = allProjects.slice(8);

  // Mobile: show first 6
  const mobileProjects = allProjects.slice(0, 6);

  return (
    <>
      <section id="projects" className="h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-4">
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
              {allProjects.length} projects across workplace strategy, digital product, and making — each mapped to the same method.
            </motion.p>
          </div>

          {/* Desktop bento grid */}
          <div className="hidden md:flex flex-col gap-2" style={{ height: "calc(100vh - 200px)" }}>
            {/* Main 4x2 grid */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 flex-1">
              {mainProjects.map((project, i) => (
                <BentoCard
                  key={project.id}
                  project={project}
                  delay={i * 0.04}
                  onClick={() => setSelectedProject(project)}
                  className="h-full"
                />
              ))}
            </div>
            {/* Bottom row — 3 remaining */}
            {extraProjects.length > 0 && (
              <div className="grid grid-cols-3 gap-2" style={{ height: "25%" }}>
                {extraProjects.map((project, i) => (
                  <BentoCard
                    key={project.id}
                    project={project}
                    delay={(mainProjects.length + i) * 0.04}
                    onClick={() => setSelectedProject(project)}
                    className="h-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile grid */}
          <div className="md:hidden grid grid-cols-2 gap-2" style={{ height: "calc(100vh - 160px)" }}>
            {mobileProjects.map((project, i) => (
              <BentoCard
                key={project.id}
                project={project}
                delay={i * 0.06}
                onClick={() => setSelectedProject(project)}
                className="h-full"
              />
            ))}
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

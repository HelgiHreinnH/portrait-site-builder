import { motion, AnimatePresence, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import type { ProjectData } from "@/data/projects";
import { getGallerySrc, getGalleryCaption } from "@/data/projects";

const PHASES = ["Analyse", "Strategise", "Design", "Deliver"] as const;

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "process", label: "Process" },
  { key: "outcomes", label: "Outcomes" },
  { key: "gallery", label: "Gallery" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface ProjectPopoverProps {
  project: ProjectData | null;
  onClose: () => void;
}

/* ─── Overview Slide ─── */
function OverviewSlide({ project }: { project: ProjectData }) {
  return (
    <div className="h-full overflow-y-auto">
      {/* Info */}
      <div className="p-6 md:p-12 flex flex-col justify-center max-w-3xl mx-auto h-full">
        {project.clientLogo && (
          <img
            src={project.clientLogo}
            alt={`${project.client} logo`}
            className="h-8 w-auto object-contain mb-4 opacity-70"
          />
        )}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {project.number} — {project.client}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/50">{project.year}</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-[-0.02em] leading-tight mb-4">
          {project.title}
        </h2>

        <p className="text-[15px] leading-relaxed text-muted-foreground mb-6 max-w-xl">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase bg-muted text-muted-foreground px-2.5 py-1">
            {project.categoryLabel}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase text-muted-foreground border border-border px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>

        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            The Challenge
          </p>
          <p className="text-[13px] leading-relaxed text-muted-foreground max-w-xl">
            {project.brief.challenge}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Process Slide ─── */
function ProcessSlide({ project }: { project: ProjectData }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        {/* Left column — approach + phases */}
        <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
          {/* Phase diagram */}
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Method Phases
          </p>
          <div className="flex gap-1 mb-8">
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

          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
            {project.approach.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {project.approach.description}
          </p>
        </div>

        {/* Right column — methods + gallery */}
        <div className="md:col-span-3 flex flex-col">
          {/* Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 flex-1">
            {project.approach.methods.map((method, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 flex flex-col ${
                  i < project.approach.methods.length - 1
                    ? "border-b md:border-b-0 md:border-r border-border"
                    : ""
                }`}
              >
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-user-blue mb-3">
                  0{i + 1}
                </div>
                <h4 className="font-display text-base font-semibold text-foreground mb-2">{method.name}</h4>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Gallery strip */}
          <div className="grid grid-cols-3 border-t border-border flex-shrink-0">
            {project.gallery.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className={`relative aspect-[4/3] overflow-hidden ${
                  i < 2 ? "border-r border-border" : ""
                }`}
              >
                <img
                  src={getGallerySrc(img)}
                  alt={`${project.title} — ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Outcomes Slide ─── */
function OutcomesSlide({ project }: { project: ProjectData }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        {/* Left — impact metrics */}
        <div className="md:col-span-2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
            Impact
          </p>
          <div className="space-y-8">
            {project.impact.map((item, i) => (
              <div key={i}>
                <div className="font-display text-4xl font-bold text-foreground mb-1">{item.value}</div>
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">{item.metric}</div>
                <p className="text-[12px] text-muted-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — insights + quote */}
        <div className="md:col-span-3 flex flex-col">
          {/* Insights */}
          <div className="flex-1 p-6 md:p-10">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Key Insights
            </p>
            <div className="space-y-6">
              {project.insights.slice(0, 3).map((insight, i) => (
                <div key={i} className="border-l-2 border-border pl-4">
                  {insight.stat && (
                    <div className="font-display text-xl font-bold text-user-blue mb-1">{insight.stat}</div>
                  )}
                  <h4 className="font-display text-base font-semibold text-foreground mb-1">{insight.title}</h4>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote or solution strip */}
          <div className="border-t border-border p-6 md:p-10 bg-muted/20">
            {project.quote ? (
              <div>
                <p className="font-display text-lg italic text-foreground/80 mb-3 leading-relaxed">
                  "{project.quote.text}"
                </p>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                  {project.quote.author}, {project.quote.role}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  Solution
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {project.solution.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Gallery Slide ─── */
function GallerySlide({ project }: { project: ProjectData }) {
  const [currentImage, setCurrentImage] = useState(0);
  const galleryLength = project.gallery.length;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % galleryLength);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + galleryLength) % galleryLength);

  const currentItem = project.gallery[currentImage];
  const src = getGallerySrc(currentItem);
  const caption = getGalleryCaption(currentItem);

  return (
    <div className="h-full flex flex-col">
      {/* Main image area */}
      <div className="flex-1 relative overflow-hidden bg-muted/20">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={src}
            alt={`${project.title} — ${currentImage + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {galleryLength > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors rounded-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors rounded-sm"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {galleryLength > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentImage ? "bg-user-blue" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Caption bar */}
      <div className="border-t border-border px-6 md:px-10 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex-1">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
            {currentImage + 1} / {galleryLength}
          </p>
          {caption && (
            <p className="text-[13px] leading-relaxed text-muted-foreground max-w-2xl">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Popover ─── */
export function ProjectPopover({ project, onClose }: ProjectPopoverProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [direction, setDirection] = useState(0);

  if (!project) return null;

  const currentIndex = TABS.findIndex((t) => t.key === activeTab);

  const goTo = (tab: TabKey) => {
    const newIndex = TABS.findIndex((t) => t.key === tab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  const goNext = () => {
    if (currentIndex < TABS.length - 1) goTo(TABS[currentIndex + 1].key);
  };
  const goPrev = () => {
    if (currentIndex > 0) goTo(TABS[currentIndex - 1].key);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) goNext();
    else if (info.offset.x > swipeThreshold) goPrev();
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
  };

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
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-8 md:inset-16 lg:inset-20 z-50 bg-background border border-border flex flex-col overflow-hidden rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: tabs + close */}
            <div className="flex items-center justify-between border-b border-border px-4 md:px-6 flex-shrink-0">
              {/* Tabs */}
              <div className="flex">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => goTo(tab.key)}
                    className={`relative px-5 py-4 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                      activeTab === tab.key
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-user-blue"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrow nav + close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex === TABS.length - 1}
                  className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
                <div className="w-px h-5 bg-border mx-2" />
                <button
                  onClick={onClose}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  {activeTab === "overview" && <OverviewSlide project={project} />}
                  {activeTab === "process" && <ProcessSlide project={project} />}
                  {activeTab === "outcomes" && <OutcomesSlide project={project} />}
                  {activeTab === "gallery" && <GallerySlide project={project} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

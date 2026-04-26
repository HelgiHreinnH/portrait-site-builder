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
    <div className="h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left — hero image */}
      <div className="relative h-[28%] md:h-auto md:min-h-0 overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />
      </div>

      {/* Right — info */}
      <div className="p-4 md:p-10 flex flex-col justify-start md:justify-center overflow-hidden md:overflow-y-auto min-h-0">
        {project.clientLogo && (
          <img
            src={project.clientLogo}
            alt={`${project.client} logo`}
            className="hidden md:block h-8 w-auto object-contain mb-4 opacity-70"
          />
        )}
        <div className="flex items-center gap-3 mb-2 md:mb-3">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {project.number} — {project.client}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/50">{project.year}</span>
        </div>

        <h2 className="font-display text-xl md:text-4xl font-bold text-foreground tracking-[-0.02em] leading-tight mb-2 md:mb-4">
          {project.title}
        </h2>

        <p className="text-[13px] md:text-[15px] leading-relaxed text-muted-foreground mb-3 md:mb-6 max-w-md line-clamp-3 md:line-clamp-none">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-8">
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] uppercase bg-muted text-muted-foreground px-2 md:px-2.5 py-0.5 md:py-1">
            {project.categoryLabel}
          </span>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono text-[8px] md:text-[9px] tracking-[0.1em] uppercase text-muted-foreground border border-border px-2 md:px-2.5 py-0.5 md:py-1">
              {tag}
            </span>
          ))}
        </div>

        <div className="min-h-0">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1.5 md:mb-2">
            The Challenge
          </p>
          <p className="text-[12px] md:text-[13px] leading-relaxed text-muted-foreground max-w-md line-clamp-4 md:line-clamp-none">
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
    <div className="h-full overflow-hidden md:overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        {/* Left column — approach + phases */}
        <div className="md:col-span-2 p-4 md:p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
          {/* Phase diagram */}
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2 md:mb-3">
            Method Phases
          </p>
          <div className="flex gap-1 mb-3 md:mb-8">
            {PHASES.map((phase) => {
              const isLed = project.phasesLed.includes(phase);
              return (
                <div
                  key={phase}
                  className={`flex-1 text-center py-1.5 md:py-2.5 font-mono text-[8px] md:text-[9px] tracking-[0.1em] uppercase transition-colors ${
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

          <h3 className="font-display text-lg md:text-3xl font-bold text-foreground mb-2 md:mb-3 leading-tight">
            {project.approach.title}
          </h3>
          <p className="text-[12px] md:text-[13px] leading-relaxed text-muted-foreground line-clamp-3 md:line-clamp-none">
            {project.approach.description}
          </p>
        </div>

        {/* Right column — methods + gallery */}
        <div className="md:col-span-3 flex flex-col flex-1 min-h-0">
          {/* Methods */}
          <div className="grid grid-cols-3 md:grid-cols-3 flex-1 min-h-0">
            {project.approach.methods.map((method, i) => (
              <div
                key={i}
                className={`p-3 md:p-8 flex flex-col min-h-0 overflow-hidden ${
                  i < project.approach.methods.length - 1 ? "border-r border-border" : ""
                }`}
              >
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-user-blue mb-1.5 md:mb-3">
                  0{i + 1}
                </div>
                <h4 className="font-display text-xs md:text-base font-semibold text-foreground mb-1 md:mb-2 leading-tight">{method.name}</h4>
                <p className="text-[11px] md:text-[13px] leading-snug md:leading-relaxed text-muted-foreground line-clamp-3 md:line-clamp-none">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Gallery strip — desktop only to preserve mobile vertical fit */}
          <div className="hidden md:grid grid-cols-3 border-t border-border flex-shrink-0">
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
    <div className="h-full overflow-hidden md:overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        {/* Left — impact metrics */}
        <div className="md:col-span-2 p-4 md:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3 md:mb-8">
            Impact
          </p>
          {/* Mobile: horizontal row; Desktop: vertical stack */}
          <div className="grid grid-cols-3 gap-2 md:flex md:flex-col md:space-y-8 md:gap-0">
            {project.impact.slice(0, 3).map((item, i) => (
              <div key={i} className="min-w-0">
                <div className="font-display text-xl md:text-4xl font-bold text-foreground mb-0.5 md:mb-1 leading-none">{item.value}</div>
                <div className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-0.5 md:mb-1 truncate">{item.metric}</div>
                <p className="hidden md:block text-[12px] text-muted-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — insights + quote */}
        <div className="md:col-span-3 flex flex-col flex-1 min-h-0">
          {/* Insights */}
          <div className="flex-1 min-h-0 p-4 md:p-10 overflow-hidden">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3 md:mb-6">
              Key Insights
            </p>
            <div className="space-y-3 md:space-y-6">
              {project.insights.slice(0, 2).map((insight, i) => (
                <div key={i} className="border-l-2 border-border pl-3 md:pl-4">
                  {insight.stat && (
                    <div className="font-display text-base md:text-xl font-bold text-user-blue mb-0.5 md:mb-1">{insight.stat}</div>
                  )}
                  <h4 className="font-display text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1 leading-tight">{insight.title}</h4>
                  <p className="text-[12px] md:text-[13px] leading-snug md:leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-none">{insight.description}</p>
                </div>
              ))}
              {project.insights.length > 2 && (
                <div className="hidden md:block border-l-2 border-border pl-4">
                  {project.insights[2].stat && (
                    <div className="font-display text-xl font-bold text-user-blue mb-1">{project.insights[2].stat}</div>
                  )}
                  <h4 className="font-display text-base font-semibold text-foreground mb-1">{project.insights[2].title}</h4>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{project.insights[2].description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quote or solution strip — desktop only to preserve mobile vertical fit */}
          <div className="hidden md:block border-t border-border p-6 md:p-10 bg-muted/20">
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
      <div className="border-t border-border px-4 md:px-10 py-2 md:py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex-1">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5 md:mb-1">
            {currentImage + 1} / {galleryLength}
          </p>
          {caption && (
            <p className="text-[11px] md:text-[13px] leading-snug md:leading-relaxed text-muted-foreground max-w-2xl line-clamp-2 md:line-clamp-none">
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
            className="fixed inset-0 md:inset-16 lg:inset-20 z-50 bg-background md:border md:border-border flex flex-col overflow-hidden md:rounded-sm md:shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: tabs + close */}
            <div className="flex items-center justify-between border-b border-border px-2 md:px-6 flex-shrink-0 gap-2">
              {/* Tabs — scrollable on mobile */}
              <div className="flex flex-1 min-w-0 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => goTo(tab.key)}
                    className={`relative shrink-0 px-3 md:px-5 py-3.5 md:py-4 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors ${
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
              <div className="flex items-center gap-1 md:gap-2 shrink-0">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="hidden md:inline-flex p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex === TABS.length - 1}
                  className="hidden md:inline-flex p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
                <div className="hidden md:block w-px h-5 bg-border mx-2" />
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 md:p-1.5 -mr-1 md:mr-0 rounded-full md:rounded-none border border-border md:border-0 text-foreground md:text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
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

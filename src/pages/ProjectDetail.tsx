import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, getGallerySrc } from "@/data/projects";
import { useEffect } from "react";

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projects[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/" className="font-mono text-[11px] tracking-[0.2em] uppercase text-user-blue hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjectsData = project.relatedProjects
    ?.map((id) => projects[id])
    .filter(Boolean) || [];

  return (
    <div className="relative z-10 min-h-screen">
      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-20 left-6 md:left-10 z-40"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors bg-background/80 backdrop-blur-sm px-3 py-2"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>
      </motion.div>

      {/* Hero section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary-foreground/70">
                {project.number} — {project.client}
              </span>
              <span className="font-mono text-[10px] text-primary-foreground/50">{project.year}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3 tracking-[-0.02em]">
              {project.title}
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/50 border border-primary-foreground/20 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brief section */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Challenge</h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{project.brief.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Context</h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{project.brief.context}</p>
          </div>
        </div>
      </section>

      {/* Approach section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8">Our Approach</p>

          {/* Process Arc */}
          {'phasesLed' in project && (
            <div className="flex gap-1 mb-10 max-w-md">
              {(["Analyse", "Strategise", "Design", "Deliver"] as const).map((phase) => {
                const isLed = (project as any).phasesLed?.includes(phase);
                return (
                  <div
                    key={phase}
                    className={`flex-1 text-center py-3 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors ${
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
          )}

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{project.approach.title}</h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-12 max-w-2xl">{project.approach.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.approach.methods.map((method, index) => (
              <div key={index} className="border-t border-border pt-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{method.name}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-12">Key Insights</p>
          <div className="space-y-12">
            {project.insights.map((insight, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 border-b border-border pb-12">
                {insight.stat && (
                  <div>
                    <span className="font-display text-3xl font-bold text-user-blue">{insight.stat}</span>
                  </div>
                )}
                <div className={!insight.stat ? "md:col-span-2" : ""}>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{insight.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.gallery.map((image, index) => (
            <img
              key={index}
              src={getGallerySrc(image)}
              alt={`${project.title} gallery ${index + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
            />
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8">The Solution</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Strategic Interventions</h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-12 max-w-2xl">{project.solution.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.solution.interventions.map((intervention, index) => (
              <div key={index} className="border border-border p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{intervention.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{intervention.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-12">Measurable Impact</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.impact.map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">{item.value}</div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.metric}</h3>
                <p className="text-[14px] text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      {project.quote && (
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
            <p className="font-display text-2xl md:text-3xl italic text-foreground/80 mb-6">
              "{project.quote.text}"
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              {project.quote.author}, {project.quote.role}
            </p>
          </div>
        </section>
      )}

      {/* Related projects */}
      {relatedProjectsData.length > 0 && (
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8">Related Work</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjectsData.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/projects/${relatedProject.id}`}
                  className="group block overflow-hidden"
                  style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={relatedProject.heroImage}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">{relatedProject.client}</p>
                      <h3 className="font-display text-xl font-semibold text-primary-foreground">{relatedProject.title}</h3>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/60 flex items-center gap-1">
                        View Project <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <div className="py-12 text-center">
        <Link
          to="/"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}

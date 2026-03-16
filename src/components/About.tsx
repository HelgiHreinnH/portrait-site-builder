import { motion } from "framer-motion";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1634651754953-1565eca58d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWhhdmlvcmFsJTIwcmVzZWFyY2glMjBvYnNlcnZhdGlvbiUyMHVzZXIlMjBzdHVkeSUyMGRhcmslMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzczMTQ0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const table = [
  ["Assume how spaces should be used", "Observe how spaces are actually used"],
  ["Design for average user", "Design for behavioral patterns"],
  ["One-time delivery", "Continuous optimization"],
  ["Satisfaction surveys", "Behavioral outcome measurement"],
  ["Space-centered", "Human-centered"],
];

export function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top half: image + bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}>
              <img src={ABOUT_IMG} alt="Behavioral research" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-3">
                <p className="font-display text-sm font-semibold text-foreground">10+ Years Experience</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Behavioral Design</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              05 — About
            </p>

            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Helgi Hreinn<br />Hjalmarsson
            </h2>

            <p className="text-[15px] leading-relaxed text-muted-foreground mb-4">
              Founder of USER_, a behavioral design consultancy at the intersection of
              architecture, behavioral psychology, and digital innovation. Based in
              Copenhagen with a global perspective.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground mb-8">
              With 10+ years transforming environments for Fortune 500 companies — LEGO, Novo
              Nordisk, MAERSK, Barclays — my work is rooted in a simple belief: spaces should
              be designed for how people{" "}
              <em className="text-foreground">actually</em>{" "}
              behave, not how we assume they will.
            </p>

            <div className="space-y-3">
              {[
                { l: "Email", v: "helgihreinn@me.com" },
                { l: "Phone", v: "+45 4083 1842" },
                { l: "Base", v: "Copenhagen, Denmark" },
              ].map(({ l, v }) => (
                <div key={l} className="flex items-center gap-4 border-b border-border pb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-16">{l}</span>
                  <span className="text-[14px] text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">
            The USER_ Difference
          </p>

          <div className="border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-muted">
              <div className="px-6 py-4 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Traditional
              </div>
              <div className="px-6 py-4 font-mono text-[11px] tracking-[0.2em] uppercase text-foreground border-l border-border">
                USER_
              </div>
            </div>

            {table.map(([trad, user], i) => (
              <div key={i} className="grid grid-cols-2 border-t border-border">
                <div className="px-6 py-4 text-[14px] text-muted-foreground line-through decoration-muted-foreground/30">
                  {trad}
                </div>
                <div className="px-6 py-4 text-[14px] text-foreground font-medium border-l border-border">
                  {user}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1634651754953-1565eca58d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWhhdmlvcmFsJTIwcmVzZWFyY2glMjBvYnNlcnZhdGlvbiUyMHVzZXIlMjBzdHVkeSUyMGRhcmslMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzczMTQ0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const table = [
  ["Assume how spaces should be used", "Observe how spaces are actually used"],
  ["Design for average user", "Design for real behavioural patterns"],
  ["One-time delivery", "Continuous learning and optimisation"],
  ["Satisfaction surveys", "Outcome-based measurement"],
  ["Space-centred thinking", "People-centred thinking"],
];

export function About() {
  return (
    <section id="about" className="h-full flex flex-col justify-center py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-1 min-h-0">
        {/* Top half: image + bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1 min-h-0">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth }}
            className="relative min-h-0"
          >
            <div className="relative overflow-hidden h-full" style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}>
              <img src={ABOUT_IMG} alt="Workplace research" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-2">
                <p className="font-display text-sm font-semibold text-foreground">10+ Years Experience</p>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Architecture · Strategy · Digital Product</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              05 — About
            </p>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-4">
              Helgi Hreinn<br />Hjálmarsson
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-3">
              Architect (MAA) from the Aarhus School of Architecture with 10+ years across workplace strategy, digital product development, and hands-on design.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-3">
              I grew up in Iceland and have worked across many professional and cultural contexts. That shaped a fundamental sense that the same challenges look very different depending on perspective — and that this understanding is one of the most useful tools you can bring to a project.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4">
              I work with my hands as well as with data and strategy. Carpentry, joinery, surface treatment. The same analytical approach, a different material.
            </p>

            <div className="space-y-2">
              {[
                { l: "Email", v: "helgihreinn@me.com" },
                { l: "Phone", v: "+45 4083 1842" },
                { l: "Base", v: "Copenhagen, Denmark" },
              ].map(({ l, v }) => (
                <div key={l} className="flex items-center gap-4 border-b border-border pb-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-14">{l}</span>
                  <span className="text-sm text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...smooth }}
          className="mt-6 shrink-0"
        >
          <div className="border border-border overflow-hidden">
            <div className="grid grid-cols-2 bg-muted">
              <div className="px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                Traditional
              </div>
              <div className="px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground border-l border-border">
                My Approach
              </div>
            </div>

            {table.map(([trad, user], i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-t border-border"
              >
                <div className="px-4 py-2 text-sm text-muted-foreground line-through decoration-muted-foreground/30">
                  {trad}
                </div>
                <div className="px-4 py-2 text-sm text-foreground font-medium border-l border-border">
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

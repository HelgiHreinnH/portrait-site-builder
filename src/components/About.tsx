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
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-1 min-h-0 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smooth }}
          className="mb-8"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            05 — My Approach
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-2">
            Ways of Working
          </h2>
        </motion.div>

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

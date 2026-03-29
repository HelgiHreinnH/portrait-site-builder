import { motion } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const table = [
  ["Assume how spaces should be used", "Observe how spaces are actually used"],
  ["Design for average user", "Design for real behavioural patterns"],
  ["One-time delivery", "Continuous learning and optimisation"],
  ["Satisfaction surveys", "Outcome-based measurement"],
  ["Space-centred thinking", "People-centred thinking"],
];

const engagements = [
  { title: "Full-Scope Project", duration: "3 – 12 months", description: "End-to-end from analysis to delivery — workplace strategy, digital product, or both." },
  { title: "Strategic Brief", duration: "4 – 8 weeks", description: "Analytical, strategic, or design brief — clarity before commitment." },
  { title: "Product Sprint", duration: "2 – 6 weeks", description: "Rapid prototyping and validation for digital tools and platforms." },
  { title: "Advisory & Workshops", duration: "Ongoing", description: "Workshops, frameworks, and strategic advice for teams navigating complex problems." },
];

export function About() {
  return (
    <section id="about" className="h-full flex flex-col justify-center py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-1 min-h-0 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Ways of Working */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              05 — My Approach
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Ways of Working
            </h2>

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
                <div key={i} className="grid grid-cols-2 border-t border-border">
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

          {/* Right: Ways to Work Together */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, delay: 0.15 }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              &nbsp;
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Ways to Work Together
            </h2>

            <div className="flex flex-col gap-3">
              {engagements.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: 0.1 + i * 0.06 }}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

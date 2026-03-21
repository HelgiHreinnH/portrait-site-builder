import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const engagementTypes = [
  {
    type: "Full-Scope Project",
    duration: "3 – 12 months",
    description: "End-to-end from analysis to delivery — workplace strategy, digital product, or both.",
    color: "#D5DEF4",
  },
  {
    type: "Strategic Brief",
    duration: "4 – 8 weeks",
    description: "Analytical, strategic, or design brief — clarity before commitment.",
    color: "#B8C9EE",
  },
  {
    type: "Product Sprint",
    duration: "2 – 6 weeks",
    description: "Rapid prototyping and validation for digital tools and platforms.",
    color: "#DCE8E6",
  },
  {
    type: "Advisory & Workshops",
    duration: "Ongoing",
    description: "Workshops, frameworks, and strategic advice for teams navigating complex problems.",
    color: "#C5D5EC",
  },
];

export function Contact() {
  return (
    <section id="contact" className="h-full flex flex-col justify-center py-10 md:py-14 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col flex-1 min-h-0 justify-center">
        {/* Header label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...smooth }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8 shrink-0"
        >
          06 — Contact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 min-h-0">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-4">
              Let's Talk
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-6">
              I'm available for advisory work, project collaborations, and strategic partnerships within workplace design, digital product development, and user experience. Based in Copenhagen. Working across Denmark, Iceland, and the Nordics.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { Icon: Mail, label: "helgihreinn@me.com", href: "mailto:helgihreinn@me.com" },
                { Icon: Phone, label: "+45 4083 1842", href: "tel:+4540831842" },
                { Icon: MapPin, label: "Copenhagen, Denmark", href: null },
              ].map(({ Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={14} className="text-muted-foreground" />
                  {href ? (
                    <a href={href} className="text-sm text-foreground hover:text-user-blue transition-colors duration-300">
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground">{label}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { Icon: Github, label: "GitHub", href: "https://github.com/HelgiHreinnH" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/helgihreinn" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 border border-border px-3 py-1.5"
                >
                  <Icon size={12} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Engagement types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Ways to Work Together
            </p>

            <div className="space-y-3">
              {engagementTypes.map((eng, i) => (
                <motion.div
                  key={eng.type}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: i * 0.06 }}
                  whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  className="border border-border p-4 transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display text-sm font-semibold text-foreground">{eng.type}</h3>
                    <span
                      className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                      style={{ background: eng.color }}
                    >
                      {eng.duration}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{eng.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...smooth, delay: 0.2 }}
          className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 shrink-0"
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-foreground">H</span>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Helgi Hreinn Hjálmarsson</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
            © 2026 Helgi Hreinn Hjálmarsson — Architect. Strategist. Builder.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

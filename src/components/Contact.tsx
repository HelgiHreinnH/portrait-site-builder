import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const engagementTypes = [
  {
    type: "Product Development",
    duration: "3 – 12 months",
    description: "Full-stack digital tool development from concept to market-ready product.",
    color: "#D5DEF4",
  },
  {
    type: "Innovation Sprint",
    duration: "4 – 8 weeks",
    description: "Rapid prototyping and validation through real design projects.",
    color: "#B8C9EE",
  },
  {
    type: "Integration Services",
    duration: "2 – 6 weeks",
    description: "Adding behavioral intelligence to existing tools and workflows.",
    color: "#DCE8E6",
  },
  {
    type: "Retainer Partnership",
    duration: "Ongoing",
    description: "Continuous product evolution, feature development, and strategic advisory.",
    color: "#C5D5EC",
  },
];

export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-12"
        >
          06 — Contact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Let's Build<br />Something Better
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground mb-8">
              Ready to transform your environment through evidence-based behavioral design?
              Whether you're building a PropTech tool, optimizing a workspace, or seeking an
              innovation partner — let's talk.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {[
                { Icon: Mail, label: "helgihreinn@me.com", href: "mailto:helgihreinn@me.com" },
                { Icon: Phone, label: "+45 4083 1842", href: "tel:+4540831842" },
                { Icon: MapPin, label: "Copenhagen, Denmark", href: null },
              ].map(({ Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={16} className="text-muted-foreground" />
                  {href ? (
                    <a href={href} className="text-[14px] text-foreground hover:text-user-blue transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-[14px] text-foreground">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4">
              {[
                { Icon: Github, label: "GitHub", href: "https://github.com/HelgiHreinnH" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: ArrowUpRight, label: "Live Site", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 border border-border px-3 py-2"
                >
                  <Icon size={12} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Engagement types */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Engagement Types
            </p>

            <div className="space-y-4">
              {engagementTypes.map((eng) => (
                <div
                  key={eng.type}
                  className="border border-border p-5 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-base font-semibold text-foreground">{eng.type}</h3>
                    <span
                      className="font-mono text-[10px] tracking-[0.1em] uppercase px-2 py-1 rounded-full"
                      style={{ background: eng.color }}
                    >
                      {eng.duration}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{eng.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-foreground">U</span>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">USER_</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
            © 2025 USER. All rights reserved. — Copenhagen, Denmark
          </p>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

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
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Have a Project<br />in Mind?
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground mb-8">
              Whether it's a workplace strategy, a digital product, or something
              that spans all three fields — get in touch and let's talk about
              what you're working on.
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
              Ways to Work Together
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
            <span className="font-display text-2xl font-bold text-foreground">H</span>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Helgi Hreinn Hjálmarsson</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
            © 2025 All rights reserved. — Copenhagen, Denmark
          </p>
        </div>
      </div>
    </section>
  );
}

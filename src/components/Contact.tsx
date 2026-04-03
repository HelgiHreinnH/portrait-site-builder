import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

export function Contact() {
  return (
    <section id="contact" className="h-full flex flex-col py-12 md:py-16 bg-muted/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 flex flex-col flex-1 min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smooth }}
          className="flex flex-col max-w-xl"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            06 — Contact
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-3">
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...smooth, delay: 0.2 }}
          className="mt-auto pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 shrink-0"
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
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import portraitImage from "@/assets/portrait_image.png";

const smooth = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const id = crypto.randomUUID();

      // Send confirmation email to the person who submitted the form
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: form.email,
          idempotencyKey: `contact-confirm-${id}`,
          templateData: { name: form.name },
        },
      });

      // Also send notification to you
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: "helgihreinn@me.com",
          idempotencyKey: `contact-notify-${id}`,
          templateData: { name: `New message from ${form.name} (${form.email})\nSubject: ${form.subject}\n\n${form.message}` },
        },
      });

      toast({ title: "Message sent", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="h-full flex flex-col bg-muted/50">
      <div className="section-inner">
        {/* Row 1: Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smooth }}
          className="shrink-0 mb-3"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5">
            Let's Talk
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
            I'm always open for dialogue. If you have a project in mind, a problem you're trying to frame, or just want to explore what a collaboration might look like — reach out. I work across workplace design, digital product, and strategic briefs. But the starting point is always just a good conversation.
          </p>
        </motion.div>

        {/* Row 2: Two-column layout */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 h-full">
            {/* Left — Portrait + info + buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smooth, delay: 0.1 }}
              className="flex flex-col justify-between pb-[48px]"
            >
              <div className="pt-12">
                <div className="inline-flex flex-col items-center mb-2">
                  <div className="w-36 h-36 rounded-full overflow-hidden border border-border mb-2">
                    <img
                      src={portraitImage}
                      alt="Helgi Hreinn Hjálmarsson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-display text-xl font-bold text-foreground">Helgi Hreinn Hjálmarsson</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { Icon: Mail, label: "helgihreinn@me.com", href: "mailto:helgihreinn@me.com" },
                  { Icon: Phone, label: "+45 4083 1842", href: "tel:+4540831842" },
                  { Icon: MapPin, label: "Copenhagen, Denmark", href: null },
                ].map(({ Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={15} className="text-muted-foreground" />
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

              <div className="flex flex-wrap gap-2">
                {[
                  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/helgihreinn" },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-mono text-[11px] tracking-[0.2em] uppercase text-foreground flex items-center gap-2 border border-border rounded-lg px-4 py-3.5 bg-background hover:border-foreground hover:shadow-sm transition-all duration-300"
                  >
                    <Icon size={14} className="group-hover:scale-110 transition-transform" />
                    {label}
                  </a>
                ))}
                <button
                  onClick={() => window.open("/cv.pdf", "_blank")}
                  className="group font-mono text-[11px] tracking-[0.2em] uppercase text-foreground flex items-center gap-2 border border-border rounded-lg px-4 py-3.5 bg-background hover:border-foreground hover:shadow-sm transition-all duration-300"
                >
                  <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                  Download CV
                </button>
                <a
                  href="https://github.com/HelgiHreinnH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2 border border-border/60 rounded-lg px-4 py-3.5 bg-background hover:border-foreground hover:text-foreground hover:shadow-sm transition-all duration-300"
                >
                  <Github size={14} className="group-hover:scale-110 transition-transform" />
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Right — Description + form */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smooth, delay: 0.2 }}
              className="flex flex-col justify-end pb-[48px]"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <div>
                  <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border rounded-lg bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                    Subject
                  </label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-border rounded-lg bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none"
                  >
                    <option value="" disabled>Pick a topic...</option>
                    <option value="Just curious">Just curious 👀</option>
                    <option value="I have a project">I have a project 🏗️</option>
                    <option value="Coffee date?">Coffee date? ☕</option>
                    <option value="Virtual meeting">Virtual meeting 💻</option>
                    <option value="Let's collaborate">Let's collaborate 🤝</option>
                    <option value="Hiring / freelance">Hiring / freelance 📋</option>
                    <option value="Something else">Something else ✨</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border rounded-lg bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border rounded-lg bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="group flex items-center justify-center gap-2 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-lg hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 hover:shadow-md"
                >
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  {sending ? "Sending..." : "Start a Conversation"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

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

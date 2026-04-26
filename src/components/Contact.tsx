import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send, X, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import portraitImage from "@/assets/portrait_image.png";

const smooth = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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
      setFormOpen(false);
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  // Lock background scroll while overlay is open + close on Escape
  useEffect(() => {
    if (!formOpen) return;
    const prevBody = document.body.style.overflow;
    const snap = document.querySelector(".snap-container") as HTMLElement | null;
    const prevSnap = snap?.style.overflow ?? "";
    document.body.style.overflow = "hidden";
    if (snap) snap.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      if (snap) snap.style.overflow = prevSnap;
      window.removeEventListener("keydown", onKey);
    };
  }, [formOpen]);

  const ContactFormFields = () => (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
          Name
        </label>
        <input
          type="text"
          required
          maxLength={100}
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
          maxLength={255}
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
          rows={4}
          maxLength={2000}
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
  );

  return (
    <section id="contact" className="h-full flex flex-col bg-muted/50">
      {/* ─── DESKTOP (md+) ─── */}
      <div className="hidden md:flex flex-col flex-1 min-h-0 h-full w-full max-w-[var(--section-max-w)] mx-auto px-[var(--section-px)] md:px-[var(--section-px-md)] pt-[var(--section-pt)] pb-[var(--section-pb)]">
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

      {/* ─── MOBILE ─── */}
      <div className="md:hidden flex-1 flex flex-col min-h-0 w-full px-[var(--section-px)] pt-[var(--section-pt)] pb-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...smooth }}
          className="shrink-0 mb-5"
        >
          <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground mb-3">
            Let's Talk
          </h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            I'm always open for dialogue. If you have a project in mind or just want to explore a collaboration — reach out.
          </p>
        </motion.div>

        {/* Contact info card */}
        <div className="shrink-0 flex flex-col items-center text-center mb-5">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-border mb-3">
            <img
              src={portraitImage}
              alt="Helgi Hreinn Hjálmarsson"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display text-base font-bold text-foreground mb-3">
            Helgi Hreinn Hjálmarsson
          </span>
          <div className="flex flex-col gap-2 items-center">
            <a href="mailto:helgihreinn@me.com" className="flex items-center gap-2 text-[13px] text-foreground">
              <Mail size={13} className="text-muted-foreground" />
              helgihreinn@me.com
            </a>
            <a href="tel:+4540831842" className="flex items-center gap-2 text-[13px] text-foreground">
              <Phone size={13} className="text-muted-foreground" />
              +45 4083 1842
            </a>
            <span className="flex items-center gap-2 text-[13px] text-foreground">
              <MapPin size={13} className="text-muted-foreground" />
              Copenhagen, Denmark
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="shrink-0 grid grid-cols-2 gap-2 mb-3">
          <a
            href="https://linkedin.com/in/helgihreinn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground flex items-center justify-center gap-2 border border-border rounded-lg px-3 py-3 bg-background"
          >
            <Linkedin size={13} />
            LinkedIn
          </a>
          <button
            onClick={() => window.open("/cv.pdf", "_blank")}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground flex items-center justify-center gap-2 border border-border rounded-lg px-3 py-3 bg-background"
          >
            <Download size={13} />
            Download CV
          </button>
        </div>
        <a
          href="https://github.com/HelgiHreinnH"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center justify-center gap-2 border border-border/60 rounded-lg px-3 py-3 bg-background mb-5"
        >
          <Github size={13} />
          GitHub
        </a>

        {/* Primary CTA — opens form overlay */}
        <button
          onClick={() => setFormOpen(true)}
          className="shrink-0 group flex items-center justify-center gap-2 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-4 rounded-lg hover:bg-foreground/90 transition-all duration-300 hover:shadow-md"
        >
          <Send size={14} />
          Send a message
        </button>

        {/* Mobile footer */}
        <div className="mt-auto pt-4">
          <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50 text-center">
            © 2026 Helgi Hreinn Hjálmarsson
          </p>
        </div>
      </div>

      {/* ─── MOBILE FORM OVERLAY ─── */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            key="contact-form-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden bg-background/80 backdrop-blur-sm"
            onClick={() => setFormOpen(false)}
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 bg-background flex flex-col"
            >
              {/* Overlay header */}
              <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-border">
                <button
                  onClick={() => setFormOpen(false)}
                  aria-label="Back to contact section"
                  className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground">
                  Send a message
                </span>
                <button
                  onClick={() => setFormOpen(false)}
                  aria-label="Close"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable form area */}
              <div className="flex-1 overflow-y-auto px-5 py-5 pb-8">
                <ContactFormFields />
                <button
                  onClick={() => setFormOpen(false)}
                  className="mt-5 w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground border border-border rounded-lg px-6 py-3.5 bg-background hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to section
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

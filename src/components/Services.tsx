import { useState } from "react";
import { motion } from "framer-motion";

const STORAGE_BASE = "https://pcubpqskliewraygeosc.supabase.co/storage/v1/object/public/site-images";

const smooth = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

const services = [
  {
    number: "01",
    title: "People",
    discipline: "Strategy & User Experience",
    tags: ["User Research", "Workshops", "Change Management", "Stakeholder Management"],
    description:
      "Analysis of human behaviour, workshop facilitation, organisational understanding, change management, and user involvement as a methodological foundation.",
    image: `${STORAGE_BASE}/People.png`,
  },
  {
    number: "02",
    title: "Buildings",
    discipline: "Architecture & Workplace",
    tags: ["Space Planning", "Zone Strategy", "Workplace Design", "Design Briefs"],
    description:
      "Space planning, workplace strategy, zone design, user experience in physical environments, and architectural advisory from brief to delivery.",
    image: `${STORAGE_BASE}/Buildings.png`,
  },
  {
    number: "03",
    title: "Technology",
    discipline: "Digital Product & UI/UX",
    tags: ["UI/UX", "Data Visualisation", "Product Development", "PropTech"],
    description:
      "UI/UX design, data visualisation, digital product development, and PropTech. From concept sketch to fully built product.",
    image: `${STORAGE_BASE}/Technology.png`,
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative h-full flex flex-col justify-start pt-12 md:pt-16 px-6 md:px-10 overflow-hidden"
    >
      <div className="mb-6 max-w-7xl mx-auto w-full shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-[48px]"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-3 px-[4px]">
            Three Fields. One Approach.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground text-base px-[4px]">
            I've worked across three disciplines for over 10 years. Not as a generalist without depth — but because the best solutions emerge where people, physical space, and digital systems meet.
          </p>
        </motion.div>
      </div>

      {/* Three vertical cards */}
      <div className="max-w-7xl mx-auto w-full flex-1 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smooth, delay: i * 0.1 }}
                className="relative flex flex-col border border-border rounded-xl p-6 md:p-8 cursor-pointer transition-colors duration-300 bg-background hover:bg-muted/30"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Image — fixed height, centered */}
                <div className="w-full h-[180px] md:h-[200px] flex items-center justify-center rounded-lg overflow-hidden mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>


                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1 mb-0.5">
                  {service.title}
                </h3>

                {/* Discipline */}
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
                  {service.discipline}
                </span>

                {/* Description */}
                <motion.p
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {service.description}
                </motion.p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] md:text-[11px] tracking-wider uppercase rounded-full px-2.5 py-1 border border-border text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const IMG_LEGO =
  "https://images.unsplash.com/photo-1771908997889-6d043c4a9ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHN0dWRpbyUyMHdvcmtzcGFjZSUyMGRyYW1hdGljJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_BARCLAYS =
  "https://images.unsplash.com/photo-1573306366674-5d42fa734860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBvZmZpY2UlMjBpbnRlcmlvciUyMHBlb3BsZSUyMHdvcmtpbmclMjBDb3BlbmhhZ2VuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMxNDQwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_BEUMER =
  "https://images.unsplash.com/photo-1770944182416-911214039dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWVyc2slMjBzaGlwcGluZyUyMGluZHVzdHJpYWwlMjBkcmFtYXRpYyUyMHdpZGV8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_AEC =
  "https://images.unsplash.com/photo-1739054730201-4b6463484e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrJTIwYmx1ZSUyMHRlY2h8ZW58MXx8fHwxNzczMTQ0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_UBIQISENSE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080";
const IMG_FELLES =
  "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1080";

interface BentoCardProps {
  number: string;
  client: string;
  title: string;
  outcome: string;
  tags: string[];
  image: string;
  delay?: number;
  projectId: string;
  className?: string;
}

function BentoCard({ number, client, title, outcome, tags, image, delay = 0, projectId, className = "" }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ ...smooth, delay }}
    >
      <Link
        to={`/projects/${projectId}`}
        className={`group relative block overflow-hidden rounded-xl ${className}`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-xl transition-opacity duration-500 group-hover:from-foreground/80" />

        {/* Top meta */}
        <div className="absolute top-2 left-3 right-3 flex justify-between items-start">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/70">
            {number}
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            {outcome}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-2 left-3 right-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-0.5">
            {client}
          </p>
          <h3 className="font-display text-sm md:text-base font-semibold text-primary-foreground mb-1 leading-tight">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[8px] tracking-[0.1em] uppercase text-primary-foreground/50 border border-primary-foreground/20 px-1.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
          initial={false}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ArrowUpRight size={16} className="text-primary-foreground" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smooth}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-foreground"
          >
            Examples
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smooth, delay: 0.1 }}
            className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground max-w-lg"
          >
            A selection of projects across workplace strategy, digital product, and making — each mapped to the same method.
          </motion.p>
        </div>

        {/* Desktop bento grid — compact to fit one screen */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3" style={{ height: "calc(100vh - 220px)" }}>
          <div className="col-span-2 row-span-1">
            <BentoCard number="01" client="LEGO" title="Billund HQ — Atrium Experience" outcome="Full Scope" tags={["People", "Buildings", "Technology"]} image={IMG_LEGO} projectId="lego-billund" className="h-full" />
          </div>
          <div className="col-span-1 row-span-1">
            <BentoCard number="02" client="Barclays Bank" title="Employee Experience Strategy" outcome="10,000+" tags={["People", "Buildings"]} image={IMG_BARCLAYS} delay={0.06} projectId="barclays" className="h-full" />
          </div>
          <div className="col-span-1 row-span-2">
            <BentoCard number="03" client="Beumer Group" title="Activity-Based Workplace" outcome="580" tags={["People", "Buildings"]} image={IMG_BEUMER} delay={0.12} projectId="beumer" className="h-full" />
          </div>
          <div className="col-span-1 row-span-1">
            <BentoCard number="04" client="AEC Hackathon" title="Projector — AI File Management" outcome="Tech" tags={["Buildings", "Technology"]} image={IMG_AEC} delay={0.18} projectId="aec-hackathon" className="h-full" />
          </div>
          <div className="col-span-1 row-span-1">
            <BentoCard number="05" client="Ubiqisense" title="Occupancy Platform UI/UX" outcome="Data" tags={["UI/UX", "Data"]} image={IMG_UBIQISENSE} delay={0.24} projectId="ubiqisense" className="h-full" />
          </div>
          <div className="col-span-1 row-span-1">
            <BentoCard number="06" client="Felles" title="Property Platform" outcome="Product" tags={["Product", "Strategy"]} image={IMG_FELLES} delay={0.3} projectId="felles" className="h-full" />
          </div>
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-2 gap-2" style={{ height: "calc(100vh - 180px)" }}>
          <BentoCard number="01" client="LEGO" title="Billund HQ" outcome="Full Scope" tags={["All Three"]} image={IMG_LEGO} projectId="lego-billund" className="h-full" />
          <BentoCard number="02" client="Barclays" title="Employee Experience" outcome="10K+" tags={["People"]} image={IMG_BARCLAYS} delay={0.06} projectId="barclays" className="h-full" />
          <BentoCard number="03" client="Beumer" title="Workplace Strategy" outcome="580" tags={["Strategy"]} image={IMG_BEUMER} delay={0.12} projectId="beumer" className="h-full" />
          <BentoCard number="04" client="AEC" title="Projector" outcome="AI Tool" tags={["Tech"]} image={IMG_AEC} delay={0.18} projectId="aec-hackathon" className="h-full" />
        </div>
      </div>
    </section>
  );
}

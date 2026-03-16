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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...smooth, delay }}
    >
      <Link
        to={`/projects/${projectId}`}
        className={`group relative block overflow-hidden rounded-2xl ${className}`}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-2xl transition-opacity duration-500 group-hover:from-foreground/80" />

        {/* Top meta */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">
            {number}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-2 py-1 rounded-full">
            {outcome}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-4 left-4 right-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-4px]">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">
            {client}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-primary-foreground mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/50 border border-primary-foreground/20 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          initial={false}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ArrowUpRight size={20} className="text-primary-foreground" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-foreground"
          >
            Examples
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, delay: 0.1 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl"
          >
            A selection of projects across workplace strategy, digital product, and making — each mapped to the same method.
          </motion.p>
        </div>

        {/* Desktop bento grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          <div className="col-span-2 aspect-[16/9]">
            <BentoCard number="01" client="LEGO" title="Billund HQ — Atrium Experience" outcome="Full Scope" tags={["People", "Buildings", "Technology"]} image={IMG_LEGO} projectId="lego-billund" className="h-full" />
          </div>
          <div className="col-span-1 aspect-[3/4]">
            <BentoCard number="02" client="Barclays Bank" title="Employee Experience Strategy" outcome="10,000+ employees" tags={["People", "Buildings"]} image={IMG_BARCLAYS} delay={0.06} projectId="barclays" className="h-full" />
          </div>
          <div className="col-span-1 aspect-[3/4]">
            <BentoCard number="03" client="Beumer Group" title="Activity-Based Workplace" outcome="580 employees" tags={["People", "Buildings"]} image={IMG_BEUMER} delay={0.12} projectId="beumer" className="h-full" />
          </div>
          <div className="col-span-2 aspect-[16/9]">
            <BentoCard number="04" client="AEC Hackathon" title="Projector — AI File Management" outcome="Buildings + Tech" tags={["Buildings", "Technology"]} image={IMG_AEC} delay={0.18} projectId="aec-hackathon" className="h-full" />
          </div>
          <div className="col-span-1 aspect-square">
            <BentoCard number="05" client="Ubiqisense" title="Occupancy Platform UI/UX" outcome="People + Tech" tags={["UI/UX", "Data"]} image={IMG_UBIQISENSE} delay={0.24} projectId="ubiqisense" className="h-full" />
          </div>
          <div className="col-span-1 aspect-square">
            <BentoCard number="06" client="Felles" title="Property Platform" outcome="People + Tech" tags={["Product", "Strategy"]} image={IMG_FELLES} delay={0.3} projectId="felles" className="h-full" />
          </div>
          <div className="col-span-1 aspect-square">
            <BentoCard number="07" client="Bygningsstyrelsen" title="Government Outplacement" outcome="300+ employees" tags={["People", "Buildings"]} image={IMG_BEUMER} delay={0.36} projectId="bygningsstyrelsen" className="h-full" />
          </div>
        </div>

        {/* Mobile stack */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          <BentoCard number="01" client="LEGO" title="Billund HQ" outcome="Full Scope" tags={["All Three"]} image={IMG_LEGO} projectId="lego-billund" className="aspect-[3/4]" />
          <BentoCard number="02" client="Barclays" title="Employee Experience" outcome="10K+" tags={["People"]} image={IMG_BARCLAYS} delay={0.06} projectId="barclays" className="aspect-[3/4]" />
          <BentoCard number="03" client="Beumer Group" title="Workplace Strategy" outcome="580" tags={["Strategy"]} image={IMG_BEUMER} delay={0.12} projectId="beumer" className="aspect-[3/4]" />
          <BentoCard number="04" client="AEC Hackathon" title="Projector" outcome="AI Tool" tags={["Tech"]} image={IMG_AEC} delay={0.18} projectId="aec-hackathon" className="aspect-[3/4]" />
          <BentoCard number="05" client="Ubiqisense" title="Platform UI/UX" outcome="Data" tags={["UI/UX"]} image={IMG_UBIQISENSE} delay={0.24} projectId="ubiqisense" className="aspect-[3/4]" />
          <BentoCard number="06" client="Felles" title="Property Platform" outcome="Product" tags={["Digital"]} image={IMG_FELLES} delay={0.3} projectId="felles" className="aspect-[3/4]" />
        </div>
      </div>
    </section>
  );
}

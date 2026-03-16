import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const IMG_LEGO =
  "https://images.unsplash.com/photo-1771908997889-6d043c4a9ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHN0dWRpbyUyMHdvcmtzcGFjZSUyMGRyYW1hdGljJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_NOVO =
  "https://images.unsplash.com/photo-1573306366674-5d42fa734860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBvZmZpY2UlMjBpbnRlcmlvciUyMHBlb3BsZSUyMHdvcmtpbmclMjBDb3BlbmhhZ2VuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMxNDQwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_MAERSK =
  "https://images.unsplash.com/photo-1770944182416-911214039dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWVyc2slMjBzaGlwcGluZyUyMGluZHVzdHJpYWwlMjBkcmFtYXRpYyUyMHdpZGV8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_AEC =
  "https://images.unsplash.com/photo-1739054730201-4b6463484e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrJTIwYmx1ZSUyMHRlY2h8ZW58MXx8fHwxNzczMTQ0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080";

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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to={`/projects/${projectId}`}
        className={`group relative block overflow-hidden ${className}`}
        style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

        {/* Top meta */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">
            {number}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/70 bg-primary-foreground/10 backdrop-blur-sm px-2 py-1">
            {outcome}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">
            {client}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-primary-foreground mb-3">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase text-primary-foreground/50 border border-primary-foreground/20 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={20} className="text-primary-foreground" />
        </div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] text-foreground">
            Selected Work
          </h2>
        </div>

        {/* Desktop bento grid */}
        <div className="hidden md:grid grid-cols-12 gap-4">
          <div className="col-span-8 aspect-[16/10]">
            <BentoCard
              number="01"
              client="LEGO"
              title="Billund Headquarters"
              outcome="+40% Collab"
              tags={["Workplace Strategy", "Behavioral Mapping", "Space Analytics"]}
              image={IMG_LEGO}
              projectId="lego-billund"
              className="h-full"
            />
          </div>
          <div className="col-span-4 aspect-[4/5]">
            <BentoCard
              number="02"
              client="Novo Nordisk"
              title="Innovation Campus"
              outcome="Evidence-Based"
              tags={["Research Spaces", "Innovation Design"]}
              image={IMG_NOVO}
              delay={0.1}
              projectId="novo-nordisk"
              className="h-full"
            />
          </div>
          <div className="col-span-4 aspect-[4/5]">
            <BentoCard
              number="03"
              client="MAERSK"
              title="Global Workplace Strategy"
              outcome="Cross-Cultural"
              tags={["Global Strategy", "Change Management"]}
              image={IMG_MAERSK}
              delay={0.2}
              projectId="maersk"
              className="h-full"
            />
          </div>
          <div className="col-span-8 aspect-[16/10]">
            <BentoCard
              number="04"
              client="AEC Hackathon"
              title="Behavioral Prediction Tool"
              outcome="🏆 Best Overall"
              tags={["PropTech", "Machine Learning", "Predictive Analytics"]}
              image={IMG_AEC}
              delay={0.3}
              projectId="aec-hackathon"
              className="h-full"
            />
          </div>
        </div>

        {/* Mobile stack */}
        <div className="md:hidden space-y-4">
          <BentoCard number="01" client="LEGO" title="Billund Headquarters" outcome="+40% Collab" tags={["Workplace Strategy"]} image={IMG_LEGO} projectId="lego-billund" className="aspect-[4/3]" />
          <BentoCard number="02" client="Novo Nordisk" title="Innovation Campus" outcome="Evidence-Based" tags={["Research Spaces"]} image={IMG_NOVO} delay={0.1} projectId="novo-nordisk" className="aspect-[4/3]" />
          <BentoCard number="03" client="MAERSK" title="Global Workplace Strategy" outcome="Cross-Cultural" tags={["Global Strategy"]} image={IMG_MAERSK} delay={0.2} projectId="maersk" className="aspect-[4/3]" />
          <BentoCard number="04" client="AEC Hackathon" title="Behavioral Prediction Tool" outcome="🏆 Best Overall" tags={["PropTech"]} image={IMG_AEC} delay={0.3} projectId="aec-hackathon" className="aspect-[4/3]" />
        </div>
      </div>
    </section>
  );
}

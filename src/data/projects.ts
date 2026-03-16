export interface ProjectData {
  id: string;
  number: string;
  client: string;
  title: string;
  subtitle: string;
  year: string;
  outcome: string;
  tags: string[];
  accentColor: string;
  heroImage: string;
  brief: { challenge: string; context: string };
  approach: {
    title: string;
    description: string;
    methods: Array<{ name: string; description: string }>;
  };
  insights: Array<{ title: string; description: string; stat?: string }>;
  solution: {
    description: string;
    interventions: Array<{ title: string; description: string }>;
  };
  impact: Array<{ metric: string; value: string; description: string }>;
  gallery: string[];
  quote?: { text: string; author: string; role: string };
  relatedProjects?: string[];
}

export const projects: Record<string, ProjectData> = {
  "lego-billund": {
    id: "lego-billund",
    number: "01",
    client: "LEGO",
    title: "Billund Headquarters",
    subtitle: "Redesigning collaboration through behavioral architecture",
    year: "2024",
    outcome: "+40% Collab",
    tags: ["Workplace Strategy", "Behavioral Mapping", "Space Analytics"],
    accentColor: "#D5DEF4",
    heroImage: "https://images.unsplash.com/photo-1771908997889-6d043c4a9ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHN0dWRpbyUyMHdvcmtzcGFjZSUyMGRyYW1hdGljJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "LEGO's Billund headquarters needed to foster more spontaneous collaboration and cross-team interaction while maintaining focus areas for deep work.",
      context: "With over 2,000 employees across multiple buildings, LEGO sought to create a workplace that embodied their creative culture while supporting diverse work modes.",
    },
    approach: {
      title: "Evidence-Based Spatial Strategy",
      description: "We combined behavioral observation, movement tracking, and participatory design workshops to understand how people actually work.",
      methods: [
        { name: "Behavioral Mapping", description: "Two weeks of systematic observation capturing movement patterns across 12 floors." },
        { name: "Digital Shadow Data", description: "Analysis of badge swipe data and calendar patterns to identify collaboration networks." },
        { name: "Co-Design Workshops", description: "Participatory sessions with 40+ employees to prototype spatial interventions." },
      ],
    },
    insights: [
      { title: "Collision Deficit", description: "Teams on related projects had 68% lower chance of spontaneous interaction.", stat: "68% deficit" },
      { title: "The Kitchen Effect", description: "82% of cross-departmental conversations happened near kitchen areas.", stat: "82% of cross-team talk" },
      { title: "Focus Paradox", description: "Employees moved to collaboration zones for focus work—indicating need for diverse focus typologies." },
    ],
    solution: {
      description: "We redesigned circulation, zoning, and spatial activation to create a gradient from high-energy collaborative zones to deep-focus sanctuaries.",
      interventions: [
        { title: "Vertical Neighborhoods", description: "Reconfigured stairwell placement to increase inter-floor movement by 240%." },
        { title: "Magnetized Hubs", description: "Enlarged kitchen areas into multi-functional social hubs with varied seating." },
        { title: "Focus Spectrum", description: "Created a legible gradient of work zones from 'buzz' to 'library'." },
      ],
    },
    impact: [
      { metric: "Cross-Team Collaboration", value: "+40%", description: "Measured increase in spontaneous cross-departmental interactions" },
      { metric: "Space Utilization", value: "87%", description: "Average utilization across all zones, compared to 62% pre-intervention" },
      { metric: "Employee Satisfaction", value: "+28%", description: "Improvement in workplace satisfaction scores" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600",
    ],
    quote: {
      text: "USER_ didn't just design a space—they designed behaviors. The data-driven approach meant we could make decisions based on evidence, not assumptions.",
      author: "Lars Nielsen",
      role: "Workplace Director, LEGO Group",
    },
    relatedProjects: ["novo-nordisk", "maersk"],
  },
  "novo-nordisk": {
    id: "novo-nordisk",
    number: "02",
    client: "Novo Nordisk",
    title: "Innovation Campus",
    subtitle: "Creating environments that accelerate pharmaceutical breakthroughs",
    year: "2024",
    outcome: "Evidence-Based",
    tags: ["Research Spaces", "Innovation Design", "Behavioral Science"],
    accentColor: "#DCE8E6",
    heroImage: "https://images.unsplash.com/photo-1573306366674-5d42fa734860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBvZmZpY2UlMjBpbnRlcmlvciUyMHBlb3BsZSUyMHdvcmtpbmclMjBDb3BlbmhhZ2VuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMxNDQwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "Novo Nordisk needed to design their new Innovation Campus to support breakthrough thinking while maintaining rigorous focus for pharmaceutical research.",
      context: "The campus would house 600+ researchers across drug discovery, clinical development, and data science.",
    },
    approach: {
      title: "Research-Informed Design",
      description: "We conducted a meta-analysis of spatial cognition research and ran controlled experiments to understand which environmental factors genuinely impact innovation.",
      methods: [
        { name: "Literature Meta-Analysis", description: "Systematic review of 140+ peer-reviewed studies on environmental psychology." },
        { name: "Field Experiments", description: "Controlled studies measuring creative output under different spatial configurations." },
        { name: "Expert Ethnography", description: "Deep shadowing of 25 researchers across disciplines." },
      ],
    },
    insights: [
      { title: "Visibility Paradox", description: "Open spaces increased casual interaction but decreased risk-taking and experimental thinking." },
      { title: "Proximity ≠ Collaboration", description: "Simply placing teams near each other didn't increase meaningful collaboration.", stat: "3.2x more effective" },
      { title: "Environmental Variety", description: "Researchers who changed environments 3+ times per day showed 26% more creative connections.", stat: "+26% creativity" },
    ],
    solution: {
      description: "We created 'innovation gradients'—sequences of spaces that support the full arc of innovation.",
      interventions: [
        { title: "Sheltered Experimentation", description: "Semi-enclosed 'innovation pods' with high visibility but acoustic privacy." },
        { title: "Strategic Resource Anchors", description: "Placed high-value shared resources at discipline intersections." },
        { title: "Environmental Variety System", description: "Designed 12 distinct environmental typologies accessible to all researchers." },
      ],
    },
    impact: [
      { metric: "Cross-Discipline Projects", value: "+52%", description: "Increase in projects involving 2+ disciplines" },
      { metric: "Patent Applications", value: "+18%", description: "Year-over-year increase in patent applications" },
      { metric: "Researcher Satisfaction", value: "4.6/5", description: "Average rating for environment support" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600",
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=1600",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600",
    ],
    quote: {
      text: "The campus design is grounded in real science, not design trends. That evidence-based approach gave us confidence to try unconventional solutions.",
      author: "Dr. Maria Sørensen",
      role: "Head of Research Infrastructure, Novo Nordisk",
    },
    relatedProjects: ["lego-billund", "aec-hackathon"],
  },
  "maersk": {
    id: "maersk",
    number: "03",
    client: "MAERSK",
    title: "Global Workplace Strategy",
    subtitle: "Cross-cultural behavioral design for a distributed organization",
    year: "2023",
    outcome: "Cross-Cultural",
    tags: ["Global Strategy", "Cultural Adaptation", "Change Management"],
    accentColor: "#B8C9EE",
    heroImage: "https://images.unsplash.com/photo-1770944182416-911214039dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWVyc2slMjBzaGlwcGluZyUyMGluZHVzdHJpYWwlMjBkcmFtYXRpYyUyMHdpZGV8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "MAERSK needed a global workplace standard adaptable across 130 countries while maintaining cohesive culture.",
      context: "Offices ranging from Singapore to São Paulo struggled with a one-size-fits-all approach.",
    },
    approach: {
      title: "Culturally Adaptive Framework",
      description: "Rather than imposing a single model, we created a flexible system of principles that could be localized.",
      methods: [
        { name: "Cross-Cultural Behavioral Audits", description: "On-site observation across 8 representative offices." },
        { name: "Hofstede Mapping", description: "Applied cultural dimensions framework to understand behavioral variations." },
        { name: "Participatory Localization", description: "Co-design sessions in each region to adapt the global framework." },
      ],
    },
    insights: [
      { title: "Hierarchy Manifests Spatially", description: "In high power-distance cultures, open-plan designs created anxiety." },
      { title: "The Lunch Culture Divide", description: "Break room strategies that worked in Copenhagen failed in Singapore.", stat: "47 min vs. 18 min" },
      { title: "Personalization Spectrum", description: "Tolerance for desk personalization varied 10x between cultures.", stat: "10x variance" },
    ],
    solution: {
      description: "We created a 'Design Constitution'—behavioral principles with multiple implementation pathways.",
      interventions: [
        { title: "Principle-Based Flexibility", description: "Mandated outcomes like 'increase cross-functional visibility by 30%' with 5 culturally-adapted solutions." },
        { title: "Cultural Adaptation Toolkit", description: "Decision-making framework mapping spatial interventions to cultural dimensions." },
        { title: "Global Behavioral Metrics", description: "Standardized measurement of behavioral outcomes across regions." },
      ],
    },
    impact: [
      { metric: "Global Adoption", value: "94%", description: "Of regional offices successfully implemented localized versions" },
      { metric: "Cross-Regional Collaboration", value: "+35%", description: "Increase in projects involving 2+ regions" },
      { metric: "Cost Efficiency", value: "-22%", description: "Reduction in workplace costs through optimized utilization" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600",
    ],
    quote: {
      text: "USER_ understood that culture isn't decoration—it's the operating system.",
      author: "Thomas Jakobsen",
      role: "Global Head of Workplace, MAERSK",
    },
    relatedProjects: ["lego-billund"],
  },
  "aec-hackathon": {
    id: "aec-hackathon",
    number: "04",
    client: "AEC Hackathon",
    title: "Behavioral Prediction Tool",
    subtitle: "ML-powered spatial design that predicts human behavior",
    year: "2024",
    outcome: "🏆 Best Overall",
    tags: ["PropTech", "Machine Learning", "Predictive Analytics"],
    accentColor: "#C5D5EC",
    heroImage: "https://images.unsplash.com/photo-1739054730201-4b6463484e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrJTIwYmx1ZSUyMHRlY2h8ZW58MXx8fHwxNzczMTQ0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "48-hour hackathon: Create a tool that helps architects predict how people will use spaces before construction.",
      context: "The AEC industry wastes billions on spaces that don't work because we design for imagined behaviors.",
    },
    approach: {
      title: "Rapid ML Prototyping",
      description: "Built a neural network trained on behavioral mapping data from 40+ real buildings.",
      methods: [
        { name: "Training Data Compilation", description: "Aggregated 200,000+ hours of observed human behavior data." },
        { name: "Spatial Feature Extraction", description: "Converted floor plans into machine-readable features using computer vision." },
        { name: "Predictive Model", description: "Trained a CNN to predict movement heat maps with 76% accuracy." },
      ],
    },
    insights: [
      { title: "Corners Are Magnetic", description: "Corners with 270° visibility attracted 3.2x more dwell time.", stat: "3.2x dwell time" },
      { title: "The Path Less Taken", description: "People choose non-direct routes 40% of the time if they offer better views.", stat: "40% scenic route" },
      { title: "Density Tipping Point", description: "Collaboration spaces decline when within 15m of areas exceeding 0.8 people/m².", stat: "15m buffer needed" },
    ],
    solution: {
      description: "Created a web-based tool where architects upload floor plans and receive real-time behavioral predictions.",
      interventions: [
        { title: "Behavioral Heat Mapping", description: "Visual overlay showing predicted movement density and dead spaces." },
        { title: "Intervention Suggestions", description: "AI-generated recommendations for spatial modifications." },
        { title: "Scenario Comparison", description: "Test multiple floor plan iterations side-by-side." },
      ],
    },
    impact: [
      { metric: "Hackathon Award", value: "🏆 Best Overall", description: "Selected as top project out of 42 teams" },
      { metric: "Prediction Accuracy", value: "76%", description: "Accuracy on held-out test data" },
      { metric: "Industry Interest", value: "12 firms", description: "Architecture firms expressing interest in pilots" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600",
    ],
    quote: {
      text: "This is the future of evidence-based design. Instead of guessing how people will use a space, we can predict it.",
      author: "Sarah Mitchell",
      role: "AEC Hackathon Judge & Partner at Gensler",
    },
    relatedProjects: ["novo-nordisk"],
  },
};

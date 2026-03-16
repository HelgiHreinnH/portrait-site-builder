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
    title: "Billund HQ — Atrium Experience",
    subtitle: "Full-scope project from user analytics to design manual",
    year: "2018–2020",
    outcome: "Full Scope",
    tags: ["People", "Buildings", "Technology"],
    accentColor: "#D5DEF4",
    heroImage: "https://images.unsplash.com/photo-1771908997889-6d043c4a9ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHN0dWRpbyUyMHdvcmtzcGFjZSUyMGRyYW1hdGljJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "LEGO's Billund headquarters needed a cohesive atrium experience that served employees, visitors, and the brand simultaneously.",
      context: "Lead project developer with full scope — from user analytics insights through usability framework to final design manual delivered to design team.",
    },
    approach: {
      title: "Analyse → Strategise → Design → Deliver",
      description: "Applied the full four-step method. Started with user analytics, built a usability framework, designed the experience concept, and delivered a complete design manual.",
      methods: [
        { name: "User Analytics", description: "Gathered and analysed usage patterns and behavioural data across the atrium space." },
        { name: "Usability Framework", description: "Developed a framework for evaluating and improving the atrium experience." },
        { name: "Design Manual", description: "Produced a comprehensive design manual for the design team to implement." },
      ],
    },
    insights: [
      { title: "All Three Fields", description: "This project sat at the intersection of people, buildings, and technology — requiring all three to work together." },
      { title: "Brief as Product", description: "The design manual itself was the primary deliverable — a clear, communicable brief that enabled others to build." },
      { title: "Data as Design Tool", description: "User analytics drove design decisions rather than assumptions about how the space should be used." },
    ],
    solution: {
      description: "A complete atrium experience framework — from user insights to a delivered design manual that gave the design team a clear, evidence-based direction.",
      interventions: [
        { title: "User Analytics Insights", description: "Evidence base drawn from real usage patterns." },
        { title: "Usability Framework", description: "Structured evaluation of the atrium experience against user needs." },
        { title: "Design Manual", description: "Final deliverable enabling the design team to execute with confidence." },
      ],
    },
    impact: [
      { metric: "Scope", value: "Full", description: "End-to-end from analysis to delivered design manual" },
      { metric: "Phases Led", value: "4/4", description: "Analyse, Strategise, Design, Deliver" },
      { metric: "Deliverable", value: "Manual", description: "Complete design manual handed to implementation team" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600",
    ],
    relatedProjects: ["barclays", "beumer"],
  },
  "barclays": {
    id: "barclays",
    number: "02",
    client: "Barclays Bank",
    title: "Employee Experience Strategy",
    subtitle: "International design strategy across three continents",
    year: "2016–2018",
    outcome: "10,000+ employees",
    tags: ["People", "Buildings"],
    accentColor: "#B8C9EE",
    heroImage: "https://images.unsplash.com/photo-1573306366674-5d42fa734860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBvZmZpY2UlMjBpbnRlcmlvciUyMHBlb3BsZSUyMHdvcmtpbmclMjBDb3BlbmhhZ2VuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMxNDQwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "Create a design strategy for employee experience across Barclays' London, New York, and Mumbai locations — 10,000+ employees.",
      context: "Working at Signal Architects. Role: analysing high-value strategic briefs and translating them into design briefs. The bank was pivoting into a more modern, future-proof organisation.",
    },
    approach: {
      title: "Analysis to Design Brief",
      description: "Worked with internal project teams who delivered strategic briefs and internal analysis. Translated these into concrete design briefs.",
      methods: [
        { name: "Strategic Brief Analysis", description: "Interpreted complex organisational strategy documents." },
        { name: "Cross-Location Coordination", description: "Managed design consistency across three continents." },
        { name: "Design Brief Creation", description: "Translated strategic intent into actionable design direction." },
      ],
    },
    insights: [
      { title: "Scale and Complexity", description: "10,000+ employees across three continents required a framework, not a single solution." },
      { title: "Strategic Translation", description: "The value was in translating high-level strategy into something a design team could act on." },
      { title: "Organisational Pivot", description: "The project supported Barclays' broader transformation from traditional to modern banking." },
    ],
    solution: {
      description: "Design briefs that translated organisational strategy into spatial and experience design across three global locations.",
      interventions: [
        { title: "London Strategy", description: "Employee experience framework for the UK headquarters." },
        { title: "New York Adaptation", description: "Localised design strategy for the US operations." },
        { title: "Mumbai Framework", description: "Culturally adapted employee experience design." },
      ],
    },
    impact: [
      { metric: "Employees Impacted", value: "10,000+", description: "Across three global locations" },
      { metric: "Locations", value: "3", description: "London, New York, Mumbai" },
      { metric: "Phases Led", value: "Analyse + Design", description: "Brief analysis and design brief creation" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600",
    ],
    relatedProjects: ["lego-billund", "beumer"],
  },
  "beumer": {
    id: "beumer",
    number: "03",
    client: "Beumer Group",
    title: "Activity-Based Workplace",
    subtitle: "Strategy, analysis, and design for a 580-person domicile",
    year: "2017–2018",
    outcome: "580 employees",
    tags: ["People", "Buildings"],
    accentColor: "#DCE8E6",
    heroImage: "https://images.unsplash.com/photo-1770944182416-911214039dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWVyc2slMjBzaGlwcGluZyUyMGluZHVzdHJpYWwlMjBkcmFtYXRpYyUyMHdpZGV8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "Design an activity-based workplace for Beumer Group's Aarhus domicile — 580 employees transitioning from traditional office layout.",
      context: "Working at Signal Architects. Full scope: overall strategy, capacity and needs analysis, and design concept.",
    },
    approach: {
      title: "Strategy to Design Concept",
      description: "Led overall strategy, capacity and needs analysis, and design concept development for the largest single workplace project in the portfolio.",
      methods: [
        { name: "Capacity Analysis", description: "Mapped current and future space needs against workforce patterns." },
        { name: "Needs Assessment", description: "Identified work modes and activity types across the organisation." },
        { name: "Design Concept", description: "Developed activity-based workplace concept from strategic foundations." },
      ],
    },
    insights: [
      { title: "Scale Matters", description: "580 employees in one location required a systematic approach to activity-based design." },
      { title: "Strategy First", description: "The design concept was only possible because the analysis and strategy phases were thorough." },
      { title: "Activity-Based Thinking", description: "Moving from assigned desks to activity-based working required organisational change, not just spatial change." },
    ],
    solution: {
      description: "A complete activity-based workplace strategy — from capacity analysis through design concept — enabling 580 employees to work in a new way.",
      interventions: [
        { title: "Overall Strategy", description: "Strategic framework for the transition to activity-based working." },
        { title: "Capacity & Needs Analysis", description: "Data-driven understanding of space requirements." },
        { title: "Design Concept", description: "Spatial concept translating strategy into a buildable design." },
      ],
    },
    impact: [
      { metric: "Employees", value: "580", description: "Largest single workplace project" },
      { metric: "Phases Led", value: "3/4", description: "Analyse, Strategise, Design" },
      { metric: "Approach", value: "Activity-Based", description: "Full transition from traditional to activity-based workplace" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600",
    ],
    relatedProjects: ["lego-billund", "barclays"],
  },
  "aec-hackathon": {
    id: "aec-hackathon",
    number: "04",
    client: "AEC Hackathon",
    title: "Projector — AI File Management",
    subtitle: "AI-powered file management tool for the AEC industry",
    year: "2025",
    outcome: "Buildings + Tech",
    tags: ["Buildings", "Technology"],
    accentColor: "#C5D5EC",
    heroImage: "https://images.unsplash.com/photo-1739054730201-4b6463484e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50JTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrJTIwYmx1ZSUyMHRlY2h8ZW58MXx8fHwxNzczMTQ0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "Build a tool that solves a real problem in the architecture, engineering, and construction industry — within a hackathon timeframe.",
      context: "The AEC industry struggles with file management across complex, multi-stakeholder projects. Projector uses AI to bring order to that chaos.",
    },
    approach: {
      title: "Rapid Problem-Solving",
      description: "Applied the same method at speed: identified the real problem, built a strategy, designed the interface, and delivered a working prototype.",
      methods: [
        { name: "Problem Identification", description: "Focused on file management — a universal pain point in AEC workflows." },
        { name: "AI Integration", description: "Used AI to automate file categorisation and retrieval." },
        { name: "Rapid Prototyping", description: "Built a working prototype within the hackathon timeframe." },
      ],
    },
    insights: [
      { title: "Real Problem, Simple Solution", description: "File management is unglamorous but costs the industry enormous time and money." },
      { title: "Method Scales Down", description: "The four-step method works at hackathon speed — the phases compress but the logic holds." },
      { title: "AI as Tool, Not Product", description: "AI works best when it solves a specific, well-understood problem." },
    ],
    solution: {
      description: "Projector — an AI-powered file management tool that helps AEC teams find, organise, and manage project files intelligently.",
      interventions: [
        { title: "AI File Categorisation", description: "Automatic classification of project files by type, discipline, and phase." },
        { title: "Intelligent Search", description: "Natural language search across project documentation." },
        { title: "Working Prototype", description: "Functional tool demonstrated at the hackathon." },
      ],
    },
    impact: [
      { metric: "Outcome", value: "Prototype", description: "Working tool built and demonstrated" },
      { metric: "Industry", value: "AEC", description: "Architecture, Engineering, Construction" },
      { metric: "Technology", value: "AI", description: "AI-powered file management and search" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600",
    ],
    relatedProjects: ["ubiqisense", "felles"],
  },
  "ubiqisense": {
    id: "ubiqisense",
    number: "05",
    client: "Ubiqisense",
    title: "Occupancy Platform UI/UX",
    subtitle: "Interface design for an occupancy sensor data platform",
    year: "2020–2021",
    outcome: "People + Tech",
    tags: ["People", "Technology"],
    accentColor: "#D5DEF4",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080",
    brief: {
      challenge: "Design the user interface for a platform that visualises occupancy sensor data — making complex spatial data accessible and actionable.",
      context: "Ubiqisense builds occupancy sensors. The platform needed a UI that translated raw sensor data into insights that workplace managers could act on.",
    },
    approach: {
      title: "User Research to Interface Design",
      description: "Gathered and evaluated user requirements. Designed UI elements, mockups, and prototypes for the data visualisation platform.",
      methods: [
        { name: "User Requirements", description: "Interviews and observation to understand what workplace managers actually need from the data." },
        { name: "Information Architecture", description: "Structured complex sensor data into navigable, meaningful views." },
        { name: "Prototyping", description: "Iterative mockups and prototypes tested with real users." },
      ],
    },
    insights: [
      { title: "Data Needs Context", description: "Raw occupancy numbers are meaningless without spatial and temporal context." },
      { title: "Different Users, Different Views", description: "Facility managers, workplace strategists, and executives need different representations of the same data." },
      { title: "Actionable Over Beautiful", description: "The interface needed to drive decisions, not just display information." },
    ],
    solution: {
      description: "A user-centred interface for occupancy data — making sensor information accessible to the people who make workplace decisions.",
      interventions: [
        { title: "Dashboard Design", description: "Overview dashboards for different user roles." },
        { title: "Data Visualisation", description: "Spatial and temporal views of occupancy patterns." },
        { title: "Actionable Insights", description: "Interface elements that connect data to decisions." },
      ],
    },
    impact: [
      { metric: "Role", value: "UI/UX", description: "Lead interface designer" },
      { metric: "Phases Led", value: "Analyse + Design", description: "User research and interface design" },
      { metric: "Output", value: "Platform UI", description: "Complete interface for occupancy data platform" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600",
    ],
    relatedProjects: ["aec-hackathon", "felles"],
  },
  "felles": {
    id: "felles",
    number: "06",
    client: "Felles",
    title: "Property Platform",
    subtitle: "Digital product for the property and real estate market",
    year: "2025–",
    outcome: "People + Tech",
    tags: ["People", "Technology"],
    accentColor: "#DCE8E6",
    heroImage: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1080",
    brief: {
      challenge: "Build a digital platform for the property and real estate market — from product vision to working application.",
      context: "An independent product development project applying the full method to digital product building.",
    },
    approach: {
      title: "Full Product Development",
      description: "Product vision, roadmap, feature strategy, and development — the four-step method applied to software.",
      methods: [
        { name: "Product Strategy", description: "Vision, roadmap, and feature prioritisation." },
        { name: "UX Design", description: "User flows, wireframes, and interface design." },
        { name: "Development", description: "Building the working application." },
      ],
    },
    insights: [
      { title: "Same Method, Different Medium", description: "The four steps work for digital products exactly as they do for physical spaces." },
      { title: "Brief-Making Transfers", description: "The discipline of making clear briefs is as valuable in software as in architecture." },
      { title: "Independent Product", description: "Building without a client forces clarity about what actually matters." },
    ],
    solution: {
      description: "A property platform built from scratch — product strategy through to working application.",
      interventions: [
        { title: "Product Vision", description: "Clear positioning and value proposition for the platform." },
        { title: "Feature Strategy", description: "Prioritised roadmap based on user needs." },
        { title: "Working Application", description: "Built and launched digital product." },
      ],
    },
    impact: [
      { metric: "Status", value: "Active", description: "Ongoing product development" },
      { metric: "Phases", value: "All 4", description: "Full method applied to digital product" },
      { metric: "Type", value: "Own Product", description: "Independent product development" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600",
    ],
    relatedProjects: ["ubiqisense", "aec-hackathon"],
  },
  "bygningsstyrelsen": {
    id: "bygningsstyrelsen",
    number: "07",
    client: "Bygningsstyrelsen",
    title: "Government Outplacement",
    subtitle: "Workplace strategy for a politically driven relocation programme",
    year: "2016–2018",
    outcome: "300+ employees",
    tags: ["People", "Buildings"],
    accentColor: "#B8C9EE",
    heroImage: "https://images.unsplash.com/photo-1770944182416-911214039dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWVyc2slMjBzaGlwcGluZyUyMGluZHVzdHJpYWwlMjBkcmFtYXRpYyUyMHdpZGV8ZW58MXx8fHwxNzczMTQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brief: {
      challenge: "Create workable environments for government employees being relocated from Copenhagen to regional offices across Denmark — a politically driven decision.",
      context: "Working at Signal Architects. Two phases: satellite location and main office. The role required stakeholder management in a sensitive political context.",
    },
    approach: {
      title: "Strategy Under Constraint",
      description: "The political decision was fixed. The task was to make the best workplace possible for those who would work in the new environments and structures.",
      methods: [
        { name: "Stakeholder Management", description: "Navigating a politically sensitive context with multiple stakeholder groups." },
        { name: "Capacity Analysis", description: "Understanding space needs for restructured teams across new locations." },
        { name: "Activity-Based Design", description: "Designing for teams distributed across satellite and main locations." },
      ],
    },
    insights: [
      { title: "Context Awareness", description: "Understanding the political and organisational context was as important as the spatial analysis." },
      { title: "Communication is Design", description: "In a sensitive project, how you communicate the strategy matters as much as the strategy itself." },
      { title: "Pragmatic Focus", description: "When you can't change the decision, focus on making the best outcome within the constraints." },
    ],
    solution: {
      description: "Workplace strategies for satellite and main office locations — pragmatic, people-centred solutions within a politically fixed framework.",
      interventions: [
        { title: "Satellite Location", description: "First phase: workplace strategy for the regional satellite office." },
        { title: "Main Office", description: "Second phase: strategy and design for the primary Copenhagen location." },
        { title: "Communication Strategy", description: "Clear, sensitive communication of changes to affected employees." },
      ],
    },
    impact: [
      { metric: "Employees", value: "300+", description: "Government employees across multiple locations" },
      { metric: "Phases", value: "2", description: "Satellite location and main office" },
      { metric: "Key Learning", value: "Stakeholders", description: "Complex stakeholder management in political context" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600",
    ],
    relatedProjects: ["beumer", "barclays"],
  },
};

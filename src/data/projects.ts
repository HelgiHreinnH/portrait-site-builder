import archiArImg from "@/assets/project-archi-ar.jpg";
import aPlaceToWorkImg from "@/assets/project-a-place-to-work.jpg";
import kvittImg from "@/assets/project-kvitt.jpg";
import htasImg from "@/assets/project-htas.jpg";
import formImg from "@/assets/project-form.jpg";
import clnImg from "@/assets/project-cln.jpg";
import fellesImg from "@/assets/project-felles.jpg";
import aecHackathonImg from "@/assets/project-aec-hackathon.jpg";
import legoImg from "@/assets/project-lego.jpg";
import ubiqisenseImg from "@/assets/project-ubiqisense.jpg";
import barclaysImg from "@/assets/project-barclays.jpg";
import beumerImg from "@/assets/project-beumer.jpg";

export interface ProjectData {
  id: string;
  number: string;
  client: string;
  clientLogo?: string;
  title: string;
  subtitle: string;
  year: string;
  outcome: string;
  tags: string[];
  category: "A" | "B" | "C";
  categoryLabel: string;
  accentColor: string;
  heroImage: string;
  phasesLed: ("Analyse" | "Strategise" | "Design" | "Deliver")[];
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
  gallery: Array<string | { src: string; caption: string }>;
  quote?: { text: string; author: string; role: string };
  relatedProjects?: string[];
  tier: 1 | 2 | 3;
}

export type GalleryItem = { src: string; caption: string };

export function getGallerySrc(item: string | GalleryItem): string {
  return typeof item === "string" ? item : item.src;
}

export function getGalleryCaption(item: string | GalleryItem): string | undefined {
  return typeof item === "string" ? undefined : item.caption;
}

const UBI_BUCKET = "https://pcubpqskliewraygeosc.supabase.co/storage/v1/object/public/projects/Ubiqisense";
const IMG_UBIQISENSE_LOGO = `${UBI_BUCKET}/logo.png`;
const FELLES_BUCKET = "https://pcubpqskliewraygeosc.supabase.co/storage/v1/object/public/projects/Felles";

export const projects: Record<string, ProjectData> = {
  "felles": {
    id: "felles",
    number: "01",
    client: "Felles",
    title: "Shared Living Platform",
    subtitle: "UX/UI design for a shared housing community app — user flows, interface, and architecture from scratch",
    year: "2025–",
    outcome: "Product",
    tags: ["People", "Technology"],
    category: "B",
    categoryLabel: "Digital Product",
    accentColor: "#DCE8E6",
    heroImage: fellesImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Build a digital platform for property and facilities management — serving building managers and residents with tasks, maintenance, shared spaces, and communication in one place.",
      context: "An independent product development project applying the full method to digital product building. Built with Lovable and Supabase.",
    },
    approach: {
      title: "Full Product Development",
      description: "Product vision, roadmap, feature strategy, and development — the four-step method applied to software.",
      methods: [
        { name: "Product Strategy", description: "Vision, roadmap, and feature prioritisation based on real user needs." },
        { name: "UX Design", description: "User flows, wireframes, and interface design across multiple phases." },
        { name: "Development", description: "Building the working application — iterating through real use." },
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
      { src: `${FELLES_BUCKET}/felles%20landing%20page.png`, caption: "Landing page — main entry point introducing the Felles shared living platform" },
      { src: `${FELLES_BUCKET}/felles%20landing%20carousel.png`, caption: "Landing page — carousel section showcasing key platform features and community highlights" },
      { src: `${FELLES_BUCKET}/Felle%20dashboard%20Fase%20tavle.png`, caption: "Dashboard — phase board view for tracking project milestones and task progression" },
      { src: `${FELLES_BUCKET}/Felles%20timeline%20dashboard.png`, caption: "Timeline dashboard — chronological overview of activities, events, and maintenance schedules" },
    ],
    relatedProjects: ["kvitt", "a-place-to-work"],
    tier: 1,
  },
  "aec-hackathon": {
    id: "aec-hackathon",
    number: "02",
    client: "AEC Hackathon",
    title: "Projector — Best Overall Project",
    subtitle: "An AI-assisted tool that lets architects query their own projects in natural language. Built in 48 hours.",
    year: "2025",
    outcome: "Buildings + Tech",
    tags: ["Buildings", "Technology"],
    category: "B",
    categoryLabel: "Digital Product / Tool",
    accentColor: "#C5D5EC",
    heroImage: aecHackathonImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Build a tool that solves a real problem in the architecture, engineering, and construction industry — within a hackathon timeframe.",
      context: "The AEC industry struggles with file management across complex, multi-stakeholder projects. Projector uses AI to bring order to that chaos. Built with team (Helgi, Ash, Nits).",
    },
    approach: {
      title: "Rapid Problem-Solving",
      description: "Applied the same method at speed: identified the real problem, built a strategy, designed the interface, and delivered a working prototype.",
      methods: [
        { name: "Problem Identification", description: "Focused on file management — a universal pain point in AEC workflows." },
        { name: "AI Integration", description: "Files indexed into a JSON 'Librarian'; an LLM returns exact file paths from natural language queries." },
        { name: "Rapid Prototyping", description: "Built a working proof of concept within the hackathon timeframe." },
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
        { title: "Natural Language Search", description: "Plain language queries return exact file paths from complex project structures." },
        { title: "Working Prototype", description: "Functional tool demonstrated at the hackathon." },
      ],
    },
    impact: [
      { metric: "Outcome", value: "Prototype", description: "Working tool built and demonstrated" },
      { metric: "Industry", value: "AEC", description: "Architecture, Engineering, Construction" },
      { metric: "Technology", value: "AI + LLM", description: "AI-powered file management and search" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600",
    ],
    relatedProjects: ["ubiqisense", "archi-ar"],
    tier: 1,
  },
  "archi-ar": {
    id: "archi-ar",
    number: "03",
    client: "Archi AR",
    title: "AR Placement Tool for Architects",
    subtitle: "Augmented reality tool for placing architectural models in physical space",
    year: "2024–",
    outcome: "Concept",
    tags: ["Buildings", "Technology"],
    category: "B",
    categoryLabel: "Digital Tool",
    accentColor: "#D5DEF4",
    heroImage: archiArImg,
    phasesLed: ["Analyse", "Strategise", "Design"],
    brief: {
      challenge: "Create a tool that lets architects place and view 3D models in real physical space via mobile AR — removing the need for physical models or renders.",
      context: "QR markers placed in a room trigger the corresponding 3D model to appear at scale via AR on a mobile device. Concept stage — framed honestly as early development.",
    },
    approach: {
      title: "Concept to Prototype",
      description: "Identified the gap between architectural intention and spatial communication. Designed a tool that bridges the two using accessible AR technology.",
      methods: [
        { name: "Use Case Definition", description: "Architect on site needs to communicate spatial proposals without physical models." },
        { name: "AR Technology Research", description: "Evaluated WebAR and native approaches for accessibility and quality." },
        { name: "Concept Design", description: "Interface and interaction design for the QR-to-model workflow." },
      ],
    },
    insights: [
      { title: "Communication Gap", description: "Architects struggle to communicate spatial ideas in the spaces they're designing for." },
      { title: "Accessible AR", description: "The value is in making AR simple enough that any architect can use it on-site." },
      { title: "Honest Framing", description: "A clean concept is stronger than a vague prototype. Frame it as what it is." },
    ],
    solution: {
      description: "An AR placement tool that lets architects scan a QR marker and see their 3D model at scale in the actual space.",
      interventions: [
        { title: "QR Marker System", description: "Physical markers that trigger specific 3D models in the AR view." },
        { title: "Mobile AR Interface", description: "Simple, intuitive interface for viewing models in space." },
        { title: "Concept Documentation", description: "Clear concept documentation for development and communication." },
      ],
    },
    impact: [
      { metric: "Stage", value: "Concept", description: "Early prototype and concept stage" },
      { metric: "Problem", value: "Spatial Communication", description: "Bridging the gap between plan and space" },
      { metric: "Technology", value: "AR", description: "Augmented reality for architectural visualisation" },
    ],
    gallery: [
      archiArImg,
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
    ],
    relatedProjects: ["aec-hackathon", "felles"],
    tier: 1,
  },
  "lego-billund": {
    id: "lego-billund",
    number: "04",
    client: "Global Brand",
    title: "Employee Experience Strategy & Design Manual",
    subtitle: "Employee experience strategy and design manual for a new global headquarters. Zone strategy across three floors — from collective commons to individual workplaces.",
    year: "2016–2020",
    outcome: "Full Scope",
    tags: ["People", "Buildings", "Technology"],
    category: "A",
    categoryLabel: "Physical + Strategy",
    accentColor: "#D5DEF4",
    heroImage: legoImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Develop the atrium experience at a new global headquarters — a complete programme spanning floor plans across 3 floors, zone strategy, and user experience.",
      context: "Freelance via LAIKA rumdesign. Full scope: from user analytics insights through usability framework to final design manual. Workshop process from scoping sessions through detailed design. Delivery at CEO level.",
    },
    approach: {
      title: "Analyse → Strategise → Design → Deliver",
      description: "Applied the full four-step method. Zone strategy ('We – Us – Me') across 3 floors, cube programme, and a full User Experience Walk Through.",
      methods: [
        { name: "User Analytics", description: "Gathered and analysed usage patterns and behavioural data across the atrium space." },
        { name: "Zone Strategy", description: "'We – Us – Me' framework dividing space by social mode across 3 floors." },
        { name: "Design Manual", description: "Comprehensive design manual for the design team to implement." },
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
    tier: 3,
  },
  "a-place-to-work": {
    id: "a-place-to-work",
    number: "05",
    client: "A Place to Work",
    title: "Find Your Next Workspace",
    subtitle: "A platform connecting professionals with office facilities. Product strategy, UX, and interface from idea to launch.",
    year: "2024–",
    outcome: "Product",
    tags: ["People", "Technology"],
    category: "B",
    categoryLabel: "Digital Product",
    accentColor: "#DCE8E6",
    heroImage: aPlaceToWorkImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Build a facilities discovery app for remote and hybrid workers — find, favourite, and manage workspaces based on individual needs.",
      context: "Users can discover cafes, coworking spaces, libraries, and other workspaces. Features include facility search, favourites, user settings, facility detail view, and a feedback mechanism. Built on Supabase.",
    },
    approach: {
      title: "Need → Concept → Features → Build",
      description: "Identified the user need (remote workers without a fixed office), designed features around real behaviour, and built a working mobile-first app.",
      methods: [
        { name: "User Need Analysis", description: "Understanding how remote workers actually find and choose workspaces." },
        { name: "Feature Design", description: "Search, favourites, detailed facility views, and feedback loops." },
        { name: "Mobile-First Build", description: "Designed and built for mobile use — on the move, in the moment." },
      ],
    },
    insights: [
      { title: "Behaviour-Led Design", description: "Remote workers don't plan workspaces in advance — they decide in the moment." },
      { title: "Simple > Feature-Rich", description: "The core value is quick discovery, not exhaustive information." },
      { title: "Product Thinking", description: "Applying the same rigour to a personal product as to a client brief." },
    ],
    solution: {
      description: "A mobile-first workspace discovery app — search, filter, favourite, and manage workspaces wherever you are.",
      interventions: [
        { title: "Facility Search", description: "Location-based discovery of nearby workspaces." },
        { title: "Favourites & History", description: "Save and revisit places that work for you." },
        { title: "Feedback System", description: "User-generated insights about workspace quality." },
      ],
    },
    impact: [
      { metric: "Type", value: "App", description: "Mobile-first web application" },
      { metric: "Phases", value: "All 4", description: "Full product development cycle" },
      { metric: "Status", value: "In Dev", description: "Active development" },
    ],
    gallery: [
      aPlaceToWorkImg,
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600",
    ],
    relatedProjects: ["felles", "kvitt"],
    tier: 2,
  },
  "kvitt": {
    id: "kvitt",
    number: "06",
    client: "Kvitt",
    title: "Scan. Archive. Done.",
    subtitle: "An iOS app for receipt management with Google Vision OCR. Built in React Native, TypeScript, and Supabase. Fully functional in the App Store.",
    year: "2024–",
    outcome: "Product",
    tags: ["People", "Technology"],
    category: "B",
    categoryLabel: "Digital Product",
    accentColor: "#D5DEF4",
    heroImage: kvittImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Build a personal receipt management app — scan physical receipts, extract structured data automatically, and archive them for warranty tracking, resale documentation, and purchase history.",
      context: "Uses Google Vision API for OCR. Extracts store, date, total, items, and warranty info. Mobile-first, built with React + TypeScript + Supabase + Capacitor. The most technically complete personal project.",
    },
    approach: {
      title: "Problem → Technology → Product",
      description: "Identified a real consumer problem (lost receipts = lost rights), matched it to available technology (OCR), and built a complete product around the core flow.",
      methods: [
        { name: "Consumer Rights Research", description: "Understanding what rights people lose when receipts are lost." },
        { name: "OCR Integration", description: "Google Vision API for accurate receipt data extraction." },
        { name: "Full Product Build", description: "Dashboard, scan, archive, search, stats, and gamification." },
      ],
    },
    insights: [
      { title: "Rights, Not Receipts", description: "The product protects consumer rights — receipts are just the mechanism." },
      { title: "Technology Serves Purpose", description: "OCR is only valuable because it solves a specific, real problem." },
      { title: "Complete Product Thinking", description: "Stats, badges, and gamification turn a utility into something people return to." },
    ],
    solution: {
      description: "Kvitt — scan, extract, archive, and search your receipts. Protect your consumer rights without thinking about it.",
      interventions: [
        { title: "Receipt Scanner", description: "Snap a photo → OCR extracts structured data automatically." },
        { title: "Smart Archive", description: "Searchable receipt archive with warranty tracking." },
        { title: "Stats & Engagement", description: "Purchase history stats and badges to encourage continued use." },
      ],
    },
    impact: [
      { metric: "Tech Stack", value: "Full", description: "React, Supabase, Google Vision API, Capacitor" },
      { metric: "Phases", value: "All 4", description: "Complete product development" },
      { metric: "Status", value: "Built", description: "Fully functional application" },
    ],
    gallery: [
      kvittImg,
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
    ],
    relatedProjects: ["felles", "a-place-to-work"],
    tier: 1,
  },
  "ubiqisense": {
    id: "ubiqisense",
    number: "07",
    client: "Ubiqisense",
    clientLogo: IMG_UBIQISENSE_LOGO,
    title: "Data From Sensor to Decision",
    subtitle: "UI design for an occupancy sensor platform. Complex spatial data systems translated into clear, actionable interfaces.",
    year: "2020–2021",
    outcome: "Data",
    tags: ["People", "Technology"],
    category: "B",
    categoryLabel: "Digital Product",
    accentColor: "#D5DEF4",
    heroImage: ubiqisenseImg,
    phasesLed: ["Analyse", "Design"],
    brief: {
      challenge: "Design the user interface for a platform that visualises occupancy sensor data — making complex spatial data accessible and actionable.",
      context: "Employed at Ubiqisense, 2020–2021. The platform collects real-time data from sensors throughout office buildings and presents it as actionable dashboards for space planners and facility managers.",
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
      { src: `${UBI_BUCKET}/Figma%20design%20-%20Ubi%20NEW%20Landing.pngDashboard.png`, caption: "Landing page and dashboard — main platform overview" },
      { src: `${UBI_BUCKET}/Figma%20design%20-%20Ubi%20NEW%20Landing.pngDashboard-1.png`, caption: "Dashboard variant — detailed occupancy data views" },
      { src: `${UBI_BUCKET}/Figma%20design%20-%20Ubi%20NEW%20Landing.pngDashboard-2.png`, caption: "Dashboard variant — alternative data layout" },
      { src: `${UBI_BUCKET}/01.1%20-%20Dashboard_%20History%20Log%20view.png`, caption: "History log view — temporal occupancy data exploration" },
      { src: `${UBI_BUCKET}/01.1%20-%20Dashboard_%20History%20Log%20view%202.png`, caption: "History log view — extended timeline analysis" },
      { src: `${UBI_BUCKET}/Screenshot%202024-10-11%20at%2013.58.24.jpeg.png`, caption: "Platform screenshot — real-world usage context" },
    ],
    relatedProjects: ["aec-hackathon", "felles"],
    tier: 2,
  },
  "htas": {
    id: "htas",
    number: "08",
    client: "Global Enterprise",
    title: "Future Workplace for 300 Employees",
    subtitle: "Workplace analysis and strategy for a large Danish organisation. Quantitative and qualitative method. From data to recommendation.",
    year: "2016–2018",
    outcome: "Strategy",
    tags: ["People", "Buildings"],
    category: "C",
    categoryLabel: "Strategy & Process",
    accentColor: "#B8C9EE",
    heroImage: htasImg,
    phasesLed: ["Analyse", "Strategise"],
    brief: {
      challenge: "Take a complex, high-stakes workplace brief for a large Danish industrial organisation and deliver a structured strategic recommendation.",
      context: "The report format itself is the deliverable — not a space or a product. Demonstrates the ability to analyse systematically and present a clear, actionable strategy.",
    },
    approach: {
      title: "Analyse → Strategise → Report → Recommend",
      description: "Systematic analysis of a complex organisational situation, translated into a structured strategic report with clear recommendations.",
      methods: [
        { name: "Organisational Analysis", description: "Understanding the company's structure, culture, and spatial needs." },
        { name: "Strategic Framework", description: "Building a recommendation framework from analytical findings." },
        { name: "Report Delivery", description: "Structured document communicating findings and recommendations." },
      ],
    },
    insights: [
      { title: "Report as Deliverable", description: "Sometimes the strategy document is the product — not a space, not a building." },
      { title: "Complexity Management", description: "A global company requires frameworks that simplify without losing nuance." },
      { title: "Analytical Rigour", description: "The value is in the quality of analysis, not in the number of pages." },
    ],
    solution: {
      description: "A strategic workplace report that translated complex organisational analysis into clear, actionable recommendations.",
      interventions: [
        { title: "Situation Analysis", description: "Comprehensive analysis of current state and future needs." },
        { title: "Strategic Framework", description: "Structured approach to workplace strategy recommendations." },
        { title: "Executive Report", description: "Clear, communicable document for decision-makers." },
      ],
    },
    impact: [
      { metric: "Type", value: "Report", description: "Strategic recommendation document" },
      { metric: "Client Scale", value: "Global", description: "Large Danish industrial organisation" },
      { metric: "Phases Led", value: "Analyse + Strategise", description: "Analysis and strategic recommendation" },
    ],
    gallery: [
      htasImg,
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600",
    ],
    relatedProjects: ["barclays", "beumer"],
    tier: 3,
  },
  "barclays": {
    id: "barclays",
    number: "09",
    client: "International Finance",
    title: "One Strategy. Three Cities. 10,000 People.",
    subtitle: "Employee experience strategy for an international financial organisation. Three global locations. From internal analysis to global design brief.",
    year: "2016–2018",
    outcome: "10,000+",
    tags: ["People", "Buildings"],
    category: "C",
    categoryLabel: "Strategy & Process",
    accentColor: "#B8C9EE",
    heroImage: barclaysImg,
    phasesLed: ["Analyse", "Design"],
    brief: {
      challenge: "Develop an employee experience strategy across three global locations — 10,000+ employees. Part of a major global key account.",
      context: "Working at Signal Architects as part of the first team to develop the workplace and service design blueprint. The organisation was pivoting toward a more modern, data-driven culture.",
    },
    approach: {
      title: "Analysis to Design Brief",
      description: "Worked with internal project teams delivering strategic briefs and internal analysis. Translated these into concrete design briefs for three global locations.",
      methods: [
        { name: "Strategic Brief Analysis", description: "Interpreted complex organisational strategy documents." },
        { name: "Cross-Location Coordination", description: "Managed design consistency across three continents." },
        { name: "Design Brief Creation", description: "Translated strategic intent into actionable design direction." },
      ],
    },
    insights: [
      { title: "Scale and Complexity", description: "10,000+ employees across three continents required a framework, not a single solution." },
      { title: "Strategic Translation", description: "The value was in translating high-level strategy into something a design team could act on." },
      { title: "Organisational Pivot", description: "The project supported a broader transformation from traditional to modern working culture." },
    ],
    solution: {
      description: "Design briefs that translated organisational strategy into spatial and experience design across three global locations.",
      interventions: [
        { title: "HQ Strategy", description: "Employee experience framework for the main headquarters." },
        { title: "Regional Adaptation", description: "Localised design strategy for regional operations." },
        { title: "Global Framework", description: "Culturally adapted employee experience design." },
      ],
    },
    impact: [
      { metric: "Employees", value: "10,000+", description: "Across three global locations" },
      { metric: "Locations", value: "3", description: "Three major international offices" },
      { metric: "Phases Led", value: "Analyse + Design", description: "Brief analysis and design brief creation" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600",
    ],
    relatedProjects: ["lego-billund", "htas"],
    tier: 3,
  },
  "form": {
    id: "form",
    number: "10",
    client: "FORM",
    title: "Danish Craft as Digital-First Product",
    subtitle: "Product page and brand for a collection of handmade wooden furniture. Designed, built, and communicated from the ground up.",
    year: "2023–2025",
    outcome: "Product",
    tags: ["Buildings", "Technology"],
    category: "A",
    categoryLabel: "Physical Design",
    accentColor: "#DCE8E6",
    heroImage: formImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Design a series of workplace-specific furniture — desks, acoustic screens, and phone booths — that is as sustainable as possible without sacrificing functionality or aesthetic quality.",
      context: "Personal / independent project. The FORM series includes office desks, acoustic screens (desk and floor-standing), and phone booths. A live Webflow site exists at form-shop.webflow.io.",
    },
    approach: {
      title: "Gap → Brief → Design → Product",
      description: "Identified a gap in sustainable workplace furniture, created a design brief around material honesty and functionality, and developed a complete product series.",
      methods: [
        { name: "Sustainability Research", description: "Material analysis and sustainable manufacturing approaches." },
        { name: "Product Design", description: "Full product series: desk, acoustic screen, phone booth." },
        { name: "Publication", description: "Professional renders and a live Webflow store." },
      ],
    },
    insights: [
      { title: "Design for Access", description: "Sustainability is meaningless if the product isn't functional and desirable." },
      { title: "Series Thinking", description: "A product series creates a coherent design language that individual products cannot." },
      { title: "End-to-End Ownership", description: "From identifying the gap to publishing a product store — complete product lifecycle." },
    ],
    solution: {
      description: "FORM — a series of sustainable workplace furniture designed with material honesty, functional precision, and aesthetic quality.",
      interventions: [
        { title: "Office Desk", description: "Sustainable standing desk with clean material choices." },
        { title: "Acoustic Screens", description: "Desk-mounted and floor-standing options for open offices." },
        { title: "Phone Booth", description: "Private workspace unit designed for sustainability." },
      ],
    },
    impact: [
      { metric: "Products", value: "3", description: "Desk, acoustic screen, phone booth" },
      { metric: "Status", value: "Published", description: "Live Webflow store and professional renders" },
      { metric: "Approach", value: "Sustainable", description: "Sustainability-first design philosophy" },
    ],
    gallery: [
      formImg,
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600",
    ],
    relatedProjects: ["cln", "lego-billund"],
    tier: 3,
  },
  "cln": {
    id: "cln",
    number: "11",
    client: "Circular Library Network",
    title: "Modular Equipment for Commercial Real Estate",
    subtitle: "A product and service design for circular equipment sharing in the property industry. From brief to live platform.",
    year: "2023–",
    outcome: "Open Source",
    tags: ["Buildings", "Technology"],
    category: "A",
    categoryLabel: "Physical Design / Open Source",
    accentColor: "#D5DEF4",
    heroImage: clnImg,
    phasesLed: ["Analyse", "Strategise", "Design", "Deliver"],
    brief: {
      challenge: "Design a modular, open-source sharing library unit for Circular Library Network — a platform for community sharing infrastructure using smart locker-based systems.",
      context: "The physical design is delivered as open-source CNC files that any building owner or manufacturer can download and build. Live on circularlibrary.network.",
    },
    approach: {
      title: "Brief → Design → Open Source → Build",
      description: "Designed for openness: the CNC files are published so anyone can manufacture the unit. Design is the product, but access is the mission.",
      methods: [
        { name: "Modular Design", description: "Unit designed for flexible configuration and easy manufacturing." },
        { name: "CNC File Production", description: "Manufacturing-ready files published as open source." },
        { name: "Client Collaboration", description: "Ongoing collaboration with CLN for use case development." },
      ],
    },
    insights: [
      { title: "Design for Access", description: "This isn't just product design — it's design for open access. Anyone can build it." },
      { title: "Open Source Architecture", description: "Applying open-source principles to physical product design." },
      { title: "Community Infrastructure", description: "The unit serves a social purpose: enabling sharing at the building level." },
    ],
    solution: {
      description: "A modular sharing library unit — designed for CNC manufacturing and published as open-source files for community use.",
      interventions: [
        { title: "Physical Design", description: "Modular unit designed for smart locker-based sharing." },
        { title: "Open-Source CNC Files", description: "Manufacturing files available for free download." },
        { title: "Live Implementation", description: "Design visible as a live use case on the CLN website." },
      ],
    },
    impact: [
      { metric: "Type", value: "Open Source", description: "CNC files freely available" },
      { metric: "Status", value: "Live", description: "Design live, files published, client active" },
      { metric: "Philosophy", value: "Access", description: "Designed to be built by anyone, anywhere" },
    ],
    gallery: [
      clnImg,
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600",
    ],
    relatedProjects: ["form", "lego-billund"],
    tier: 3,
  },
  "beumer": {
    id: "beumer",
    number: "12",
    client: "Industrial Group",
    title: "Activity-Based Workplace",
    subtitle: "Strategy, analysis, and design for a 580-person domicile for a large industrial organisation",
    year: "2017–2018",
    outcome: "580",
    tags: ["People", "Buildings"],
    category: "A",
    categoryLabel: "Physical + Strategy",
    accentColor: "#DCE8E6",
    heroImage: beumerImg,
    phasesLed: ["Analyse", "Strategise", "Design"],
    brief: {
      challenge: "Design an activity-based workplace for a large industrial organisation's Aarhus domicile — 580 employees transitioning from traditional office layout.",
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
    tier: 2,
  },
};

// Ordered list for display in bento grid
export const projectOrder = [
  "felles", "kvitt", "aec-hackathon", "archi-ar",
  "ubiqisense", "a-place-to-work", "beumer", "form",
  "lego-billund", "barclays", "htas", "cln",
];

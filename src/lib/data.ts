export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  heroHeadline: string;
  heroDescription: string;
  deliverables: string[];
  workShowcase: {
    title: string;
    description: string;
    metric: string;
    tag: string;
  }[];
  whyNeeded: {
    problemTitle: string;
    problemDescription: string;
    businessOutcome: string;
  }[];
  whyNeominds: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  isMinimal?: boolean;
}

export interface ScrollStackCard {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  points: {
    headline: string;
    detail: string;
  }[];
  ctaText?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  whatWeBuilt: string;
  outcome: string;
  metrics: {
    stat: string;
    label: string;
  }[];
  tags: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  serviceUsed: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface WhyNeomindsPoint {
  number: string;
  title: string;
  description: string;
}

// 7 Required Core Services
export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription:
      "High-performance, editorial websites engineered for conversion, speed, and modern brand authority.",
    heroHeadline: "Websites engineered for speed, clarity, and business results.",
    heroDescription:
      "We design and build bespoke web platforms that load instantly, communicate your technical value clearly, and convert qualified business buyers.",
    deliverables: [
      "Custom Next.js & React architecture",
      "Tailored typography and clean design systems",
      "Search engine optimization and Core Web Vitals excellence",
      "Full CMS and headless integration",
      "Complete code ownership with zero lock-in",
    ],
    workShowcase: [
      {
        title: "Enterprise B2B Infrastructure Site",
        description:
          "Engineered a high-performance web platform for a cloud infrastructure provider, achieving perfect 100 Lighthouse performance scores.",
        metric: "100/100",
        tag: "Core Web Vitals",
      },
      {
        title: "Global Logistics Web Portal",
        description:
          "Redesigned an international freight company site to clarify service tiers and streamline quote requests.",
        metric: "3.2x",
        tag: "Inquiry Growth",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Slow, generic website templates that repel serious buyers",
        problemDescription:
          "Generic templates often suffer from bloated scripts, slow load times, and cluttered layouts that undermine trust with enterprise customers.",
        businessOutcome:
          "A clean, bespoke web platform that establishes immediate authority and loads in under one second.",
      },
      {
        problemTitle: "Poor conversion architecture and unclear value messaging",
        problemDescription:
          "Visitors cannot quickly understand what you build, why it matters, or how to engage your team.",
        businessOutcome:
          "Structured information hierarchy that guides decision-makers directly toward booking a consultation.",
      },
    ],
    whyNeominds: [
      {
        title: "Engineering Precision",
        description:
          "We treat websites as serious software products, writing clean code with strict type safety and optimized asset delivery.",
      },
      {
        title: "Conversion-Focused Information Architecture",
        description:
          "Every section is structured around business logic, guiding users from initial problem recognition to conversion.",
      },
      {
        title: "Zero Dependency on Fragile Builders",
        description:
          "No brittle visual builders that break with updates. You receive clean, maintainable code you fully own.",
      },
    ],
    faqs: [
      {
        question: "What technology stack do you use for website development?",
        answer:
          "We primarily build with Next.js, React, TypeScript, and modern CSS architecture. This gives your website exceptional performance, SEO advantages, and long-term maintainability.",
      },
      {
        question: "How long does a website development project take?",
        answer:
          "Most bespoke website projects are delivered within 2 to 4 weeks depending on scope, content readiness, and custom integrations.",
      },
      {
        question: "Do we own the website code after launch?",
        answer:
          "Yes. You receive full ownership of the entire codebase, assets, and deployment configuration with zero recurring agency license fees.",
      },
    ],
  },
  {
    slug: "application-development",
    title: "Application Development",
    shortDescription:
      "Web and mobile applications with scalable architecture, clean user interfaces, and reliable data synchronization.",
    heroHeadline: "Scalable web and mobile applications built for heavy daily use.",
    heroDescription:
      "We architect and develop full-stack applications that help teams operate efficiently, manage critical data, and deliver intuitive user experiences.",
    deliverables: [
      "Responsive React and Next.js frontends",
      "Robust API backends and database schemas",
      "Role-based authentication and security protocols",
      "Real-time state synchronization and webhook handlers",
      "Automated automated testing and CI/CD pipelines",
    ],
    workShowcase: [
      {
        title: "Healthcare Patient Intake Dashboard",
        description:
          "Developed a secure web application for patient scheduling, medical history records, and automated SMS reminders.",
        metric: "60%",
        tag: "Admin Time Saved",
      },
      {
        title: "B2B SaaS Analytics Workspace",
        description:
          "Built a multi-tenant web application processing millions of event records with sub-second query latency.",
        metric: "< 250ms",
        tag: "API Response Time",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Off-the-shelf software does not fit your operational workflow",
        problemDescription:
          "Generic SaaS tools force your team into unnatural workarounds, disconnected spreadsheets, and expensive per-seat pricing.",
        businessOutcome:
          "A tailor-made application built precisely around your operational requirements and data models.",
      },
      {
        problemTitle: "Legacy applications that are difficult to update and slow to load",
        problemDescription:
          "Old software architectures slow down your employees and create security vulnerabilities.",
        businessOutcome:
          "Modern full-stack applications with high reliability, fast load times, and easy future extensibility.",
      },
    ],
    whyNeominds: [
      {
        title: "Full-Stack Technical Depth",
        description:
          "Our engineers possess deep expertise across modern frontend frameworks, distributed backends, relational databases, and cloud architecture.",
      },
      {
        title: "Business-First Architecture",
        description:
          "We design databases and application workflows around your core business metrics, not arbitrary technical complexity.",
      },
      {
        title: "Security & Role-Based Access",
        description:
          "Enterprise authentication, granular permission controls, and secure data handling are standard across all builds.",
      },
    ],
    faqs: [
      {
        question: "Can you build both internal tools and customer-facing apps?",
        answer:
          "Yes. We build internal operational portals for employees as well as customer-facing web applications with secure user authentication and billing.",
      },
      {
        question: "How do you handle application security and data privacy?",
        answer:
          "We implement industry-standard authentication protocols, strict role-based access control (RBAC), database encryption at rest and in transit, and thorough input validation.",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Full Software Development",
    shortDescription:
      "End-to-end custom software engineering: system design, API integrations, cloud infrastructure, and AI systems.",
    heroHeadline: "End-to-end software engineering for mission-critical business systems.",
    heroDescription:
      "We design, build, and deploy complete software systems. From distributed backend architectures to custom AI agents, we handle the entire engineering lifecycle.",
    deliverables: [
      "Custom system architecture and data modeling",
      "AI agents, LLM pipelines, and automated business workflows",
      "Microservices and REST/GraphQL API development",
      "Cloud infrastructure provisioning and orchestration",
      "Comprehensive technical documentation and team handover",
    ],
    workShowcase: [
      {
        title: "Automated Document Processing Pipeline",
        description:
          "Engineered a computer vision and AI agent pipeline that extracts and verifies structured data from hundreds of vendor invoices daily.",
        metric: "99.2%",
        tag: "Extraction Accuracy",
      },
      {
        title: "Cross-Platform Inventory Sync Engine",
        description:
          "Built a distributed event-driven service syncing inventory across warehouses, ERP systems, and e-commerce channels in real time.",
        metric: "Zero",
        tag: "Data Discrepancies",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Fragmented tools that require constant manual data transfer",
        problemDescription:
          "Staff waste hundreds of hours each quarter manually copying data between CRMs, ERPs, accounting systems, and spreadsheets.",
        businessOutcome:
          "Unified software systems with automatic synchronization, eliminating repetitive data entry entirely.",
      },
      {
        problemTitle: "Need for practical AI capability without hiring an entire research team",
        problemDescription:
          "Businesses want the productivity benefits of AI agents and automation but lack the specialized engineering talent to build them reliably.",
        businessOutcome:
          "Production-ready AI systems integrated directly into your existing software stack.",
      },
    ],
    whyNeominds: [
      {
        title: "Practical AI Implementation",
        description:
          "We build reliable AI agents with deterministic validation and guardrails, ensuring accurate outputs every single run.",
      },
      {
        title: "Production-Grade Code Quality",
        description:
          "Every software deliverable includes modular architecture, automated test suites, and clean documentation.",
      },
      {
        title: "Complete Intellectual Property Ownership",
        description:
          "You retain 100% intellectual property ownership of all custom software, algorithms, and infrastructure code.",
      },
    ],
    faqs: [
      {
        question: "How do your AI agents differ from simple ChatGPT wrappers?",
        answer:
          "Our AI systems are full software implementations with state management, strict guardrails, database connections, API triggers, and error fallback queues. They perform deterministic tasks within your business workflows rather than generic conversational outputs.",
      },
      {
        question: "Can you integrate with our existing legacy systems?",
        answer:
          "Yes. We specialize in building secure API adapters and synchronization services that connect modern tools with legacy databases and proprietary on-premise systems.",
      },
    ],
  },
  {
    slug: "software-testing",
    title: "Software Testing",
    shortDescription:
      "Comprehensive automated testing, QA pipelines, security audits, and performance validation.",
    heroHeadline: "Rigorous software testing and quality assurance for reliable systems.",
    heroDescription:
      "We identify software bugs, performance bottlenecks, and security vulnerabilities before your customers do. Our testing suites guarantee system reliability.",
    deliverables: [
      "End-to-end automated test suites",
      "Integration and unit testing coverage",
      "API load testing and stress benchmarking",
      "Cross-browser and mobile compatibility validation",
      "Regression testing frameworks for continuous deployment",
    ],
    workShowcase: [
      {
        title: "Fintech Core Payment Test Suite",
        description:
          "Constructed an automated E2E test suite covering hundreds of edge-case transaction scenarios, catching critical race conditions prior to launch.",
        metric: "100%",
        tag: "Critical Flow Coverage",
      },
      {
        title: "SaaS Platform Load & Stress Test",
        description:
          "Simulated 50,000 concurrent user sessions to pinpoint database connection pool limits and memory leaks.",
        metric: "5x",
        tag: "Throughput Verified",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Software bugs damaging customer trust and causing revenue loss",
        problemDescription:
          "Untested code releases lead to unexpected downtime, checkout failures, and costly emergency bug fixes during peak business hours.",
        businessOutcome:
          "Automated test suites that run on every code update, catching defects before they reach production.",
      },
      {
        problemTitle: "Manual QA processes that slow down your development cycle",
        problemDescription:
          "Engineering teams spend days manually clicking through features before every deployment instead of writing new code.",
        businessOutcome:
          "Continuous testing pipelines that validate your entire application in minutes.",
      },
    ],
    whyNeominds: [
      {
        title: "Automated-First Methodology",
        description:
          "We build reusable, automated test scripts using industry-standard frameworks like Playwright, Vitest, and Cypress.",
      },
      {
        title: "Edge Case & Stress Detection",
        description:
          "We test extreme scenarios including network timeouts, invalid payloads, high concurrency, and race conditions.",
      },
      {
        title: "Clear Remediation Guidance",
        description:
          "Every bug report includes exact reproduction steps, stack traces, and suggested architectural fixes.",
      },
    ],
    faqs: [
      {
        question: "Can you write tests for an existing codebase we already have?",
        answer:
          "Yes. We frequently audit existing codebases and construct comprehensive unit, integration, and end-to-end test suites to stabilize legacy applications.",
      },
      {
        question: "Do you integrate tests into our CI/CD pipeline?",
        answer:
          "Yes. We configure automated GitHub Actions, GitLab CI, or other CI runners so that test suites run automatically on every pull request.",
      },
    ],
  },
  {
    slug: "business-audits",
    title: "Business Audits",
    shortDescription:
      "In-depth technical and operational audits to uncover system bottlenecks, waste, and automation opportunities.",
    heroHeadline: "Technical audits that uncover inefficiencies, waste, and bottlenecks.",
    heroDescription:
      "We conduct exhaustive technical and process audits of your software architecture, data pipelines, and team workflows to identify concrete opportunities for optimization.",
    deliverables: [
      "Codebase quality and technical debt assessment",
      "Software architecture and infrastructure cost review",
      "Operational workflow bottleneck analysis",
      "Security posture and data privacy evaluation",
      "Prioritized engineering remediation roadmap",
    ],
    workShowcase: [
      {
        title: "E-Commerce Cloud Cost Optimization Audit",
        description:
          "Audited AWS infrastructure for a high-volume retailer, identifying idle compute resources and unoptimized database queries.",
        metric: "$42k/yr",
        tag: "Cloud Spend Saved",
      },
      {
        title: "Operational Workflow Audit for Freight Agency",
        description:
          "Mapped operational bottlenecks across 5 departments, establishing an automation roadmap that reclaimed 120+ weekly staff hours.",
        metric: "120 hrs/wk",
        tag: "Identified Waste",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Escalating software subscription and cloud infrastructure costs",
        problemDescription:
          "Companies accumulate redundant SaaS subscriptions and misconfigured cloud services that quietly drain capital every month.",
        businessOutcome:
          "Clear audit report outlining exact cost reductions and infrastructure consolidations.",
      },
      {
        problemTitle: "Unclear technical debt slowing down engineering velocity",
        problemDescription:
          "Leadership does not know why features take months to build or why system stability is degrading.",
        businessOutcome:
          "An objective technical evaluation with actionable priorities for executive decision-making.",
      },
    ],
    whyNeominds: [
      {
        title: "Pragmatic Business Focus",
        description:
          "We evaluate technology through the lens of return on investment, operational efficiency, and revenue protection.",
      },
      {
        title: "Vendor-Neutral Analysis",
        description:
          "We do not receive kickbacks from software vendors. Our recommendations are strictly based on what is best for your business.",
      },
      {
        title: "Actionable Implementation Blueprints",
        description:
          "We do not produce vague 100-page slide decks. You receive concrete, step-by-step engineering action items.",
      },
    ],
    faqs: [
      {
        question: "How long does a technical business audit take?",
        answer:
          "A standard technical audit takes between 5 to 10 business days. We review your codebase, interview key technical leads, and deliver a detailed findings report.",
      },
      {
        question: "What access do you need to perform an audit?",
        answer:
          "We require read-only access to relevant code repositories, architecture diagrams, and cloud billing dashboards, all under a strict non-disclosure agreement.",
      },
    ],
  },
  {
    slug: "consultation",
    title: "Technical Consultation",
    shortDescription:
      "Strategic engineering advice, technology stack selection, AI readiness, and fractional technical leadership.",
    heroHeadline: "Strategic technical guidance for high-stakes business decisions.",
    heroDescription:
      "Make confident technology decisions with seasoned engineering leadership. We advise executives on system design, AI feasibility, vendor selection, and architecture.",
    deliverables: [
      "AI feasibility and ROI assessments",
      "Technology stack and framework evaluation",
      "Fractional CTO and engineering advisory",
      "Vendor proposals technical evaluation",
      "System scalability planning and risk mitigation",
    ],
    workShowcase: [
      {
        title: "Fintech AI Architecture Advisory",
        description:
          "Advised a financial services firm on implementing private LLM deployments meeting strict compliance standards.",
        metric: "100%",
        tag: "Regulatory Compliance",
      },
      {
        title: "Platform Migration Strategy",
        description:
          "Guided a logistics provider through a zero-downtime database migration from legacy on-premise servers to PostgreSQL cloud infrastructure.",
        metric: "0 Min",
        tag: "Downtime Experienced",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Risk of making expensive technology architecture mistakes",
        problemDescription:
          "Choosing the wrong software framework, database, or vendor can cost hundreds of thousands of dollars in rewrites.",
        businessOutcome:
          "Direct access to experienced technical architects who have built and scaled systems before.",
      },
      {
        problemTitle: "Difficulty evaluating competing vendor claims and AI hype",
        problemDescription:
          "Vendors overpromise capabilities while underestimating implementation timelines and technical complexity.",
        businessOutcome:
          "Unbiased technical verification that protects your budget and ensures realistic project delivery.",
      },
    ],
    whyNeominds: [
      {
        title: "Senior Engineering Experience",
        description:
          "You consult directly with senior practitioners who actively write production code and design large-scale systems.",
      },
      {
        title: "Honest Feasibility Assessments",
        description:
          "If a simple database query solves your problem better than an expensive AI model, we tell you immediately.",
      },
      {
        title: "Flexible Advisory Retainers",
        description:
          "Engage our team for one-off strategic sessions or on an ongoing fractional advisory basis as your business grows.",
      },
    ],
    faqs: [
      {
        question: "How are consultation engagements structured?",
        answer:
          "We offer both one-time strategic technical workshops (2 to 4 hours) and ongoing monthly advisory retainers for companies needing fractional technical leadership.",
      },
      {
        question: "Can you help our internal team evaluate third-party software proposals?",
        answer:
          "Yes. We regularly review technical proposals, architecture specs, and vendor contracts to ensure scope accuracy and fair pricing.",
      },
    ],
  },
  {
    slug: "training",
    title: "Training",
    shortDescription:
      "Technical training and engineering workshops for internal teams.",
    heroHeadline: "Technical training and engineering workshops.",
    heroDescription:
      "We provide specialized technical workshops for internal engineering and operations teams.",
    deliverables: [],
    workShowcase: [],
    whyNeeded: [],
    whyNeominds: [],
    faqs: [],
    isMinimal: true,
  },
];

// 4 Cards for Homepage Scroll Stack Section
export const SCROLL_STACK_CARDS: ScrollStackCard[] = [
  {
    id: "stack-1",
    stepNumber: "01",
    title: "If you are facing these problems in business",
    subtitle: "Common Operational Bottlenecks",
    description:
      "Growing companies frequently reach a point where manual tasks and disconnected software begin to stifle growth and drain resources.",
    points: [
      {
        headline: "Skilled employees doing repetitive data entry",
        detail:
          "Valuable team members spend hours copying records between spreadsheets, CRMs, and internal systems instead of focusing on high-impact work.",
      },
      {
        headline: "Slow response times causing lost sales",
        detail:
          "Qualified inbound buyers wait hours for basic pricing or booking replies, leading them to purchase from faster competitors.",
      },
      {
        headline: "Siloed software that fails to communicate",
        detail:
          "Using multiple disconnected software tools forces manual double-entry, creating data discrepancies and delayed reporting.",
      },
      {
        headline: "Off-the-shelf software with missing features",
        detail:
          "Paying expensive monthly subscriptions for generic tools that fail to match your exact business processes.",
      },
    ],
  },
  {
    id: "stack-2",
    stepNumber: "02",
    title: "What Neominds does",
    subtitle: "End-to-End Technical Solutions",
    description:
      "We design, build, and deploy custom software and AI systems that eliminate operational bottlenecks and drive business performance.",
    points: [
      {
        headline: "Practical AI Solutions and Agents",
        detail:
          "Custom AI assistants and autonomous workflows built with strict guardrails to handle customer inquiries, document analysis, and triage.",
      },
      {
        headline: "Full-Stack Web and Application Development",
        detail:
          "Bespoke web applications, internal company portals, and high-performance websites engineered with Next.js, React, and TypeScript.",
      },
      {
        headline: "Automated Data Pipelines and System Integrations",
        detail:
          "Secure bridges connecting your CRMs, ERPs, payment processors, and databases for real-time synchronization.",
      },
      {
        headline: "Rigorous Software Testing and Technical Audits",
        detail:
          "Automated test suites, infrastructure cost audits, and performance tuning that guarantee system stability and security.",
      },
    ],
  },
  {
    id: "stack-3",
    stepNumber: "03",
    title: "Why choose Neominds",
    subtitle: "Engineered for Reliability",
    description:
      "We are a serious technology partner focused on business outcomes, technical depth, and clean execution.",
    points: [
      {
        headline: "Business-First Technical Thinking",
        detail:
          "We do not build technology for the sake of novelty. Every architectural decision is anchored to measurable business efficiency and ROI.",
      },
      {
        headline: "100% Intellectual Property Ownership",
        detail:
          "You retain complete ownership of all custom code, configurations, and assets with zero ongoing vendor lock-in or licensing fees.",
      },
      {
        headline: "Direct Engineer Collaboration",
        detail:
          "You communicate directly with senior software engineers who write the code, eliminating communication delays and account management layers.",
      },
      {
        headline: "Fast and Predictable Delivery",
        detail:
          "Structured development sprints with clear milestones ensure working software is deployed quickly without corporate delays.",
      },
    ],
  },
  {
    id: "stack-4",
    stepNumber: "04",
    title: "Contact Us",
    subtitle: "Start Your Technical Project",
    description:
      "Discuss your technical challenges with a senior engineer. We evaluate your current systems and propose a clear, actionable solution plan.",
    points: [
      {
        headline: "15-Minute Technical Discovery Call",
        detail:
          "A focused conversation with an engineer to review your workflow bottlenecks, architecture, and timeline requirements.",
      },
      {
        headline: "Actionable System Architecture Blueprint",
        detail:
          "We provide a clear technical scope, fixed milestone estimates, and recommended tech stack tailored to your goals.",
      },
      {
        headline: "Zero Obligation or High-Pressure Sales",
        detail:
          "Straightforward technical consultation focused entirely on whether our capabilities match your business needs.",
      },
    ],
    ctaText: "Discuss Your Project",
  },
];

// Credibility Logos
export const LOGO_ITEMS = [
  { name: "Amazon Web Services", category: "Cloud Infrastructure" },
  { name: "Google Cloud", category: "Cloud Services" },
  { name: "Microsoft Azure", category: "Enterprise Cloud" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Next.js", category: "Frontend Framework" },
  { name: "Stripe", category: "Payments Engine" },
  { name: "Supabase", category: "Backend Infrastructure" },
  { name: "Docker", category: "Containerization" },
  { name: "Python", category: "AI & Backend" },
];

// Selected Homepage Case Studies
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Automated Customer Verification Pipeline",
    client: "Apex Wealth Tech",
    industry: "Financial Services",
    challenge:
      "Apex received over 800 new customer applications weekly. Manual document verification and identity checks took 48 hours per customer, causing high dropout rates during onboarding.",
    solution:
      "We built an automated computer vision and verification system that inspects identity documentation, validates data against compliance databases, and securely approves accounts.",
    whatWeBuilt:
      "A private Next.js review portal, OCR document extraction pipeline, and webhook triggers syncing approved accounts directly with their core banking database.",
    outcome:
      "Reduced average application approval time from 48 hours to under 4 minutes while eliminating manual compliance backlog.",
    metrics: [
      { stat: "3.5 Min", label: "Average Verification Time" },
      { stat: "85%", label: "Workflows Automated" },
      { stat: "$195,000", label: "Annual Operational Savings" },
    ],
    tags: ["Financial Technology", "Document Verification", "Data Pipeline"],
  },
  {
    id: "case-2",
    title: "Real-Time Freight Coordination Engine",
    client: "Vanguard Global Freight",
    industry: "Logistics & Transport",
    challenge:
      "Dispatch teams spent over 6 hours each day manually coordinating driver status updates and route logs across phone calls, leading to delayed tracking for enterprise clients.",
    solution:
      "We developed an automated WhatsApp messaging agent integrated directly into Vanguard's centralized dispatch database to handle status collection and route confirmation automatically.",
    whatWeBuilt:
      "An automated messaging agent with state management, driver verification rules, and bi-directional API synchronization with their logistics software.",
    outcome:
      "Automated over 90% of daily driver check-ins, giving dispatchers live route visibility with zero manual record entry.",
    metrics: [
      { stat: "94%", label: "Fewer Dispatch Delays" },
      { stat: "120 Hrs", label: "Saved per Dispatcher Monthly" },
      { stat: "99.9%", label: "Live Route Accuracy" },
    ],
    tags: ["Logistics Automation", "Messaging Agent", "API Integration"],
  },
  {
    id: "case-3",
    title: "Instant Inbound Sales Qualification Assistant",
    client: "Nexus Cloud Software",
    industry: "B2B Software",
    challenge:
      "High-value enterprise sales leads waited an average of 4.5 hours for an initial email reply. Inbound lead qualification dropoff was exceeding 40%.",
    solution:
      "We implemented an intelligent inbound qualification assistant that verifies company domains, analyzes lead requirements, and immediately schedules qualified demos on account executive calendars.",
    whatWeBuilt:
      "A fast qualification service integrated with Stripe, Salesforce, and calendar booking APIs, responding to new inquiries in under 45 seconds.",
    outcome:
      "Increased scheduled sales meetings by 3.8x while ensuring 100% of CRM records were populated with enriched company data.",
    metrics: [
      { stat: "< 45 Sec", label: "Average Response Time" },
      { stat: "3.8x", label: "Sales Meetings Booked" },
      { stat: "100%", label: "CRM Data Accuracy" },
    ],
    tags: ["Sales Automation", "CRM Synchronization", "Lead Triage"],
  },
];

// Why Neominds Core Points
export const WHY_NEOMINDS_POINTS: WhyNeomindsPoint[] = [
  {
    number: "01",
    title: "Business-First Technical Thinking",
    description:
      "We evaluate technology decisions based on practical business return, operational efficiency, and long-term maintainability rather than speculative tech trends.",
  },
  {
    number: "02",
    title: "Practical AI Implementation",
    description:
      "We build deterministic AI systems and automated workflows with strict error-handling and validation guardrails that run reliably in production.",
  },
  {
    number: "03",
    title: "Full Product Engineering Depth",
    description:
      "From database schema design and distributed backend services to high-performance frontend interfaces, our engineers manage the complete stack.",
  },
  {
    number: "04",
    title: "Complete Code Ownership",
    description:
      "You receive 100% ownership of all source code, deployment scripts, and technical documentation with zero licensing fees or vendor lock-in.",
  },
  {
    number: "05",
    title: "Direct Engineer Communication",
    description:
      "You work directly with the senior engineers building your systems. No intermediaries, no misunderstandings, and rapid execution.",
  },
];

// About Us Narrative Points
export const ABOUT_NEOMINDS = {
  headline: "A dedicated engineering partner for companies that take technology seriously.",
  paragraphs: [
    "Neominds was founded to bridge the gap between business operations and modern software engineering. We believe businesses deserve reliable technology built by practitioners who understand both technical architecture and commercial reality.",
    "We are not an AI research lab exploring theoretical models. We are an applied technology solutions company that designs, builds, tests, and deploys production-grade software, AI systems, and automated workflows that solve tangible business problems.",
    "Our approach is direct and transparent: we analyze the problem, define a clean technical architecture, build the software in structured sprints, and hand over full code ownership to your team upon completion.",
  ],
  stats: [
    { value: "25+", label: "Production Systems Built" },
    { value: "30+", label: "Businesses Supported" },
    { value: "100%", label: "Client Code Ownership" },
    { value: "14 Days", label: "Average Sprint Delivery" },
  ],
};

// High-Legibility Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Neominds completely resolved our operational bottlenecks. We moved from fragile spreadsheets to a custom software workflow that saves our team over 25 hours every single week.",
    author: "Alexander Wright",
    role: "VP of Operations",
    company: "ScaleMetric AI",
    serviceUsed: "Full Software Development",
  },
  {
    id: "test-2",
    quote:
      "Their engineering speed and code quality are exceptional. Within two weeks, our automated customer intake pipeline was live and handling client data without errors.",
    author: "Elena Rostova",
    role: "Chief Product Officer",
    company: "Vanguard Global Freight",
    serviceUsed: "Application Development",
  },
  {
    id: "test-3",
    quote:
      "Unlike agencies that set up brittle shortcuts that break within weeks, Neominds engineered a rock-solid system with full code ownership. Our qualified meetings increased fourfold.",
    author: "Marcus Chen",
    role: "Founder & CEO",
    company: "Hyperion Growth",
    serviceUsed: "Website Development",
  },
];

// General Homepage FAQs
export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "What types of companies does Neominds work with?",
    answer:
      "We work with growing businesses, B2B companies, financial services firms, logistics providers, and technology startups that require robust software, practical AI solutions, automated workflows, or technical consulting.",
    category: "General",
  },
  {
    question: "How do your AI solutions differ from generic tools?",
    answer:
      "We build custom software systems with state management, strict verification rules, database integrations, and automated error-recovery queues. Our AI implementations perform deterministic, verified operations directly inside your existing business stack.",
    category: "AI & Technology",
  },
  {
    question: "Who owns the code and intellectual property once a project is complete?",
    answer:
      "You retain 100% ownership of all source code, assets, and deployment environments upon completion. There are no ongoing software license fees, royalties, or vendor lock-in.",
    category: "Ownership",
  },
  {
    question: "How long does a typical software build or automation sprint take?",
    answer:
      "A focused automation sprint is typically delivered within 14 business days. Larger full-stack applications and multi-agent platforms generally range between 3 to 6 weeks, with a testable version delivered in the very first week.",
    category: "Timeline",
  },
  {
    question: "Can you connect with our existing databases and legacy software?",
    answer:
      "Yes. We specialize in building secure API adapters and synchronization bridges that connect modern web tools with existing databases, spreadsheets, CRMs, ERPs, and internal servers.",
    category: "Integration",
  },
  {
    question: "How do we get started with Neominds?",
    answer:
      "You can book a 15-minute technical discovery call with our engineering team. We will review your current systems, discuss your bottlenecks, and provide a clear implementation blueprint.",
    category: "Getting Started",
  },
];

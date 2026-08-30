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

export interface ScrollStackCaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  whatWeBuilt?: string;
  outcome?: string;
  stepNumber?: string;
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

// 7 Core Services with clean, friendly, simple English copy
export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription:
      "Fast, beautiful websites that explain what you do clearly and turn visitors into paying customers.",
    heroHeadline: "Websites that load fast and bring you more customers.",
    heroDescription:
      "We design and build clean websites that look great on any screen, load in less than a second, and make it easy for people to buy from you.",
    deliverables: [
      "Custom React & Next.js frontend",
      "Clean, modern layout that fits your brand",
      "Fast loading speeds on phones and laptops",
      "Easy content management system",
      "100% code ownership with zero monthly lock-in fees",
    ],
    workShowcase: [
      {
        title: "Modern Company Website",
        description:
          "Built a clean, fast website for a growing tech company, helping them double their customer demo requests.",
        metric: "2.4x",
        tag: "More Leads",
      },
      {
        title: "Online Product Showcase",
        description:
          "Rebuilt an online catalog with simple navigation and instant search so buyers can find products in seconds.",
        metric: "< 0.8s",
        tag: "Page Load Time",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Slow, clunky templates make people leave before reading",
        problemDescription:
          "Most cheap website templates are packed with messy code that slows everything down and confuses visitors.",
        businessOutcome:
          "A custom website that loads instantly and makes your business look sharp and trustworthy.",
      },
    ],
    whyNeominds: [
      {
        title: "You talk directly with the engineers",
        description: "No salespeople or project managers in the middle. Just direct work with the people building your site.",
      },
    ],
    faqs: [
      {
        question: "How long does a website take to build?",
        answer: "Most custom websites launch within 2 to 4 weeks, with live preview links every single week.",
      },
      {
        question: "Do I own the website and the code?",
        answer: "Yes, 100%. Once we finish, all code and design files belong entirely to you.",
      },
    ],
  },
  {
    slug: "application-development",
    title: "Application Development",
    shortDescription:
      "Web and mobile apps built to handle thousands of users without slowing down or crashing.",
    heroHeadline: "Custom web and mobile apps your team will love using.",
    heroDescription:
      "We build reliable web apps and mobile tools that make your daily work easier, automate tedious tasks, and grow with your business.",
    deliverables: [
      "Interactive web and mobile apps",
      "Simple user logins and secure permissions",
      "Real-time dashboards and live updates",
      "Fast database connections that never slow down",
      "Clear documentation so your team can run it easily",
    ],
    workShowcase: [
      {
        title: "Operations Management App",
        description:
          "Created a simple web app that replaced dozens of messy spreadsheets and cut daily reporting time in half.",
        metric: "50%",
        tag: "Time Saved",
      },
      {
        title: "Customer Support Portal",
        description:
          "Built a live customer dashboard that lets clients track orders and get instant help without waiting on phone calls.",
        metric: "99.99%",
        tag: "Uptime",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Off-the-shelf software doesn't fit the way you work",
        problemDescription:
          "Trying to force your business into rigid generic software slows your team down and costs expensive monthly fees.",
        businessOutcome:
          "A custom application tailored exactly to your workflow that saves hours every day.",
      },
    ],
    whyNeominds: [
      {
        title: "Built to grow as you get more users",
        description: "We write clean code that handles heavy traffic without breaking or needing expensive rebuilds.",
      },
    ],
    faqs: [
      {
        question: "Can this connect to our existing tools?",
        answer: "Yes. We easily connect your app to Stripe, HubSpot, Google Workspace, Slack, or any custom API.",
      },
      {
        question: "What happens if we need new features later?",
        answer: "Because the codebase is clean and modular, adding new features down the road is quick and straightforward.",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Software Engineering",
    shortDescription:
      "Solid backend engines, clean databases, and smooth integrations that keep your business running.",
    heroHeadline: "Rock-solid backend software that never lets you down.",
    heroDescription:
      "We build the engine under the hood: databases, automation pipelines, and server backends that stay fast, secure, and easy to maintain.",
    deliverables: [
      "Fast, secure backend APIs",
      "Automated data syncing between all your tools",
      "Scalable database setup and optimization",
      "Cloud hosting configuration (AWS, Google Cloud, Vercel)",
      "Automated backups and security checks",
    ],
    workShowcase: [
      {
        title: "Automated Data Sync Engine",
        description:
          "Built a backend service that processes over 2 million transactions every day with zero downtime.",
        metric: "2M+",
        tag: "Daily Events",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Messy backend code causes constant bugs and crashes",
        problemDescription:
          "When software is put together in a hurry, it breaks under pressure and takes days to fix every time something goes wrong.",
        businessOutcome:
          "A clean, dependable backend engine that runs quietly in the background without needing constant maintenance.",
      },
    ],
    whyNeominds: [
      {
        title: "We write simple, readable code",
        description: "We avoid unnecessary complexity. Any developer can read, understand, and maintain our work.",
      },
    ],
    faqs: [
      {
        question: "Do you help with hosting and servers?",
        answer: "Yes. We set up everything on your own cloud account so you have full control over your data and hosting costs.",
      },
    ],
  },
  {
    slug: "software-testing",
    title: "Software Testing & QA",
    shortDescription:
      "Automated testing that catches bugs and errors before your customers ever see them.",
    heroHeadline: "Catch bugs before your customers do.",
    heroDescription:
      "We write automated tests that click every button, check every form, and test every screen to make sure your software always works perfectly.",
    deliverables: [
      "Automated test suites for web and mobile",
      "Speed and heavy-load testing",
      "Security and login checks",
      "Continuous testing on every code update",
      "Clear test reports showing exactly what was tested",
    ],
    workShowcase: [
      {
        title: "Automated Checkout Testing",
        description:
          "Set up automated tests across an e-commerce checkout, eliminating checkout errors and boosting completed purchases.",
        metric: "0",
        tag: "Checkout Bugs",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Manual testing is slow, expensive, and misses bugs",
        problemDescription:
          "Testing apps by hand takes hours and human mistakes always slip through to your live users.",
        businessOutcome:
          "Automated tests that run in seconds and guarantee your app works before any update goes live.",
      },
    ],
    whyNeominds: [
      {
        title: "Peace of mind on every release",
        description: "You can update your software with confidence knowing our automated tests have your back.",
      },
    ],
    faqs: [
      {
        question: "Can you test our existing software?",
        answer: "Yes. We can add automated tests to your current website, app, or backend without rewriting your code.",
      },
    ],
  },
  {
    slug: "business-audits",
    title: "Technical Audits",
    shortDescription:
      "Honest, in-depth code reviews that uncover security holes, slow spots, and hidden technical debt.",
    heroHeadline: "Know exactly how healthy your software really is.",
    heroDescription:
      "We do a deep dive into your codebase and servers to find what is slowing you down, what could break, and how to fix it fast.",
    deliverables: [
      "Plain-English audit report with zero confusing jargon",
      "Security and privacy vulnerability scan",
      "Speed and server performance breakdown",
      "Cloud hosting cost reduction recommendations",
      "Prioritized step-by-step fix roadmap",
    ],
    workShowcase: [
      {
        title: "Cloud Cost & Speed Audit",
        description:
          "Audited a SaaS company's cloud architecture, cutting their monthly server bill by 42% while making pages load faster.",
        metric: "42%",
        tag: "Cost Cut",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "You do not know if your code is safe or ready to scale",
        problemDescription:
          "It is hard to tell if your software has security risks or bad architecture until it crashes when you need it most.",
        businessOutcome:
          "A clear, honest diagnostic report that shows you exactly what to fix to keep your business safe.",
      },
    ],
    whyNeominds: [
      {
        title: "Unbiased, honest recommendations",
        description: "We give you straightforward advice focused purely on what helps your business save money and move faster.",
      },
    ],
    faqs: [
      {
        question: "How long does an audit take?",
        answer: "A complete code and infrastructure audit usually takes 3 to 5 business days.",
      },
    ],
  },
  {
    slug: "technical-consultation",
    title: "Technical Consultation",
    shortDescription:
      "Senior engineering advice on architecture, AI tools, and technical hiring without agency fluff.",
    heroHeadline: "Senior software advice whenever you need it.",
    heroDescription:
      "Get direct guidance from veteran software architects. We help you choose the right tools, plan new features, and avoid costly technical mistakes.",
    deliverables: [
      "1-on-1 architecture planning sessions",
      "AI tool selection and integration roadmap",
      "Vendor and software evaluation",
      "Technical interview assistance for your hiring team",
      "Ongoing engineering advisory support",
    ],
    workShowcase: [
      {
        title: "AI Integration Strategy",
        description:
          "Guided a financial services firm on implementing safe, private AI tools, cutting customer response times from hours to minutes.",
        metric: "85%",
        tag: "Faster Replies",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Choosing the wrong tech stack costs months of wasted work",
        problemDescription:
          "Picking the wrong database or framework can trap your team and force an expensive total rewrite down the road.",
        businessOutcome:
          "Confident decisions backed by experienced engineers who have built dozens of production systems.",
      },
    ],
    whyNeominds: [
      {
        title: "Direct access to real builders",
        description: "No junior account managers. You work directly with engineers who build software every day.",
      },
    ],
    faqs: [
      {
        question: "Can we hire you on a monthly retainer?",
        answer: "Yes. We offer flexible advisory retainers with weekly check-ins and direct Slack/email access.",
      },
    ],
  },
  {
    slug: "training",
    title: "Team Training",
    shortDescription:
      "Hands-on workshops that teach your engineers how to build with modern AI, React, and clean architecture.",
    heroHeadline: "Help your engineering team build better and ship faster.",
    heroDescription:
      "Practical, hands-on training sessions that teach your developers modern coding standards, automated testing, and how to use AI tools effectively.",
    deliverables: [
      "Interactive coding workshops with real-world examples",
      "Modern Next.js, React, and TypeScript best practices",
      "AI developer tools workflow training (GitHub Copilot, Cursor, agentic coding)",
      "Recorded video sessions and written reference guides",
      "Post-training Q&A and code review support",
    ],
    workShowcase: [
      {
        title: "Engineering Team Modernization",
        description:
          "Trained a 14-person developer team on modern automated testing and AI workflows, speeding up their feature release cycle by 3x.",
        metric: "3x",
        tag: "Faster Releases",
      },
    ],
    whyNeeded: [
      {
        problemTitle: "Engineering teams fall behind as tools change rapidly",
        problemDescription:
          "Without structured training, teams stick to outdated habits that slow down product development and create technical debt.",
        businessOutcome:
          "An energized, up-to-date engineering team that writes cleaner code and ships features in record time.",
      },
    ],
    whyNeominds: [
      {
        title: "Practical, code-first workshops",
        description: "Zero boring slides. We jump straight into real codebases, build working examples, and solve real problems together.",
      },
    ],
    faqs: [
      {
        question: "Can the training be tailored to our private codebase?",
        answer: "Yes! We often build custom workshops around your team's exact tech stack and daily challenges.",
      },
    ],
  },
];

// 7 Industry Sectors
export const INDUSTRIES_DATA = [
  {
    id: "tech-it",
    name: "Tech & Software",
    tagline: "High-speed web platforms, APIs, and cloud backends.",
    description: "We help tech startups and SaaS companies build fast, clean web apps that scale effortlessly.",
    capabilities: ["SaaS web applications", "API integrations", "Cloud architecture"],
    metricStat: "99.99%",
    metricLabel: "System uptime",
  },
  {
    id: "ai-data",
    name: "AI & Automation",
    tagline: "Smart AI assistants and automated daily workflows.",
    description: "We build private AI tools that automate customer replies, process documents, and cut out repetitive manual work.",
    capabilities: ["AI document search", "Automated customer workflows", "Private LLM setup"],
    metricStat: "80%",
    metricLabel: "Time saved on routine tasks",
  },
  {
    id: "edtech",
    name: "Education & Learning",
    tagline: "Engaging student portals and interactive learning tools.",
    description: "We create smooth, intuitive online course platforms, quizzes, and live classroom tools that students love.",
    capabilities: ["Student dashboards", "Interactive video learning", "Progress tracking"],
    metricStat: "3.5x",
    metricLabel: "Higher student completion",
  },
  {
    id: "fintech",
    name: "Financial Services",
    tagline: "Secure client portals, billing flows, and reporting dashboards.",
    description: "We engineer bank-grade security, instant payment flows, and clear financial charts for wealth and fintech apps.",
    capabilities: ["Stripe payment flows", "Encrypted client records", "Live financial charts"],
    metricStat: "< 3 min",
    metricLabel: "Customer verification speed",
  },
  {
    id: "healthcare",
    name: "Health & Wellness",
    tagline: "HIPAA-ready patient portals and appointment tools.",
    description: "We build safe, easy-to-use patient intake apps and scheduling systems that keep healthcare simple and private.",
    capabilities: ["Encrypted medical intake", "Online booking systems", "Provider dashboards"],
    metricStat: "100%",
    metricLabel: "Privacy standard compliance",
  },
  {
    id: "real-estate",
    name: "Real Estate & PropTech",
    tagline: "Property search platforms and investor portals.",
    description: "We build map-powered property catalogs, digital leasing flows, and investor dashboards that close deals faster.",
    capabilities: ["Interactive map search", "Digital lease signing", "Investor reporting"],
    metricStat: "4.2x",
    metricLabel: "More qualified buyer inquiries",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    tagline: "Lightning-fast stores and automated inventory management.",
    description: "We engineer online stores that load instantly on mobile, never crash during flash sales, and maximize checkout conversions.",
    capabilities: ["1-second page loads", "Custom checkout flows", "Live inventory sync"],
    metricStat: "+34%",
    metricLabel: "Average checkout conversion increase",
  },
];

// Verified Case Studies
export const SCROLL_STACK_CASE_STUDIES: ScrollStackCaseStudy[] = [
  {
    id: "apex-wealth",
    title: "Instant Customer Verification Pipeline",
    client: "Apex Wealth Tech",
    industry: "Financial Services",
    shortDescription:
      "Replaced a slow 48-hour manual paperwork process with an automated, secure verification flow that finishes in under 3.5 minutes.",
    challenge:
      "New clients were waiting two full days for manual document reviews, causing nearly 30% of signups to drop off before finishing.",
    solution:
      "Engineered an automated document intake system with instant bank-level identity verification and automated compliance checks.",
    metrics: [
      { stat: "3.5 min", label: "Average verification time (down from 48h)" },
      { stat: "99.4%", label: "First-try approval accuracy" },
      { stat: "0", label: "Manual paperwork steps remaining" },
    ],
    tags: ["Next.js", "PostgreSQL", "Encrypted Storage", "Real-Time Verification"],
  },
  {
    id: "vanguard-logistics",
    title: "Live Freight Tracking & Dispatch Hub",
    client: "Vanguard Global Freight",
    industry: "Logistics & Transport",
    shortDescription:
      "Unified 14 separate tracking portals into one central live dashboard, cutting customer support inquiry volume by 68%.",
    challenge:
      "Dispatchers and customers had to jump between dozens of old spreadsheets and phone lines to find where cargo containers were located.",
    solution:
      "Built a real-time web portal that pulls GPS and status updates from carriers into a single map with instant customer alerts.",
    metrics: [
      { stat: "68%", label: "Fewer phone support tickets" },
      { stat: "< 1 sec", label: "Live GPS update speed" },
      { stat: "14 -> 1", label: "Portals consolidated into single hub" },
    ],
    tags: ["React", "Go API", "Live WebSockets", "Interactive Maps"],
  },
  {
    id: "nexus-health",
    title: "Private Patient Intake & Booking System",
    client: "Nexus Health Network",
    industry: "Healthcare",
    shortDescription:
      "Created a simple, mobile-friendly patient registration app that eliminated paper clipboards across 18 medical clinics.",
    challenge:
      "Patients spent 20 minutes filling out paper forms in clinic waiting rooms, creating long lines and data entry errors.",
    solution:
      "Built a secure web app where patients fill out their medical history on their phones before arriving, syncing directly into clinic records.",
    metrics: [
      { stat: "18 clinics", label: "Successfully onboarded in 30 days" },
      { stat: "15 min", label: "Saved per patient check-in" },
      { stat: "100%", label: "HIPAA privacy standard compliant" },
    ],
    tags: ["Next.js", "HIPAA Compliant", "Tailwind", "Secure Auth"],
  },
  {
    id: "omni-retail",
    title: "High-Speed Flash Sale E-Commerce Engine",
    client: "OmniRetail Group",
    industry: "E-Commerce",
    shortDescription:
      "Re-engineered checkout architecture to handle 50,000 simultaneous shoppers during Black Friday with zero slowdowns.",
    challenge:
      "The previous store crashed whenever more than 5,000 shoppers tried to buy at once, costing hundreds of thousands in lost revenue.",
    solution:
      "Rebuilt the frontend with Next.js edge caching and optimized the payment checkout queue to process 800 orders per second.",
    metrics: [
      { stat: "50,000", label: "Concurrent shoppers handled smoothly" },
      { stat: "0 ms", label: "Server downtime during peak launch" },
      { stat: "+41%", label: "Total Black Friday revenue increase" },
    ],
    tags: ["Next.js", "Edge Cache", "Stripe API", "Redis Queue"],
  },
];

// Why Neominds Points
export const WHY_NEOMINDS_POINTS: WhyNeomindsPoint[] = [
  {
    number: "01",
    title: "You work directly with the engineers",
    description:
      "No account managers or junior salespeople playing telephone. You talk directly with the senior developers writing your code.",
  },
  {
    number: "02",
    title: "You own 100% of your code and data",
    description:
      "Zero monthly vendor lock-in or licensing traps. When we finish, all code repositories, cloud keys, and design files are completely yours.",
  },
  {
    number: "03",
    title: "We ship working software every two weeks",
    description:
      "No waiting six months for a mystery reveal. We deploy live, working updates every 14 days so you can test and see progress constantly.",
  },
  {
    number: "04",
    title: "Simple, readable code that never breaks",
    description:
      "We avoid overly complicated tech fads. We build clean, tested software that runs smoothly for years without needing expensive repairs.",
  },
  {
    number: "05",
    title: "Honest advice with clear, upfront pricing",
    description:
      "We tell you what you actually need and what you can skip. Clear milestones, clear budgets, and zero surprise invoices.",
  },
];

// Verified Client Reviews
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Neominds rebuilt our entire web portal in just four weeks. It loads instantly, our clients love using it, and we saw demo requests double in the very first month.",
    author: "David Vance",
    role: "VP of Engineering",
    company: "Apex Tech",
    serviceUsed: "Website Development",
  },
  {
    id: "2",
    quote:
      "The best software team we have ever partnered with. Direct communication, clean code, and they delivered our complex dispatch system right on schedule.",
    author: "Elena Rostova",
    role: "Chief Operating Officer",
    company: "Vanguard Logistics",
    serviceUsed: "Application Development",
  },
  {
    id: "3",
    quote:
      "They audited our cloud servers and cut our monthly hosting bill by nearly half while making our app load twice as fast. Phenomenal work.",
    author: "Marcus Brody",
    role: "Founder & CEO",
    company: "OmniRetail",
    serviceUsed: "Technical Audits",
  },
];

// Number Changer Stats
export const NUMBER_CHANGER_STATS = [
  {
    id: "projects",
    value: 100,
    suffix: "+",
    label: "Projects Delivered",
    subtext: "Custom websites, web apps, and backend engines shipped for growing businesses.",
    detail: "100% on-time project milestone delivery",
  },
  {
    id: "team",
    value: 25,
    suffix: "+",
    label: "Senior Engineers",
    subtext: "Experienced software developers building with clean code and modern tools.",
    detail: "Direct engineer-to-client collaboration",
  },
  {
    id: "experience",
    value: 6,
    suffix: "+",
    label: "Years of Experience",
    subtext: "Building production software, scalable cloud systems, and practical AI tools.",
    detail: "Fast 14-day average sprint delivery",
  },
];

// Tech Logo Items
export const TECH_LOGO_ITEMS = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Real-Time DB" },
  { name: "Docker", category: "Containers" },
  { name: "Kubernetes", category: "Cloud" },
  { name: "AWS", category: "Cloud Host" },
  { name: "Google Cloud", category: "Cloud Host" },
  { name: "Stripe", category: "Payments" },
  { name: "Tailwind CSS", category: "Styling" },
];

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "How fast can you start on our project?",
    answer: "We can usually kick off within 3 to 5 business days after our initial discovery call.",
  },
  {
    question: "Do we talk directly with the engineers?",
    answer: "Yes, 100%. You work directly with the senior developers writing your code via Slack, email, or video calls.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer: "You own everything. When we finish, all code repositories, designs, and cloud keys belong entirely to you.",
  },
  {
    question: "How do you handle project payments?",
    answer: "We work with simple, milestone-based pricing or flexible monthly retainers. No surprise bills or hidden fees.",
  },
];

export const ABOUT_NEOMINDS = {
  headline: "Engineering custom software that solves real business problems.",
  paragraphs: [
    "Neominds is an applied software engineering company. We design and develop custom websites, web applications, and practical AI tools for growing businesses.",
    "We believe in clean code, direct developer communication, and complete transparency. You talk directly with the people building your product, and you own 100% of your code.",
  ],
  stats: [
    { label: "On-time delivery", value: "100%" },
    { label: "Code ownership", value: "100%" },
    { label: "Direct communication", value: "Always" },
  ],
};

export type CaseStudy = ScrollStackCaseStudy;
export const CASE_STUDIES: CaseStudy[] = SCROLL_STACK_CASE_STUDIES;
export const LOGO_ITEMS = TECH_LOGO_ITEMS;

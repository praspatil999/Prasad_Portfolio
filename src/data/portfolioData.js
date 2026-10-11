export const PERSONAL_INFO = {
  name: 'Prasad Patil',
  role: 'Senior Software Engineer & Full-Stack Architect',
  location: 'Pune, India',
  coordinates: '18.5204° N, 73.8567° E',
  yearsOfExperience: '8+',
  email: 'hello@prasadpatil.dev',
  github: 'https://github.com/prasadpatil',
  linkedin: 'https://linkedin.com/in/prasadpatil',
  liveSite: 'https://prasadportfolio-zeta.vercel.app/',
  headline: 'I build resilient software, high-throughput systems, and modern digital applications.',
  subtitle: 'Specializing in full-stack engineering, distributed systems, and cloud infrastructure at the intersection of performance and intuitive UX.',
  bio: `Over the past 8+ years, I've engineered mission-critical web applications, high-volume payment rails, and developer tools. Currently at Linear, crafting developer-first tools with obsession for performance, craft, and clean architecture.`
}

export const PROJECTS = [
  {
    id: 'finmate',
    title: 'FinMate',
    category: 'FinTech Platform',
    headline: 'Real-time financial analytics and automated reconciliation engine',
    description: 'A multi-tenant financial analytics platform enabling high-growth companies to ingest transaction streams, automate ledger reconciliation, and project cashflow runway in real time.',
    image: '/finmate_preview.png',
    featured: true,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Redis'],
    links: {
      github: 'https://github.com/prasadpatil',
      live: 'https://prasadportfolio-zeta.vercel.app/'
    },
    caseStudy: {
      tagline: 'High-Throughput Financial Intelligence',
      problem: 'Finance teams in scaling startups were struggling with 48-hour batch reconciliation delays and fractured data across payment gateways, leading to delayed cash forecasting and inaccurate runway projections.',
      solution: 'Architected an event-driven telemetry pipeline using Redis Streams and Prisma that processes incoming webhook web-events with sub-second latency, providing an interactive forecasting dashboard with zero-lag drill-downs.',
      keyFeatures: [
        'Real-time streaming ledger reconciliation with optimistic UI updates',
        'Multi-currency cashflow forecasting model with confidence interval visualizer',
        'Custom audit trails complying with financial compliance standards',
        'Zero-latency data grid rendering 50,000+ transactional rows with virtualized DOM'
      ],
      architecture: 'Built on Next.js 14 App Router with React Server Components for optimal LCP. PostgreSQL handles ACID transactions, while Redis provides fast distributed lock coordination and rate-limiting.',
      challenges: 'Handling out-of-order webhook deliveries from disparate payment vendors. Solved by implementing an idempotent event ingestion queue with cryptographic deduplication keys.',
      outcomes: 'Cut reconciliation processing cycle from 48 hours to under 30 seconds. Handled peak load tests of 12,000 events/sec with zero dropped transactions.'
    }
  },
  {
    id: 'launchboard',
    title: 'LaunchBoard',
    category: 'Developer Tooling & DevOps',
    headline: 'SaaS release control, canary deployments & developer analytics',
    description: 'Centralized release management platform providing engineering teams with real-time canary metrics, automated rollback triggers, and unified feature flag orchestration.',
    image: '/launchboard_preview.png',
    featured: true,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'WebSockets'],
    links: {
      github: 'https://github.com/prasadpatil',
      live: 'https://prasadportfolio-zeta.vercel.app/'
    },
    caseStudy: {
      tagline: 'Safeguarding Continuous Delivery Pipelines',
      problem: 'Engineering organizations faced frequent production regressions due to lack of real-time error telemetry coupled with feature flag toggling, leading to slow rollback decisions.',
      solution: 'Constructed an observability-first release orchestrator that pairs feature flag rules directly with live Sentry and Datadog telemetry, triggering automated rollback if error thresholds are breached within 60 seconds.',
      keyFeatures: [
        'Sub-15ms feature flag evaluation SDK with offline local cache evaluation',
        'Automated canary health monitoring with configurable anomaly triggers',
        'Audit-logged governance workflows with multi-engineer approvals',
        'Live deployment timeline synced across engineering teams via WebSockets'
      ],
      architecture: 'Distributed microservices architecture utilizing Edge compute for flag evaluations to ensure ultra-low latency, backed by PostgreSQL for state persistence and event streaming.',
      challenges: 'Minimizing edge evaluation latency while keeping client state fresh. Designed a lightweight pub/sub synchronization protocol with delta byte payloads.',
      outcomes: 'Reduced mean time to recovery (MTTR) on flawed releases by 85%, eliminating manual hotfix panics for adopting teams.'
    }
  },
  {
    id: 'walnut',
    title: 'Walnut',
    category: 'Mobile & Consumer FinTech',
    headline: 'Frictionless digital banking experience engineered for simplicity',
    description: 'A mobile-first digital banking interface re-imagined from the ground up to strip away traditional banking complexity, offering instantaneous peer-to-peer settlement and contextual expense intelligence.',
    image: '/walnut_preview.png',
    featured: true,
    tags: ['React Native', 'TypeScript', 'Node.js', 'Express', 'Biometrics', 'Redux Toolkit'],
    links: {
      github: 'https://github.com/prasadpatil',
      live: 'https://prasadportfolio-zeta.vercel.app/'
    },
    caseStudy: {
      tagline: 'Modern Mobile Banking Without the Clutter',
      problem: 'Legacy banking applications are plagued with cluttered UI hierarchies, sluggish load times, and opaque transaction states that cause user anxiety during high-stakes transfers.',
      solution: 'Designed and developed a 60 FPS mobile experience with fluid gesture physics, instantaneous biometric authorization, and clear visual state transitions that reassure the user at every step.',
      keyFeatures: [
        'Instant biometric authentication (Face ID / Fingerprint) with secure enclave tokens',
        'One-tap peer-to-peer transfers with interactive haptic feedback',
        'Dynamic spending category breakdown with automated merchant enrichment',
        'Offline-first balance ledger with background synchronization'
      ],
      architecture: 'React Native core with native iOS/Android bridge modules for hardware security. Node.js backend cluster orchestrating banking gateway calls with strict timeout fallbacks.',
      challenges: 'Maintaining 60 FPS animation performance while computing complex graph charts and balance timelines on budget Android devices. Solved through Skia-powered canvas rendering.',
      outcomes: 'Achieved an App Store satisfaction score of 4.9/5 with 99.98% crash-free sessions across 100,000+ simulated active sessions.'
    }
  },
  {
    id: 'civicconnect',
    title: 'CivicConnect',
    category: 'Civic Tech & Public Systems',
    headline: 'Incident dispatch & municipal infrastructure transparency portal',
    description: 'Public-interest web platform bridging citizens and city municipal engineers to track infrastructure repairs, potholes, and utility outages with real-time verification and GIS mapping.',
    image: '/civicconnect_preview.png',
    featured: false,
    tags: ['React', 'Node.js', 'MongoDB', 'Mapbox GIS', 'WebSockets', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/prasadpatil',
      live: 'https://prasadportfolio-zeta.vercel.app/'
    },
    caseStudy: {
      tagline: 'Civic Transparency via Spatial Computing',
      problem: 'Municipal issue reporting in metropolitan cities typically gets lost in bureaucratic black holes, leaving citizens uninformed about remediation status and progress.',
      solution: 'Developed an interactive GIS incident tracker where citizens can drop geotagged photo reports, track municipal ward progress in real time, and receive automated resolution notifications.',
      keyFeatures: [
        'Geospatial incident heatmaps powered by Mapbox GL and spatial indexes',
        'Automated municipal ward triage routing based on GPS coordinates',
        'Photo upload verification with EXIF data extraction',
        'Citizen notifications via WebSockets and SMS dispatch'
      ],
      architecture: 'React single-page application with Leaflet/Mapbox frontend, Node.js REST API with MongoDB geospatial queries (`$nearSphere`), and Cloudinary media optimization.',
      challenges: 'Handling burst traffic during heavy storm seasons and civic outages. Implemented server-side caching and dynamic client clustering for thousands of simultaneous map pins.',
      outcomes: 'Piloted across 3 municipal districts with over 4,500 resolved community issues and an average resolution time reduction of 40%.'
    }
  }
]

export const EXPERIENCES = [
  {
    period: '2021 — Present',
    role: 'Senior Software Engineer',
    company: 'Linear',
    location: 'Remote / Hybrid',
    description: 'Crafting developer-first workflow tools and high-performance user interfaces. Working on core product performance, keyboard-driven navigation systems, and real-time collaboration engines.',
    achievements: [
      'Architected high-performance virtualized list and canvas rendering pipelines to handle 10,000+ issues without frame drops',
      'Engineered offline-first sync protocols with CRDTs to enable conflict-free multi-user editing across global team instances',
      'Mentored engineers and contributed to company-wide frontend design system and internal build toolchains'
    ],
    tech: ['React', 'TypeScript', 'GraphQL', 'WebSockets', 'Node.js', 'Rust (Wasm)']
  },
  {
    period: '2019 — 2021',
    role: 'Software Engineer II',
    company: 'Razorpay',
    location: 'Bengaluru / Pune, India',
    description: 'Built high-throughput payment checkout infrastructure and merchant API interfaces. Engineered reliability safeguards across transaction gateways.',
    achievements: [
      'Engineered checkout SDK micro-frontends serving millions of daily end-user transactions with <150ms load time',
      'Implemented automated retry circuits and idempotent webhook delivery mechanisms, reducing failed charge inquiries by 28%',
      'Collaborated with security teams to ensure PCI-DSS Level 1 compliance and end-to-end payload encryption'
    ],
    tech: ['React', 'JavaScript', 'Node.js', 'Redis', 'Kafka', 'Docker', 'AWS']
  },
  {
    period: '2016 — 2018',
    role: 'Software Engineer',
    company: 'Capillary Technologies',
    location: 'Bengaluru, India',
    description: 'Developed scalable CRM solutions and omni-channel customer engagement platforms for global retail enterprises.',
    achievements: [
      'Built multi-tenant customer analytics dashboards processing tens of millions of retail records daily',
      'Migrated legacy monolithic UI portals to modular single-page React architectures with strict state boundaries',
      'Optimized heavy SQL reporting queries, cutting dashboard loading latency from 14s to under 1.8s'
    ],
    tech: ['React', 'Redux', 'Java', 'MySQL', 'Python', 'AWS']
  },
  {
    period: '2014 — 2016',
    role: 'Software Engineer',
    company: 'Persistent Systems',
    location: 'Pune, India',
    description: 'Started engineering career developing enterprise web applications, database schemas, and robust backend integrations.',
    achievements: [
      'Constructed foundational RESTful web services and transactional relational database schemas for enterprise clients',
      'Authored automated unit and integration test suites, increasing code coverage to 92%',
      'Participated in agile sprint cycles, technical documentation, and code review governance'
    ],
    tech: ['JavaScript', 'HTML5/CSS3', 'Java', 'SQL', 'Git', 'Linux']
  }
]

export const SKILL_CATEGORIES = [
  {
    category: 'Backend Development',
    summary: 'Building distributed APIs, reliable data pipelines, and scalable microservices.',
    skills: [
      { name: 'Node.js', context: 'High-throughput async event loops & microservices' },
      { name: 'TypeScript', context: 'Strict typing across backend domains & API schemas' },
      { name: 'Express.js', context: 'RESTful API routing & middleware architecture' },
      { name: 'REST & GraphQL', context: 'Contract-first API design & schema federation' },
      { name: 'Distributed Systems', context: 'Message queues, idempotency & caching patterns' },
      { name: 'Microservices', context: 'Service boundary separation & containerized services' }
    ]
  },
  {
    category: 'Frontend Development',
    summary: 'Crafting responsive, accessible, 60 FPS interactive web applications.',
    skills: [
      { name: 'React', context: 'Component composition, hooks & state architecture' },
      { name: 'Next.js', context: 'Server Components, SSR, ISR & edge routing' },
      { name: 'TypeScript', context: 'End-to-end type safety & design system tokens' },
      { name: 'Tailwind CSS', context: 'Design token utilities & responsive UI systems' },
      { name: 'Vanilla CSS & Animations', context: 'Compositor transforms, scroll-driven motion, glassmorphism' },
      { name: 'Web Performance', context: 'Core Web Vitals, code-splitting & DOM virtualization' }
    ]
  },
  {
    category: 'Databases',
    summary: 'Designing transactional schemas, query optimization, and caching strategies.',
    skills: [
      { name: 'PostgreSQL', context: 'Complex relational schemas, indexing & query tuning' },
      { name: 'MySQL', context: 'Enterprise transactional data management' },
      { name: 'MongoDB', context: 'Document modeling & geospatial spatial queries' },
      { name: 'Redis', context: 'In-memory caching, distributed locks & Pub/Sub' },
      { name: 'Prisma ORM', context: 'Type-safe database queries & migration workflows' }
    ]
  },
  {
    category: 'Cloud and DevOps',
    summary: 'Deploying robust cloud environments and automated CI/CD pipelines.',
    skills: [
      { name: 'AWS', context: 'EC2, S3, Lambda, CloudFront, RDS & IAM security' },
      { name: 'Docker', context: 'Multi-stage containerization & local dev orchestration' },
      { name: 'Vercel', context: 'Edge deployments, serverless functions & CI previews' },
      { name: 'Git & GitHub Actions', context: 'Automated test runners, linting & deploy pipelines' },
      { name: 'Linux / Unix', context: 'Shell scripting, server management & system profiling' }
    ]
  },
  {
    category: 'Programming Languages',
    summary: 'Primary languages used daily across product development and systems.',
    skills: [
      { name: 'TypeScript', context: 'Primary language for full-stack applications' },
      { name: 'JavaScript (ES6+)', context: 'Modern standards, async patterns & browser runtime' },
      { name: 'Python', context: 'Automation scripts, data manipulation & tooling' },
      { name: 'SQL', context: 'Relational query authoring, window functions & joins' },
      { name: 'HTML5 & CSS3', context: 'Semantic layout, modern CSS layers & accessibility' }
    ]
  }
]

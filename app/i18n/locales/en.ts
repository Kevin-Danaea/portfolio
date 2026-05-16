import type { LocaleMessages } from './schema'

export default {
  meta: {
    title: 'Kevin Aguilera — Software Engineer',
    description:
      'Kevin Aguilera — Software Engineer building streaming, fintech, internal tools and GenAI integrations with TypeScript, React, React Native, NestJS and AWS.',
  },

  nav: {
    about: 'About',
    stack: 'Stack',
    work: 'Experience',
    education: 'Education',
    now: 'Now',
    contact: 'Contact',
    resume: 'Resume',
  },

  hero: {
    coords: '19.6411° N, 98.9156° W · Tolcayuca, MX',
    role: 'Software Engineer · Full Stack',
    name: 'Kevin Danae\nAguilera Barragán',
    tagline: 'Building software at the intersection of',
    taglineWords: ['the web', 'mobile', 'physics', 'the cosmos'],
    blurb:
      "I'm a software engineer who likes shipping useful systems: mobile apps, admin platforms, backend services, security automation and GenAI integrations. Recently that has meant live monetization, faster streaming playback, secure workflows and AI subtitle translation. On the side, I'm studying physics and trying to make sense of the universe.",
    cta1: 'Get in touch',
    cta2: 'Download CV',
    status: 'Open to opportunities',
  },

  about: {
    eyebrow: '// observable_universe',
    title: 'Two trajectories,\none observer.',
    p1: "Hi, I'm Kevin. I've spent the last 4+ years building mobile, web and backend systems — mostly with TypeScript, React/React Native and Node, plus a healthy dose of Postgres. I enjoy figuring out how to keep systems simple as they grow, and I'm a big believer that clarity in code matters more than cleverness.",
    p2: "On the side I'm studying for a Bachelor's in Physics. The same curiosity that pulls me toward Schrödinger's equation is what got me into distributed systems in the first place — both are about modeling things precisely enough to actually predict what they'll do next.",
    p3: "If I could hop on a ship to another galaxy tomorrow, I probably would. Until then, I'm happy building, reading Feynman, and learning new things one bug at a time.",
    stats: [
      { k: '4+', v: 'years writing production code' },
      { k: '20%', v: 'streaming app performance boost' },
      { k: '95%', v: 'AI subtitle translation accuracy' },
      { k: '$0→live', v: 'subscription and bundle revenue launch' },
    ],
    interests: [
      'Theoretical physics',
      'Cosmos & space exploration',
      'Asian culture',
      'Retro tech',
      'Sci-fi',
      'Geek everything',
    ],
  },

  stack: {
    eyebrow: '// instrumentation',
    title: 'The toolkit',
    sub: 'Languages, frameworks and platforms I use day to day. I learn what the problem needs.',
    groups: [
      {
        label: 'Languages',
        items: [
          'TypeScript',
          'JavaScript ES2023',
          'Python',
          'Kotlin',
          'SQL / PL/pgSQL',
          'Ruby',
          'Bash',
        ],
      },
      {
        label: 'Frontend & Mobile',
        items: [
          'React 19',
          'React Native',
          'Expo SDK 54',
          'Jetpack Compose',
          'Redux Toolkit',
          'Zustand',
          'Reanimated',
          'FlashList',
          'Refine.dev',
          'Ant Design',
          'Vite',
        ],
      },
      {
        label: 'Backend',
        items: [
          'Node.js',
          'NestJS 11',
          'Hono',
          'Deno 2',
          'Express',
          'Flask',
          'REST',
          'Microservices',
          'Edge Functions',
        ],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL 17', 'Supabase', 'RLS / RPCs', 'Redis · BullMQ', 'Room', 'DataStore'],
      },
      {
        label: 'Cloud & DevOps',
        items: [
          'AWS ECS Fargate',
          'AWS Bedrock',
          'AWS SES',
          'Docker',
          'GitHub Actions',
          'EAS',
          'Cloudflare',
          'Vercel',
          'CI/CD',
        ],
      },
      {
        label: 'Video, Pay & AI',
        items: [
          'Mux Video',
          'ExoPlayer HLS',
          'RevenueCat',
          'Stripe',
          'StoreKit',
          'Play Billing',
          'Anthropic Claude',
          'AWS Bedrock LLM',
        ],
      },
      {
        label: 'Security',
        items: [
          'DevSecOps',
          'JWT / OAuth',
          'HMAC-SHA256',
          'Helmet',
          'Rate limiting',
          'RLS policies',
        ],
      },
    ],
  },

  work: {
    eyebrow: '// world_lines',
    title: 'Experience',
    sub: "Where I've been working — each role taught me something different.",
    items: [
      {
        company: 'Idilio TV',
        desc: 'Streaming & video-on-demand startup',
        role: 'Software Engineer · Streaming, Platform & GenAI',
        period: 'Dec 2025 — Present',
        loc: 'Remote · Mexico',
        bullets: [
          'Shipped a cross-platform streaming app (iOS & Android) in React Native + Expo SDK 54 across 112+ components, 36 Redux Toolkit slices and 23 custom hooks for auth, Mux playback, recommendations and rewards.',
          'Launched the in-app monetization stack for subscriptions and bundle purchases, taking purchases from $0 to live revenue.',
          'Delivered a 20% streaming app performance improvement while preserving instant playback on stronger devices.',
          'Created a React 19 + Vite admin dashboard with 258+ components for content operations, resumable video uploads, drag-and-drop ordering and Zustand state connected to Supabase typed APIs.',
          'Engineered a NestJS 11 API and 11 Supabase Edge Functions for auth, webhooks, content workflows and operational integrations.',
          'Owned 223+ PostgreSQL migrations and PL/pgSQL RPCs covering RLS, geo-fencing and unified content evaluation across 4 entity types.',
          'Built deterministic A/B testing with FNV-1a hash bucketing and JSONB targeting across countries, regions, languages and subscription tiers.',
          'Integrated AWS Bedrock + Translate for AI subtitle translation with 95% accuracy, plus AWS ECS Fargate and Expo Server SDK push notifications.',
        ],
      },
      {
        company: 'Mercado Libre',
        desc: 'Largest e-commerce & fintech in Latin America',
        role: 'Software Engineer · Cybersecurity / DevSecOps',
        period: 'Apr 2022 — Dec 2025',
        loc: 'Remote · Mexico',
        bullets: [
          'Built security automation tools and DevSecOps pipelines in Python and JavaScript for CI/CD workflows, including static analysis, secret scanning and policy-as-code.',
          'Reduced security remediation time by 15% by improving triage workflows and earlier issue detection for severe findings.',
          'Contributed to full-stack product features and internal systems with JavaScript, React, Node.js and Python before transitioning to security engineering.',
          'Enforced secure-by-default patterns across microservices: authentication, secret management and dependency hardening at scale.',
          'Worked in a polyglot, high-traffic environment serving products with millions of daily users.',
        ],
      },
      {
        company: 'Truehome',
        desc: 'Real-estate marketplace in Mexico',
        role: 'Frontend Developer · React',
        period: 'Oct 2021 — Apr 2022',
        loc: 'Mexico City · Hybrid',
        bullets: [
          'Built and maintained internal React tools and back-office dashboards used by operations, agents and sales for listings, leads and transactions.',
          'Wrote reusable UI components and integrated REST APIs to make daily workflows a bit less painful.',
          'Translated business requirements into accessible, responsive web interfaces under Agile/Scrum.',
          'Contributed to code quality through component-driven development and peer reviews.',
        ],
      },
    ],
  },

  education: {
    eyebrow: '// formation',
    title: 'Education & credentials',
    labels: {
      formal: 'formal',
      certifications: 'certifications',
      languages: 'languages',
    },
    formal: [
      {
        school: 'TECH Universidad Tecnológica',
        degree: "Bachelor's in Physics",
        period: 'In progress · Expected 2028',
        note: 'Online',
      },
      {
        school: 'Henry Bootcamp',
        degree: 'Full Stack Web Development',
        period: '2021',
        note: 'JavaScript, React, Node.js, PostgreSQL · 4+ months intensive',
      },
    ],
    certs: [
      'Ruby on Rails — Udemy, 2024',
      'Microsoft Azure Fundamentals — Microsoft, 2021',
      'Scrum Fundamentals Certified (SFC) — SCRUMstudy, 2021',
      'JavaScript Moderno — Udemy, 2021',
      'Introducción a Swift — Platzi, 2022',
    ],
    languages: [
      { lang: 'Spanish', level: 'Native' },
      { lang: 'English', level: 'Professional Working · B2' },
    ],
  },

  now: {
    eyebrow: '// current_state',
    title: 'Now',
    sub: "What I'm up to this month — inspired by Derek Sivers' /now page idea.",
    items: [
      { k: 'Building', v: 'Idilio TV — working on mobile, admin and edge functions.' },
      { k: 'Securing', v: 'Mercado Libre — DevSecOps tooling for the engineering org.' },
      { k: 'Studying', v: 'Quantum mechanics homework + general relativity readings.' },
      { k: 'Reading', v: "Feynman's Lectures on Physics, vol. III." },
      { k: 'Tinkering', v: 'ai-docgen, oraculo_bot, trading_ai — small side projects.' },
      { k: 'Listening', v: 'Japanese city pop and 80s synthwave on loop.' },
    ],
  },

  contact: {
    eyebrow: '// transmit',
    title: "Let's connect across\nspace and time.",
    sub: 'Open to interesting roles, contracts and collaborations — especially anything around streaming, mobile, AI, or (bonus points) physics. I read everything, even if it takes me a couple of days to reply.',
    cta: "kevin.danaea{'@'}gmail.com",
    ctaLabel: 'Send a signal',
    links: [
      { label: 'GitHub', url: 'https://github.com/Kevin-Danaea', handle: "{'@'}Kevin-Danaea" },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/kevin-danae/',
        handle: '/in/kevin-danae',
      },
      {
        label: 'Email',
        url: "mailto:kevin.danaea{'@'}gmail.com",
        handle: "kevin.danaea{'@'}gmail.com",
      },
      { label: 'Web', url: 'https://kevinaguilera.tech', handle: 'kevinaguilera.tech' },
    ],
  },

  footer: {
    sig: 'Designed & built by Kevin Aguilera',
    built: 'Made with Nuxt, vanilla canvas physics and a love for the cosmos.',
    quote:
      '"The universe is not only queerer than we suppose, but queerer than we can suppose." — J.B.S. Haldane',
  },

  a11y: {
    skipToMain: 'Skip to main content',
    toggleLanguage: 'Toggle language',
  },
} satisfies LocaleMessages

import type { LocaleMessages } from './schema'

export default {
  meta: {
    title: 'Kevin Aguilera — Software Engineer',
    description:
      'Kevin Aguilera — Software Engineer construyendo streaming, fintech, herramientas internas e integraciones GenAI con TypeScript, React, React Native, NestJS y AWS.',
  },

  nav: {
    about: 'Sobre mí',
    stack: 'Stack',
    work: 'Experiencia',
    education: 'Educación',
    now: 'Ahora',
    contact: 'Contacto',
    resume: 'CV',
  },

  hero: {
    coords: '19.6411° N, 98.9156° O · Tolcayuca, MX',
    role: 'Software Engineer · Full Stack',
    name: 'Kevin Danae\nAguilera Barragán',
    tagline: 'Construyendo software en la intersección de',
    taglineWords: ['la web', 'móvil', 'la física', 'el cosmos'],
    blurb:
      'Soy software engineer y me gusta lanzar sistemas útiles: apps móviles, plataformas admin, servicios backend, automatización de seguridad e integraciones GenAI. Últimamente eso significa monetización real, mejor playback de streaming, workflows seguros y traducción de subtítulos con AI. En paralelo, estudio física e intento entender un poco mejor el universo.',
    cta1: 'Contáctame',
    cta2: 'Descargar CV',
    status: 'Abierto a oportunidades',
  },

  about: {
    eyebrow: '// universo_observable',
    title: 'Dos trayectorias,\nun observador.',
    p1: 'Hola, soy Kevin. Llevo 4+ años construyendo sistemas móviles, web y backend — sobre todo con TypeScript, React/React Native y Node, con buena dosis de Postgres. Me gusta pensar cómo mantener los sistemas simples mientras crecen, y soy bastante creyente de que la claridad en el código importa más que la astucia.',
    p2: 'En paralelo estudio una licenciatura en Física. La misma curiosidad que me jala hacia la ecuación de Schrödinger es la que me metió en sistemas distribuidos: ambos van de modelar las cosas con la precisión justa para predecir qué van a hacer después.',
    p3: 'Si pudiera abordar mañana una nave a otra galaxia, probablemente lo haría. Mientras, sigo construyendo, leyendo a Feynman y aprendiendo cosas nuevas un bug a la vez.',
    stats: [
      { k: '4+', v: 'años escribiendo código en producción' },
      { k: '20%', v: 'mejora de performance en streaming' },
      { k: '95%', v: 'accuracy en traducción AI de subtítulos' },
      { k: '$0→live', v: 'lanzamiento de revenue por suscripciones y bundles' },
    ],
    interests: [
      'Física teórica',
      'Cosmos y exploración espacial',
      'Cultura asiática',
      'Tech retro',
      'Ciencia ficción',
      'Todo lo geek',
    ],
  },

  stack: {
    eyebrow: '// instrumentación',
    title: 'El instrumental',
    sub: 'Lenguajes, frameworks y plataformas que uso a diario. Aprendo lo que el problema necesita.',
    groups: [
      {
        label: 'Lenguajes',
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
        label: 'Frontend y Móvil',
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
          'Microservicios',
          'Edge Functions',
        ],
      },
      {
        label: 'Bases de datos',
        items: ['PostgreSQL 17', 'Supabase', 'RLS / RPCs', 'Redis · BullMQ', 'Room', 'DataStore'],
      },
      {
        label: 'Cloud y DevOps',
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
        label: 'Video, pagos y AI',
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
        label: 'Seguridad',
        items: [
          'DevSecOps',
          'JWT / OAuth',
          'HMAC-SHA256',
          'Helmet',
          'Rate limiting',
          'Políticas RLS',
        ],
      },
    ],
  },

  work: {
    eyebrow: '// líneas_de_universo',
    title: 'Experiencia',
    sub: 'Dónde he trabajado — cada rol me enseñó algo distinto.',
    items: [
      {
        company: 'Idilio TV',
        desc: 'Startup de streaming y video bajo demanda',
        role: 'Software Engineer · Streaming, Platform y GenAI',
        period: 'Dic 2025 — Presente',
        loc: 'Remoto · México',
        bullets: [
          'Lancé una app de streaming cross-platform (iOS y Android) en React Native + Expo SDK 54 sobre 112+ componentes, 36 slices de Redux Toolkit y 23 hooks para auth, reproducción Mux, recomendaciones y rewards.',
          'Lancé el stack de monetización in-app para suscripciones y bundles, llevando compras de $0 a revenue activo.',
          'Logré una mejora de performance del 20% en la app de streaming preservando playback instantáneo en dispositivos fuertes.',
          'Creé un dashboard admin en React 19 + Vite con 258+ componentes para operaciones de contenido, uploads reanudables, orden drag-and-drop y Zustand conectado a APIs tipadas de Supabase.',
          'Implementé una API en NestJS 11 y 11 Supabase Edge Functions para auth, webhooks, workflows de contenido e integraciones operativas.',
          'Mantuve 223+ migraciones de PostgreSQL y RPCs PL/pgSQL con RLS, geo-fencing y evaluación unificada de contenido en 4 entity types.',
          'Construí A/B testing determinístico con bucketing FNV-1a y targeting JSONB por país, región, idioma y subscription tier.',
          'Integré AWS Bedrock + Translate para traducción AI de subtítulos con 95% de accuracy, además de push notifications con AWS ECS Fargate y Expo Server SDK.',
        ],
      },
      {
        company: 'Mercado Libre',
        desc: 'El e-commerce y fintech más grande de Latinoamérica',
        role: 'Software Engineer · Ciberseguridad / DevSecOps',
        period: 'Abr 2022 — Dic 2025',
        loc: 'Remoto · México',
        bullets: [
          'Construí herramientas de automatización de seguridad y pipelines DevSecOps en Python y JavaScript para CI/CD, incluyendo análisis estático, escaneo de secretos y policy-as-code.',
          'Reduje 15% el tiempo de remediación de vulnerabilidades mejorando triage y detección temprana de findings severos.',
          'Contribuí a features full-stack y sistemas internos con JavaScript, React, Node.js y Python antes de moverme a security engineering.',
          'Impulsé patrones secure-by-default en microservicios: autenticación, gestión de secretos y hardening de dependencias a escala.',
          'Trabajé en un entorno políglota de alto tráfico con productos usados por millones de usuarios diarios.',
        ],
      },
      {
        company: 'Truehome',
        desc: 'Marketplace inmobiliario en México',
        role: 'Frontend Developer · React',
        period: 'Oct 2021 — Abr 2022',
        loc: 'CDMX · Híbrido',
        bullets: [
          'Construí y mantuve herramientas internas y dashboards de back-office en React para operaciones, agentes y ventas: listings, leads y transacciones.',
          'Escribí componentes UI reutilizables e integré REST APIs para hacer los flujos diarios un poco menos pesados.',
          'Traduje requerimientos de negocio en interfaces accesibles y responsivas bajo Agile/Scrum.',
          'Aporté a la calidad del código con desarrollo component-driven y revisión entre pares.',
        ],
      },
    ],
  },

  education: {
    eyebrow: '// formación',
    title: 'Educación y credenciales',
    labels: {
      formal: 'formación',
      certifications: 'certificaciones',
      languages: 'idiomas',
    },
    formal: [
      {
        school: 'TECH Universidad Tecnológica',
        degree: 'Licenciatura en Física',
        period: 'En curso · Estimado 2028',
        note: 'Online',
      },
      {
        school: 'Henry Bootcamp',
        degree: 'Desarrollo Web Full Stack',
        period: '2021',
        note: 'JavaScript, React, Node.js, PostgreSQL · 4+ meses intensivos',
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
      { lang: 'Español', level: 'Nativo' },
      { lang: 'Inglés', level: 'Professional Working · B2' },
    ],
  },

  now: {
    eyebrow: '// estado_actual',
    title: 'Ahora',
    sub: 'Qué estoy haciendo este mes — inspirado en la idea de la página /now de Derek Sivers.',
    items: [
      { k: 'Construyendo', v: 'Idilio TV — móvil, admin y edge functions.' },
      {
        k: 'Asegurando',
        v: 'Mercado Libre — herramientas de DevSecOps para la org de ingeniería.',
      },
      { k: 'Estudiando', v: 'Tareas de mecánica cuántica y lecturas de relatividad general.' },
      { k: 'Leyendo', v: 'Lecciones de Física de Feynman, vol. III.' },
      { k: 'Toqueteando', v: 'ai-docgen, oraculo_bot, trading_ai — proyectos pequeños.' },
      { k: 'Escuchando', v: 'City pop japonés y synthwave de los 80 en loop.' },
    ],
  },

  contact: {
    eyebrow: '// transmitir',
    title: 'Conectemos a través\ndel espacio-tiempo.',
    sub: 'Abierto a roles interesantes, contratos y colaboraciones — especialmente cualquier cosa que toque streaming, mobile, AI, o (puntos extra) física. Leo todo, aunque tarde un par de días en responder.',
    cta: "kevin.danaea{'@'}gmail.com",
    ctaLabel: 'Enviar una señal',
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
    sig: 'Diseñado y construido por Kevin Aguilera',
    built: 'Hecho con Nuxt, física en canvas vainilla y amor por el cosmos.',
    quote:
      '"El universo no solo es más extraño de lo que suponemos, sino más extraño de lo que podemos suponer." — J.B.S. Haldane',
  },

  a11y: {
    skipToMain: 'Saltar al contenido principal',
    toggleLanguage: 'Cambiar idioma',
  },
} satisfies LocaleMessages

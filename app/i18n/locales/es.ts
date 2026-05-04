import type { LocaleMessages } from './schema'

export default {
  meta: {
    title: 'Kevin Aguilera — Software Engineer',
    description:
      'Kevin Aguilera — Software Engineer Full Stack construyendo sistemas de streaming, fintech y AI. Estudiante de Física. Tolcayuca, México.',
  },

  nav: {
    about: 'Sobre mí',
    stack: 'Stack',
    work: 'Experiencia',
    education: 'Educación',
    now: 'Ahora',
    contact: 'Contacto',
  },

  hero: {
    coords: '19.6411° N, 98.9156° O · Tolcayuca, MX',
    role: 'Software Engineer · Full Stack',
    name: 'Kevin Danae\nAguilera Barragán',
    tagline: 'Construyendo software en la intersección de',
    taglineWords: ['la web', 'móvil', 'la física', 'el cosmos'],
    blurb:
      'Soy ingeniero full-stack y me gusta lanzar cosas — apps móviles, plataformas web, servicios backend. Actualmente ayudo a construir un producto de streaming en Idilio TV y trabajo en herramientas de seguridad en Mercado Libre. En paralelo, estudio física e intento entender un poco mejor el universo.',
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
      { k: '3', v: 'empresas, tres problemas muy distintos' },
      { k: '1', v: 'licenciatura en Física en curso' },
      { k: '∞', v: 'pestañas abiertas sobre cosmología' },
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
        role: 'Full Stack Software Engineer · Mobile',
        period: 'Dic 2025 — Presente',
        loc: 'Remoto · México',
        bullets: [
          'Ayudo a construir una app de streaming cross-platform (iOS y Android) en React Native + Expo SDK 54 — trabajo entre componentes, slices de Redux y hooks para auth, reproducción Mux, recomendaciones y un sistema de recompensas.',
          'Colaboré en un setup de A/B testing con bucketing FNV-1a y targeting JSONB (país, región, idioma, tier) para correr experimentos en posters, shows, episodios y reels.',
          'Construí una app companion nativa en Kotlin + Jetpack Compose con Hilt, Orbit MVI y Media3 ExoPlayer (HLS), incluyendo benchmarks y minificación R8.',
          'Contribuí a la API admin en NestJS 11: Swagger, auth Supabase JWT, Helmet, throttling y pruebas con Jest.',
          'Escribí Edge Functions en Deno 2 + Hono con verificación HMAC-SHA256 para webhooks de RevenueCat y Mux.',
          'Trabajé en migraciones de PostgreSQL y RPCs en PL/pgSQL alrededor de RLS, geofencing, soft-delete y evaluación unificada de variantes de contenido.',
          'Ayudé a integrar AWS Bedrock + Translate en un pipeline de traducción de subtítulos con AI, para evitar traducciones manuales.',
          'Contribuí al dashboard admin en React 19 + Vite sobre Refine.dev — componentes, uploads reanudables con Mux Upchunk y estado en Zustand.',
        ],
      },
      {
        company: 'Mercado Libre',
        desc: 'El e-commerce y fintech más grande de Latinoamérica',
        role: 'Software Engineer · Ciberseguridad / DevSecOps',
        period: 'Abr 2022 — Presente',
        loc: 'Remoto · México',
        bullets: [
          'Trabajo en herramientas de automatización de seguridad y pipelines DevSecOps que se usan en toda la organización — análisis estático, escaneo de secretos y policy-as-code en CI/CD.',
          'Desarrollo servicios internos en Python y JavaScript que ayudan a triagear y remediar findings de seguridad, para que los issues críticos se resuelvan más rápido.',
          'Colaboro con equipos de producto, plataforma e infra para empujar patrones secure-by-default: auth, gestión de secretos y hardening de dependencias.',
          'Antes de pasarme a seguridad, contribuí a features full-stack (React / Node / Python) — eso me dio sensibilidad para ambos lados del problema.',
          'Día a día en un entorno políglota de alta escala con millones de usuarios diarios.',
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

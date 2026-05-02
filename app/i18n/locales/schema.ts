/**
 * Locale schema — one interface per section (Interface Segregation).
 * Both en.ts and es.ts must `satisfies LocaleMessages`, so a missing or
 * misspelled key breaks the build before it can land in production.
 *
 * Components import only the slice they consume:
 *   import type { HeroCopy } from '~/i18n/locales/schema'
 */

export interface MetaCopy {
  title: string
  description: string
}

export interface NavCopy {
  about: string
  stack: string
  work: string
  education: string
  now: string
  contact: string
}

export interface HeroCopy {
  coords: string
  role: string
  /** Display name; "\n" splits across lines in the hero. */
  name: string
  tagline: string
  taglineWords: readonly string[]
  blurb: string
  cta1: string
  cta2: string
  status: string
}

export interface AboutStat {
  k: string
  v: string
}

export interface AboutCopy {
  eyebrow: string
  /** Section title; "\n" splits across lines. */
  title: string
  p1: string
  p2: string
  p3: string
  stats: readonly AboutStat[]
  interests: readonly string[]
}

export interface StackGroup {
  label: string
  items: readonly string[]
}

export interface StackCopy {
  eyebrow: string
  title: string
  sub: string
  groups: readonly StackGroup[]
}

export interface WorkItem {
  company: string
  desc: string
  role: string
  period: string
  loc: string
  bullets: readonly string[]
}

export interface WorkCopy {
  eyebrow: string
  title: string
  sub: string
  items: readonly WorkItem[]
}

export interface FormalEdu {
  school: string
  degree: string
  period: string
  note: string
}

export interface LangEntry {
  lang: string
  level: string
}

export interface EducationCopy {
  eyebrow: string
  title: string
  formal: readonly FormalEdu[]
  certs: readonly string[]
  languages: readonly LangEntry[]
}

export interface NowItem {
  k: string
  v: string
}

export interface NowCopy {
  eyebrow: string
  title: string
  sub: string
  items: readonly NowItem[]
}

export interface ContactLink {
  label: string
  url: string
  handle: string
}

export interface ContactCopy {
  eyebrow: string
  /** "\n" splits across lines. */
  title: string
  sub: string
  cta: string
  ctaLabel: string
  links: readonly ContactLink[]
}

export interface FooterCopy {
  sig: string
  built: string
  quote: string
}

/**
 * Strings consumed by assistive-tech (aria-label, sr-only text, skip links).
 * Kept separate from visible copy so a11y reviews are easy to find.
 */
export interface A11yCopy {
  skipToMain: string
  toggleLanguage: string
}

/**
 * Root locale shape. Composed of section interfaces above.
 * The order here is the source of truth for the page composition order.
 */
export interface LocaleMessages {
  meta: MetaCopy
  nav: NavCopy
  hero: HeroCopy
  about: AboutCopy
  stack: StackCopy
  work: WorkCopy
  education: EducationCopy
  now: NowCopy
  contact: ContactCopy
  footer: FooterCopy
  a11y: A11yCopy
}

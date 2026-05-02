import { describe, expect, it } from 'vitest'
import en from '~/i18n/locales/en'
import es from '~/i18n/locales/es'

/**
 * TS already enforces *shape* parity via `satisfies LocaleMessages` in both
 * locale files. What it can't catch is *content* parity: a locale could ship
 * a `stats` array with 4 items while the other has 5 — both still satisfy
 * `readonly AboutStat[]`.
 *
 * This test walks both trees recursively and reports any structural drift:
 *   - missing keys on either side
 *   - mismatched array lengths
 *   - mismatched value types (string vs number, etc.)
 * Editorial drift in the actual *strings* is intentional and not checked.
 */

type Walkable = Record<string, unknown> | readonly unknown[] | unknown

function walk(a: Walkable, b: Walkable, path = '$'): string[] {
  const errors: string[] = []

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      errors.push(`${path}: array vs non-array`)
      return errors
    }
    if (a.length !== b.length) {
      errors.push(`${path}: array length ${a.length} (en) vs ${b.length} (es)`)
    }
    const max = Math.min(a.length, b.length)
    for (let i = 0; i < max; i++) {
      errors.push(...walk(a[i], b[i], `${path}[${i}]`))
    }
    return errors
  }

  if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
    const aKeys = Object.keys(a as Record<string, unknown>)
    const bKeys = Object.keys(b as Record<string, unknown>)
    const all = new Set([...aKeys, ...bKeys])
    for (const k of all) {
      const inA = k in (a as Record<string, unknown>)
      const inB = k in (b as Record<string, unknown>)
      if (!inA) errors.push(`${path}.${k}: missing in en`)
      else if (!inB) errors.push(`${path}.${k}: missing in es`)
      else {
        errors.push(
          ...walk(
            (a as Record<string, unknown>)[k],
            (b as Record<string, unknown>)[k],
            `${path}.${k}`,
          ),
        )
      }
    }
    return errors
  }

  if (typeof a !== typeof b) {
    errors.push(`${path}: type ${typeof a} vs ${typeof b}`)
  }
  return errors
}

describe('i18n bilingual parity', () => {
  it('en and es have identical structure (keys + array lengths)', () => {
    const drift = walk(en, es)
    expect(drift).toEqual([])
  })
})

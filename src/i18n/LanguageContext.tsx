import * as React from 'react'

import { en } from '@/i18n/en'
import { fr } from '@/i18n/fr'

import type { Dictionary } from '@/i18n/en'

export type Locale = 'fr' | 'en'

/**
 * French is the default locale (2026-08-13 user decision). English is the
 * only other supported locale for now, but adding a third locale is just
 * another entry here + a new dictionary file matching `Dictionary`.
 */
export const DEFAULT_LOCALE: Locale = 'fr'
const STORAGE_KEY = 'pelmatech-locale'

const dictionaries: Record<Locale, Dictionary> = { fr, en }

interface LanguageContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default identically on server and first client render (avoids a
  // hydration mismatch) — the stored preference, if any, is only applied
  // after mount, exactly like the existing zoom/dark-mode pattern.
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'fr' || stored === 'en') {
        setLocaleState(stored)
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — fall back silently.
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = locale
    document.title = dictionaries[locale].meta.title
  }, [locale])

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = React.useMemo<LanguageContextValue>(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

function useLanguageContext() {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useTranslation/useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

/** Returns the full typed dictionary for the current locale. */
export function useTranslation(): Dictionary {
  return useLanguageContext().t
}

/** Returns `{ locale, setLocale }` for building a language switcher. */
export function useLanguage() {
  const { locale, setLocale } = useLanguageContext()
  return { locale, setLocale }
}

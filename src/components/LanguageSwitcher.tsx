import { motion, useReducedMotion } from 'motion/react'

import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

import type { Locale } from '@/i18n/LanguageContext'

const LABELS: Record<Locale, string> = { fr: 'FR', en: 'EN' }
const FULL_LABELS: Record<Locale, string> = { fr: 'Français', en: 'English' }

interface LanguageSwitcherProps {
  className?: string
  /** 'pill' matches the header nav pill; 'panel' matches the dark mobile menu. */
  variant?: 'pill' | 'panel'
}

/**
 * Lets a visitor switch the entire site between French (default) and
 * English. Persists the choice to localStorage via useLanguage/LanguageContext.
 */
export function LanguageSwitcher({ className, variant = 'pill' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage()
  const locales: Array<Locale> = ['fr', 'en']
  const prefersReducedMotion = useReducedMotion()
  // 2026-08-14: nav animation pass — the active-locale pill now slides
  // between FR/EN via motion's layoutId instead of just swapping classes.
  // Scoped per `variant` (header pill vs. mobile-menu panel can both be
  // mounted at once) so the two instances never share a layout animation.
  const pillLayoutId = `lang-switcher-pill-${variant}`

  return (
    <div
      role="group"
      aria-label="Choisir la langue / Choose language"
      className={cn(
        'flex items-center gap-0.5 rounded-full p-0.5',
        variant === 'pill' ? 'bg-black/10' : 'bg-white/10',
        className,
      )}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={FULL_LABELS[l]}
          className={cn(
            'relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition',
            locale === l
              ? 'text-foreground'
              : variant === 'pill'
                ? 'opacity-70 hover:opacity-100'
                : 'text-white/70 hover:text-white',
          )}
        >
          {locale === l && (
            <motion.span
              layoutId={pillLayoutId}
              className="absolute inset-0 rounded-full bg-white"
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
            />
          )}
          <span className="relative">{LABELS[l]}</span>
        </button>
      ))}
    </div>
  )
}

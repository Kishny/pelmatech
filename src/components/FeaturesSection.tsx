import { Link } from '@tanstack/react-router'
import { Activity, Calendar, Apple, Dumbbell, ArrowUpRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { GlowBackdrop } from '@/components/GlowBackdrop'
import { useTranslation } from '@/i18n/LanguageContext'

// Icons stay local (not translated); number/title/body text comes from
// t.featuresSection.pillars, matched by array index.
const PILLAR_ICONS = [Activity, Calendar, Apple, Dumbbell]
// 2026-08-14 audit fix: this grid advertised 4 features with zero way to
// click through to any of them. Each pillar now links to its real route,
// matched by the same index/order as PILLAR_ICONS (Health Tracking,
// Appointments, Nutrition, Fitness — see spec section 5).
const PILLAR_ROUTES = ['/health', '/appointments', '/nutrition', '/fitness'] as const

/**
 * Platform Overview — the first new section after Benefits (spec
 * section 5). Must feel seamless with the protected foundation above
 * it. 4-pillar "PLATFORM FEATURE GRID".
 */
export function FeaturesSection() {
  const t = useTranslation()
  const PILLARS = t.featuresSection.pillars.map((pillar, i) => ({
    ...pillar,
    icon: PILLAR_ICONS[i],
  }))
  return (
    <section className="relative z-0 overflow-hidden py-32 px-8 md:px-12 bg-background">
      <GlowBackdrop variant="top-right" />

      <div
        className="mb-16 flex gap-24 tracking-[0.2em] uppercase text-muted-foreground"
        style={{ fontSize: '11.26px' }}
      >
        <span>{t.featuresSection.eyebrow1}</span>
        <span>{t.featuresSection.eyebrow2}</span>
      </div>

      <AnimatedHeading as="h2" className="max-w-3xl font-medium leading-[1.05]" style={{ fontSize: '58px' }}>
        {t.featuresSection.headingLine1}
        <br />
        {t.featuresSection.headingLine2}
      </AnimatedHeading>

      <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
        {t.featuresSection.description}
      </AnimatedText>

      <div className="mt-20 grid grid-cols-1 divide-y divide-border border-t border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon
          return (
            <Link
              key={pillar.number}
              to={PILLAR_ROUTES[i]}
              className="group flex flex-col gap-6 py-10 transition-colors hover:bg-muted/30 md:px-8 md:py-0 md:pt-10"
            >
              <AnimatedText as="span" delay={i * 0.1} className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {pillar.number}
              </AnimatedText>
              <Icon className="h-6 w-6 text-accent" />
              <div className="flex items-center justify-between gap-2">
                <AnimatedHeading as="h3" delay={i * 0.1} className="text-xl font-medium">
                  {pillar.title}
                </AnimatedHeading>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
              <AnimatedText delay={i * 0.1} className="text-sm text-muted-foreground leading-relaxed">
                {pillar.body}
              </AnimatedText>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

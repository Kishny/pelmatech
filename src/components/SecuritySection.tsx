import { ShieldCheck, Lock, Eye, KeyRound, MessageCircle } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { GlowBackdrop } from '@/components/GlowBackdrop'
import { useTranslation } from '@/i18n/LanguageContext'

// Icons stay local (not translated); label text comes from
// t.security.points, matched by array index.
const POINT_ICONS = [Lock, KeyRound, Eye, ShieldCheck, MessageCircle]

/**
 * Security / Privacy — do not claim HIPAA/GDPR compliance or
 * certifications; use "designed with strong privacy and security
 * practices" language only, per spec.
 */
export function SecuritySection() {
  const t = useTranslation()
  const points = t.security.points.map((label, i) => ({ label, icon: POINT_ICONS[i] }))

  return (
    <section className="relative z-0 overflow-hidden py-32 px-8 md:px-12 bg-surface">
      <GlowBackdrop variant="bottom-right" />

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
        <div>
          <ShieldCheck className="h-8 w-8 text-accent" />
          <AnimatedHeading as="h2" className="mt-6 max-w-md text-4xl md:text-5xl font-medium leading-[1.05]">
            {t.security.headingLine1}
            <br />
            {t.security.headingLine2}
          </AnimatedHeading>
          <AnimatedText className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            {t.security.description}
          </AnimatedText>
        </div>

        <ul className="space-y-6">
          {points.map((point) => {
            const Icon = point.icon
            return (
              <li key={point.label} className="flex items-center gap-4 border-b border-border pb-6">
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-base text-foreground">{point.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

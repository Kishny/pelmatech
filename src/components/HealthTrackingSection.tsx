// Real photo supplied 2026-08-14 (smartwatch showing heart rate — matches
// the "72 bpm" resting heart rate metric card below), replacing the
// generic "placeholder asset - replace before launch" scaffold graphic.
import healthData from '@/assets/smartwatch.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { HealthMetricCard } from '@/components/HealthMetricCard'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

// 2026-08-14: switched from bg-surface to bg-accent-tint (a pale wash
// derived from --accent) so this section reads as a "breathing" color
// moment in the scroll — part of the background-relief pass (Option C).
/** Health Tracking — editorial dashboard showcase, bg-accent-tint. */
export function HealthTrackingSection() {
  const t = useTranslation()

  return (
    <section className="py-32 px-8 md:px-12 bg-accent-tint">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <div>
          <AnimatedHeading as="h2" className="text-4xl md:text-5xl font-medium leading-[1.05]">
            {t.healthTracking.headingLine1}
            <br />
            {t.healthTracking.headingLine2}
          </AnimatedHeading>

          <AnimatedText className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            {t.healthTracking.description}
          </AnimatedText>

          <div className="mt-8 flex flex-wrap gap-2">
            {t.healthTracking.signals.map((s) => (
              <span key={s} className="rounded-full bg-background px-4 py-2 text-xs text-muted-foreground border border-border">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {t.healthTracking.metrics.map((m, i) => (
              <HealthMetricCard key={m.label} {...m} delay={i * 0.1} />
            ))}
          </div>
        </div>

        <MaskedImage
          src={healthData}
          alt={t.healthTracking.imageAlt}
          className="aspect-[4/3] w-full"
        />
      </div>
    </section>
  )
}

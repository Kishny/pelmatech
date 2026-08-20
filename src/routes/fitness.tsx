import { createFileRoute, Link } from '@tanstack/react-router'

// Real photo supplied 2026-08-14 (jogger at golden hour, phone in hand — matches
// the "movement that fits your life" framing) — replaces the fitness.png placeholder.
import fitnessImg from '@/assets/jogging.png'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { HealthMetricCard } from '@/components/HealthMetricCard'
import { Header } from '@/components/Header'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/fitness')({ component: Fitness })

function Fitness() {
  const t = useTranslation()
  const page = t.pages.fitness

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
          <MaskedImage src={fitnessImg} alt={page.imageAlt} className="aspect-[4/3] w-full order-2 md:order-1" />

          <div className="order-1 md:order-2">
            <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-medium leading-[1.05]">
              {page.heading[0]}
              <br />
              {page.heading[1]}
            </AnimatedHeading>
            <AnimatedText className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
              {page.description}
            </AnimatedText>
            <div className="mt-8 flex flex-wrap gap-2">
              {page.features.map((f) => (
                <span key={f} className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
                  {f}
                </span>
              ))}
            </div>
            <Link
              to="/dashboard"
              className="mt-10 inline-block bg-foreground text-white rounded-full px-6 py-3 text-sm font-medium transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.common.exploreFitness}
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {page.metrics.map((m, i) => (
            <HealthMetricCard key={m.label} {...m} delay={i * 0.05} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

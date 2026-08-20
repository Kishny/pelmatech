import { createFileRoute } from '@tanstack/react-router'

// Real photo supplied 2026-08-14 (phone showing a nutrition summary over a meal
// bowl) — replaces the placeholder in place, same filename (nutrition.png).
import nutritionImg from '@/assets/nutrition.png'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { HealthMetricCard } from '@/components/HealthMetricCard'
import { Header } from '@/components/Header'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/nutrition')({ component: Nutrition })

function Nutrition() {
  const t = useTranslation()
  const page = t.pages.nutrition

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
          <div>
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
          </div>

          <MaskedImage src={nutritionImg} alt={page.imageAlt} className="aspect-[4/3] w-full" />
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3">
          {page.targets.map((target, i) => (
            <HealthMetricCard key={target.label} {...target} delay={i * 0.05} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

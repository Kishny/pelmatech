import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PricingCard } from '@/components/PricingCard'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/pricing')({ component: Pricing })

/**
 * `featured` is presentational-only and kept locally (index 1 = the
 * "Personal" plan), mapped onto the translated `t.pages.pricing.plans`
 * entries. No prices are supplied by the spec, so plans use the
 * dictionary's transparent "Contact / Coming Soon" placeholders rather
 * than fabricated figures.
 */
const FEATURED_INDEX = 1

function Pricing() {
  const t = useTranslation()
  const plans = t.pages.pricing.plans.map((plan, i) => ({
    ...plan,
    featured: i === FEATURED_INDEX,
  }))

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.pricing.heading[0]}
          <br />
          {t.pages.pricing.heading[1]}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.pricing.description}
        </AnimatedText>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

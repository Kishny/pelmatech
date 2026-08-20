import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HealthMetricCard } from '@/components/HealthMetricCard'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/health')({ component: HealthPage })

function HealthPage() {
  const t = useTranslation()
  const page = t.pages.health

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {page.heading}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {page.description}
        </AnimatedText>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
          {page.metrics.map((m, i) => (
            <HealthMetricCard key={m.label} {...m} delay={i * 0.05} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

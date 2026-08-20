import { createFileRoute, Link } from '@tanstack/react-router'
import { Pill, Plus } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/medications')({ component: Medications })

function Medications() {
  const t = useTranslation()
  const page = t.pages.medications

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <AnimatedHeading as="h1" className="max-w-xl text-5xl md:text-6xl font-medium leading-[1.05]">
              {page.heading[0]}
              <br />
              {page.heading[1]}
            </AnimatedHeading>
            <AnimatedText className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
              {page.description}
            </AnimatedText>
          </div>
          <Button type="button" asChild>
            <Link to="/dashboard">
              <Plus className="h-4 w-4" />
              {t.common.addMedication}
            </Link>
          </Button>
        </div>

        <div className="mt-16 flex flex-col divide-y divide-border border-t border-b border-border">
          {page.items.map((med) => (
            <div key={med.name} className="flex flex-wrap items-center justify-between gap-4 py-6">
              <div className="flex items-center gap-4">
                <Pill className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-base font-medium">{med.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {med.dosage} · {med.schedule}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span>{page.nextDoseLabel}: {med.nextDose}</span>
                <span>{med.refill}</span>
                <span>{med.prescriber}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TeamSection } from '@/components/TeamSection'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  const t = useTranslation()

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.about.heading[0]}
          <br />
          {t.pages.about.heading[1]}
        </AnimatedHeading>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          {t.pages.about.sections.map((section, i) => (
            <div key={section.title}>
              <AnimatedHeading as="h2" delay={i * 0.05} className="text-2xl font-medium">
                {section.title}
              </AnimatedHeading>
              <AnimatedText delay={i * 0.05} className="mt-4 text-base text-muted-foreground leading-relaxed">
                {section.body}
              </AnimatedText>
            </div>
          ))}
        </div>
      </main>

      <TeamSection />

      <Footer />
    </div>
  )
}

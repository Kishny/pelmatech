import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/resources')({ component: ResourcesPage })

function ResourcesPage() {
  const t = useTranslation()

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.resources.heading}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.resources.description}
        </AnimatedText>

        <ul className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-2">
          {t.pages.resources.categories.map((category) => (
            <li key={category} className="border-b border-border pb-6 text-xl font-medium">
              {category}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

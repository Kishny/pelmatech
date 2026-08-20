import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { AccordionItem } from '@/components/AccordionItem'
import { Accordion } from '@/components/ui/accordion'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/faq')({ component: FaqPage })

function FaqPage() {
  const t = useTranslation()
  const categories = t.pages.faq.categories

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.faq.heading[0]}
          <br />
          {t.pages.faq.heading[1]}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.faq.description}
        </AnimatedText>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {cat.name}
              </h2>
              <Accordion type="single" collapsible className="mt-4">
                {cat.items.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`${cat.name}-${i}`}
                    question={item.q}
                    answer={item.a}
                  />
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

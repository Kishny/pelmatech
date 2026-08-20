import { Accordion } from '@/components/ui/accordion'
import { AccordionItem } from '@/components/AccordionItem'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { useTranslation } from '@/i18n/LanguageContext'

export function FAQ() {
  const t = useTranslation()
  return (
    <section className="py-32 px-8 md:px-12 bg-surface">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
        <div>
          <AnimatedHeading as="h2" className="text-4xl md:text-5xl font-medium leading-[1.05]">
            {t.faqHome.headingLine1}
            <br />
            {t.faqHome.headingLine2}
          </AnimatedHeading>
          <AnimatedText className="mt-6 max-w-xs text-sm text-muted-foreground leading-relaxed">
            {t.faqHome.description}
          </AnimatedText>
        </div>

        <div className="md:col-span-2">
          <Accordion type="single" collapsible>
            {t.faqHome.items.map((q, i) => (
              <AccordionItem key={q.question} value={`item-${i}`} question={q.question} answer={q.answer} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

import * as React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { GlowBackdrop } from '@/components/GlowBackdrop'
import { TestimonialCard } from '@/components/TestimonialCard'
import { useTranslation } from '@/i18n/LanguageContext'

/** Testimonials — human, credible quotes; no fake logo walls. */
export function TestimonialsSection() {
  const t = useTranslation()
  const testimonials = t.testimonials.items
  const [index, setIndex] = React.useState(0)
  const max = testimonials.length - 1

  return (
    <section className="relative z-0 overflow-hidden py-32 px-8 md:px-12 bg-background">
      <GlowBackdrop variant="top-left" />

      <div className="flex items-end justify-between gap-8">
        <AnimatedHeading as="h2" className="max-w-2xl text-4xl md:text-5xl font-medium leading-[1.05]">
          {t.testimonials.headingLine1}
          <br />
          {t.testimonials.headingLine2}
        </AnimatedHeading>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            aria-label={t.testimonials.prevAria}
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={t.testimonials.nextAria}
            disabled={index === max}
            onClick={() => setIndex((i) => Math.min(max, i + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatedText className="mt-16 sr-only">
        {t.testimonials.counterLabel
          .replace('{current}', String(index + 1))
          .replace('{total}', String(testimonials.length))}
      </AnimatedText>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} {...item} />
        ))}
      </div>
    </section>
  )
}

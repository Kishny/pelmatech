import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { useTranslation } from '@/i18n/LanguageContext'

/** Final CTA — bg-foreground, reuses hero button styling. */
export function NewsletterSection() {
  const t = useTranslation()
  return (
    <section className="py-32 px-8 md:px-12 bg-foreground text-white">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <AnimatedHeading as="h2" className="max-w-xl text-4xl md:text-6xl font-medium leading-[1.05] text-white">
            {t.finalCta.headingLine1}
            <br />
            {t.finalCta.headingLine2}
          </AnimatedHeading>
          <AnimatedText className="mt-6 max-w-md text-base text-white/70 leading-relaxed">
            {t.finalCta.description}
          </AnimatedText>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <Link
            to="/signup"
            className="group bg-white text-foreground rounded-full pl-6 pr-2 py-2 flex items-center gap-3 font-medium text-sm transition hover:bg-white/90 hover:scale-[1.02] active:scale-[0.97]"
          >
            {t.common.tryForFree}
            <span className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link to="/contact" className="group text-white flex items-center gap-1 text-sm font-medium transition hover:opacity-70">
            {t.common.scheduleDemo}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

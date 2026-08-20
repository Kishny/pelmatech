import { Link } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { useTranslation } from '@/i18n/LanguageContext'

/** Personal Health Plan — bg-foreground, white text, restrained UI. */
export function PersonalPlanSection() {
  const t = useTranslation()

  return (
    <section className="py-32 px-8 md:px-12 bg-foreground text-white">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <AnimatedHeading as="h2" className="text-4xl md:text-5xl font-medium leading-[1.05] text-white">
            {t.personalPlan.headingLine1}
            <br />
            {t.personalPlan.headingLine2}
          </AnimatedHeading>

          <AnimatedText className="mt-6 max-w-md text-base text-white/70 leading-relaxed">
            {t.personalPlan.description}
          </AnimatedText>

          <Link
            to="/signup"
            className="mt-10 inline-block bg-white text-foreground rounded-full px-6 py-3 text-sm font-medium transition hover:bg-white/90 hover:scale-[1.02] active:scale-[0.97]"
          >
            {t.common.buildHealthPlan}
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/15 sm:grid-cols-2">
          {t.personalPlan.items.map((item) => (
            <li
              key={item}
              className="flex items-center bg-white/[0.03] px-6 py-8 text-sm text-white/80 border-white/10 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

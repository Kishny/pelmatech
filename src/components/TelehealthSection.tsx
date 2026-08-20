import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

// Real photo supplied 2026-08-14 (over-the-shoulder video consultation
// with Dr. Helga Brooks on screen), replacing the generic "placeholder
// asset - replace before launch" scaffold graphic.
import telehealth from '@/assets/consultation.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

/** Telehealth — split layout, image left / content right. */
export function TelehealthSection() {
  const t = useTranslation()

  return (
    <section className="py-32 px-8 md:px-12 bg-background">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <MaskedImage src={telehealth} alt={t.telehealth.imageAlt} className="aspect-[4/3] w-full order-2 md:order-1" />

        <div className="order-1 md:order-2">
          <AnimatedHeading as="h2" className="text-4xl md:text-5xl font-medium leading-[1.05]">
            {t.telehealth.heading}
          </AnimatedHeading>

          <AnimatedText className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            {t.telehealth.description}
          </AnimatedText>

          <ul className="mt-8 space-y-3">
            {t.telehealth.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-6">
            <Link
              to="/doctors"
              className="group bg-foreground text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-3 font-medium text-sm transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.common.findDoctor}
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
            <Link to="/platform" className="group flex items-center gap-1 text-sm font-medium text-foreground transition hover:opacity-70">
              {t.common.howTelehealthWorks}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

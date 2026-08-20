import { Link } from '@tanstack/react-router'

// Real photo supplied 2026-08-14 (phone in hand on a street, dashboard UI
// on screen), replacing the generic "placeholder asset - replace before
// launch" scaffold graphic.
import mobileApp from '@/assets/mobile-app.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

/** Mobile App Preview. */
export function AppPreviewSection() {
  const t = useTranslation()
  return (
    <section className="py-32 px-8 md:px-12 bg-background overflow-hidden">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <div>
          <AnimatedHeading as="h2" className="max-w-md text-4xl md:text-5xl font-medium leading-[1.05]">
            {t.appPreview.headingLine1}
            <br />
            {t.appPreview.headingLine2}
          </AnimatedHeading>

          <ul className="mt-8 space-y-3">
            {t.appPreview.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>

          <AnimatedText delay={0.3}>
            <Link
              to="/signup"
              className="mt-10 inline-block bg-foreground text-white rounded-full px-6 py-3 text-sm font-medium transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.common.getStarted}
            </Link>
          </AnimatedText>
        </div>

        <MaskedImage
          src={mobileApp}
          alt={t.appPreview.imageAlt}
          className="mx-auto aspect-[9/16] w-full max-w-sm"
        />
      </div>
    </section>
  )
}

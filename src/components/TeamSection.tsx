import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { TeamCarousel } from '@/components/TeamCarousel'
import { useTranslation } from '@/i18n/LanguageContext'

const TEAM_FONT =
  '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif'

/**
 * PROTECTED SECTION — 335.26px heading offset, TT Hoves font stack, and
 * exact type sizes must not change.
 */
export function TeamSection() {
  const t = useTranslation()
  return (
    <section className="py-32 px-8 md:px-12" style={{ fontFamily: TEAM_FONT }}>
      <div
        className="mb-16 flex gap-24 tracking-[0.2em] uppercase text-muted-foreground"
        style={{ fontSize: '11.26px', fontFamily: TEAM_FONT }}
      >
        <span>{t.team.eyebrow1}</span>
        <span>{t.team.eyebrow2}</span>
      </div>

      <div
        className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"
        style={{ paddingLeft: '335.26px' }}
      >
        <AnimatedHeading as="h2" style={{ fontFamily: TEAM_FONT }}>
          <span
            style={{
              fontSize: '58.55px',
              lineHeight: 1.05,
              display: 'block',
              fontFamily: TEAM_FONT,
            }}
          >
            {t.team.headingLine1}
            <br />
            {t.team.headingLine2}
          </span>
        </AnimatedHeading>

        <AnimatedText as="span" delay={0.15}>
          <span
            style={{
              fontSize: '16.89px',
              lineHeight: 1.5,
              display: 'block',
              width: '270px',
              fontFamily: TEAM_FONT,
            }}
          >
            {t.team.intro}
          </span>
        </AnimatedText>
      </div>

      <TeamCarousel />
    </section>
  )
}

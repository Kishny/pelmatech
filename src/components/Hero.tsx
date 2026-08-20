import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

// Real photo supplied 2026-08-14 (AI-generated, cinematic doctor/patient
// moment), replacing the previous doctor-computer.png background. The
// background image was explicitly authorized by the site owner to override
// the protected-section note below; pixel values, copy, and overlays are
// otherwise unchanged.
import heroImage from '@/assets/hero.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { useTranslation } from '@/i18n/LanguageContext'

/**
 * PROTECTED SECTION — exact pixel values, copy, and overlays must not
 * change. See project memory `pelmatech-spec.md` for the full
 * reproduce-exactly clause. (Background image swap authorized 2026-08-14.
 * Site-wide hover/focus audit fixes also approved 2026-08-14 — the
 * "Schedule demo" link below picked up a hover state to match its sibling
 * CTA. Same date, follow-up "more nav/link animation" request: both CTAs'
 * arrow icons now nudge forward on hover and "Try for Free" has tactile
 * hover/active scale — no pixel values, copy, or overlays changed.)
 */
export function Hero() {
  const t = useTranslation()
  return (
    <section className="relative h-screen min-h-[780px] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Doctor and patient sharing a warm, reassuring moment in a bright consultation room"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-12">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <AnimatedHeading as="h1" className="text-white font-medium leading-[1.05]">
              <span
                style={{
                  fontSize: '72.73px',
                  lineHeight: 1.05,
                  display: 'block',
                }}
              >
                {t.hero.titleLine1}
                <br />
                {t.hero.titleLine2}
              </span>
            </AnimatedHeading>

            <div className="mt-8 w-max">
              <AnimatedText
                as="span"
                delay={0.15}
                className="text-white/85 max-w-xl leading-relaxed block"
              >
                <span
                  style={{
                    fontSize: '20.99px',
                    lineHeight: '28.21px',
                    display: 'block',
                    width: '608px',
                  }}
                >
                  {t.hero.description}
                </span>
              </AnimatedText>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0 pb-1">
            <Link
              to="/signup"
              className="group bg-white text-foreground rounded-full pl-6 pr-2 py-2 flex items-center gap-3 font-medium text-sm transition hover:bg-white/90 hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.common.tryForFree}
              <span className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              to="/contact"
              className="group text-white flex items-center gap-1 text-sm font-medium transition hover:opacity-70"
            >
              {t.common.scheduleDemo}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div
          className="mt-12 pt-5 border-t border-white/20 flex items-center justify-between tracking-[0.2em] text-white/70 uppercase"
          style={{ fontSize: '12px' }}
        >
          <span>{t.hero.footerLeft}</span>
          <span className="flex items-center gap-3">
            {t.hero.footerCenterCount}
            <span className="normal-case tracking-normal">{t.hero.footerCenterNext}</span>
          </span>
          <span>{t.hero.footerRight}</span>
        </div>
      </div>
    </section>
  )
}

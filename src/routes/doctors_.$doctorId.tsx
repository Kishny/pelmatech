import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MaskedImage } from '@/components/MaskedImage'
import { TestimonialCard } from '@/components/TestimonialCard'
import { DOCTORS } from '@/data/doctors'
import { useTranslation } from '@/i18n/LanguageContext'

/**
 * Doctor profile page — added 2026-08-14 per the site owner's request for
 * more information on a practitioner before booking. Flat "dots" file
 * naming (`doctors.$doctorId.tsx`) keeps this as a sibling of the existing
 * `doctors.tsx` listing route rather than restructuring it into a folder.
 *
 * The doctor's slug/img/name stay in code (data/doctors.ts); the rest of
 * the profile (specialty, availability, experience, bio, education,
 * languages, conditions treated, reviews) is localized via
 * t.pages.doctors.doctors, matched by the same array index as the
 * /doctors listing.
 */
export const Route = createFileRoute('/doctors_/$doctorId')({ component: DoctorProfile })

function DoctorProfile() {
  const { doctorId } = Route.useParams()
  const t = useTranslation()

  const index = DOCTORS.findIndex((d) => d.slug === doctorId)
  const meta = index >= 0 ? DOCTORS[index] : undefined
  const content = index >= 0 ? t.pages.doctors.doctors[index] : undefined

  if (!meta || !content) {
    return (
      <div className="bg-background text-foreground">
        <Header variant="internal" />
        <main className="pt-40 pb-32 px-8 md:px-12 text-center">
          <AnimatedHeading as="h1" className="text-4xl font-medium leading-[1.05]">
            {t.pages.doctorProfile.notFoundHeading}
          </AnimatedHeading>
          <AnimatedText className="mt-4 text-base text-muted-foreground">
            {t.pages.doctorProfile.notFoundBody}
          </AnimatedText>
          <Link
            to="/doctors"
            className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:opacity-70"
          >
            {t.pages.doctorProfile.notFoundCta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <Link
          to="/doctors"
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {t.pages.doctorProfile.backToDoctors}
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[360px_1fr]">
          <div>
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
              <MaskedImage src={meta.img} alt={meta.name} className="h-full w-full" />
            </div>
            <Link
              to="/appointments"
              className="group mt-6 flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.common.bookAppointmentAction}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {content.specialty}
            </div>
            <AnimatedHeading as="h1" className="mt-2 text-4xl font-medium leading-[1.05] md:text-5xl">
              {meta.name}
            </AnimatedHeading>
            <div className="mt-3 text-sm text-muted-foreground">
              {content.availability} · {content.experience}
            </div>

            <AnimatedText className="mt-8 max-w-2xl text-base leading-relaxed text-foreground">
              {content.bio}
            </AnimatedText>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {t.pages.doctorProfile.educationHeading}
                </div>
                <div className="mt-2 text-sm text-foreground">{content.education}</div>
              </div>

              <div>
                <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {t.pages.doctorProfile.languagesHeading}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {content.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {t.pages.doctorProfile.conditionsHeading}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {content.conditions.map((c) => (
                  <span key={c} className="rounded-full bg-muted px-4 py-2 text-sm text-foreground">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-border pt-16">
          <AnimatedHeading as="h2" className="text-2xl font-medium leading-[1.05]">
            {t.pages.doctorProfile.reviewsHeading}
          </AnimatedHeading>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.reviews.map((r) => (
              <TestimonialCard key={r.name} quote={r.quote} name={r.name} meta={r.meta} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

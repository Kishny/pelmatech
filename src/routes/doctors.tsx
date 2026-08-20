import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { DoctorCard } from '@/components/DoctorCard'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { DOCTORS } from '@/data/doctors'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/doctors')({ component: Doctors })

/**
 * Stable, UNTRANSLATED specialty keys — used only for filter matching
 * (button clicks, DOCTORS[i].specialtyKey comparison). Never rendered
 * directly. Display labels come from t.pages.doctors.specialties /
 * t.pages.doctors.doctors, matched by index below (2026-08-14: the
 * filter chips and doctor badges on this page were previously always
 * shown in English regardless of the selected language — fixed by
 * routing display text through the dictionary, the same pattern already
 * used by the homepage's Doctor Discovery section).
 */
const ALL_KEY = 'All'

const SPECIALTY_KEYS = [
  'General Practice',
  'Pediatrics',
  'Cardiology',
  'Neurology',
  'Therapy',
  'Nutrition',
  'Dermatology',
  "Women's Health",
]

function Doctors() {
  const t = useTranslation()
  const [specialty, setSpecialty] = React.useState(ALL_KEY)

  const doctors = DOCTORS.map((doc, i) => ({
    ...doc,
    ...t.pages.doctors.doctors[i],
  }))

  const filtered =
    specialty === ALL_KEY ? doctors : doctors.filter((d) => d.specialtyKey === specialty)

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.doctors.heading[0]}
          <br />
          {t.pages.doctors.heading[1]}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.doctors.description}
        </AnimatedText>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSpecialty(ALL_KEY)}
            className={
              ALL_KEY === specialty
                ? 'rounded-full bg-foreground px-4 py-2 text-sm text-white transition'
                : 'rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted'
            }
          >
            {t.pages.doctors.allSpecialty}
          </button>
          {SPECIALTY_KEYS.map((key, i) => (
            <button
              key={key}
              type="button"
              onClick={() => setSpecialty(key)}
              className={
                key === specialty
                  ? 'rounded-full bg-foreground px-4 py-2 text-sm text-white transition'
                  : 'rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted'
              }
            >
              {t.pages.doctors.specialties[i]}
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3">
          {filtered.map((doc, i) => (
            <div key={doc.name}>
              {/* 2026-08-14: cards now link to a dedicated profile page
                  (bio, education, languages, conditions treated, patient
                  reviews) so visitors can learn more about a doctor before
                  booking — previously the card's hover arrow implied a
                  link that didn't exist. */}
              <Link to="/doctors/$doctorId" params={{ doctorId: doc.slug }}>
                <DoctorCard {...doc} delay={i * 0.06} />
              </Link>
              <Link
                to="/appointments"
                className="group mt-4 flex items-center gap-1 text-sm font-medium text-foreground transition hover:opacity-70"
              >
                {t.common.bookAppointmentAction}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

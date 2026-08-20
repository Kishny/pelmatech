import { Link } from '@tanstack/react-router'

import helgaPhoto from '@/assets/helga.jpg'
import hanaPhoto from '@/assets/hana.jpg'
import matteoPhoto from '@/assets/matteo.jpg'
import ariaPhoto from '@/assets/aria.jpg'
import kwamePhoto from '@/assets/kwame.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { DoctorCard } from '@/components/DoctorCard'
import { GlowBackdrop } from '@/components/GlowBackdrop'
import { DOCTORS as DOCTOR_ROSTER } from '@/data/doctors'
import { useTranslation } from '@/i18n/LanguageContext'

// Images stay local (not translated); name/specialty/availability/
// experience text comes from t.doctorDiscovery.doctors, matched by index.
// Order matches the fixed dictionary order: Helga Brooks, Hana Sato,
// Matteo Dubois, Aria Vance, Kwame Mbeki — all 5 real team members, same
// people as TeamCarousel.tsx (2026-08-13: Helga was missing from this
// section's dictionary entry; added so all 5 supplied photos appear here).
const DOCTOR_IMAGES = [helgaPhoto, hanaPhoto, matteoPhoto, ariaPhoto, kwamePhoto]

/**
 * Doctor Discovery (spec section 8) — bg-background, reuses the
 * TeamCarousel visual language via DoctorCard, as instructed.
 */
export function PlatformSection() {
  const t = useTranslation()
  // 2026-08-14: joined against the shared roster (by name) to pick up
  // each doctor's profile-page slug, so these cards can link out to the
  // new dedicated /doctors/$doctorId pages like the /doctors listing does.
  const DOCTORS = t.doctorDiscovery.doctors.map((doc, i) => ({
    ...doc,
    img: DOCTOR_IMAGES[i],
    slug: DOCTOR_ROSTER.find((d) => d.name === doc.name)?.slug,
  }))
  return (
    <section className="relative z-0 overflow-hidden py-32 px-8 md:px-12 bg-background">
      <GlowBackdrop variant="bottom-left" />

      <AnimatedHeading as="h2" className="text-5xl md:text-6xl font-medium leading-[1.05] max-w-3xl">
        {t.doctorDiscovery.headingLine1}
        <br />
        {t.doctorDiscovery.headingLine2}
      </AnimatedHeading>

      <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
        {t.doctorDiscovery.description}
      </AnimatedText>

      <div className="mt-10 flex flex-wrap gap-3">
        {t.doctorDiscovery.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {DOCTORS.map((doc, i) =>
          // 2026-08-14 audit fix: DoctorCard always shows a hover arrow that
          // implies a link, so this must never render unlinked. If a future
          // edit ever breaks the by-name join against the roster (doc.slug
          // missing), fall back to the /doctors listing instead of silently
          // dropping the Link — the card should never promise a click that
          // goes nowhere.
          <Link
            key={doc.name}
            to={doc.slug ? '/doctors/$doctorId' : '/doctors'}
            params={doc.slug ? { doctorId: doc.slug } : undefined}
          >
            <DoctorCard {...doc} delay={i * 0.08} />
          </Link>,
        )}
      </div>
    </section>
  )
}

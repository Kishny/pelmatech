import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'
import { confirmAppointmentAction } from '@/lib/planora/actions'

/**
 * Landing page for Planora's booking-confirmation email link (2026-08-26).
 *
 * Context: Planora requires email verification before a booking is
 * "confirmed" (RESEND_API_KEY is configured), which is why the patient's
 * dashboard used to show "En attente" right after booking — the request
 * that prompted this route was explicit: keep that verification email,
 * but stop it from sending the patient out to Planora's own site to
 * finish the flow. bookAppointmentAction now passes a confirmUrlBase
 * pointing here, and Planora's publicRoutes.js only honors it via a
 * server-side allowlist (TRUSTED_CONFIRM_BASES) — so this route is purely
 * additive and never changes Planora's own /reservation/:token page.
 *
 * `_` before `.confirm` (appointments_.confirm.$token.tsx) keeps this as
 * a standalone route (/appointments/confirm/$token) instead of nesting
 * under appointments.tsx — same trick used by doctors_.$doctorId.tsx.
 *
 * No auth guard: the emailed link must work from any device/browser the
 * patient opens their inbox in, exactly like Planora's own page did.
 * confirmAppointmentAction treats the token itself as the credential.
 */
export const Route = createFileRoute('/appointments_/confirm/$token')({
  loader: async ({ params }) => {
    const result = await confirmAppointmentAction({ data: { token: params.token } })
    return { result }
  },
  component: ConfirmAppointment,
})

function ConfirmAppointment() {
  const t = useTranslation()
  const page = t.pages.confirmAppointment
  const { result } = Route.useLoaderData()

  let heading: string
  let body: string
  if (result.outcome === 'confirmed' || result.outcome === 'pending') {
    heading = result.outcome === 'confirmed' ? page.confirmedHeading : page.pendingHeading
    body = result.outcome === 'confirmed' ? page.confirmedBody : page.pendingBody
  } else if (result.outcome === 'conflict') {
    heading = page.conflictHeading
    body = result.message || page.conflictBody
  } else if (result.outcome === 'invalid') {
    heading = page.invalidHeading
    body = page.invalidBody
  } else {
    heading = page.errorHeading
    body = page.errorBody
  }

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12 text-center">
        <AnimatedHeading as="h1" className="text-4xl font-medium leading-[1.05]">
          {heading}
        </AnimatedHeading>
        <p className="mt-4 max-w-xl mx-auto text-base text-muted-foreground leading-relaxed">{body}</p>
        {(result.outcome === 'confirmed' || result.outcome === 'pending') && (
          <p className="mt-2 text-sm text-muted-foreground">
            {result.doctorName} — {result.date} {result.time}
          </p>
        )}
        <Link
          to="/appointments"
          className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:opacity-70"
        >
          {page.backToAppointments}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </main>
      <Footer />
    </div>
  )
}

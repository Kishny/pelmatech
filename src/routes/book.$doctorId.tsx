import * as React from 'react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction } from '@/lib/auth/actions'
import {
  bookAppointmentAction,
  getBookableDoctorAction,
  getDoctorAvailabilityAction,
  getDoctorBookingInfoAction,
  type PlanoraAvailabilityDay,
  type PlanoraService,
} from '@/lib/planora/actions'

/**
 * Real booking flow (2026-08-20) — service picker → date/slot picker →
 * confirm, backed by Planora's live public API through the server
 * functions in lib/planora/actions.ts. Part of the "Oui go stp" plan:
 * items 1-3 (real availability, real booking, real appointments list).
 */
export const Route = createFileRoute('/book/$doctorId')({
  beforeLoad: async () => {
    const user = await getAuthedUserAction()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'patient') throw redirect({ to: '/doctor-dashboard' })
    return { authedUser: user }
  },
  loader: async ({ params }) => {
    const [doctor, bookingInfo, availability] = await Promise.all([
      getBookableDoctorAction({ data: { doctorId: params.doctorId } }),
      getDoctorBookingInfoAction({ data: { doctorId: params.doctorId } }),
      getDoctorAvailabilityAction({ data: { doctorId: params.doctorId } }),
    ])
    return { doctor, bookingInfo, availability }
  },
  component: BookDoctor,
})

type BookingResult = { success: true; needsVerification: boolean; message: string } | { success: false; error: string }

function BookDoctor() {
  const t = useTranslation()
  const page = t.pages.book
  const { doctorId } = Route.useParams()
  const { doctor, bookingInfo, availability } = Route.useLoaderData()

  const [service, setService] = React.useState<PlanoraService | null>(null)
  const [selectedDay, setSelectedDay] = React.useState<PlanoraAvailabilityDay | null>(null)
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)
  const [note, setNote] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [result, setResult] = React.useState<BookingResult | null>(null)

  const backLink = (
    <Link
      to="/find-a-doctor"
      className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      {page.back}
    </Link>
  )

  if (!doctor) {
    return (
      <div className="bg-background text-foreground">
        <Header variant="internal" />
        <main className="pt-40 pb-32 px-8 md:px-12 text-center">
          {backLink}
          <AnimatedHeading as="h1" className="mt-10 text-4xl font-medium leading-[1.05]">
            {page.notFoundHeading}
          </AnimatedHeading>
          <p className="mt-4 text-base text-muted-foreground">{page.notFoundBody}</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (bookingInfo.status !== 'ok' || availability.status !== 'ok') {
    const notConfigured = bookingInfo.status === 'not_configured' || availability.status === 'not_configured'
    return (
      <div className="bg-background text-foreground">
        <Header variant="internal" />
        <main className="pt-40 pb-32 px-8 md:px-12 text-center">
          {backLink}
          <AnimatedHeading as="h1" className="mt-10 text-4xl font-medium leading-[1.05]">
            {notConfigured ? page.notConfiguredHeading : page.unreachableHeading}
          </AnimatedHeading>
          <p className="mt-4 text-base text-muted-foreground">
            {notConfigured ? page.notConfiguredBody : page.unreachableBody}
          </p>
        </main>
        <Footer />
      </div>
    )
  }

  const { info } = bookingInfo
  const { durationMin, days } = availability

  async function handleConfirm() {
    if (!service || !selectedDay || !selectedSlot) return
    setSubmitting(true)
    setResult(null)
    try {
      const res = await bookAppointmentAction({
        data: {
          doctorId,
          serviceValue: service.value,
          serviceLabel: service.label,
          date: selectedDay.date,
          time: selectedSlot,
          durationMin,
          note: note.trim() || undefined,
        },
      })
      setResult(res)
    } catch {
      setResult({ success: false, error: page.bookingErrorFallback })
    } finally {
      setSubmitting(false)
    }
  }

  if (result?.success) {
    return (
      <div className="bg-background text-foreground">
        <Header variant="internal" />
        <main className="pt-40 pb-32 px-8 md:px-12 text-center">
          <AnimatedHeading as="h1" className="text-4xl font-medium leading-[1.05]">
            {page.successHeading}
          </AnimatedHeading>
          <p className="mt-4 max-w-xl mx-auto text-base text-muted-foreground leading-relaxed">
            {result.needsVerification
              ? page.successVerificationBody
              : result.message || page.successConfirmedBody}
          </p>
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

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        {backLink}
        <AnimatedHeading as="h1" className="mt-10 text-4xl md:text-5xl font-medium leading-[1.05]">
          {doctor.name}
        </AnimatedHeading>
        <div className="mt-2 text-sm text-muted-foreground">{doctor.specialtyKey}</div>

        <div className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{page.serviceHeading}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {info.services.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setService(s)}
                className={
                  service?.value === s.value
                    ? 'rounded-full bg-foreground px-4 py-2 text-sm text-white transition'
                    : 'rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted'
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {service && (
          <div className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{page.dateHeading}</h2>
            {days.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">{page.noSlots}</p>
            ) : (
              <div className="mt-4 flex flex-col gap-6">
                {days.map((day) => (
                  <div key={day.date}>
                    <div className="text-sm font-medium text-foreground">{day.label}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {day.slots.map((slot) => {
                        const active = selectedDay?.date === day.date && selectedSlot === slot
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedDay(day)
                              setSelectedSlot(slot)
                            }}
                            className={
                              active
                                ? 'rounded-full bg-foreground px-3 py-1.5 text-sm text-white transition'
                                : 'rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted'
                            }
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {service && selectedDay && selectedSlot && (
          <div className="mt-12 max-w-xl">
            <Label htmlFor="booking-note">{page.noteLabel}</Label>
            <textarea
              id="booking-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={page.notePlaceholder}
              rows={3}
              className="border-border bg-background mt-2 w-full rounded-md border px-3 py-2 text-sm"
            />

            <div className="mt-6 flex items-center gap-3">
              <Button type="button" onClick={handleConfirm} disabled={submitting}>
                {submitting ? page.booking : page.confirmCta}
              </Button>
              {result && !result.success && (
                <span className="text-sm text-red-600">{result.error || page.bookingErrorFallback}</span>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

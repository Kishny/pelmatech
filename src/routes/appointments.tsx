import * as React from 'react'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { AppointmentCard } from '@/components/AppointmentCard'
import { AppointmentDetailModal } from '@/components/AppointmentDetailModal'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useLanguage, useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction } from '@/lib/auth/actions'
import { cancelAppointmentAction, listMyAppointmentsAction, type MyAppointment } from '@/lib/planora/actions'

/**
 * Real appointments page (2026-08-20) — replaces the static demo `items`
 * array with listMyAppointmentsAction (real bookings mirrored from
 * Planora) and adds a working cancel action via cancelAppointmentAction.
 * Patient-only, same as /dashboard and /find-a-doctor — doctors have
 * their own appointments view on /doctor-dashboard.
 */
export const Route = createFileRoute('/appointments')({
  beforeLoad: async () => {
    const user = await getAuthedUserAction()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'patient') throw redirect({ to: '/doctor-dashboard' })
    return { authedUser: user }
  },
  loader: async () => {
    const appointments = await listMyAppointmentsAction()
    return { appointments }
  },
  component: Appointments,
})

const TABS = ['upcoming', 'past', 'cancelled'] as const

function statusVariantFor(a: MyAppointment): (typeof TABS)[number] {
  if (a.status === 'cancelled') return 'cancelled'
  return new Date(a.startsAt).getTime() > Date.now() ? 'upcoming' : 'past'
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short' })
}

function formatTime(iso: string, locale: string) {
  return new Date(iso).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
}

function Appointments() {
  const t = useTranslation()
  const { locale } = useLanguage()
  const router = useRouter()
  const { appointments } = Route.useLoaderData()
  const page = t.pages.appointments
  const STEPS = page.steps
  const TAB_LABEL_MAP: Record<(typeof TABS)[number], string> = {
    upcoming: page.tabs.upcoming,
    past: page.tabs.past,
    cancelled: page.tabs.cancelled,
  }
  const STATUS_LABELS: Record<string, string> = page.statusLabels

  const [tab, setTab] = React.useState<(typeof TABS)[number]>('upcoming')
  const [cancellingId, setCancellingId] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [detailId, setDetailId] = React.useState<string | null>(null)

  async function handleCancel(id: string) {
    setCancellingId(id)
    setError(null)
    try {
      const res = await cancelAppointmentAction({ data: { appointmentId: id } })
      if (!res.success) {
        setError(page.cancelError)
        return
      }
      await router.invalidate()
    } catch {
      setError(page.cancelError)
    } finally {
      setCancellingId(null)
    }
  }

  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US'
  const filtered = appointments.filter((a) => statusVariantFor(a) === tab)

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {page.heading[0]}
          <br />
          {page.heading[1]}
        </AnimatedHeading>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.number}>
              <AnimatedText as="span" delay={i * 0.1} className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {step.number}
              </AnimatedText>
              <AnimatedText delay={i * 0.1} className="mt-2 text-base font-medium text-foreground">
                {step.label}
              </AnimatedText>
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between">
          <div className="flex gap-2">
            {TABS.map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setTab(tabKey)}
                className={
                  tabKey === tab
                    ? 'rounded-full bg-foreground px-4 py-2 text-sm text-white transition'
                    : 'rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted'
                }
              >
                {TAB_LABEL_MAP[tabKey]}
              </button>
            ))}
          </div>
          <Link
            to="/find-a-doctor"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            {page.bookNewCta}
          </Link>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">{page.noAppointments}</p>
          ) : (
            filtered.map((a) => (
              <AppointmentCard
                key={a.id}
                doctor={a.doctorName}
                specialty={a.serviceLabel || ''}
                date={formatDate(a.startsAt, dateLocale)}
                time={formatTime(a.startsAt, dateLocale)}
                consultationType=""
                status={STATUS_LABELS[a.status] || a.status}
                statusVariant={statusVariantFor(a)}
                canCancel={a.canCancel}
                cancelLabel={page.cancelCta}
                cancellingLabel={page.cancelling}
                cancelling={cancellingId === a.id}
                onCancel={() => handleCancel(a.id)}
                onClick={() => setDetailId(a.id)}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
      <AppointmentDetailModal appointmentId={detailId} onClose={() => setDetailId(null)} onUpdated={() => router.invalidate()} />
    </div>
  )
}

import * as React from 'react'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AppointmentDetailModal } from '@/components/AppointmentDetailModal'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage, useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction, getDoctorProfileAction, updateDoctorPlanoraSlugAction } from '@/lib/auth/actions'
import { listDoctorAppointmentsAction } from '@/lib/planora/actions'

/**
 * Doctor-facing dashboard (2026-08-19) — the professional counterpart to
 * /dashboard, requested alongside real accounts ("il faut aussi un
 * Dashboard pour chaque médecin"). 2026-08-20: "Upcoming appointments" now
 * shows real bookings via listDoctorAppointmentsAction, now that booking
 * is wired to Planora's public API.
 */
export const Route = createFileRoute('/doctor-dashboard')({
  beforeLoad: async () => {
    const user = await getAuthedUserAction()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'doctor') throw redirect({ to: '/dashboard' })
    return { authedUser: user }
  },
  loader: async () => {
    const [doctorProfile, appointments] = await Promise.all([getDoctorProfileAction(), listDoctorAppointmentsAction()])
    const now = Date.now()
    const upcoming = appointments
      .filter((a) => a.status !== 'cancelled' && new Date(a.startsAt).getTime() > now)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    return { doctorProfile, upcoming }
  },
  component: DoctorDashboard,
})

function DoctorDashboard() {
  const t = useTranslation()
  const { locale } = useLanguage()
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US'
  const router = useRouter()
  const { authedUser } = Route.useRouteContext()
  const { doctorProfile, upcoming } = Route.useLoaderData()

  const [slug, setSlug] = React.useState(doctorProfile?.planoraBookingSlug || '')
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [detailId, setDetailId] = React.useState<string | null>(null)

  async function handleSaveSlug(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      const result = await updateDoctorPlanoraSlugAction({ data: { planoraBookingSlug: slug } })
      if (result.success) {
        setSaved(true)
        router.invalidate()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        {/* 2026-08-20: standalone "Se déconnecter" removed — now lives in
            the header's account menu (AccountMenu.tsx), same as /dashboard. */}
        <AnimatedHeading as="h1" className="text-3xl md:text-4xl font-medium leading-[1.05]">
          {t.pages.doctorDashboard.greeting} {authedUser.lastName}
        </AnimatedHeading>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t.pages.doctorDashboard.accountHeading}</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">{t.pages.signup.fields.email}</dt>
                <dd>{authedUser.email}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">{t.pages.signup.fields.specialtyKey}</dt>
                <dd>{doctorProfile?.specialtyKey || '—'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t.pages.signup.fields.phone}</dt>
                <dd>{authedUser.phone || '—'}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t.pages.doctorDashboard.planoraSectionHeading}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.pages.doctorDashboard.planoraSectionBody}</p>
            <form onSubmit={handleSaveSlug} className="mt-6 flex flex-col gap-3">
              <Label htmlFor="planoraSlug">{t.pages.doctorDashboard.planoraSlugLabel}</Label>
              <div className="flex gap-2">
                <Input id="planoraSlug" name="planoraSlug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                <Button type="submit" disabled={saving}>
                  {t.common.done}
                </Button>
              </div>
              {saved && <p className="text-xs text-muted-foreground">✓</p>}
              {!doctorProfile?.planoraBookingSlug && !slug && (
                <p className="text-xs text-muted-foreground">{t.pages.doctorDashboard.planoraSlugMissing}</p>
              )}
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 md:col-span-2">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t.pages.doctorDashboard.upcomingAppointmentsHeading}</h2>
            {upcoming.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">{t.pages.doctorDashboard.noAppointments}</p>
            ) : (
              <ul className="mt-6 space-y-3 text-sm">
                {upcoming.map((a, i) => (
                  <li
                    key={a.id}
                    onClick={() => setDetailId(a.id)}
                    className={
                      i < upcoming.length - 1
                        ? 'flex cursor-pointer flex-wrap items-center justify-between gap-2 border-b border-border pb-3 transition hover:text-foreground'
                        : 'flex cursor-pointer flex-wrap items-center justify-between gap-2 transition hover:text-foreground'
                    }
                  >
                    <div>
                      <div className="font-medium text-foreground">{a.patientName}</div>
                      <div className="text-muted-foreground">{a.serviceLabel}</div>
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(a.startsAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })} ·{' '}
                      {new Date(a.startsAt).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AppointmentDetailModal appointmentId={detailId} onClose={() => setDetailId(null)} onUpdated={() => router.invalidate()} />
    </div>
  )
}

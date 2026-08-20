import * as React from 'react'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HealthMetricCard } from '@/components/HealthMetricCard'
import { AppointmentCard } from '@/components/AppointmentCard'
import { AppointmentDetailModal } from '@/components/AppointmentDetailModal'
import { useLanguage, useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction } from '@/lib/auth/actions'
import { listMyAppointmentsAction } from '@/lib/planora/actions'

/**
 * Real auth guard (2026-08-19) — replaces the previously public demo
 * dashboard. Patients only; doctors who land here are redirected to
 * their own /doctor-dashboard instead of seeing the patient view.
 *
 * 2026-08-20: "Upcoming appointments" now shows the soonest real booking
 * (via listMyAppointmentsAction) instead of a hardcoded sample.
 */
export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const user = await getAuthedUserAction()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'patient') throw redirect({ to: '/doctor-dashboard' })
    return { authedUser: user }
  },
  loader: async () => {
    const appointments = await listMyAppointmentsAction()
    const now = Date.now()
    const nextAppointment =
      appointments
        .filter((a) => a.status !== 'cancelled' && new Date(a.startsAt).getTime() > now)
        .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0] || null
    return { nextAppointment }
  },
  component: Dashboard,
})

/** Dashboard cards use the calmer "authenticated page" motion values, not the dramatic marketing clipping. */
function DashboardCard({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-background p-6"
    >
      {children}
    </motion.div>
  )
}

function Dashboard() {
  const t = useTranslation()
  const { locale } = useLanguage()
  const router = useRouter()
  const { authedUser } = Route.useRouteContext()
  const { nextAppointment } = Route.useLoaderData()
  const METRICS = t.pages.dashboard.metrics
  const { sampleMedications } = t.pages.dashboard
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US'
  const [detailId, setDetailId] = React.useState<string | null>(null)

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        {/* 2026-08-20: the standalone "Se déconnecter" button here was
            redundant once the header's account menu (AccountMenu.tsx)
            got its own logout item — removed per site owner request. */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl font-medium leading-[1.05]"
        >
          {t.pages.dashboard.greetingHello}, {authedUser.firstName}.
          <br />
          {t.pages.dashboard.greeting[1]}
        </motion.h1>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <div key={m.label}>
              <HealthMetricCard {...m} delay={i * 0.05} />
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <DashboardCard delay={0.1}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t.pages.dashboard.upcomingAppointments}
            </h2>
            <div className="mt-6">
              {nextAppointment ? (
                <AppointmentCard
                  doctor={nextAppointment.doctorName}
                  specialty={nextAppointment.serviceLabel || ''}
                  date={new Date(nextAppointment.startsAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })}
                  time={new Date(nextAppointment.startsAt).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
                  consultationType=""
                  status={t.pages.appointments.statusLabels[nextAppointment.status as 'pending' | 'confirmed'] || nextAppointment.status}
                  statusVariant="upcoming"
                  onClick={() => setDetailId(nextAppointment.id)}
                />
              ) : (
                <div className="flex flex-col items-start gap-3">
                  <p className="text-sm text-muted-foreground">{t.pages.appointments.noAppointments}</p>
                  <Link
                    to="/find-a-doctor"
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {t.pages.appointments.bookNewCta}
                  </Link>
                </div>
              )}
            </div>
          </DashboardCard>

          <DashboardCard delay={0.15}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t.pages.dashboard.medicationReminders}
            </h2>
            <ul className="mt-6 space-y-3 text-sm">
              {sampleMedications.map((med, i) => (
                <li
                  key={med.name}
                  className={
                    i < sampleMedications.length - 1
                      ? 'flex items-center justify-between border-b border-border pb-3'
                      : 'flex items-center justify-between'
                  }
                >
                  <span>{med.name}</span>
                  <span className="text-muted-foreground">{med.time}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard delay={0.2}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t.pages.dashboard.nutritionGoal}
            </h2>
            <p className="mt-6 text-2xl font-medium">{t.pages.dashboard.nutritionGoalValue}</p>
          </DashboardCard>

          <DashboardCard delay={0.25}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t.pages.dashboard.todaysWorkout}
            </h2>
            <p className="mt-6 text-2xl font-medium">{t.pages.dashboard.todaysWorkoutValue}</p>
          </DashboardCard>
        </div>
      </main>
      <Footer />
      <AppointmentDetailModal appointmentId={detailId} onClose={() => setDetailId(null)} onUpdated={() => router.invalidate()} />
    </div>
  )
}

import * as React from 'react'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  CalendarClock,
  Droplet,
  FileText,
  FlaskConical,
  LayoutGrid,
  MessageSquare,
  Pill,
  Radio,
  Thermometer,
} from 'lucide-react'

import lungsIllustration from '@/assets/poumon.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { AppointmentDetailModal } from '@/components/AppointmentDetailModal'
import { Footer } from '@/components/Footer'
import { GlowBackdrop } from '@/components/GlowBackdrop'
import { Header } from '@/components/Header'
import { MaskedImage } from '@/components/MaskedImage'
import { Input } from '@/components/ui/input'
import { useLanguage, useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction } from '@/lib/auth/actions'
import { getAvatarColor, getInitials } from '@/lib/avatar'
import { listMyAppointmentsAction } from '@/lib/planora/actions'
import { cn } from '@/lib/utils'

/**
 * 2026-08-21: Overview rebuilt to match the "ProHealth" mockup the site
 * owner supplied — adapted to Pelmatech's own data and green-based
 * palette per their answers: unbuilt features (Documents/Messages/Labs
 * tabs, the two smaller placeholder cards) become honest "Bientôt
 * disponible" panels instead of fake active features; and the mockup's
 * own top tab bar is kept as-is (no sidebar shell, unlike
 * doctor-dashboard.tsx — this page stays inside the regular
 * Header/Footer layout used by every other patient page).
 *
 * 2026-08-22: the hero card's illustration went photo -> 3D lungs render
 * -> back to a 3D lungs render, but not the same one. First pass swapped
 * the ProHealth mockup's blue 3D anatomical render for a real photo
 * (jogging.png) since Pelmatech had no on-brand illustration in that
 * style. The site owner then had a green-recolored version of that same
 * render generated (matching --accent instead of the mockup's blue) and
 * asked to use it after all — see poumon.jpg. The card went from a
 * dark-photo-with-white-text treatment to a light bg-background card
 * (the illustration's own background is a near-white that matches the
 * site's --background token, so it sits directly on the card without a
 * visible seam) since a light illustration doesn't support the same dark
 * gradient + white text trick a photo does.
 *
 * Real auth guard (2026-08-19) unchanged. "Upcoming appointments" still
 * shows the soonest real booking (listMyAppointmentsAction) — now
 * surfaced as a floating chip over the hero photo instead of a separate
 * card, but backed by the exact same loader data and click-to-detail
 * behavior as before.
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

type PatientSection = 'overview' | 'documents' | 'messages' | 'labs'

const sectionTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }

// Static demo bar heights for the two mini "sparkline" charts — same
// honest-placeholder spirit as the rest of this page's sample data
// (nutritionGoalValue, sampleMedications, etc. are all static too).
const ACTIVITY_BARS = [40, 62, 35, 70, 52, 90, 68, 48]
const VITALS_BARS = [55, 40, 65, 50, 80, 60, 45, 72]

function Dashboard() {
  const t = useTranslation()
  const { locale } = useLanguage()
  const router = useRouter()
  const { authedUser } = Route.useRouteContext()
  const { nextAppointment } = Route.useLoaderData()
  const dash = t.pages.dashboard
  const shell = dash.shell
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US'
  const prefersReducedMotion = useReducedMotion()

  const [section, setSection] = React.useState<PatientSection>('overview')
  const [detailId, setDetailId] = React.useState<string | null>(null)
  const [medicationQuery, setMedicationQuery] = React.useState('')

  const TABS: Array<{ key: PatientSection; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { key: 'overview', label: shell.tabOverview, icon: LayoutGrid },
    { key: 'documents', label: shell.tabDocuments, icon: FileText },
    { key: 'messages', label: shell.tabMessages, icon: MessageSquare },
    { key: 'labs', label: shell.tabLabs, icon: FlaskConical },
  ]

  const filteredMedications = dash.sampleMedications.filter((med) =>
    med.name.toLowerCase().includes(medicationQuery.trim().toLowerCase()),
  )

  const dailyGoalPercent = Number.parseInt(dash.metrics[0]?.value ?? '0', 10) || 0

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="relative overflow-hidden pt-40 pb-32 px-8 md:px-12">
        <GlowBackdrop variant="top-right" />

        <div className="relative z-0 inline-flex items-center gap-1 rounded-full bg-muted p-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSection(key)}
              className={cn(
                'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
                section === key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {section === key && (
                <motion.span
                  layoutId="patient-tab-active"
                  className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm"
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={prefersReducedMotion ? { duration: 0 } : sectionTransition}
          >
            {section === 'overview' && (
              <OverviewSection
                authedUser={authedUser}
                dash={dash}
                shell={shell}
                dateLocale={dateLocale}
                nextAppointment={nextAppointment}
                onOpenDetail={setDetailId}
                dailyGoalPercent={dailyGoalPercent}
                medicationQuery={medicationQuery}
                onMedicationQueryChange={setMedicationQuery}
                filteredMedications={filteredMedications}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            )}
            {section === 'documents' && (
              <ComingSoonSection icon={FileText} title={shell.tabDocuments} shell={shell} />
            )}
            {section === 'messages' && (
              <ComingSoonSection icon={MessageSquare} title={shell.tabMessages} shell={shell} />
            )}
            {section === 'labs' && <ComingSoonSection icon={FlaskConical} title={shell.tabLabs} shell={shell} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AppointmentDetailModal appointmentId={detailId} onClose={() => setDetailId(null)} onUpdated={() => router.invalidate()} />
    </div>
  )
}

interface OverviewSectionProps {
  authedUser: { firstName: string; lastName: string }
  dash: ReturnType<typeof useTranslation>['pages']['dashboard']
  shell: ReturnType<typeof useTranslation>['pages']['dashboard']['shell']
  dateLocale: string
  nextAppointment: {
    id: string
    doctorName: string
    serviceLabel: string | null
    startsAt: string
    status: string
  } | null
  onOpenDetail: (id: string) => void
  dailyGoalPercent: number
  medicationQuery: string
  onMedicationQueryChange: (v: string) => void
  filteredMedications: Array<{ name: string; time: string }>
  prefersReducedMotion: boolean
}

function OverviewSection({
  authedUser,
  dash,
  shell,
  dateLocale,
  nextAppointment,
  onOpenDetail,
  dailyGoalPercent,
  medicationQuery,
  onMedicationQueryChange,
  filteredMedications,
  prefersReducedMotion,
}: OverviewSectionProps) {
  const t = useTranslation()
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <div>
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-6">
          <DailyGoalRing percent={dailyGoalPercent} label={shell.dailyGoalLabel} />
          <div>
            <AnimatedHeading as="h1" className="text-3xl md:text-4xl font-medium leading-[1.05]">
              {dash.greetingHello}, {authedUser.firstName}.
            </AnimatedHeading>
            <AnimatedText className="mt-2 text-base text-muted-foreground">{dash.greeting[1]}</AnimatedText>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={medicationQuery}
            onChange={(e) => onMedicationQueryChange(e.target.value)}
            placeholder={shell.searchPlaceholder}
            className="w-56 rounded-full bg-background"
          />
          <Link
            to="/find-a-doctor"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:scale-[1.02] active:scale-[0.97]"
          >
            {shell.consultationCta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]"
      >
        <motion.div variants={itemVariants}>
          <HeroCard
            authedUser={authedUser}
            shell={shell}
            dateLocale={dateLocale}
            nextAppointment={nextAppointment}
            onOpenDetail={onOpenDetail}
            prefersReducedMotion={prefersReducedMotion}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1.5fr_1fr]">
          <motion.div variants={itemVariants}>
            <MedicationsCard shell={shell} medications={filteredMedications} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PlaceholderCard title={shell.healthReportTitle} shell={shell} icon={FileText} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <VitalsCard authedUser={authedUser} shell={shell} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PlaceholderCard title={shell.specializedTitle} shell={shell} icon={FlaskConical} dark />
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{dash.nutritionGoal}</h2>
          <p className="mt-6 text-2xl font-medium">{dash.nutritionGoalValue}</p>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{dash.todaysWorkout}</h2>
          <p className="mt-6 text-2xl font-medium">{dash.todaysWorkoutValue}</p>
        </div>
      </div>

      {/* Keeps the "noAppointments" empty-state copy reachable for a11y/SEO
          crawlers even though the hero card renders its own inline version. */}
      <span className="sr-only">{t.pages.appointments.noAppointments}</span>
    </div>
  )
}

function DailyGoalRing({ percent, label }: { percent: number; label: string }) {
  const prefersReducedMotion = useReducedMotion()
  const radius = 26
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percent))

  return (
    <div className="flex shrink-0 flex-col items-center gap-1" title={label}>
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="-mt-11 text-sm font-semibold text-foreground">{clamped}%</span>
    </div>
  )
}

interface HeroCardProps {
  authedUser: { firstName: string; lastName: string }
  shell: ReturnType<typeof useTranslation>['pages']['dashboard']['shell']
  dateLocale: string
  nextAppointment: OverviewSectionProps['nextAppointment']
  onOpenDetail: (id: string) => void
  prefersReducedMotion: boolean
}

function HeroCard({ shell, dateLocale, nextAppointment, onOpenDetail, prefersReducedMotion }: HeroCardProps) {
  const t = useTranslation()

  return (
    <div className="relative flex h-full min-h-[520px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-6">
      <MaskedImage src={lungsIllustration} alt={shell.heroAlt} className="h-full w-full" imgClassName="object-contain" />

      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
        <Radio className="h-3.5 w-3.5 text-accent" />
        {shell.connectedTracking}
      </div>

      <motion.div
        className="absolute bottom-4 left-4 w-44 rounded-xl border border-border bg-background p-3 shadow-lg"
        animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Droplet className="h-3.5 w-3.5 text-accent" />
          {shell.vitalsOxygen}
        </div>
        <div className="mt-1 text-lg font-semibold text-foreground">{shell.oxygenValue}</div>
        <div className="mt-2 flex items-end gap-0.5">
          {VITALS_BARS.slice(0, 6).map((h, i) => (
            <span
              key={i}
              className="w-2 rounded-sm bg-accent/70"
              style={{ height: `${h * 0.24}px` }}
            />
          ))}
        </div>
      </motion.div>

      {nextAppointment ? (
        <button
          type="button"
          onClick={() => onOpenDetail(nextAppointment.id)}
          className="absolute bottom-4 right-4 w-52 rounded-xl border border-border bg-background p-3 text-left shadow-lg transition hover:scale-[1.02]"
        >
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5 text-accent" />
            {new Date(nextAppointment.startsAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long' })}
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">
            {new Date(nextAppointment.startsAt).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="mt-1 truncate text-xs text-muted-foreground">{nextAppointment.doctorName}</div>
        </button>
      ) : (
        <Link
          to="/find-a-doctor"
          className="absolute bottom-4 right-4 w-52 rounded-xl border border-border bg-background p-3 text-left shadow-lg transition hover:scale-[1.02]"
        >
          <div className="text-xs text-muted-foreground">{t.pages.appointments.noAppointments}</div>
          <div className="mt-1 text-sm font-semibold text-accent">{t.pages.appointments.bookNewCta}</div>
        </Link>
      )}
    </div>
  )
}

function MedicationsCard({
  shell,
  medications,
}: {
  shell: ReturnType<typeof useTranslation>['pages']['dashboard']['shell']
  medications: Array<{ name: string; time: string }>
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-accent">
          <Pill className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-medium text-foreground">{shell.medicationsTitle}</h2>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {medications.length === 0 && <li className="text-xs text-muted-foreground">—</li>}
        {medications.map((med, i) => (
          <li
            key={med.name}
            className={cn(
              'flex items-center justify-between gap-3',
              i < medications.length - 1 && 'border-b border-border pb-2',
            )}
          >
            <span className="truncate text-foreground">{med.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{med.time}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <div className="text-xs text-muted-foreground">{shell.activityLabel}</div>
        <div className="mt-2 flex items-end gap-1">
          {ACTIVITY_BARS.map((h, i) => (
            <motion.span
              key={i}
              className="w-2.5 rounded-sm bg-accent"
              initial={{ height: 0 }}
              animate={{ height: `${h * 0.4}px` }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function VitalsCard({
  authedUser,
  shell,
}: {
  authedUser: { firstName: string; lastName: string }
  shell: ReturnType<typeof useTranslation>['pages']['dashboard']['shell']
}) {
  const fullName = `${authedUser.firstName} ${authedUser.lastName}`

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-accent-foreground"
            style={{ background: getAvatarColor(fullName) }}
          >
            {getInitials(fullName)}
          </span>
          <span className="truncate text-sm font-medium text-foreground">{authedUser.firstName}</span>
        </div>
        <Link
          to="/settings"
          aria-label={shell.viewMedicalProfile}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground transition hover:scale-105"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <VitalStat icon={<CalendarClock className="h-3.5 w-3.5" />} label={shell.vitalsHeartRate} value={shell.heartRateValue} />
        <VitalStat icon={<Thermometer className="h-3.5 w-3.5" />} label={shell.vitalsTemperature} value={shell.temperatureValue} />
        <VitalStat icon={<Droplet className="h-3.5 w-3.5" />} label={shell.vitalsOxygen} value={shell.oxygenValue} />
      </div>
    </div>
  )
}

function VitalStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <div className="flex items-center justify-center text-accent">{icon}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{label}</div>
    </div>
  )
}

function PlaceholderCard({
  title,
  shell,
  icon: Icon,
  dark = false,
}: {
  title: string
  shell: ReturnType<typeof useTranslation>['pages']['dashboard']['shell']
  icon: React.ComponentType<{ className?: string }>
  dark?: boolean
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col justify-between rounded-2xl p-5',
        dark ? 'bg-foreground text-background' : 'border border-border bg-background',
      )}
    >
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-full', dark ? 'bg-background/15' : 'bg-accent-tint text-accent')}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <span
          className={cn(
            'mt-2 inline-block rounded-full px-2.5 py-1 text-[11px]',
            dark ? 'bg-background/15 text-background/80' : 'bg-muted text-muted-foreground',
          )}
        >
          {shell.comingSoon}
        </span>
      </div>
    </div>
  )
}

function ComingSoonSection({
  icon: Icon,
  title,
  shell,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  shell: ReturnType<typeof useTranslation>['pages']['dashboard']['shell']
}) {
  return (
    <div className="mt-16 flex flex-col items-center rounded-2xl border border-border bg-background px-8 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-tint text-accent">
        <Icon className="h-6 w-6" />
      </span>
      <AnimatedHeading as="h2" className="mt-6 text-2xl font-medium">
        {title}
      </AnimatedHeading>
      <AnimatedText className="mt-3 max-w-sm text-sm text-muted-foreground">{shell.comingSoonBody}</AnimatedText>
      <span className="mt-6 rounded-full bg-muted px-4 py-1.5 text-xs text-muted-foreground">{shell.comingSoon}</span>
    </div>
  )
}

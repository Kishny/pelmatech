import * as React from 'react'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Menu,
  MessageSquare,
  Search,
  Video,
  X,
} from 'lucide-react'

import { AppointmentDetailModal } from '@/components/AppointmentDetailModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DoctorSidebar, type DoctorSection } from '@/components/DoctorSidebar'
import { useLanguage, useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction, getDoctorProfileAction, updateDoctorPlanoraSlugAction } from '@/lib/auth/actions'
import { listDoctorAppointmentsAction, type DoctorAppointment } from '@/lib/planora/actions'
import { getAvatarColor, getInitials } from '@/lib/avatar'

/**
 * Doctor-facing dashboard (2026-08-27 rebuild) — restyled from a plain
 * single-column page into an app-shell with a persistent left sidebar,
 * adapted from a school-admin "Attendance" dashboard mockup the site
 * owner supplied. Per their explicit choices: (1) this becomes the new
 * skeleton for the whole doctor area (sidebar with Overview / Rendez-vous
 * / Patients / Messages / Paramètres) rather than a one-off page style;
 * (2) the mockup's "Class 302/303/304" tabs — which filtered by the
 * teacher's class section, something a doctor doesn't have — become an
 * appointment-type filter (Cabinet / Téléconsultation) instead; (3) the
 * mockup's "Attendance / Absences / Delayed" three-way split becomes the
 * real appointment statuses already stored (confirmed / cancelled /
 * pending), grouped by the calendar day selected.
 *
 * Section switching is local state, not routing — same pattern as
 * AuthCard's signin/signup tabs — since every section needs the same
 * loader data and there's no reason to round-trip through the server for
 * what's really just a tab change. "Paramètres" is the one exception
 * (DoctorSidebar links it straight to the existing /settings route).
 *
 * The appointment "type" (in-person vs. video) isn't a stored field —
 * Planora's serviceLabel is free text — so it's inferred with a simple
 * keyword heuristic (see `inferAppointmentType` below) rather than
 * invented as fake data. Good enough to power a filter; not a real
 * source of truth, and called out here so a future pass can replace it
 * with a real column if that distinction becomes important.
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
    return { doctorProfile, appointments }
  },
  component: DoctorDashboard,
})

function inferAppointmentType(a: DoctorAppointment): 'video' | 'inPerson' {
  const label = (a.serviceLabel || '').toLowerCase()
  return /(t[ée]l[ée]|visio|video|vid[ée]o|distance|en ligne|remote|online)/.test(label) ? 'video' : 'inPerson'
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function capitalize(s: string) {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s
}

function DoctorDashboard() {
  const t = useTranslation()
  const { locale } = useLanguage()
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US'
  const router = useRouter()
  const { authedUser } = Route.useRouteContext()
  const { doctorProfile, appointments } = Route.useLoaderData()
  const shell = t.pages.doctorDashboard.shell

  const [section, setSection] = React.useState<DoctorSection>('overview')
  const [detailId, setDetailId] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)

  const now = Date.now()
  const upcoming = React.useMemo(
    () =>
      appointments
        .filter((a) => a.status !== 'cancelled' && new Date(a.startsAt).getTime() > now)
        .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appointments],
  )

  const sectionTitle =
    section === 'overview'
      ? shell.navOverview
      : section === 'appointments'
        ? shell.appointmentsTitle
        : section === 'patients'
          ? shell.patientsTitle
          : shell.messagesTitle

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <DoctorSidebar
        active={section}
        onSelect={setSection}
        authedUser={authedUser}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-4 py-5 md:px-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label={t.nav.menu}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition hover:bg-muted md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span>Pelmatech</span> <span className="mx-1">›</span> <span className="font-medium text-foreground">{sectionTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={shell.searchPlaceholder}
                className="h-9 w-56 rounded-full border border-border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-accent"
              />
            </div>
            <a
              href="/notifications"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label={shell.navMessages}
            >
              <Bell className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setSection('messages')}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label={shell.navMessages}
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">
          {section === 'overview' && (
            <OverviewSection
              t={t}
              authedUser={authedUser}
              doctorProfile={doctorProfile}
              upcoming={upcoming}
              dateLocale={dateLocale}
              onOpenDetail={setDetailId}
              onInvalidate={() => router.invalidate()}
            />
          )}

          {section === 'appointments' && (
            <AppointmentsSection
              shell={shell}
              appointments={appointments}
              dateLocale={dateLocale}
              searchQuery={searchQuery}
              onOpenDetail={setDetailId}
            />
          )}

          {section === 'patients' && (
            <PatientsSection shell={shell} appointments={appointments} dateLocale={dateLocale} searchQuery={searchQuery} onOpenDetail={setDetailId} />
          )}

          {section === 'messages' && <MessagesSection shell={shell} />}
        </main>
      </div>

      <AppointmentDetailModal appointmentId={detailId} onClose={() => setDetailId(null)} onUpdated={() => router.invalidate()} />
    </div>
  )
}

// --- Overview: the original account/Planora-link/upcoming-appointments
// content, unchanged in substance, just restyled to sit in the shell's
// content area instead of under the marketing Header. ---
function OverviewSection({
  t,
  authedUser,
  doctorProfile,
  upcoming,
  dateLocale,
  onOpenDetail,
  onInvalidate,
}: {
  t: ReturnType<typeof useTranslation>
  authedUser: { email: string | null; phone: string | null; lastName: string }
  doctorProfile: { specialtyKey?: string | null; planoraBookingSlug?: string | null } | null
  upcoming: Array<DoctorAppointment>
  dateLocale: string
  onOpenDetail: (id: string) => void
  onInvalidate: () => void
}) {
  const page = t.pages.doctorDashboard
  const shell = page.shell
  const [slug, setSlug] = React.useState(doctorProfile?.planoraBookingSlug || '')
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  async function handleSaveSlug(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      const result = await updateDoctorPlanoraSlugAction({ data: { planoraBookingSlug: slug } })
      if (result.success) {
        setSaved(true)
        onInvalidate()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">
        {page.greeting} {authedUser.lastName}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{shell.overviewSubtitle}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{page.accountHeading}</h2>
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
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{page.planoraSectionHeading}</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{page.planoraSectionBody}</p>
          <form onSubmit={handleSaveSlug} className="mt-6 flex flex-col gap-3">
            <Label htmlFor="planoraSlug">{page.planoraSlugLabel}</Label>
            <div className="flex gap-2">
              <Input id="planoraSlug" name="planoraSlug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              <Button type="submit" disabled={saving}>
                {t.common.done}
              </Button>
            </div>
            {saved && <p className="text-xs text-muted-foreground">✓</p>}
            {!doctorProfile?.planoraBookingSlug && !slug && <p className="text-xs text-muted-foreground">{page.planoraSlugMissing}</p>}
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 md:col-span-2">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{page.upcomingAppointmentsHeading}</h2>
          {upcoming.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">{page.noAppointments}</p>
          ) : (
            <ul className="mt-6 space-y-3 text-sm">
              {upcoming.map((a, i) => (
                <li
                  key={a.id}
                  onClick={() => onOpenDetail(a.id)}
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
    </div>
  )
}

// --- Rendez-vous: the mockup's calendar + stat cards + 3-column layout,
// adapted to real appointment data. ---
type DoctorDashboardShell = ReturnType<typeof useTranslation>['pages']['doctorDashboard']['shell']

function AppointmentsSection({
  shell,
  appointments,
  dateLocale,
  searchQuery,
  onOpenDetail,
}: {
  shell: DoctorDashboardShell
  appointments: Array<DoctorAppointment>
  dateLocale: string
  searchQuery: string
  onOpenDetail: (id: string) => void
}) {
  const [cursor, setCursor] = React.useState(() => new Date())
  const [selectedDate, setSelectedDate] = React.useState(() => new Date())
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'inPerson' | 'video'>('all')

  const daysWithAppointments = React.useMemo(() => {
    const set = new Set<string>()
    for (const a of appointments) set.add(dayKey(new Date(a.startsAt)))
    return set
  }, [appointments])

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const monthStart = new Date(year, month, 1)
  const startWeekday = (monthStart.getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const weekdayLabels = React.useMemo(() => {
    // 2026-01-05 is a Monday — used purely as a stable reference week to
    // read localized short weekday names off of, Monday-first.
    const ref = new Date(2026, 0, 5)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(ref)
      d.setDate(ref.getDate() + i)
      return capitalize(d.toLocaleDateString(dateLocale, { weekday: 'short' }).slice(0, 2))
    })
  }, [dateLocale])

  const cells: Array<Date | null> = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const dayAppointments = appointments.filter((a) => sameDay(new Date(a.startsAt), selectedDate))
  const typedAppointments = dayAppointments.filter((a) => typeFilter === 'all' || inferAppointmentType(a) === typeFilter)
  const query = searchQuery.trim().toLowerCase()
  const visibleAppointments = query ? typedAppointments.filter((a) => a.patientName.toLowerCase().includes(query)) : typedAppointments

  const confirmed = visibleAppointments.filter((a) => a.status === 'confirmed')
  const cancelled = visibleAppointments.filter((a) => a.status === 'cancelled')
  const pending = visibleAppointments.filter((a) => a.status !== 'confirmed' && a.status !== 'cancelled')
  const total = visibleAppointments.length

  return (
    <div>
      <h1 className="text-2xl font-medium">{shell.appointmentsTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{shell.appointmentsSubtitle}</p>

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[340px_1fr]">
        <div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label={shell.prevMonthLabel}
                onClick={() => setCursor(new Date(year, month - 1, 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">{capitalize(monthStart.toLocaleDateString(dateLocale, { month: 'long', year: 'numeric' }))}</span>
              <button
                type="button"
                aria-label={shell.nextMonthLabel}
                onClick={() => setCursor(new Date(year, month + 1, 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-xs text-muted-foreground">
              {weekdayLabels.map((w) => (
                <span key={w}>{w}</span>
              ))}
              {cells.map((d, i) => {
                if (!d) return <span key={`blank-${i}`} />
                const isSelected = sameDay(d, selectedDate)
                const hasAppointments = daysWithAppointments.has(dayKey(d))
                return (
                  <button
                    key={dayKey(d)}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={
                      'relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition ' +
                      (isSelected ? 'bg-foreground text-white' : 'text-foreground hover:bg-muted')
                    }
                  >
                    {d.getDate()}
                    {hasAppointments && !isSelected && (
                      <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-accent" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <StatCard
              icon={Check}
              label={shell.confirmedLabel}
              count={confirmed.length}
              total={total}
              color="var(--accent)"
            />
            <StatCard icon={X} label={shell.cancelledLabel} count={cancelled.length} total={total} color="oklch(0.58 0.14 25)" />
            <StatCard icon={Clock} label={shell.pendingLabel} count={pending.length} total={total} color="oklch(0.62 0.13 70)" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'inPerson', 'video'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTypeFilter(key)}
                className={
                  'flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ' +
                  (typeFilter === key ? 'border-accent bg-accent-tint text-accent' : 'border-border text-muted-foreground hover:text-foreground')
                }
              >
                {typeFilter === key && <Check className="h-3.5 w-3.5" />}
                {key === 'video' && <Video className="h-3.5 w-3.5" />}
                {key === 'all' ? shell.typeAll : key === 'inPerson' ? shell.typeInPerson : shell.typeVideo}
              </button>
            ))}
          </div>

          {total === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">{shell.noAppointmentsDay}</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <AppointmentColumn icon={Check} label={shell.confirmedLabel} items={confirmed} dateLocale={dateLocale} onOpenDetail={onOpenDetail} />
              <AppointmentColumn icon={X} label={shell.cancelledLabel} items={cancelled} dateLocale={dateLocale} onOpenDetail={onOpenDetail} />
              <AppointmentColumn icon={Clock} label={shell.pendingLabel} items={pending} dateLocale={dateLocale} onOpenDetail={onOpenDetail} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  count,
  total,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  count: number
  total: number
  color: string
}) {
  const bars = Math.max(total, 1)
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: `color-mix(in oklch, ${color} 16%, var(--background))`, color }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold">
              {count}/{total}
            </div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
        <div className="flex gap-[3px]">
          {Array.from({ length: Math.min(bars, 24) }, (_, i) => (
            <span
              key={i}
              className="h-4 w-[3px] rounded-full"
              style={{ backgroundColor: i < count ? color : 'var(--muted)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function AppointmentColumn({
  icon: Icon,
  label,
  items,
  dateLocale,
  onOpenDetail,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  items: Array<DoctorAppointment>
  dateLocale: string
  onOpenDetail: (id: string) => void
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs text-muted-foreground">
          {items.length}
        </span>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onOpenDetail(a.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-muted"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-accent-foreground"
                style={{ backgroundColor: getAvatarColor(a.patientName) }}
              >
                {getInitials(a.patientName)}
              </span>
              <span className="min-w-0 flex-1 truncate">{a.patientName}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {new Date(a.startsAt).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// --- Patients: unique patients derived from the appointment history. ---
function PatientsSection({
  shell,
  appointments,
  dateLocale,
  searchQuery,
  onOpenDetail,
}: {
  shell: DoctorDashboardShell
  appointments: Array<DoctorAppointment>
  dateLocale: string
  searchQuery: string
  onOpenDetail: (id: string) => void
}) {
  const patients = React.useMemo(() => {
    const byPatient = new Map<string, Array<DoctorAppointment>>()
    for (const a of appointments) {
      const list = byPatient.get(a.patientName) ?? []
      list.push(a)
      byPatient.set(a.patientName, list)
    }
    return [...byPatient.entries()]
      .map(([name, list]) => {
        const sorted = [...list].sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime())
        return { name, count: list.length, lastAppointment: sorted[0] }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [appointments])

  const query = searchQuery.trim().toLowerCase()
  const visible = query ? patients.filter((p) => p.name.toLowerCase().includes(query)) : patients

  return (
    <div>
      <h1 className="text-2xl font-medium">{shell.patientsTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{shell.patientsSubtitle}</p>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">{shell.noPatients}</p>
      ) : (
        <ul className="mt-6 max-w-2xl divide-y divide-border rounded-2xl border border-border">
          {visible.map((p) => (
            <li key={p.name}>
              <button
                type="button"
                onClick={() => onOpenDetail(p.lastAppointment.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-muted"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-accent-foreground"
                  style={{ backgroundColor: getAvatarColor(p.name) }}
                >
                  {getInitials(p.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-foreground">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {shell.patientsCountLabel.replace('{count}', String(p.count))}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(p.lastAppointment.startsAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// --- Messages: honest placeholder, no messaging backend exists yet. ---
function MessagesSection({ shell }: { shell: DoctorDashboardShell }) {
  return (
    <div>
      <h1 className="text-2xl font-medium">{shell.messagesTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{shell.messagesSubtitle}</p>
      <div className="mt-8 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
        <MessageSquare className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{shell.messagesComingSoon}</p>
      </div>
    </div>
  )
}

import * as React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  CalendarClock,
  Home,
  LogOut,
  MessageSquare,
  Settings as SettingsIcon,
  Users,
  X,
} from 'lucide-react'

import logoDark from '@/assets/logo-dark.svg'
import { useTranslation } from '@/i18n/LanguageContext'
import { signOutAction, type AuthedUser } from '@/lib/auth/actions'
import { getInitials } from '@/lib/avatar'
import { cn } from '@/lib/utils'

export type DoctorSection = 'overview' | 'appointments' | 'patients' | 'messages'

interface DoctorSidebarProps {
  active: DoctorSection
  onSelect: (section: DoctorSection) => void
  authedUser: AuthedUser
  /** Below md: off-canvas drawer, open/closed by the topbar's menu button. */
  mobileOpen: boolean
  onMobileClose: () => void
}

/**
 * Left sidebar for the doctor's dashboard (2026-08-27), adapted from a
 * school-admin "Attendance" dashboard mockup the site owner supplied —
 * same shell shape (logo, a nav list, an account footer) but
 * Pelmatech's own sections/colors instead of the original's school nav.
 * Tab switching is local state (see doctor-dashboard.tsx), same pattern
 * as AuthCard's signin/signup tabs — every section already needs the
 * same loader data, so there's no reason to round-trip through routing.
 * "Paramètres" is the one real exception: /settings is its own existing
 * route, so that item is a plain Link instead of a local section.
 *
 * The mockup only shows a desktop-width shell — a fixed 256px column
 * would crush the content on a phone, so below md this becomes an
 * off-canvas drawer (fixed, slides in over a dimmed backdrop) instead of
 * a permanent column, mirroring how MobileMenu.tsx already handles the
 * same problem for the marketing header.
 */
export function DoctorSidebar({ active, onSelect, authedUser, mobileOpen, onMobileClose }: DoctorSidebarProps) {
  const t = useTranslation()
  const nav = t.pages.doctorDashboard.shell
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false)

  async function handleLogout() {
    setAccountMenuOpen(false)
    await signOutAction()
    navigate({ to: '/' })
  }

  function handleSelect(section: DoctorSection) {
    onSelect(section)
    onMobileClose()
  }

  const NAV_ITEMS: Array<{ key: DoctorSection; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { key: 'overview', label: nav.navOverview, icon: Home },
    { key: 'appointments', label: nav.navAppointments, icon: CalendarClock },
    { key: 'patients', label: nav.navPatients, icon: Users },
    { key: 'messages', label: nav.navMessages, icon: MessageSquare },
  ]

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={onMobileClose} aria-hidden="true" />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-border bg-background px-4 py-6 transition-transform duration-300 ease-in-out',
          'md:static md:z-auto md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logoDark} alt="Pelmatech" className="h-6 w-auto" />
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            aria-label={t.nav.closeMenu}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleSelect(key)}
              className={cn(
                'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                active === key ? 'text-accent' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {active === key && (
                <motion.span
                  layoutId="doctor-sidebar-active"
                  className="absolute inset-0 -z-10 rounded-xl bg-accent-tint"
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}

          <Link
            to="/settings"
            onClick={onMobileClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <SettingsIcon className="h-4 w-4" />
            {nav.navSettings}
          </Link>
        </nav>

        <div className="relative mt-4 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setAccountMenuOpen((v) => !v)}
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-muted"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
              {getInitials(`${authedUser.firstName} ${authedUser.lastName}`)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {authedUser.firstName} {authedUser.lastName}
              </span>
              <span className="block text-xs text-muted-foreground">{nav.roleLabel}</span>
            </span>
          </button>

          <AnimatePresence>
            {accountMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-border bg-background p-1.5 shadow-lg"
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  {t.common.logout}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  )
}

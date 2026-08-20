import * as React from 'react'
import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { User } from 'lucide-react'

import { useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction, signOutAction, type AuthedUser } from '@/lib/auth/actions'
import { cn } from '@/lib/utils'

interface AccountMenuProps {
  /** Matches the header pill's light/dark treatment on internal vs. hero pages. */
  variant?: 'hero' | 'internal'
}

/**
 * Account icon + hover menu in the header nav pill (site owner request,
 * 2026-08-20, once real patient/doctor accounts existed to link to).
 * Auth state isn't known at SSR time for most pages (only /dashboard and
 * /doctor-dashboard check it in beforeLoad), so this fetches it itself on
 * mount via getAuthedUserAction — cheap, and keeps every other page's
 * server render auth-free. Shows a logged-out menu (login/signup) until
 * that resolves, which is also the correct steady state for anonymous
 * visitors, who are the large majority of pageviews.
 *
 * Opens on hover (desktop) with a short close delay so moving the mouse
 * from icon to menu doesn't dismiss it, and also toggles on click/Enter
 * so it's reachable on touch devices and by keyboard.
 */
export function AccountMenu({ variant = 'hero' }: AccountMenuProps) {
  const t = useTranslation()
  const navigate = useNavigate()
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()

  const [user, setUser] = React.useState<AuthedUser | null>(null)
  const [open, setOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let cancelled = false
    getAuthedUserAction()
      .then((result) => {
        if (!cancelled) setUser(result)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocumentClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  async function handleLogout() {
    setOpen(false)
    await signOutAction()
    setUser(null)
    await router.invalidate()
    navigate({ to: '/' })
  }

  const dashboardHref = user?.role === 'doctor' ? '/doctor-dashboard' : '/dashboard'

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        // Always opens (never toggles): a real click is always preceded by
        // a real hover, which already opened the menu — toggling here
        // would make clicking the icon close it right as the visitor
        // tries to reach a menu item. Closing is handled by mouseleave,
        // an outside click, or Escape (see the effects above).
        onClick={openNow}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.accountMenu.label}
        className={cn(
          'ml-1 flex h-9 w-9 items-center justify-center rounded-full transition',
          variant === 'internal' ? 'hover:bg-foreground/5' : 'hover:bg-white/10',
        )}
      >
        <User className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg"
          >
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  {t.accountMenu.greeting} {user.firstName}
                </div>
                <Link
                  to={dashboardHref}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted transition"
                >
                  {t.accountMenu.dashboard}
                </Link>
                {user.role === 'patient' && (
                  <Link
                    to="/find-a-doctor"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted transition"
                  >
                    {t.accountMenu.findADoctor}
                  </Link>
                )}
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted transition"
                >
                  {t.accountMenu.settings}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted transition"
                >
                  {t.common.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted transition"
                >
                  {t.common.signIn}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted transition"
                >
                  {t.common.createAccount}
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

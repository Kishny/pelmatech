import * as React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import logoWhite from '@/assets/logo.svg'
import logoDark from '@/assets/logo-dark.svg'
import { AccountMenu } from '@/components/AccountMenu'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MobileMenu } from '@/components/MobileMenu'
import { useTranslation } from '@/i18n/LanguageContext'

interface HeaderProps {
  /**
   * Pages without the full-screen dark hero (everything except the
   * homepage) start with the dark logo and a lighter nav pill for
   * readability, per "HEADER BEHAVIOR ON INTERNAL PAGES".
   */
  variant?: 'hero' | 'internal'
}

/**
 * PROTECTED SECTION — geometry, spacing, and interaction language must
 * not change. Only the logo-swap trigger point and the header pill
 * background differ between the homepage hero and internal pages.
 *
 * 2026-08-14: site owner explicitly authorized two overrides to this
 * protection. (1) The "Menu" trigger button is now `md:hidden` (mobile-only),
 * since the full nav pill already handles navigation on desktop. (2) Per a
 * follow-up "add more animation to the nav" request, the active nav item's
 * background is now a `motion.span` with `layoutId` that slides between
 * items instead of just appearing/disappearing — geometry, spacing, and
 * copy are unchanged, only the transition is animated. Respects
 * prefers-reduced-motion via useReducedMotion() (falls back to a 0-duration
 * "jump" — same end state, no motion).
 *
 * The protected nav labels (Home/Artists/Releases/Contact) are a
 * leftover from the original template's music-platform copy and don't
 * map 1:1 onto Pelmatech's page set. Per the user's "make every link
 * clickable" request (2026-08-13), each label now routes to the closest
 * matching real page rather than staying a dead "#" link: Artists →
 * Doctors (people/professionals), Releases → Platform (what's new /
 * the product). Labels themselves stay exactly as specified.
 */
export function Header({ variant = 'hero' }: HeaderProps) {
  const t = useTranslation()
  const location = useLocation()
  const [scrolledPastHero, setScrolledPastHero] = React.useState(
    variant === 'internal',
  )
  const [menuOpen, setMenuOpen] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    if (variant === 'internal') return

    function onScroll() {
      setScrolledPastHero(window.scrollY > window.innerHeight - 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  const isDarkLogo = variant === 'internal' || scrolledPastHero

  const NAV_ITEMS = [
    { label: t.nav.home, to: '/' as const },
    { label: t.nav.artists, to: '/doctors' as const },
    { label: t.nav.releases, to: '/platform' as const },
    { label: t.nav.contact, to: '/contact' as const },
  ]

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 px-8 flex items-center justify-between">
        <Link to="/" aria-label="Pelmatech home" className="hover:opacity-80 transition-opacity">
          <img
            src={isDarkLogo ? logoDark : logoWhite}
            alt="Pelmatech"
            className="h-8 w-auto"
          />
        </Link>

        <div
          className="flex items-center gap-1 rounded-full pl-2 pr-2 py-2 backdrop-blur-md transition-colors"
          style={{
            background:
              variant === 'internal'
                ? 'var(--surface)'
                : 'var(--header-bg)',
            color: variant === 'internal' ? 'var(--foreground)' : '#fff',
          }}
        >
          {NAV_ITEMS.map((item) => {
            // 2026-08-14: was hardcoded to the first item ("Home") regardless
            // of the actual route — fixed as part of the site audit so the
            // pill highlights whichever section (incl. sub-routes like a
            // doctor's profile page under /doctors) is actually active.
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  isActive
                    ? 'relative px-5 py-2 text-sm rounded-full font-medium'
                    : `relative px-5 py-2 text-sm rounded-full opacity-80 transition hover:opacity-100 ${
                        variant === 'internal' ? 'hover:bg-foreground/5' : 'hover:bg-white/5'
                      }`
                }
              >
                {isActive && (
                  <motion.span
                    layoutId="header-nav-active-pill"
                    // 2026-08-14: the active-pill fill is variant-aware (was
                    // a flat bg-white/10 before, which is invisible against
                    // the light `--surface` background used on internal
                    // pages — found while verifying this same animation
                    // pass's screenshots).
                    className={`absolute inset-0 rounded-full ${
                      variant === 'internal' ? 'bg-foreground/10' : 'bg-white/10'
                    }`}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            )
          })}

          <LanguageSwitcher variant="pill" className="ml-1" />

          {/* 2026-08-20: account icon + hover menu (site owner request) —
              login/signup when signed out, dashboard/settings/logout once
              real patient/doctor accounts exist. See AccountMenu.tsx. */}
          <AccountMenu variant={variant} />

          {/* 2026-08-14: restricted to small screens (authorized override of
              this section's "must not change" protection) — on desktop the
              full nav pill to the left already covers navigation, so the
              extra Menu trigger was redundant there. */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu-panel"
            className="ml-2 flex md:hidden items-center gap-2 px-4 py-2 text-sm rounded-full hover:bg-white/10 transition"
          >
            <Menu className="w-4 h-4" />
            {t.nav.menu}
          </button>
        </div>
      </header>

      <div id="site-menu-panel">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  )
}

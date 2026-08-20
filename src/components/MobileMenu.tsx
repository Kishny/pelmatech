import { AnimatePresence, motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, X } from 'lucide-react'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from '@/i18n/LanguageContext'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-site navigation panel opened by the protected header's Menu
 * button. The header pill itself must stay visually unchanged — this
 * panel is the "complete-site header expansion" described in the spec.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslation()

  const NAV_LINKS = [
    { label: t.nav.platform, to: '/platform' as const },
    { label: t.nav.doctors, to: '/doctors' as const },
    { label: t.nav.pricing, to: '/pricing' as const },
    { label: t.nav.about, to: '/about' as const },
    { label: t.nav.contact, to: '/contact' as const },
    { label: t.nav.faq, to: '/faq' as const },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-foreground text-white"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-8 py-6 md:px-12">
            <span className="text-sm uppercase tracking-[0.2em] text-white/60">
              {t.mobileMenu.brand}
            </span>
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="panel" />
              <button
                type="button"
                onClick={onClose}
                aria-label={t.nav.closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10 hover:rotate-90 active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8 md:px-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-white/10 py-5 text-4xl font-medium leading-[1.05] md:text-6xl"
              >
                <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                  {link.label}
                </span>
                <ArrowUpRight className="h-8 w-8 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-80" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between px-8 py-8 md:px-12">
            <Link
              to="/login"
              onClick={onClose}
              className="rounded-full bg-white px-6 py-2 text-sm font-medium text-foreground transition hover:bg-white/90 hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.nav.login}
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              {t.mobileMenu.tagline}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

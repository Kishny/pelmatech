import { Link } from '@tanstack/react-router'

import logoWhite from '@/assets/logo.svg'
import { useTranslation } from '@/i18n/LanguageContext'

/**
 * Real route for each footer link, positioned to match
 * `t.footer.columns[columnIndex].links[linkIndex]` exactly. Kept
 * separate from the translated labels (routes are locale-independent).
 * "Our Team" routes to /about, which renders the TeamCarousel section.
 */
const COLUMN_ROUTES = [
  ['/health', '/appointments', '/nutrition', '/fitness', '/medications'],
  ['/about', '/about', '/careers', '/contact'],
  ['/join', '/doctor-portal', '/resources'],
  ['/help', '/faq', '/accessibility'],
  ['/privacy', '/terms', '/cookies'],
] as const

export function Footer() {
  const t = useTranslation()

  return (
    // 2026-08-14: footer height trimmed ~32% (site owner request — "takes up
    // too much space"). Every reduction is spacing/padding only (py-20->
    // py-10, mt-16->mt-8, pt-8->pt-5, space-y-2->space-y-1.5) — no font
    // size, weight, tracking, color, or copy changed, so the visual style
    // is identical, just more tightly packed. Verified via Playwright:
    // 457px -> ~300px at the 1728px reference width (see chat for exact
    // before/after measurement).
    <footer className="bg-foreground text-white px-8 py-9 md:px-12">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
        <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <Link to="/" aria-label="Pelmatech home" className="inline-block transition hover:opacity-80">
            <img src={logoWhite} alt="Pelmatech" className="h-8 w-auto" />
          </Link>
        </div>
        {t.footer.columns.map((col, colIndex) => (
          <div key={col.title}>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">{col.title}</div>
            <ul className="mt-3 space-y-1.5">
              {col.links.map((link, linkIndex) => (
                <li key={link}>
                  <Link
                    to={COLUMN_ROUTES[colIndex][linkIndex]}
                    className="link-underline inline-block text-sm text-white/70 transition hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-4 text-xs text-white/50 sm:flex-row sm:items-center">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  )
}

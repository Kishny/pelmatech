import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

import { useTranslation } from '@/i18n/LanguageContext'

/**
 * Global floating "back to top" button (site owner request, 2026-08-14).
 * Mounted once in `__root.tsx` so it's present on every route. Shows once
 * the visitor has scrolled past the halfway point of the page's
 * scrollable distance ("apparaît au milieu des pages"), not a fixed pixel
 * offset — a short page and a long page both reveal it at their own
 * midpoint. Hides again when scrolling back above that point.
 *
 * Uses AnimatePresence for a real enter/exit animation (scale + rise +
 * fade both ways, not just a CSS opacity toggle) with the site's primary
 * easing curve, and respects prefers-reduced-motion (falls back to an
 * instant appear/disappear and a non-smooth scroll-to-top).
 */
export function ScrollToTopButton() {
  const t = useTranslation()
  const [visible, setVisible] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    function computeVisible() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return false
      return window.scrollY > scrollable / 2
    }

    function onScrollOrResize() {
      setVisible((prev) => {
        const next = computeVisible()
        return next === prev ? prev : next
      })
    }

    onScrollOrResize()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    // 2026-08-14: moved from bottom-right to vertically centered on the
    // right edge (site owner follow-up request). Split into an outer
    // plain-CSS positioning wrapper + an inner motion.button: framer
    // writes its own `transform` for the enter/exit animation (scale/y),
    // which would silently overwrite a Tailwind `-translate-y-1/2` class
    // if it were on the same element — the wrapper keeps the "always
    // vertically centered" position immune to that.
    <div className="fixed top-1/2 right-8 z-40 -translate-y-1/2">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={handleClick}
            aria-label={t.common.backToTop}
            // 2026-08-14 follow-up: made translucent at rest (site owner
            // wanted it to stop hiding text as it scrolls past), with a
            // blur so whatever's behind it still reads as soft shapes
            // rather than a hard crop. Hover now darkens toward fully
            // solid instead of the old opacity-fade — "plus foncé", not
            // fainter — which also happens to raise contrast right when
            // the visitor is about to click it.
            className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/40 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-foreground/90 active:scale-95"
            initial={{ opacity: 0, y: 16, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.7 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

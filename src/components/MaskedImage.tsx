import * as React from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * PROTECTED MOTION PRIMITIVE — do not alter the transition values below,
 * and never substitute this with a plain opacity fade. This is the
 * default image reveal across the complete website (clip-path mask).
 *
 * Reveal-trigger note (2026-08-13): this used to rely on framer-motion's
 * `whileInView`/`viewport` props, then a native `IntersectionObserver`
 * (first with an object ref + effect, then with a callback ref). All
 * three had the identical failure: whenever several MaskedImages became
 * visible in the same batch (e.g. a whole card row scrolled into view at
 * once), the FIRST one in DOM order would fire its observer once on
 * mount (correctly reporting "not visible yet") and then simply never
 * fire again while being scrolled into view — permanently stuck at
 * `inset(100% 0 0 0)`, invisible — while identical siblings revealed
 * normally. This was reproduced even with a brand-new,
 * component-independent IntersectionObserver instrumented directly on
 * the page, which ruled out React ref timing, framer-motion's ref
 * composition, and this component's own state/render logic — the
 * browser's own IntersectionObserver delivery was the actual source of
 * the missed update.
 *
 * Fixed by dropping IntersectionObserver entirely in favor of a manual
 * `getBoundingClientRect()` check polled on every animation frame while
 * unrevealed (stops permanently the instant it becomes visible). An
 * earlier version of this fix only re-checked on window `scroll`/
 * `resize` events, which is what a real scrollbar-driven reveal needs —
 * but it missed cards that enter view through a CSS transform with no
 * page scroll at all (e.g. TeamCarousel's "next" button, which slides
 * the track via `animate={{ x: ... }}`), so those stayed stuck hidden
 * exactly like the original bug. Polling via rAF reacts to any geometry
 * change regardless of cause and costs nothing once each image reveals,
 * since its own loop stops right away. Same protected animation values
 * throughout (clip-path amounts, duration 1.1, easing) and the same
 * -80px margin semantics (the viewport is shrunk by 80px on every side
 * before testing for overlap) — only the reveal trigger changed.
 */
interface MaskedImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  delay?: number
}

const VIEWPORT_MARGIN = 80

function isInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect()
  const vh = window.innerHeight
  const vw = window.innerWidth
  return (
    rect.bottom > VIEWPORT_MARGIN &&
    rect.right > VIEWPORT_MARGIN &&
    rect.top < vh - VIEWPORT_MARGIN &&
    rect.left < vw - VIEWPORT_MARGIN
  )
}

export function MaskedImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: MaskedImageProps) {
  const [revealed, setRevealed] = React.useState(false)
  const nodeRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (revealed) return
    const node = nodeRef.current
    if (!node) return

    let frameId = 0
    let cancelled = false

    const tick = () => {
      if (cancelled) return
      if (isInViewport(node)) {
        setRevealed(true)
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
    }
  }, [revealed])

  return (
    <motion.div
      ref={nodeRef}
      className={cn('overflow-hidden', className)}
      initial={{
        clipPath: 'inset(100% 0 0 0)',
      }}
      animate={{
        clipPath: revealed ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
      }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img
        src={src}
        alt={alt}
        className={cn('w-full h-full object-cover', imgClassName)}
      />
    </motion.div>
  )
}

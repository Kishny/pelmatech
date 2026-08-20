type GlowVariant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const POSITION_CLASSES: Record<GlowVariant, string> = {
  'top-left': '-top-40 -left-40',
  'top-right': '-top-40 -right-40',
  'bottom-left': '-bottom-40 -left-40',
  'bottom-right': '-bottom-40 -right-40',
}

/**
 * Soft, blurred radial glow used to add depth behind otherwise flat
 * section backgrounds ("Option A" of the 2026-08-14 background-relief
 * pass). Purely decorative: aria-hidden, pointer-events disabled, and
 * layered behind section content via -z-10. Color comes straight from the
 * --accent design token at low opacity — no new brand colors introduced.
 *
 * Usage: drop as the first child of a `relative z-0 overflow-hidden`
 * section (the `z-0` matters — without it the section's own background,
 * which paints as a plain in-flow box, ends up on top of a -z-10 child
 * instead of behind it); no wrapper needed for the rest of the section's
 * content.
 */
export function GlowBackdrop({ variant }: { variant: GlowVariant }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 h-[36rem] w-[36rem] rounded-full opacity-[0.08] blur-[120px] ${POSITION_CLASSES[variant]}`}
      style={{ background: 'var(--accent)' }}
    />
  )
}

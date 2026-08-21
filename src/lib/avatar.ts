/**
 * Small shared helpers for the initials-avatar chips used across the
 * doctor dashboard (2026-08-27) — patient names -> "JW"-style initials,
 * plus a small curated color rotation so rows are easy to tell apart at
 * a glance (mirroring the reference mockup's per-row avatar colors,
 * but restricted to a Pelmatech-consistent palette instead of an
 * arbitrary rainbow: same lightness/chroma family as --accent, only the
 * hue rotates).
 */

export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Six hues at the same lightness/chroma as --accent (oklch(0.55 0.12 155))
// so every avatar color reads as "part of the same palette" rather than
// competing with it. Text is always --accent-foreground (near-white),
// which has enough contrast against all six at this lightness.
const AVATAR_HUES = [155, 250, 30, 320, 200, 80]

export function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  const hue = AVATAR_HUES[Math.abs(hash) % AVATAR_HUES.length]
  return `oklch(0.55 0.12 ${hue})`
}

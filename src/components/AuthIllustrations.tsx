/**
 * Small duotone line illustrations for AuthCard's hero panel (2026-08-27).
 * The reference mockup used a stock character illustration (a DJ) — per
 * the site owner's choice, that's replaced here with simple abstract,
 * health-themed shapes instead of a literal illustrated person, drawn
 * with `currentColor` so they inherit --accent-foreground from the CSS.
 */

export function WelcomeBackIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 76" fill="none" className={className} aria-hidden="true">
      <circle cx="38" cy="38" r="34" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M38 14c-9 4-15 5-19 5v15c0 12 8 20 19 24 11-4 19-12 19-24V19c-4 0-10-1-19-5Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 40h8l4-9 6 16 4-9h10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function JoinUsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 76" fill="none" className={className} aria-hidden="true">
      <circle cx="38" cy="38" r="34" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="18" y="20" width="34" height="30" rx="6" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M18 28h34" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M27 16v8M43 16v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="52" cy="50" r="11" fill="currentColor" />
      <path d="M52 45v10M47 50h10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

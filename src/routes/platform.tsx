import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Calendar,
  Dumbbell,
  Apple,
  FileText,
  LayoutDashboard,
  Pill,
} from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/platform')({ component: Platform })

/**
 * Icons are presentational and kept locally, mapped by index onto the
 * translated `t.pages.platform.capabilities` entries (title/body).
 */
const CAPABILITY_ICONS = [
  LayoutDashboard,
  Activity,
  Calendar,
  Apple,
  Dumbbell,
  Pill,
  FileText,
  Bell,
]

// 2026-08-14 audit fix: this grid advertised 8 capabilities with zero way to
// click through to any of them. Matched by the same index/order as
// CAPABILITY_ICONS. Dashboard/Health Records/Notifications originally had
// no dedicated route and stayed static — follow-up request ("still some
// non-clickable links on this page") added `/dashboard` (already existed,
// just wasn't linked from here) plus two new minimal pages,
// health-records.tsx and notifications.tsx, so all 8 are real now. Stays
// `Array<string | null>` (rather than `string[]`) in case a future
// capability doesn't have a page yet — the null-safe rendering below still
// applies, it just currently never hits the null branch.
const CAPABILITY_ROUTES: Array<string | null> = [
  '/dashboard',
  '/health',
  '/appointments',
  '/nutrition',
  '/fitness',
  '/medications',
  '/health-records',
  '/notifications',
]

function Platform() {
  const t = useTranslation()
  const capabilities = t.pages.platform.capabilities.map((cap, i) => ({
    ...cap,
    icon: CAPABILITY_ICONS[i],
  }))

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.platform.heading[0]}
          <br />
          {t.pages.platform.heading[1]}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.platform.description}
        </AnimatedText>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            const route = CAPABILITY_ROUTES[i]
            const titleRow = (
              <div className="flex items-center justify-between gap-2">
                <AnimatedHeading as="h2" delay={i * 0.05} className="text-lg font-medium">
                  {cap.title}
                </AnimatedHeading>
                {route && (
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                )}
              </div>
            )
            if (!route) {
              return (
                <div key={cap.title} className="flex flex-col gap-4 bg-background p-8">
                  <Icon className="h-6 w-6 text-accent" />
                  {titleRow}
                  <AnimatedText delay={i * 0.05} className="text-sm text-muted-foreground leading-relaxed">
                    {cap.body}
                  </AnimatedText>
                </div>
              )
            }
            return (
              <Link
                key={cap.title}
                to={route}
                className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-muted/30"
              >
                <Icon className="h-6 w-6 text-accent" />
                {titleRow}
                <AnimatedText delay={i * 0.05} className="text-sm text-muted-foreground leading-relaxed">
                  {cap.body}
                </AnimatedText>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

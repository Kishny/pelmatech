import { createFileRoute } from '@tanstack/react-router'

import { AuthCard } from '@/components/AuthCard'
import { Header } from '@/components/Header'

export const Route = createFileRoute('/signup')({ component: Signup })

/**
 * 2026-08-27: now just mounts the shared AuthCard on the "signup" tab —
 * see AuthCard.tsx for the actual 4-step wizard/logic (unchanged) and
 * the sliding sign-in/sign-up card mechanics. Kept as its own route
 * (rather than folded into /login) so existing links to `/signup` (the
 * login page's "create account", the marketing pages' CTAs) keep working.
 */
function Signup() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header variant="internal" />
      <main className="flex min-h-screen items-center justify-center px-6 pt-28 pb-16 md:px-12">
        <AuthCard initialView="signup" />
      </main>
    </div>
  )
}

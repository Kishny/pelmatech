import { createFileRoute } from '@tanstack/react-router'

import { AuthCard } from '@/components/AuthCard'
import { Header } from '@/components/Header'

export const Route = createFileRoute('/login')({ component: Login })

/**
 * 2026-08-27: now just mounts the shared AuthCard on the "signin" tab —
 * see AuthCard.tsx for the actual form/logic (unchanged) and the sliding
 * sign-in/sign-up card mechanics. Kept as its own route (rather than
 * folded into /signup) since other pages throughout the app redirect
 * unauthenticated visitors to `/login` specifically (see e.g.
 * doctor-dashboard.tsx's beforeLoad).
 */
function Login() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header variant="internal" />
      <main className="flex min-h-screen items-center justify-center px-6 pt-28 pb-16 md:px-12">
        <AuthCard initialView="signin" />
      </main>
    </div>
  )
}

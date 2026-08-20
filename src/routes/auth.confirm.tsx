import { createFileRoute, redirect } from '@tanstack/react-router'

import { exchangeAuthCodeAction } from '@/lib/auth/actions'

/**
 * Landing point for the confirmation link Supabase emails after signup
 * (see emailRedirectTo in lib/auth/actions.ts#signUpAction). Supabase
 * verifies the token itself, then redirects the browser here with a
 * `?code=...` query param; this route exchanges that code for a real
 * session (setting cookies) and sends the visitor straight to the
 * dashboard that matches their role — no separate "log in" step needed
 * right after confirming.
 */
export const Route = createFileRoute('/auth/confirm')({
  validateSearch: (search: Record<string, unknown>) => ({
    code: typeof search.code === 'string' ? search.code : undefined,
  }),
  beforeLoad: async ({ search }) => {
    const result = await exchangeAuthCodeAction({ data: { code: search.code } })
    if (result.success) {
      throw redirect({ to: result.role === 'doctor' ? '/doctor-dashboard' : '/dashboard' })
    }
    throw redirect({ to: '/login' })
  },
  component: () => null,
})

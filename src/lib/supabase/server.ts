import { createServerClient } from '@supabase/ssr'
import { getCookies, setCookie } from '@tanstack/react-start/server'

/**
 * Supabase client for use inside TanStack Start server functions /
 * route loaders. Reads and writes the auth session via HTTP cookies so
 * the browser client (lib/supabase/client.ts) and the server stay in
 * sync — this is what lets `beforeLoad` route guards check auth on the
 * server without a client round-trip.
 */
export function createSupabaseServerClient() {
  return createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          const cookies = getCookies()
          return Object.entries(cookies).map(([name, value]) => ({ name, value }))
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            setCookie(name, value, options)
          }
        },
      },
    },
  )
}

import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for use in the browser (React components, event
 * handlers). Session/auth state is persisted via cookies (not
 * localStorage) so it's visible to server-side code too — see
 * lib/supabase/server.ts.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  )
}

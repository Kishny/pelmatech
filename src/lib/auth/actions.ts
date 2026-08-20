import { createServerFn } from '@tanstack/react-start'
import { getRequestUrl } from '@tanstack/react-start/server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export type UserRole = 'patient' | 'doctor'

export interface SignUpInput {
  email: string
  password: string
  role: UserRole
  firstName: string
  lastName: string
  phone?: string
  // Doctor-only fields — the professional links their existing Planora
  // "cabinet" (Organization) by its public booking slug. Optional at
  // signup: a doctor can finish this later from their dashboard.
  specialtyKey?: string
  planoraBookingSlug?: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface AuthedUser {
  id: string
  email: string | null
  role: UserRole
  firstName: string
  lastName: string
  phone: string | null
}

/**
 * Creates the Supabase auth user. Profile rows (profiles + doctor_profiles
 * / patient_profiles) are created automatically by the `handle_new_user`
 * Postgres trigger from the metadata passed in `options.data` below — see
 * the phase1_accounts_and_appointments / handle_new_user_trigger
 * migrations. This keeps account creation atomic even when email
 * confirmation delays the first real session.
 */
export const signUpAction = createServerFn({ method: 'POST' })
  .validator((data: SignUpInput) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()

    // Without this, Supabase falls back to the project's "Site URL" (a
    // dashboard setting that defaults to a placeholder, not this app),
    // so the confirmation email link lands nowhere useful. Deriving it
    // from the incoming request works in dev and prod without a
    // hardcoded domain. /auth/confirm exchanges the code for a session
    // and routes to the right dashboard by role.
    const emailRedirectTo = `${getRequestUrl({ xForwardedHost: true }).origin}/auth/confirm`

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo,
        data: {
          role: data.role,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || undefined,
          ...(data.role === 'doctor'
            ? {
                specialty_key: data.specialtyKey || undefined,
                planora_booking_slug: data.planoraBookingSlug || undefined,
              }
            : {}),
        },
      },
    })

    if (error) {
      return { success: false as const, error: error.message }
    }

    return {
      success: true as const,
      // If Supabase's "Confirm email" setting is on, signUp() returns a
      // user but no session — the visitor must confirm by email before
      // they can log in.
      needsEmailConfirmation: !authData.session,
    }
  })

export const signInAction = createServerFn({ method: 'POST' })
  .validator((data: SignInInput) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()

    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return { success: false as const, error: error.message }
    }

    const role = (signInData.user.user_metadata as { role?: UserRole } | null)?.role || 'patient'

    return { success: true as const, role }
  })

/**
 * Exchanges the PKCE `code` from an email confirmation link (see
 * emailRedirectTo in signUpAction) for a real session, setting the auth
 * cookies. Used by /auth/confirm right after the visitor clicks the
 * link in their inbox.
 */
export const exchangeAuthCodeAction = createServerFn({ method: 'GET' })
  .validator((data: { code?: string }) => data)
  .handler(async ({ data }) => {
    if (!data.code) return { success: false as const }

    const supabase = createSupabaseServerClient()
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(data.code)
    if (error || !sessionData.user) return { success: false as const }

    const role = (sessionData.user.user_metadata as { role?: UserRole } | null)?.role || 'patient'
    return { success: true as const, role }
  })

export const signOutAction = createServerFn({ method: 'POST' }).handler(async () => {
  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()
  return { success: true as const }
})

export interface DoctorProfile {
  specialtyKey: string
  planoraBookingSlug: string | null
  bio: string | null
}

/**
 * Fetches the signed-in doctor's own doctor_profiles row. RLS restricts
 * writes to the owner, but reads are public (needed for doctor listing/
 * profile pages), so this also double-checks the caller is authenticated.
 */
export const getDoctorProfileAction = createServerFn({ method: 'GET' }).handler(async (): Promise<DoctorProfile | null> => {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('doctor_profiles')
    .select('specialty_key, planora_booking_slug, bio')
    .eq('id', user.id)
    .maybeSingle()

  if (!data) return null
  return { specialtyKey: data.specialty_key, planoraBookingSlug: data.planora_booking_slug, bio: data.bio }
})

export interface UpdateProfileInput {
  firstName: string
  lastName: string
  phone?: string
}

/**
 * Powers the real /settings "Profil" section (2026-08-20), replacing the
 * earlier static "coming soon" placeholder. Works for both roles — only
 * the shared `profiles` columns are editable here; doctor-only fields
 * (specialty, Planora slug) stay on /doctor-dashboard.
 */
export const updateProfileAction = createServerFn({ method: 'POST' })
  .validator((data: UpdateProfileInput) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false as const, error: 'Not authenticated.' }

    const firstName = data.firstName.trim()
    const lastName = data.lastName.trim()
    if (!firstName || !lastName) return { success: false as const, error: 'Prénom et nom requis.' }

    const { error } = await supabase
      .from('profiles')
      .update({ first_name: firstName, last_name: lastName, phone: data.phone?.trim() || null })
      .eq('id', user.id)
    if (error) return { success: false as const, error: error.message }
    return { success: true as const }
  })

export interface PatientMedicalProfile {
  dateOfBirth: string | null
  socialSecurityNumber: string | null
  vitalCardNumber: string | null
  insuranceProvider: string | null
  insuranceMemberNumber: string | null
}

/**
 * Powers the new "Informations médicales & assurance" section on
 * /settings (2026-08-20), requested to store the French health-insurance
 * details (numéro de sécurité sociale, carte Vitale, mutuelle) patients
 * need on file. Lives on patient_profiles, which already has owner-only
 * RLS (patient_profiles_select_own / _update_own) from Phase 1 — nothing
 * new to grant here, this data is never visible to doctors or other
 * patients through this app.
 */
export const getPatientMedicalProfileAction = createServerFn({ method: 'GET' }).handler(async (): Promise<PatientMedicalProfile | null> => {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('patient_profiles')
    .select('date_of_birth, social_security_number, vital_card_number, insurance_provider, insurance_member_number')
    .eq('id', user.id)
    .maybeSingle()

  if (!data) return null
  return {
    dateOfBirth: data.date_of_birth,
    socialSecurityNumber: data.social_security_number,
    vitalCardNumber: data.vital_card_number,
    insuranceProvider: data.insurance_provider,
    insuranceMemberNumber: data.insurance_member_number,
  }
})

export interface UpdatePatientMedicalProfileInput {
  dateOfBirth?: string
  socialSecurityNumber?: string
  vitalCardNumber?: string
  insuranceProvider?: string
  insuranceMemberNumber?: string
}

export const updatePatientMedicalProfileAction = createServerFn({ method: 'POST' })
  .validator((data: UpdatePatientMedicalProfileInput) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false as const, error: 'Not authenticated.' }

    const { error } = await supabase
      .from('patient_profiles')
      .update({
        date_of_birth: data.dateOfBirth || null,
        social_security_number: data.socialSecurityNumber?.trim() || null,
        vital_card_number: data.vitalCardNumber?.trim() || null,
        insurance_provider: data.insuranceProvider?.trim() || null,
        insurance_member_number: data.insuranceMemberNumber?.trim() || null,
      })
      .eq('id', user.id)
    if (error) return { success: false as const, error: error.message }
    return { success: true as const }
  })

export const updateDoctorPlanoraSlugAction = createServerFn({ method: 'POST' })
  .validator((data: { planoraBookingSlug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false as const, error: 'Not authenticated.' }

    const slug = data.planoraBookingSlug.trim() || null
    const { error } = await supabase.from('doctor_profiles').update({ planora_booking_slug: slug }).eq('id', user.id)
    if (error) return { success: false as const, error: error.message }
    return { success: true as const }
  })

/**
 * Reads the current session server-side and joins it with the app's own
 * `profiles` (+ role-specific) tables. Returns null when signed out.
 * Used from route `beforeLoad` guards so protected pages never flash
 * unauthenticated content before redirecting.
 */
export const getAuthedUserAction = createServerFn({ method: 'GET' }).handler(async (): Promise<AuthedUser | null> => {
  const supabase = createSupabaseServerClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, first_name, last_name, phone')
      .eq('id', user.id)
      .maybeSingle()

    if (!profile) return null

    return {
      id: user.id,
      email: user.email ?? null,
      role: profile.role,
      firstName: profile.first_name,
      lastName: profile.last_name,
      phone: profile.phone,
    }
  } catch {
    // A transient network/auth-service hiccup should send an anonymous
    // visitor to /login (safe default), not crash the route with an
    // unhandled error boundary — see beforeLoad guards on /dashboard and
    // /doctor-dashboard.
    return null
  }
})

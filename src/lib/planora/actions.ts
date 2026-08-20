import { createServerFn } from '@tanstack/react-start'
import { getRequestUrl } from '@tanstack/react-start/server'
import { DateTime } from 'luxon'

import { createSupabaseServerClient } from '@/lib/supabase/server'

/**
 * Bridge to Planora's public booking API (a separate app — see the
 * project's own backend/routes/publicRoutes.js). Pelmatech does not run
 * its own booking engine: each doctor who signs up here links their
 * existing Planora "cabinet" by its public booking slug (set from
 * /doctor-dashboard), and real availability/booking is fetched from
 * Planora server-to-server. A mirror row is kept in Pelmatech's own
 * `appointments` table (Supabase) purely so patient/doctor dashboards
 * have something fast to read — Planora stays the source of truth for
 * the actual slot.
 *
 * PLANORA_API_URL is a server-only env var (no VITE_ prefix — it must
 * never ship to the client bundle) with the known production API as a
 * fallback so this works even before the var is set locally.
 */
const PLANORA_API_BASE = process.env.PLANORA_API_URL || 'https://planora-prod.vercel.app/api'

export interface PlanoraService {
  value: string
  label: string
  color: string
  icon: string
}

export interface PlanoraDoctorInfo {
  name: string
  metier: string
  services: Array<PlanoraService>
  durationMin: number
}

export interface PlanoraAvailabilityDay {
  date: string
  label: string
  slots: Array<string>
}

export interface BookableDoctor {
  id: string
  name: string
  specialtyKey: string
  bio: string | null
}

/**
 * Real, signed-up doctors patients can actually book with — distinct
 * from the fictional showcase roster on the public /doctors marketing
 * page (src/data/doctors.ts), which isn't backed by real accounts. Only
 * doctors who've set a Planora booking slug (from /doctor-dashboard)
 * show up here, since that's what makes them actually bookable.
 */
export const listBookableDoctorsAction = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<BookableDoctor>> => {
  const supabase = createSupabaseServerClient()

  const { data: doctorProfiles } = await supabase
    .from('doctor_profiles')
    .select('id, specialty_key, bio')
    .not('planora_booking_slug', 'is', null)
  if (!doctorProfiles || doctorProfiles.length === 0) return []

  const ids = doctorProfiles.map((d) => d.id)
  const { data: profiles } = await supabase.from('profiles').select('id, first_name, last_name').in('id', ids)
  const nameById = new Map((profiles || []).map((p) => [p.id, `${p.first_name} ${p.last_name}`.trim()]))

  return doctorProfiles.map((d) => ({
    id: d.id,
    name: nameById.get(d.id) || 'Médecin',
    specialtyKey: d.specialty_key,
    bio: d.bio,
  }))
})

/** Single-doctor counterpart to listBookableDoctorsAction, for the /book/$doctorId header. */
export const getBookableDoctorAction = createServerFn({ method: 'GET' })
  .validator((data: { doctorId: string }) => data)
  .handler(async ({ data }): Promise<BookableDoctor | null> => {
    const supabase = createSupabaseServerClient()
    const { data: doctorProfile } = await supabase
      .from('doctor_profiles')
      .select('id, specialty_key, bio')
      .eq('id', data.doctorId)
      .maybeSingle()
    if (!doctorProfile) return null

    const { data: profile } = await supabase.from('profiles').select('first_name, last_name').eq('id', data.doctorId).maybeSingle()
    return {
      id: doctorProfile.id,
      name: profile ? `${profile.first_name} ${profile.last_name}`.trim() : 'Médecin',
      specialtyKey: doctorProfile.specialty_key,
      bio: doctorProfile.bio,
    }
  })

async function getDoctorSlug(doctorId: string): Promise<string | null> {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase
    .from('doctor_profiles')
    .select('planora_booking_slug')
    .eq('id', doctorId)
    .maybeSingle()
  return data?.planora_booking_slug || null
}

/**
 * Public info (name, services) for a doctor's Planora cabinet. Used to
 * build the service picker before showing availability — Planora's
 * /book endpoint requires a specific `service` value.
 */
export const getDoctorBookingInfoAction = createServerFn({ method: 'GET' })
  .validator((data: { doctorId: string }) => data)
  .handler(async ({ data }): Promise<
    | { status: 'not_configured' }
    | { status: 'unreachable' }
    | { status: 'ok'; slug: string; info: PlanoraDoctorInfo }
  > => {
    const slug = await getDoctorSlug(data.doctorId)
    if (!slug) return { status: 'not_configured' }

    try {
      const res = await fetch(`${PLANORA_API_BASE}/public/${encodeURIComponent(slug)}`)
      if (!res.ok) return { status: 'unreachable' }
      const info = (await res.json()) as PlanoraDoctorInfo
      return { status: 'ok', slug, info }
    } catch {
      return { status: 'unreachable' }
    }
  })

export const getDoctorAvailabilityAction = createServerFn({ method: 'GET' })
  .validator((data: { doctorId: string }) => data)
  .handler(async ({ data }): Promise<
    | { status: 'not_configured' }
    | { status: 'unreachable' }
    | { status: 'ok'; durationMin: number; days: Array<PlanoraAvailabilityDay> }
  > => {
    const slug = await getDoctorSlug(data.doctorId)
    if (!slug) return { status: 'not_configured' }

    try {
      const res = await fetch(`${PLANORA_API_BASE}/public/${encodeURIComponent(slug)}/availability`)
      if (!res.ok) return { status: 'unreachable' }
      const avail = (await res.json()) as { durationMin: number; days: Array<PlanoraAvailabilityDay> }
      return { status: 'ok', durationMin: avail.durationMin, days: avail.days }
    } catch {
      return { status: 'unreachable' }
    }
  })

export interface BookAppointmentInput {
  doctorId: string
  serviceValue: string
  serviceLabel: string
  date: string // "yyyy-LL-dd"
  time: string // "HH:mm"
  durationMin: number
  note?: string
}

/**
 * Books a real slot through Planora on behalf of the signed-in patient,
 * then mirrors it into Pelmatech's own `appointments` table. Planora
 * doesn't know about Pelmatech accounts — it treats every booking as a
 * guest booking by name/email/phone, which we fill in from the
 * patient's Pelmatech profile.
 */
export const bookAppointmentAction = createServerFn({ method: 'POST' })
  .validator((data: BookAppointmentInput) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user || !user.email) return { success: false as const, error: 'not_authenticated' }

    const { data: patientProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name, phone')
      .eq('id', user.id)
      .maybeSingle()
    if (!patientProfile) return { success: false as const, error: 'no_profile' }

    const slug = await getDoctorSlug(data.doctorId)
    if (!slug) return { success: false as const, error: 'doctor_not_bookable' }

    // 2026-08-26: tells Planora's email-verification link to point back at
    // Pelmatech's own confirmation page (see appointments_.confirm.$token.tsx)
    // instead of Planora's own /reservation/:token page — keeps the patient
    // inside the app they know while the verification email itself stays
    // fully active. Planora only honors this if it matches its own
    // TRUSTED_CONFIRM_BASES allowlist; any other/unrecognized value is
    // silently ignored server-side and it falls back to its own page, so
    // this is safe to always send.
    const confirmUrlBase = `${getRequestUrl({ xForwardedHost: true }).origin}/appointments/confirm/`

    let planoraResult: { ok?: boolean; needsVerification?: boolean; status?: string; message?: string; cancelToken?: string }
    try {
      const res = await fetch(`${PLANORA_API_BASE}/public/${encodeURIComponent(slug)}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${patientProfile.first_name} ${patientProfile.last_name}`.trim(),
          email: user.email,
          phone: patientProfile.phone || '',
          note: data.note || '',
          date: data.date,
          time: data.time,
          service: data.serviceValue,
          website: '', // honeypot field Planora expects to stay empty
          confirmUrlBase,
        }),
      })
      planoraResult = await res.json()
      if (!res.ok || !planoraResult.ok) {
        return { success: false as const, error: planoraResult.message || 'booking_failed' }
      }
    } catch {
      return { success: false as const, error: 'network_error' }
    }

    // Mirror locally so the patient/doctor dashboards have something to
    // read without calling Planora on every page view. Best-effort: if
    // this insert fails, the real booking still succeeded in Planora —
    // we surface it as a success with a warning rather than pretending
    // the booking itself failed.
    const startsAt = DateTime.fromFormat(`${data.date} ${data.time}`, 'yyyy-LL-dd HH:mm', { zone: 'Europe/Paris' })
    const endsAt = startsAt.plus({ minutes: data.durationMin })
    const localStatus = data.serviceValue && planoraResult.status === 'confirmed' ? 'confirmed' : planoraResult.status === 'pending' ? 'pending' : 'pending'

    const { error: insertError } = await supabase.from('appointments').insert({
      patient_id: user.id,
      doctor_id: data.doctorId,
      planora_booking_token: planoraResult.cancelToken || null,
      service_label: data.serviceLabel,
      starts_at: startsAt.toUTC().toISO(),
      ends_at: endsAt.toUTC().toISO(),
      status: localStatus,
    })

    return {
      success: true as const,
      needsVerification: !!planoraResult.needsVerification,
      message: planoraResult.message || '',
      mirrored: !insertError,
    }
  })

/**
 * Landing point for the confirmation email Planora sends when a booking
 * needs email verification (see confirmUrlBase above) — called by the
 * appointments_.confirm.$token.tsx route with the Planora verifyToken
 * from the URL. Deliberately does NOT require a Pelmatech session: the
 * link must work no matter which device/browser the patient opens their
 * inbox in, exactly like Planora's own /reservation/:token page it
 * replaces. The verifyToken itself is the single-use secret that
 * authorizes this action — same trust model Planora already uses.
 *
 * Matches the resulting local `appointments` row via the cancelToken
 * Planora's /verify response includes (mirrors the same value stored as
 * planora_booking_token at booking time), since the URL token
 * (verifyToken) is never itself persisted locally.
 */
export const confirmAppointmentAction = createServerFn({ method: 'POST' })
  .validator((data: { token: string }) => data)
  .handler(async ({
    data,
  }): Promise<
    | { outcome: 'confirmed' | 'pending'; doctorName: string; date: string; time: string }
    | { outcome: 'invalid' | 'conflict' | 'error'; message?: string }
  > => {
    let planoraResult: { status?: string; cabinet?: string; date?: string; time?: string; title?: string; cancelToken?: string; message?: string }
    let res: Response
    try {
      res = await fetch(`${PLANORA_API_BASE}/public/booking/${encodeURIComponent(data.token)}/verify`, {
        method: 'POST',
      })
      planoraResult = await res.json()
    } catch {
      return { outcome: 'error' }
    }

    if (res.status === 404) return { outcome: 'invalid' }
    if (res.status === 409) return { outcome: 'conflict', message: planoraResult.message }
    if (!res.ok || (planoraResult.status !== 'confirmed' && planoraResult.status !== 'pending')) {
      return { outcome: 'error', message: planoraResult.message }
    }

    const outcome = planoraResult.status as 'confirmed' | 'pending'

    // Best-effort mirror update — the real booking in Planora is already
    // confirmed at this point regardless of whether this local update
    // succeeds, so we never fail the whole action on a mirror error.
    if (planoraResult.cancelToken) {
      const supabase = createSupabaseServerClient()
      await supabase
        .from('appointments')
        .update({ status: outcome })
        .eq('planora_booking_token', planoraResult.cancelToken)
    }

    return {
      outcome,
      doctorName: planoraResult.cabinet || '',
      date: planoraResult.date || '',
      time: planoraResult.time || '',
    }
  })

export interface MyAppointment {
  id: string
  doctorName: string
  serviceLabel: string | null
  startsAt: string
  endsAt: string
  status: string
  canCancel: boolean
}

export const listMyAppointmentsAction = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<MyAppointment>> => {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, doctor_id, service_label, starts_at, ends_at, status, planora_booking_token')
    .eq('patient_id', user.id)
    .order('starts_at', { ascending: true })
  if (!appointments || appointments.length === 0) return []

  const doctorIds = [...new Set(appointments.map((a) => a.doctor_id))]
  const { data: doctorProfiles } = await supabase.from('profiles').select('id, first_name, last_name').in('id', doctorIds)
  const nameById = new Map((doctorProfiles || []).map((p) => [p.id, `${p.first_name} ${p.last_name}`.trim()]))

  return appointments.map((a) => ({
    id: a.id,
    doctorName: nameById.get(a.doctor_id) || 'Médecin',
    serviceLabel: a.service_label,
    startsAt: a.starts_at,
    endsAt: a.ends_at,
    status: a.status,
    canCancel: a.status !== 'cancelled' && new Date(a.starts_at).getTime() > Date.now(),
  }))
})

export interface DoctorAppointment {
  id: string
  patientName: string
  serviceLabel: string | null
  startsAt: string
  endsAt: string
  status: string
}

export const listDoctorAppointmentsAction = createServerFn({ method: 'GET' }).handler(async (): Promise<Array<DoctorAppointment>> => {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, patient_id, service_label, starts_at, ends_at, status')
    .eq('doctor_id', user.id)
    .order('starts_at', { ascending: true })
  if (!appointments || appointments.length === 0) return []

  const patientIds = [...new Set(appointments.map((a) => a.patient_id))]
  const { data: patientProfiles } = await supabase.from('profiles').select('id, first_name, last_name').in('id', patientIds)
  const nameById = new Map((patientProfiles || []).map((p) => [p.id, `${p.first_name} ${p.last_name}`.trim()]))

  return appointments.map((a) => ({
    id: a.id,
    patientName: nameById.get(a.patient_id) || 'Patient',
    serviceLabel: a.service_label,
    startsAt: a.starts_at,
    endsAt: a.ends_at,
    status: a.status,
  }))
})

/**
 * Cancels through Planora (using the cancelToken captured at booking
 * time) and marks the local mirror row cancelled. If the row predates
 * the cancelToken field, or Planora's cancel call fails, we still mark
 * it cancelled locally rather than leaving the patient stuck — but this
 * is surfaced back to the caller so the UI can be honest about it.
 */
export const cancelAppointmentAction = createServerFn({ method: 'POST' })
  .validator((data: { appointmentId: string }) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false as const, error: 'not_authenticated' }

    const { data: appointment } = await supabase
      .from('appointments')
      .select('id, patient_id, planora_booking_token')
      .eq('id', data.appointmentId)
      .maybeSingle()
    if (!appointment || appointment.patient_id !== user.id) {
      return { success: false as const, error: 'not_found' }
    }

    let cancelledInPlanora = false
    if (appointment.planora_booking_token) {
      try {
        const res = await fetch(`${PLANORA_API_BASE}/public/booking/${appointment.planora_booking_token}/cancel`, {
          method: 'POST',
        })
        cancelledInPlanora = res.ok
      } catch {
        cancelledInPlanora = false
      }
    }

    const { error } = await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', data.appointmentId)
    if (error) return { success: false as const, error: 'update_failed' }

    return { success: true as const, cancelledInPlanora }
  })

export interface AppointmentDetail {
  id: string
  viewerRole: 'patient' | 'doctor'
  doctorId: string
  doctorName: string
  doctorSpecialtyKey: string | null
  patientName: string
  /** Only populated for the doctor viewer — `null` if the profile row wasn't readable or the field is empty. */
  patientEmail: string | null
  patientPhone: string | null
  serviceLabel: string | null
  startsAt: string
  endsAt: string
  status: string
  /** Mirrors AppointmentCard.canCancel's rule — used to gate the reschedule affordance too. */
  canReschedule: boolean
}

/**
 * Combined detail for the click-to-expand appointment card (2026-08-26).
 * Works for either side of the appointment — the caller must be the
 * patient or the doctor on the row, same authorization rule as
 * cancelAppointmentAction. Patient contact info is only ever included
 * when the *doctor* is looking (a patient never needs their own contact
 * info echoed back), and is fetched best-effort: if the `profiles` row
 * isn't readable for another user, the fields simply come back null
 * rather than failing the whole action.
 */
export const getAppointmentDetailAction = createServerFn({ method: 'GET' })
  .validator((data: { appointmentId: string }) => data)
  .handler(async ({ data }): Promise<{ success: true; detail: AppointmentDetail } | { success: false; error: string }> => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false as const, error: 'not_authenticated' }

    const { data: appointment } = await supabase
      .from('appointments')
      .select('id, patient_id, doctor_id, service_label, starts_at, ends_at, status')
      .eq('id', data.appointmentId)
      .maybeSingle()
    if (!appointment) return { success: false as const, error: 'not_found' }

    const viewerRole: 'patient' | 'doctor' | null =
      appointment.patient_id === user.id ? 'patient' : appointment.doctor_id === user.id ? 'doctor' : null
    if (!viewerRole) return { success: false as const, error: 'not_found' }

    const { data: doctorProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', appointment.doctor_id)
      .maybeSingle()
    const { data: doctorSpecialty } = await supabase
      .from('doctor_profiles')
      .select('specialty_key')
      .eq('id', appointment.doctor_id)
      .maybeSingle()
    const { data: patientProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name, phone')
      .eq('id', appointment.patient_id)
      .maybeSingle()

    let patientEmail: string | null = null
    let patientPhone: string | null = null
    if (viewerRole === 'doctor') {
      patientPhone = patientProfile?.phone || null
      // profiles doesn't mirror auth email for other users' rows in every
      // deployment — only the signed-in user's own session exposes it via
      // auth.getUser(). We don't have a verified way to read another
      // user's email under the current (anon-key, RLS-scoped) client, so
      // this is left null rather than guessing at a table/column that may
      // not be readable; the doctor still gets phone + full name.
    }

    return {
      success: true as const,
      detail: {
        id: appointment.id,
        viewerRole,
        doctorId: appointment.doctor_id,
        doctorName: doctorProfile ? `${doctorProfile.first_name} ${doctorProfile.last_name}`.trim() : 'Médecin',
        doctorSpecialtyKey: doctorSpecialty?.specialty_key || null,
        patientName: patientProfile ? `${patientProfile.first_name} ${patientProfile.last_name}`.trim() : 'Patient',
        patientEmail,
        patientPhone,
        serviceLabel: appointment.service_label,
        startsAt: appointment.starts_at,
        endsAt: appointment.ends_at,
        status: appointment.status,
        canReschedule: appointment.status !== 'cancelled' && new Date(appointment.starts_at).getTime() > Date.now(),
      },
    }
  })

/**
 * Moves an existing appointment to a new slot — for either side: the
 * patient (couldn't make it after all) or the doctor ("empêchement",
 * per the request that prompted this feature). Re-validates the new
 * slot through Planora's own /reschedule endpoint (added 2026-08-26 in
 * publicRoutes.js, mirroring /cancel's cancelToken-based auth) rather
 * than trusting the client — same pattern as bookAppointmentAction.
 */
export const rescheduleAppointmentAction = createServerFn({ method: 'POST' })
  .validator((data: { appointmentId: string; date: string; time: string; durationMin: number }) => data)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false as const, error: 'not_authenticated' }

    const { data: appointment } = await supabase
      .from('appointments')
      .select('id, patient_id, doctor_id, planora_booking_token, status')
      .eq('id', data.appointmentId)
      .maybeSingle()
    if (!appointment || (appointment.patient_id !== user.id && appointment.doctor_id !== user.id)) {
      return { success: false as const, error: 'not_found' }
    }
    if (appointment.status === 'cancelled') return { success: false as const, error: 'cancelled' }
    if (!appointment.planora_booking_token) return { success: false as const, error: 'not_reschedulable' }

    let planoraResult: { ok?: boolean; status?: string; date?: string; time?: string; message?: string }
    try {
      const res = await fetch(`${PLANORA_API_BASE}/public/booking/${appointment.planora_booking_token}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: data.date, time: data.time }),
      })
      planoraResult = await res.json()
      if (!res.ok || !planoraResult.ok) {
        return { success: false as const, error: planoraResult.message || 'reschedule_failed' }
      }
    } catch {
      return { success: false as const, error: 'network_error' }
    }

    const startsAt = DateTime.fromFormat(`${data.date} ${data.time}`, 'yyyy-LL-dd HH:mm', { zone: 'Europe/Paris' })
    const endsAt = startsAt.plus({ minutes: data.durationMin })
    const { error } = await supabase
      .from('appointments')
      .update({ starts_at: startsAt.toUTC().toISO(), ends_at: endsAt.toUTC().toISO() })
      .eq('id', data.appointmentId)
    if (error) return { success: false as const, error: 'mirror_update_failed' }

    return { success: true as const, startsAt: startsAt.toUTC().toISO(), endsAt: endsAt.toUTC().toISO() }
  })

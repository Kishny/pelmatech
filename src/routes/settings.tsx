import * as React from 'react'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  HeartPulse,
  Laptop,
  Lock,
  ShieldCheck,
  Trash2,
  User,
} from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/i18n/LanguageContext'
import {
  getAuthedUserAction,
  getPatientMedicalProfileAction,
  updateProfileAction,
  updatePatientMedicalProfileAction,
} from '@/lib/auth/actions'

/**
 * 2026-08-20: the "Profil" row is now real (name/phone, backed by
 * Supabase) — replacing the static demo version. The other rows
 * (Notifications, Confidentialité, Appareils connectés, Sécurité,
 * Supprimer le compte) stay the honest "Coming soon" placeholders from
 * the 2026-08-14 audit fix; none of that is built yet.
 *
 * Also 2026-08-20: added a patient-only "Informations médicales &
 * assurance" section (sécurité sociale, carte Vitale, mutuelle) per the
 * site owner's request. Lives on patient_profiles, which already has
 * owner-only RLS from Phase 1 — doctors never see this through the app.
 */
export const Route = createFileRoute('/settings')({
  beforeLoad: async () => {
    const user = await getAuthedUserAction()
    if (!user) throw redirect({ to: '/login' })
    return { authedUser: user }
  },
  loader: async ({ context }) => {
    // Only patients have a patient_profiles row to fetch — for a doctor
    // this resolves to null and the section simply isn't rendered below.
    const patientMedicalProfile =
      context.authedUser.role === 'patient' ? await getPatientMedicalProfileAction() : null
    return { patientMedicalProfile }
  },
  component: Settings,
})

// Icons/danger-flag stay presentation metadata local to this route, zipped
// by index with the *remaining* (non-profile) translated sections below.
const OTHER_SECTION_ICONS = [Bell, Lock, Laptop, ShieldCheck, Trash2]

function Settings() {
  const t = useTranslation()
  const page = t.pages.settings
  const router = useRouter()
  const { authedUser } = Route.useRouteContext()
  const { patientMedicalProfile } = Route.useLoaderData()

  const [firstName, setFirstName] = React.useState(authedUser.firstName)
  const [lastName, setLastName] = React.useState(authedUser.lastName)
  const [phone, setPhone] = React.useState(authedUser.phone || '')
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [dateOfBirth, setDateOfBirth] = React.useState(patientMedicalProfile?.dateOfBirth || '')
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState(patientMedicalProfile?.socialSecurityNumber || '')
  const [vitalCardNumber, setVitalCardNumber] = React.useState(patientMedicalProfile?.vitalCardNumber || '')
  const [insuranceProvider, setInsuranceProvider] = React.useState(patientMedicalProfile?.insuranceProvider || '')
  const [insuranceMemberNumber, setInsuranceMemberNumber] = React.useState(patientMedicalProfile?.insuranceMemberNumber || '')
  const [medicalSaving, setMedicalSaving] = React.useState(false)
  const [medicalSaved, setMedicalSaved] = React.useState(false)
  const [medicalError, setMedicalError] = React.useState<string | null>(null)

  const profileSection = page.sections[0]
  const otherSections = page.sections.slice(1)
  const dashboardHref = authedUser.role === 'doctor' ? '/doctor-dashboard' : '/dashboard'

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      const result = await updateProfileAction({ data: { firstName, lastName, phone } })
      if (!result.success) {
        setError(result.error || page.saveError)
        return
      }
      setSaved(true)
      await router.invalidate()
    } catch {
      setError(page.saveError)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveMedical(e: React.FormEvent) {
    e.preventDefault()
    setMedicalSaving(true)
    setMedicalSaved(false)
    setMedicalError(null)
    try {
      const result = await updatePatientMedicalProfileAction({
        data: { dateOfBirth, socialSecurityNumber, vitalCardNumber, insuranceProvider, insuranceMemberNumber },
      })
      if (!result.success) {
        setMedicalError(result.error || page.saveError)
        return
      }
      setMedicalSaved(true)
      await router.invalidate()
    } catch {
      setMedicalError(page.saveError)
    } finally {
      setMedicalSaving(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <Link
          to={dashboardHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {page.backToDashboard}
        </Link>

        <AnimatedHeading as="h1" className="mt-4 text-4xl md:text-5xl font-medium leading-[1.05]">
          {page.heading}
        </AnimatedHeading>

        <form onSubmit={handleSave} className="mt-16 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-accent" />
            <div>
              <div className="text-base font-medium">{profileSection.title}</div>
              <div className="text-sm text-muted-foreground">{profileSection.body}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="settings-firstName">{page.fields.firstName}</Label>
              <Input id="settings-firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="settings-lastName">{page.fields.lastName}</Label>
              <Input id="settings-lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:w-1/2 sm:pr-2">
            <Label htmlFor="settings-phone">{page.fields.phone}</Label>
            <Input id="settings-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? '…' : page.save}
            </Button>
            {saved && <span className="text-sm text-muted-foreground">✓ {page.saved}</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </form>

        {authedUser.role === 'patient' && (
          <form onSubmit={handleSaveMedical} className="mt-8 rounded-2xl border border-border p-6">
            <div className="flex items-center gap-4">
              <HeartPulse className="h-5 w-5 text-accent" />
              <div>
                <div className="text-base font-medium">{page.medicalSectionTitle}</div>
                <div className="text-sm text-muted-foreground">{page.medicalSectionBody}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="settings-dateOfBirth">{page.medicalFields.dateOfBirth}</Label>
                <Input
                  id="settings-dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="settings-ssn">{page.medicalFields.socialSecurityNumber}</Label>
                <Input
                  id="settings-ssn"
                  value={socialSecurityNumber}
                  onChange={(e) => setSocialSecurityNumber(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="settings-vitalCard">{page.medicalFields.vitalCardNumber}</Label>
                <Input
                  id="settings-vitalCard"
                  value={vitalCardNumber}
                  onChange={(e) => setVitalCardNumber(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="settings-insuranceProvider">{page.medicalFields.insuranceProvider}</Label>
                <Input
                  id="settings-insuranceProvider"
                  value={insuranceProvider}
                  onChange={(e) => setInsuranceProvider(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="settings-insuranceMemberNumber">{page.medicalFields.insuranceMemberNumber}</Label>
                <Input
                  id="settings-insuranceMemberNumber"
                  value={insuranceMemberNumber}
                  onChange={(e) => setInsuranceMemberNumber(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button type="submit" disabled={medicalSaving}>
                {medicalSaving ? '…' : page.save}
              </Button>
              {medicalSaved && <span className="text-sm text-muted-foreground">✓ {page.saved}</span>}
              {medicalError && <span className="text-sm text-red-600">{medicalError}</span>}
            </div>
          </form>
        )}

        <div className="mt-8 flex flex-col divide-y divide-border border-t border-b border-border">
          {otherSections.map((section, i) => {
            const Icon = OTHER_SECTION_ICONS[i]
            const danger = i === otherSections.length - 1
            return (
              <button
                key={section.title}
                type="button"
                aria-disabled="true"
                className="flex w-full cursor-default items-center justify-between gap-4 py-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <Icon className={danger ? 'h-5 w-5 text-red-500' : 'h-5 w-5 text-accent'} />
                  <div>
                    <div className={danger ? 'text-base font-medium text-red-600' : 'text-base font-medium'}>
                      {section.title}
                    </div>
                    <div className="text-sm text-muted-foreground">{section.body}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {page.comingSoon}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </div>
              </button>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

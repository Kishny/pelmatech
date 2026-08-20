import * as React from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Check } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/i18n/LanguageContext'
import { signUpAction, type UserRole } from '@/lib/auth/actions'

export const Route = createFileRoute('/signup')({ component: Signup })

type StepKey = 'role' | 'personal' | 'planora' | 'password'

/**
 * Real account creation, replacing the earlier non-functional demo form
 * (2026-08-19 — patient/doctor accounts backend). Role is chosen first
 * since it changes both the rest of the form (doctors additionally link
 * their Planora practice) and the destination dashboard after signup.
 * Account creation itself happens via signUpAction (Supabase Auth); the
 * profiles/doctor_profiles/patient_profiles rows are created server-side
 * by a database trigger from the signup metadata — see lib/auth/actions.ts.
 */
function Signup() {
  const t = useTranslation()
  const navigate = useNavigate()
  const SPECIALTIES = t.doctorDiscovery.specialties
  // t.pages.signup.steps is a fixed 4-label array (role/personal/planora/
  // password), but the *patient* flow skips the 'planora' step — so its
  // position in `steps` no longer matches its position in the label
  // array. Map by step key instead of by array index to avoid showing
  // the wrong heading (bug found 2026-08-19: patients saw "Cabinet
  // Planora" as the heading on the password step).
  const STEP_LABEL_BY_KEY: Record<StepKey, string> = {
    role: t.pages.signup.steps[0],
    personal: t.pages.signup.steps[1],
    planora: t.pages.signup.steps[2],
    password: t.pages.signup.steps[3],
  }

  const [role, setRole] = React.useState<UserRole | null>(null)
  const [stepIndex, setStepIndex] = React.useState(0)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [specialtyKey, setSpecialtyKey] = React.useState('')
  const [planoraBookingSlug, setPlanoraBookingSlug] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [confirmEmail, setConfirmEmail] = React.useState(false)

  const steps: Array<StepKey> = role === 'doctor' ? ['role', 'personal', 'planora', 'password'] : ['role', 'personal', 'password']
  const currentStep = steps[stepIndex]

  function canAdvance() {
    if (currentStep === 'role') return role !== null
    if (currentStep === 'personal') return firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== ''
    return true
  }

  async function handleSubmit() {
    if (!role) return
    setError(null)
    setSubmitting(true)
    try {
      const result = await signUpAction({
        data: {
          role,
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          password,
          ...(role === 'doctor' ? { specialtyKey: specialtyKey || undefined, planoraBookingSlug: planoraBookingSlug || undefined } : {}),
        },
      })
      if (!result.success) {
        setError(result.error || t.pages.signup.errorFallback)
        return
      }
      if (result.needsEmailConfirmation) {
        setConfirmEmail(true)
      } else {
        navigate({ to: role === 'doctor' ? '/doctor-dashboard' : '/dashboard' })
      }
    } catch {
      setError(t.pages.signup.errorFallback)
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmEmail) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Header variant="internal" />
        <main className="flex min-h-screen items-center justify-center px-8 pt-24 pb-16 md:px-12 text-center">
          <div className="w-full max-w-sm">
            <AnimatedHeading as="h1" className="text-2xl font-medium">
              {t.pages.signup.confirmEmailHeading}
            </AnimatedHeading>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.pages.signup.confirmEmailBody}</p>
            <Button asChild className="mt-8">
              <Link to="/login">{t.pages.signup.goToLogin}</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header variant="internal" />
      <main className="flex min-h-screen items-center justify-center px-8 pt-24 pb-16 md:px-12">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-2">
            {steps.map((key, i) => (
              <div key={key} className="flex flex-1 items-center gap-2">
                <div
                  className={
                    i <= stepIndex
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-white'
                      : 'flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-muted-foreground'
                  }
                >
                  {i < stepIndex ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={i < stepIndex ? 'h-px flex-1 bg-foreground' : 'h-px flex-1 bg-border'} />
                )}
              </div>
            ))}
          </div>

          <AnimatedHeading as="h1" className="text-2xl font-medium">
            {currentStep === 'role' ? t.pages.signup.roleHeading : STEP_LABEL_BY_KEY[currentStep]}
          </AnimatedHeading>

          <div className="mt-8 flex flex-col gap-6">
            {currentStep === 'role' && (
              <div className="flex flex-col gap-3">
                {(['patient', 'doctor'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={
                      role === r
                        ? 'rounded-xl border-2 border-foreground bg-muted p-4 text-left transition'
                        : 'rounded-xl border border-border p-4 text-left transition hover:bg-muted'
                    }
                  >
                    <div className="font-medium">{t.pages.signup.roles[r].label}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t.pages.signup.roles[r].body}</div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 'personal' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">{t.pages.signup.fields.firstName}</Label>
                    <Input id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">{t.pages.signup.fields.lastName}</Label>
                    <Input id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">{t.pages.signup.fields.email}</Label>
                  <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">{t.pages.signup.fields.phone}</Label>
                  <Input id="phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </>
            )}

            {currentStep === 'planora' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="specialtyKey">{t.pages.signup.fields.specialtyKey}</Label>
                  <select
                    id="specialtyKey"
                    name="specialtyKey"
                    value={specialtyKey}
                    onChange={(e) => setSpecialtyKey(e.target.value)}
                    className="border-border bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="">—</option>
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="planoraBookingSlug">{t.pages.signup.fields.planoraBookingSlug}</Label>
                  <Input
                    id="planoraBookingSlug"
                    name="planoraBookingSlug"
                    value={planoraBookingSlug}
                    onChange={(e) => setPlanoraBookingSlug(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.pages.signup.fields.planoraBookingSlugHelp}</p>
                </div>
              </>
            )}

            {currentStep === 'password' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">{t.pages.signup.fields.password}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
              disabled={stepIndex === 0}
            >
              {t.common.back}
            </Button>
            {currentStep === 'password' ? (
              <Button type="button" onClick={handleSubmit} disabled={submitting || password.length < 8}>
                {submitting ? t.pages.signup.loading : t.pages.signup.submit}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setStepIndex((s) => Math.min(steps.length - 1, s + 1))}
                disabled={!canAdvance()}
              >
                {t.common.continueLabel}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Check, UserPlus, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import './AuthCard.css'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { JoinUsIllustration, WelcomeBackIllustration } from '@/components/AuthIllustrations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logoDark from '@/assets/logo-dark.svg'
import { useTranslation } from '@/i18n/LanguageContext'
import { signInAction, signUpAction, type UserRole } from '@/lib/auth/actions'

type View = 'signin' | 'signup'
type StepKey = 'role' | 'personal' | 'planora' | 'password'

/**
 * Shared sign-in / sign-up card (2026-08-27), adapted from a reference
 * mockup the site owner supplied — a single card whose tab switch slides
 * three things at once: a tab-underline indicator, a colored hero panel
 * (heading + small illustration), and the form panel itself. See
 * AuthCard.css for the sliding mechanics and why they're structured this
 * way; see routes/login.tsx and routes/signup.tsx for how this mounts.
 *
 * Both auth flows keep their exact existing logic (login: email/password
 * via signInAction; signup: the 4-step role→personal→planora→password
 * wizard via signUpAction) — only the surrounding chrome changed. The tab
 * switch itself is local state, not a route navigation (matching the
 * reference, which has no routing at all) — so it can animate smoothly
 * without an unmount/remount. `initialView` just decides which tab shows
 * first when arriving via a direct /login or /signup link.
 */
export function AuthCard({ initialView }: { initialView: View }) {
  const t = useTranslation()
  const card = t.pages.authCard
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const [view, setView] = React.useState<View>(initialView)

  const cardRef = React.useRef<HTMLDivElement>(null)
  const signinPanelRef = React.useRef<HTMLDivElement>(null)
  const signupPanelRef = React.useRef<HTMLDivElement>(null)
  const [formHeight, setFormHeight] = React.useState<number | null>(null)

  // --- Sign in state (same fields/logic as the old routes/login.tsx) ---
  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')
  const [loginSubmitting, setLoginSubmitting] = React.useState(false)
  const [loginError, setLoginError] = React.useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError(null)
    setLoginSubmitting(true)
    try {
      const result = await signInAction({ data: { email: loginEmail, password: loginPassword } })
      if (!result.success) {
        setLoginError(result.error || t.pages.login.errorFallback)
        return
      }
      navigate({ to: result.role === 'doctor' ? '/doctor-dashboard' : '/dashboard' })
    } catch {
      setLoginError(t.pages.login.errorFallback)
    } finally {
      setLoginSubmitting(false)
    }
  }

  // --- Sign up state (same wizard/logic as the old routes/signup.tsx) ---
  const SPECIALTIES = t.doctorDiscovery.specialties
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
  const [signupEmail, setSignupEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [specialtyKey, setSpecialtyKey] = React.useState('')
  const [planoraBookingSlug, setPlanoraBookingSlug] = React.useState('')
  const [signupPassword, setSignupPassword] = React.useState('')
  const [signupSubmitting, setSignupSubmitting] = React.useState(false)
  const [signupError, setSignupError] = React.useState<string | null>(null)
  const [confirmEmail, setConfirmEmail] = React.useState(false)

  const steps: Array<StepKey> = role === 'doctor' ? ['role', 'personal', 'planora', 'password'] : ['role', 'personal', 'password']
  const currentStep = steps[stepIndex]

  function canAdvance() {
    if (currentStep === 'role') return role !== null
    if (currentStep === 'personal') return firstName.trim() !== '' && lastName.trim() !== '' && signupEmail.trim() !== ''
    return true
  }

  async function handleSignup() {
    if (!role) return
    setSignupError(null)
    setSignupSubmitting(true)
    try {
      const result = await signUpAction({
        data: {
          role,
          firstName,
          lastName,
          email: signupEmail,
          phone: phone || undefined,
          password: signupPassword,
          ...(role === 'doctor' ? { specialtyKey: specialtyKey || undefined, planoraBookingSlug: planoraBookingSlug || undefined } : {}),
        },
      })
      if (!result.success) {
        setSignupError(result.error || t.pages.signup.errorFallback)
        return
      }
      if (result.needsEmailConfirmation) {
        setConfirmEmail(true)
      } else {
        navigate({ to: role === 'doctor' ? '/doctor-dashboard' : '/dashboard' })
      }
    } catch {
      setSignupError(t.pages.signup.errorFallback)
    } finally {
      setSignupSubmitting(false)
    }
  }

  function goToSignIn() {
    // Reset the wizard so a later visit to /signup starts clean, rather
    // than resuming mid-wizard or stuck on the "check your inbox" screen.
    setConfirmEmail(false)
    setRole(null)
    setStepIndex(0)
    setView('signin')
  }

  // --- Sliding mechanics: measure the active panel's height so the form
  // container can animate to it (the reference had a fixed-height form —
  // ours can't, since the signup side is a variable-length wizard). ---
  const recomputeHeight = React.useCallback(() => {
    const el = view === 'signin' ? signinPanelRef.current : signupPanelRef.current
    if (el) setFormHeight(el.scrollHeight)
  }, [view])

  React.useLayoutEffect(() => {
    recomputeHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recomputeHeight, currentStep, role, loginError, signupError, confirmEmail])

  React.useEffect(() => {
    const el = view === 'signin' ? signinPanelRef.current : signupPanelRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => recomputeHeight())
    ro.observe(el)
    return () => ro.disconnect()
  }, [view, recomputeHeight])

  // Same "disable transitions while the window is actively resizing"
  // trick as the reference (main.js's `resizing` class + debounce timer)
  // — otherwise a viewport reflow animates the slide as if it were a tab
  // switch.
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    function onResize() {
      cardRef.current?.classList.add('resizing')
      clearTimeout(timer)
      timer = setTimeout(() => cardRef.current?.classList.remove('resizing'), 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(timer)
    }
  }, [])

  const cssVars = {
    '--pm-ac-forms': view === 'signin' ? '0%' : '-100%',
    '--pm-ac-hero': view === 'signin' ? '0%' : '-100%',
    '--pm-ac-form-h': formHeight != null ? `${formHeight}px` : undefined,
  } as React.CSSProperties

  const indicatorTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div ref={cardRef} className="pm-ac" style={cssVars}>
      <ul className="pm-ac-nav">
        <li>
          <img src={logoDark} alt="Pelmatech" className="h-6 w-auto" />
        </li>
        <li>
          <button type="button" className={view === 'signin' ? 'active' : ''} onClick={() => setView('signin')}>
            <UserRound className="h-4 w-4" />
            <span>{card.signInTab}</span>
            {view === 'signin' && (
              <motion.span layoutId="authcard-tab-indicator" className="pm-ac-tab-indicator" transition={indicatorTransition} />
            )}
          </button>
        </li>
        <li>
          <button type="button" className={view === 'signup' ? 'active' : ''} onClick={() => setView('signup')}>
            <UserPlus className="h-4 w-4" />
            <span>{card.signUpTab}</span>
            {view === 'signup' && (
              <motion.span layoutId="authcard-tab-indicator" className="pm-ac-tab-indicator" transition={indicatorTransition} />
            )}
          </button>
        </li>
      </ul>

      <div className="pm-ac-body">
        <div className="pm-ac-hero">
          <div className="pm-ac-hero-inner">
            <div className="pm-ac-hero-content">
              <WelcomeBackIllustration className="pm-ac-hero-art" />
              <div>
                <h2>{card.welcomeHeading}</h2>
                <p>{card.welcomeBody}</p>
              </div>
            </div>
            <div className="pm-ac-hero-content">
              <JoinUsIllustration className="pm-ac-hero-art" />
              <div>
                <h2>{card.joinHeading}</h2>
                <p>{card.joinBody}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pm-ac-form">
        <div className="pm-ac-forms">
          <div ref={signinPanelRef} className="pm-ac-panel">
            <p className="mb-5 text-sm text-muted-foreground">
              {card.newHereText}{' '}
              <button type="button" onClick={() => setView('signup')} className="font-medium text-accent hover:underline">
                {card.newHereCta}
              </button>
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="ac-login-email">{t.pages.login.fields.email}</Label>
                <Input
                  id="ac-login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="ac-login-password">{t.pages.login.fields.password}</Label>
                <Input
                  id="ac-login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              {loginError && <p className="text-sm text-red-600">{loginError}</p>}

              <Button type="submit" className="mt-1" disabled={loginSubmitting}>
                {loginSubmitting ? t.pages.login.loading : t.pages.login.cta}
              </Button>

              <button type="button" className="self-center text-sm text-muted-foreground transition hover:text-foreground">
                {t.common.forgotPassword}
              </button>
            </form>
          </div>

          <div ref={signupPanelRef} className="pm-ac-panel">
            {confirmEmail ? (
              <div className="text-center">
                <AnimatedHeading as="h2" className="text-xl font-medium">
                  {t.pages.signup.confirmEmailHeading}
                </AnimatedHeading>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.pages.signup.confirmEmailBody}</p>
                <Button type="button" className="mt-6" onClick={goToSignIn}>
                  {t.pages.signup.goToLogin}
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-5 text-sm text-muted-foreground">
                  {card.alreadyHaveAccountText}{' '}
                  <button type="button" onClick={() => setView('signin')} className="font-medium text-accent hover:underline">
                    {card.alreadyHaveAccountCta}
                  </button>
                </p>

                <div className="mb-6 flex items-center gap-2">
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
                      {i < steps.length - 1 && <div className={i < stepIndex ? 'h-px flex-1 bg-foreground' : 'h-px flex-1 bg-border'} />}
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-medium">{currentStep === 'role' ? t.pages.signup.roleHeading : STEP_LABEL_BY_KEY[currentStep]}</h3>

                <div className="mt-5 flex flex-col gap-5">
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
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="ac-firstName">{t.pages.signup.fields.firstName}</Label>
                          <Input id="ac-firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="ac-lastName">{t.pages.signup.fields.lastName}</Label>
                          <Input id="ac-lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="ac-signup-email">{t.pages.signup.fields.email}</Label>
                        <Input
                          id="ac-signup-email"
                          name="email"
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="ac-phone">{t.pages.signup.fields.phone}</Label>
                        <Input id="ac-phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </>
                  )}

                  {currentStep === 'planora' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="ac-specialtyKey">{t.pages.signup.fields.specialtyKey}</Label>
                        <select
                          id="ac-specialtyKey"
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
                        <Label htmlFor="ac-planoraBookingSlug">{t.pages.signup.fields.planoraBookingSlug}</Label>
                        <Input
                          id="ac-planoraBookingSlug"
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
                      <Label htmlFor="ac-signup-password">{t.pages.signup.fields.password}</Label>
                      <Input
                        id="ac-signup-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>

                {signupError && <p className="mt-4 text-sm text-red-600">{signupError}</p>}

                <div className="mt-6 flex items-center justify-between">
                  <Button type="button" variant="ghost" onClick={() => setStepIndex((s) => Math.max(0, s - 1))} disabled={stepIndex === 0}>
                    {t.common.back}
                  </Button>
                  {currentStep === 'password' ? (
                    <Button type="button" onClick={handleSignup} disabled={signupSubmitting || signupPassword.length < 8}>
                      {signupSubmitting ? t.pages.signup.loading : t.pages.signup.submit}
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => setStepIndex((s) => Math.min(steps.length - 1, s + 1))} disabled={!canAdvance()}>
                      {t.common.continueLabel}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

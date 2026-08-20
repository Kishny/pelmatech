import * as React from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/i18n/LanguageContext'
import { signInAction } from '@/lib/auth/actions'

export const Route = createFileRoute('/login')({ component: Login })

function Login() {
  const t = useTranslation()
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const result = await signInAction({ data: { email, password } })
      if (!result.success) {
        setError(result.error || t.pages.login.errorFallback)
        return
      }
      navigate({ to: result.role === 'doctor' ? '/doctor-dashboard' : '/dashboard' })
    } catch {
      setError(t.pages.login.errorFallback)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header variant="internal" />
      <main className="flex min-h-screen items-center justify-center px-8 pt-24 pb-16 md:px-12">
        <div className="w-full max-w-sm">
          <AnimatedHeading as="h1" className="text-3xl font-medium">
            {t.pages.login.heading}
          </AnimatedHeading>

          <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t.pages.login.fields.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t.pages.login.fields.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="mt-2" disabled={submitting}>
              {submitting ? t.pages.login.loading : t.pages.login.cta}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <button type="button" className="hover:text-foreground transition">
              {t.common.forgotPassword}
            </button>
            <Link to="/signup" className="hover:text-foreground transition">
              {t.common.createAccount}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

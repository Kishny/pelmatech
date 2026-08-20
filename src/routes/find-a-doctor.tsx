import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'
import { getAuthedUserAction } from '@/lib/auth/actions'
import { listBookableDoctorsAction } from '@/lib/planora/actions'

/**
 * Real doctor listing for booking (2026-08-20) — distinct from the public
 * marketing /doctors page (fictional showcase roster, not backed by real
 * accounts). Only signed-up doctors who've configured a Planora booking
 * slug show up here, since that's what makes them actually bookable. See
 * lib/planora/actions.ts (listBookableDoctorsAction) and the "Oui go stp"
 * plan this implements.
 */
export const Route = createFileRoute('/find-a-doctor')({
  beforeLoad: async () => {
    const user = await getAuthedUserAction()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'patient') throw redirect({ to: '/doctor-dashboard' })
    return { authedUser: user }
  },
  loader: async () => {
    const doctors = await listBookableDoctorsAction()
    return { doctors }
  },
  component: FindADoctor,
})

function FindADoctor() {
  const t = useTranslation()
  const { doctors } = Route.useLoaderData()
  const page = t.pages.findADoctor

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {page.heading[0]}
          <br />
          {page.heading[1]}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {page.description}
        </AnimatedText>

        {doctors.length === 0 ? (
          <p className="mt-16 text-sm text-muted-foreground">{page.empty}</p>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="rounded-2xl border border-border bg-background p-6">
                <div className="text-base font-medium text-foreground">{doctor.name}</div>
                <div className="text-sm text-muted-foreground">{doctor.specialtyKey}</div>
                {doctor.bio && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{doctor.bio}</p>}
                <Link
                  to="/book/$doctorId"
                  params={{ doctorId: doctor.id }}
                  className="group mt-4 flex items-center gap-1 text-sm font-medium text-foreground transition hover:opacity-70"
                >
                  {page.bookCta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

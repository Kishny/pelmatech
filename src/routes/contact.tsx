import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, MapPin, Phone, Share2 } from 'lucide-react'

import heroPhoto from '@/assets/hero.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { GlowBackdrop } from '@/components/GlowBackdrop'
import { Header } from '@/components/Header'
import { MaskedImage } from '@/components/MaskedImage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/**
 * 2026-08-22: rebuilt to match a resort-site "Contact Us" mockup the site
 * owner supplied — full-bleed photo hero with overlaid heading/info panel
 * on the left and a floating form card on the right, plus a map section
 * below. Per their answers: Pelmatech has no real address/phone/social
 * accounts on file, so "Location" and "Social media" stay honest
 * "Bientôt disponible" placeholders (same convention as the doctor
 * dashboard's unbuilt-feature cards), email/phone get clearly-provisional
 * values instead of invented real contact details, and the map section is
 * a "coming soon" panel rather than a fake address on a fake map.
 *
 * The form itself stays exactly as functional (or not) as it was before
 * this pass — onSubmit is still a no-op placeholder, no backend contact
 * action exists yet. This is a visual/structural rebuild, not a new
 * feature.
 */
export const Route = createFileRoute('/contact')({ component: Contact })

const SOCIAL_LABELS = ['Instagram', 'LinkedIn', 'Facebook', 'TikTok']

function Contact() {
  const t = useTranslation()
  const page = t.pages.contact
  const fields = page.fields
  const [inquiryType, setInquiryType] = React.useState(page.inquiryOptions[1] ?? page.inquiryOptions[0])

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <div className="relative min-h-[640px] overflow-hidden rounded-2xl border border-border">
          <MaskedImage src={heroPhoto} alt={page.heroImageAlt} className="absolute inset-0 h-full w-full" imgClassName="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" aria-hidden="true" />

          <div className="relative z-10 grid grid-cols-1 gap-10 p-8 md:grid-cols-2 md:p-14 lg:p-16">
            <div className="flex flex-col justify-between text-white">
              <div>
                <AnimatedHeading as="h1" className="max-w-md text-4xl md:text-5xl font-medium leading-[1.05]">
                  {page.heading[0]}
                  <br />
                  {page.heading[1]}
                </AnimatedHeading>
                <AnimatedText className="mt-6 max-w-sm text-base text-white/80 leading-relaxed">
                  {page.description}
                </AnimatedText>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 text-sm">
                <InfoBlock icon={MapPin} label={page.locationLabel}>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{page.locationComingSoon}</span>
                </InfoBlock>
                <InfoBlock icon={Share2} label={page.socialLabel}>
                  <ul className="space-y-1 text-white/50">
                    {SOCIAL_LABELS.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <span className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {page.socialComingSoon}
                  </span>
                </InfoBlock>
                <InfoBlock icon={Mail} label={page.emailLabel}>
                  <span className="text-white/80">{page.emailValue}</span>
                </InfoBlock>
                <InfoBlock icon={Phone} label={page.phoneLabel}>
                  <span className="text-white/80">{page.phoneValue}</span>
                </InfoBlock>
              </div>
            </div>

            <div className="rounded-2xl bg-background p-6 shadow-xl md:p-8">
              <h2 className="text-xl font-medium text-foreground">{page.formTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{page.formSubtitle}</p>

              <form className="mt-6 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">{fields.firstName}</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">{fields.lastName}</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="country">{fields.country}</Label>
                    <Input id="country" name="country" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">{fields.phone}</Label>
                    <Input id="phone" name="phone" type="tel" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">{fields.email}</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>{page.inquiryLabel}</Label>
                  <div className="flex flex-wrap gap-2">
                    {page.inquiryOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setInquiryType(option)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm transition',
                          inquiryType === option
                            ? 'border-foreground bg-foreground text-white'
                            : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">{fields.message}</Label>
                  <Textarea id="message" name="message" required />
                </div>

                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 rounded border-border text-accent focus-visible:ring-2 focus-visible:ring-accent" />
                  {page.consentLabel}
                </label>

                <Button type="submit" className="mt-2">
                  {t.common.sendMessage}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-border bg-muted/40 p-10">
          <GlowBackdrop variant="bottom-left" />
          <div className="relative z-10 flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent">
              <MapPin className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-medium text-foreground">{page.mapTitle}</h2>
            <span className="rounded-full bg-muted px-4 py-1.5 text-xs text-muted-foreground">{page.mapComingSoon}</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function InfoBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-white/60">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-[0.15em]">{label}</span>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'

import { AppPreviewSection } from '@/components/AppPreviewSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { FAQ } from '@/components/FAQ'
import { FeaturesSection } from '@/components/FeaturesSection'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HealthTrackingSection } from '@/components/HealthTrackingSection'
import { Hero } from '@/components/Hero'
import { NewsletterSection } from '@/components/NewsletterSection'
import { PersonalPlanSection } from '@/components/PersonalPlanSection'
import { PlatformSection } from '@/components/PlatformSection'
import { SecuritySection } from '@/components/SecuritySection'
import { TeamSection } from '@/components/TeamSection'
import { TelehealthSection } from '@/components/TelehealthSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'

export const Route = createFileRoute('/')({ component: Home })

/**
 * Homepage — exact section order per the "ROOT DOM HIERARCHY" clause:
 * Header, Hero, TeamSection, BenefitsSection (protected), then
 * FeaturesSection, PlatformSection, HealthTrackingSection,
 * TelehealthSection, PersonalPlanSection, TestimonialsSection,
 * SecuritySection, AppPreviewSection, FAQ, NewsletterSection, Footer.
 */
function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header variant="hero" />

      <main>
        <Hero />
        <TeamSection />
        <BenefitsSection />

        <FeaturesSection />
        <PlatformSection />
        <HealthTrackingSection />
        <TelehealthSection />
        <PersonalPlanSection />
        <TestimonialsSection />
        <SecuritySection />
        <AppPreviewSection />
        <FAQ />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  )
}

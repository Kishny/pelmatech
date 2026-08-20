import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/notifications')({ component: NotificationsPage })

// 2026-08-14: previously-unclickable "Notifications" card on /platform —
// same simple heading/description/body pattern as careers.tsx, join.tsx,
// and the new health-records.tsx sibling.
function NotificationsPage() {
  const t = useTranslation()

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.notifications.heading}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.notifications.description}
        </AnimatedText>
        <AnimatedText delay={0.1} className="mt-8 max-w-xl text-base leading-relaxed">
          {t.pages.notifications.body}
        </AnimatedText>
      </main>
      <Footer />
    </div>
  )
}

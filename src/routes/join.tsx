import { Link, createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/join')({ component: JoinPage })

function JoinPage() {
  const t = useTranslation()

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.join.heading}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.join.description}
        </AnimatedText>
        <AnimatedText delay={0.1} className="mt-8 max-w-xl text-base leading-relaxed">
          {t.pages.join.body}
        </AnimatedText>
        <Button asChild className="mt-10">
          <Link to="/contact">{t.pages.join.cta}</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}

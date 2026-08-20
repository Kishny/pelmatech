import { Link, createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/help')({ component: HelpPage })

function HelpPage() {
  const t = useTranslation()

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <AnimatedHeading as="h1" className="max-w-2xl text-5xl md:text-6xl font-medium leading-[1.05]">
          {t.pages.help.heading}
        </AnimatedHeading>
        <AnimatedText className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {t.pages.help.description}
        </AnimatedText>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <Link to="/faq">{t.pages.help.faqCta}</Link>
          </Button>
          <Button asChild>
            <Link to="/contact">{t.pages.help.contactCta}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

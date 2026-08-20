import { createFileRoute } from '@tanstack/react-router'

import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from '@/i18n/LanguageContext'

export const Route = createFileRoute('/contact')({ component: Contact })

function Contact() {
  const t = useTranslation()
  const fields = t.pages.contact.fields

  return (
    <div className="bg-background text-foreground">
      <Header variant="internal" />
      <main className="pt-40 pb-32 px-8 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <AnimatedHeading as="h1" className="max-w-md text-5xl md:text-6xl font-medium leading-[1.05]">
              {t.pages.contact.heading}
            </AnimatedHeading>
            <AnimatedText className="mt-6 max-w-sm text-base text-muted-foreground leading-relaxed">
              {t.pages.contact.description}
            </AnimatedText>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{fields.name}</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{fields.email}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">{fields.phone}</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reason">{fields.reason}</Label>
              <Input id="reason" name="reason" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">{fields.message}</Label>
              <Textarea id="message" name="message" required />
            </div>
            <Button type="submit" className="mt-2 self-start">
              {t.common.sendMessage}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

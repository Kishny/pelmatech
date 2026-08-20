import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { useTranslation } from '@/i18n/LanguageContext'

export interface PricingCardProps {
  name: string
  price: string
  description: string
  features: ReadonlyArray<string>
  featured?: boolean
}

/**
 * No fabricated pricing/billing claims — price is a transparent
 * placeholder ("Contact / Coming Soon") unless real values are
 * supplied, per spec.
 */
export function PricingCard({ name, price, description, features, featured = false }: PricingCardProps) {
  const t = useTranslation()
  return (
    <div
      className={
        featured
          ? 'flex flex-col rounded-2xl bg-foreground p-8 text-white'
          : 'flex flex-col rounded-2xl border border-border bg-background p-8'
      }
    >
      <div className="text-sm uppercase tracking-[0.2em] opacity-70">{name}</div>
      <div className="mt-4 text-3xl font-medium">{price}</div>
      <p className={featured ? 'mt-3 text-sm text-white/70' : 'mt-3 text-sm text-muted-foreground'}>
        {description}
      </p>

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to="/signup"
        className={
          featured
            ? 'group mt-8 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground transition hover:bg-white/90 hover:scale-[1.02] active:scale-[0.97]'
            : 'group mt-8 flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.97]'
        }
      >
        {t.common.getStarted}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  )
}

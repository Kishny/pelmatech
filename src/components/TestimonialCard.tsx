export interface TestimonialCardProps {
  quote: string
  name: string
  meta: string
}

export function TestimonialCard({ quote, name, meta }: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-background p-8">
      <p className="text-lg leading-relaxed text-foreground">“{quote}”</p>
      <div>
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground">{meta}</div>
      </div>
    </div>
  )
}

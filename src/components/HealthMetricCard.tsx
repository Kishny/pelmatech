export interface HealthMetricCardProps {
  value: string
  label: string
  delay?: number
}

/** Token-derived metric tile — no rainbow health-app palette. */
export function HealthMetricCard({ value, label, delay = 0 }: HealthMetricCardProps) {
  return (
    <div
      className="rounded-2xl border border-border bg-background p-6"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-3xl font-medium text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export interface AppointmentCardProps {
  doctor: string
  specialty: string
  date: string
  time: string
  consultationType: string
  /** Translated, display-only status label (e.g. "Upcoming" / "À venir"). */
  status: string
  /**
   * Locale-independent status used purely for styling/filtering — never
   * shown to the user. Kept separate from `status` because the display
   * label is translated text and can't safely be compared/keyed against
   * across locales.
   */
  statusVariant: 'upcoming' | 'past' | 'cancelled'
  /**
   * 2026-08-20: optional cancel affordance added for the real /appointments
   * page. Both props are optional and default to inert, so existing
   * static-demo call sites (e.g. the patient dashboard's sampleAppointment)
   * keep working unchanged without passing them.
   */
  canCancel?: boolean
  cancelLabel?: string
  cancellingLabel?: string
  cancelling?: boolean
  onCancel?: () => void
  /**
   * 2026-08-26: optional click-to-detail affordance (AppointmentDetailModal).
   * Optional so existing call sites without it stay inert, same convention
   * as the cancel props above.
   */
  onClick?: () => void
}

const STATUS_STYLES: Record<AppointmentCardProps['statusVariant'], string> = {
  upcoming: 'bg-accent/10 text-accent',
  past: 'bg-muted text-muted-foreground',
  cancelled: 'bg-muted text-muted-foreground line-through',
}

export function AppointmentCard({
  doctor,
  specialty,
  date,
  time,
  consultationType,
  status,
  statusVariant,
  canCancel,
  cancelLabel,
  cancellingLabel,
  cancelling,
  onCancel,
  onClick,
}: AppointmentCardProps) {
  return (
    <div
      onClick={onClick}
      className={
        onClick
          ? 'flex cursor-pointer flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition hover:border-foreground/30 sm:flex-row sm:items-center sm:justify-between'
          : 'flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:items-center sm:justify-between'
      }
    >
      <div>
        <div className="text-base font-medium text-foreground">{doctor}</div>
        <div className="text-sm text-muted-foreground">{specialty}</div>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <span>{date}</span>
        <span>{time}</span>
        <span>{consultationType}</span>
        <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-wide ${STATUS_STYLES[statusVariant]}`}>
          {status}
        </span>
        {canCancel && onCancel && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onCancel()
            }}
            disabled={cancelling}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:border-red-300 hover:text-red-600 disabled:opacity-60"
          >
            {cancelling ? cancellingLabel : cancelLabel}
          </button>
        )}
      </div>
    </div>
  )
}

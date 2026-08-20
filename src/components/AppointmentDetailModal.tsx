import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLanguage, useTranslation } from '@/i18n/LanguageContext'
import {
  getAppointmentDetailAction,
  getDoctorAvailabilityAction,
  rescheduleAppointmentAction,
  type AppointmentDetail,
  type PlanoraAvailabilityDay,
} from '@/lib/planora/actions'

interface AppointmentDetailModalProps {
  /** The appointment to show, or `null` to keep the modal closed. */
  appointmentId: string | null
  onClose: () => void
  /** Called after a successful reschedule so the caller can refetch its list. */
  onUpdated?: () => void
}

/**
 * Click-to-expand appointment detail (2026-08-26) — added per the
 * request that the doctor "puisse cliquer sur la card du rdv [...] pour
 * consulter les détails du patient, pouvoir modifier la date et l'heure
 * [...] et pareils coté dashboard patient". Shared by dashboard.tsx,
 * appointments.tsx (patient) and doctor-dashboard.tsx (doctor) — which
 * side's info to show is derived server-side (AppointmentDetail.viewerRole)
 * from which id on the row matches the caller, not passed in as a prop.
 *
 * Reschedule reuses the same availability/slot-picker data source as the
 * original booking flow (getDoctorAvailabilityAction) and re-validates
 * server-side via rescheduleAppointmentAction → Planora's own
 * /booking/:token/reschedule endpoint, exactly like booking/cancelling.
 */
export function AppointmentDetailModal({ appointmentId, onClose, onUpdated }: AppointmentDetailModalProps) {
  const t = useTranslation()
  const { locale } = useLanguage()
  const copy = t.pages.appointmentDetail
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US'

  const [detail, setDetail] = React.useState<AppointmentDetail | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [loadError, setLoadError] = React.useState(false)

  const [rescheduling, setRescheduling] = React.useState(false)
  const [availability, setAvailability] = React.useState<
    { status: 'not_configured' | 'unreachable' } | { status: 'ok'; durationMin: number; days: Array<PlanoraAvailabilityDay> } | null
  >(null)
  const [selectedDay, setSelectedDay] = React.useState<PlanoraAvailabilityDay | null>(null)
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const open = !!appointmentId

  React.useEffect(() => {
    if (!appointmentId) {
      setDetail(null)
      setLoadError(false)
      setRescheduling(false)
      setAvailability(null)
      setSelectedDay(null)
      setSelectedSlot(null)
      setSubmitError(null)
      setSubmitSuccess(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setLoadError(false)
    getAppointmentDetailAction({ data: { appointmentId } })
      .then((res) => {
        if (cancelled) return
        if (res.success) setDetail(res.detail)
        else setLoadError(true)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [appointmentId])

  async function startReschedule() {
    if (!detail) return
    setRescheduling(true)
    setAvailability(null)
    setSelectedDay(null)
    setSelectedSlot(null)
    setSubmitError(null)
    try {
      const avail = await getDoctorAvailabilityAction({ data: { doctorId: detail.doctorId } })
      setAvailability(avail)
    } catch {
      setAvailability({ status: 'unreachable' })
    }
  }

  function cancelReschedule() {
    setRescheduling(false)
    setAvailability(null)
    setSelectedDay(null)
    setSelectedSlot(null)
    setSubmitError(null)
  }

  async function handleConfirmReschedule() {
    if (!detail || !selectedDay || !selectedSlot || !availability || availability.status !== 'ok') return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await rescheduleAppointmentAction({
        data: { appointmentId: detail.id, date: selectedDay.date, time: selectedSlot, durationMin: availability.durationMin },
      })
      if (!res.success) {
        setSubmitError(copy.rescheduleErrorFallback)
        return
      }
      setSubmitSuccess(true)
      onUpdated?.()
    } catch {
      setSubmitError(copy.rescheduleErrorFallback)
    } finally {
      setSubmitting(false)
    }
  }

  const statusLabels: Record<string, string> = t.pages.appointments.statusLabels

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-6"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy.title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.close}
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {loading && <p className="mt-6 text-sm text-muted-foreground">…</p>}
            {loadError && <p className="mt-6 text-sm text-red-600">{copy.loadError}</p>}

            {detail && !submitSuccess && (
              <div className="mt-6 space-y-3 text-sm">
                <DetailRow
                  label={detail.viewerRole === 'doctor' ? copy.patientLabel : copy.doctorLabel}
                  value={detail.viewerRole === 'doctor' ? detail.patientName : detail.doctorName}
                />
                {detail.viewerRole === 'doctor' && (
                  <DetailRow label={copy.phoneLabel} value={detail.patientPhone || copy.phoneUnavailable} />
                )}
                <DetailRow label={copy.serviceLabel} value={detail.serviceLabel || '—'} />
                <DetailRow
                  label={copy.dateLabel}
                  value={new Date(detail.startsAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
                />
                <DetailRow
                  label={copy.timeLabel}
                  value={new Date(detail.startsAt).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
                />
                <DetailRow label={copy.statusLabel} value={statusLabels[detail.status] || detail.status} />

                {!detail.canReschedule && <p className="pt-2 text-xs text-muted-foreground">{copy.rescheduleUnavailable}</p>}

                {detail.canReschedule && !rescheduling && (
                  <div className="pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={startReschedule}>
                      {copy.rescheduleCta}
                    </Button>
                  </div>
                )}

                {rescheduling && (
                  <div className="mt-4 border-t border-border pt-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy.rescheduleHeading}</h3>

                    {!availability && <p className="mt-3 text-sm text-muted-foreground">…</p>}
                    {availability?.status === 'ok' && availability.days.length === 0 && (
                      <p className="mt-3 text-sm text-muted-foreground">{copy.rescheduleNoSlots}</p>
                    )}
                    {availability && availability.status !== 'ok' && (
                      <p className="mt-3 text-sm text-red-600">{copy.rescheduleErrorFallback}</p>
                    )}
                    {availability?.status === 'ok' && availability.days.length > 0 && (
                      <div className="mt-3 flex max-h-56 flex-col gap-4 overflow-y-auto">
                        {availability.days.map((day) => (
                          <div key={day.date}>
                            <div className="text-xs font-medium text-foreground">{day.label}</div>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {day.slots.map((slot) => {
                                const active = selectedDay?.date === day.date && selectedSlot === slot
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => {
                                      setSelectedDay(day)
                                      setSelectedSlot(slot)
                                    }}
                                    className={
                                      active
                                        ? 'rounded-full bg-foreground px-3 py-1 text-xs text-white transition'
                                        : 'rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-muted'
                                    }
                                  >
                                    {slot}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-3">
                      <Button type="button" size="sm" onClick={handleConfirmReschedule} disabled={!selectedDay || !selectedSlot || submitting}>
                        {submitting ? copy.rescheduling : copy.rescheduleConfirm}
                      </Button>
                      <button type="button" onClick={cancelReschedule} className="text-sm text-muted-foreground transition hover:text-foreground">
                        {copy.rescheduleCancel}
                      </button>
                    </div>
                    {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
                  </div>
                )}
              </div>
            )}

            {submitSuccess && <p className="mt-6 text-sm text-foreground">{copy.rescheduleSuccess}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  )
}

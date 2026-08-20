import * as React from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import helgaPhoto from '@/assets/helga.jpg'
import kwamePhoto from '@/assets/kwame.jpg'
import matteoPhoto from '@/assets/matteo.jpg'
import hanaPhoto from '@/assets/hana.jpg'
import ariaPhoto from '@/assets/aria.jpg'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

/**
 * PROTECTED CAROUSEL GEOMETRY — exact values, do not alter.
 */
const INTRO_WIDTH = 324
const GAP = 11.26
const visible = 3.25

// Images stay local (not translated); role/name text comes from
// t.team.members, matched by array index. Order matches the fixed
// dictionary order: Helga Brooks, Kwame Mbeki, Matteo Dubois, Hana Sato,
// Aria Vance (2026-08-13: real doctor photos supplied by the user,
// replacing the earlier recycled generic placeholders).
const TEAM_IMAGES = [helgaPhoto, kwamePhoto, matteoPhoto, hanaPhoto, ariaPhoto]

const maxIndex = Math.max(0, Math.ceil(TEAM_IMAGES.length - visible))

export function TeamCarousel() {
  const t = useTranslation()
  const team = t.team.members.map((member, i) => ({ ...member, img: TEAM_IMAGES[i] }))
  const [index, setIndex] = React.useState(0)

  function goTo(next: number) {
    setIndex(Math.min(Math.max(next, 0), maxIndex))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          style={{
            gap: 11.26,
            width: `calc(${team.length} * ((100% - ${(visible - 1) * GAP}px) / ${visible}) + ${(team.length - 1) * GAP}px)`,
          }}
          animate={{
            x: `calc(${-index} * (100% + ${GAP}px) / ${team.length})`,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {team.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              style={{
                width: `calc((100% - ${(visible - 1) * GAP}px) / ${visible})`,
                minWidth: INTRO_WIDTH,
              }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <MaskedImage
                  src={member.img}
                  alt={member.name}
                  delay={i * 0.08}
                  className="h-full w-full"
                />
              </div>
              <div className="pt-6">
                <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {member.role}
                </div>
                <div className="text-xl mt-2 font-medium">{member.name}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Accessible, always-visible carousel controls */}
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          aria-label={t.team.prevAria}
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={t.team.nextAria}
          disabled={index === maxIndex}
          onClick={() => goTo(index + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

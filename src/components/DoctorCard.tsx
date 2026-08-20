import { ArrowUpRight } from 'lucide-react'

import { MaskedImage } from '@/components/MaskedImage'

export interface DoctorCardProps {
  img: string
  name: string
  specialty: string
  availability: string
  experience?: string
  delay?: number
}

/**
 * Reuses the TeamCarousel visual treatment (3:4 masked portrait +
 * tracked-uppercase metadata) per spec instruction for the Doctor
 * Discovery section and the /doctors route.
 */
export function DoctorCard({
  img,
  name,
  specialty,
  availability,
  experience,
  delay = 0,
}: DoctorCardProps) {
  return (
    <div className="group">
      {/* 2026-08-14 nav/link animation pass: subtle image scale on hover
          (image container keeps overflow-hidden so the zoom stays clipped
          to the existing aspect box — no layout shift). */}
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <MaskedImage
          src={img}
          alt={name}
          delay={delay}
          className="h-full w-full"
          imgClassName="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>
      <div className="pt-6">
        <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {specialty}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xl font-medium">{name}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {availability}
          {experience ? ` · ${experience}` : ''}
        </div>
      </div>
    </div>
  )
}

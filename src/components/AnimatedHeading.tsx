import * as React from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * PROTECTED MOTION PRIMITIVE — do not alter the transition values below.
 * Blur-to-sharp heading reveal used across the entire site. Every major
 * headline (protected and new sections alike) must use this component.
 */
interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  delay?: number
  style?: React.CSSProperties
}

export function AnimatedHeading({
  children,
  className,
  as: As = 'h2',
  delay = 0,
  style,
}: AnimatedHeadingProps) {
  const MotionTag = motion.create(As)

  return (
    <MotionTag
      className={cn(className)}
      style={style}
      initial={{
        opacity: 0,
        y: 30,
        filter: 'blur(12px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

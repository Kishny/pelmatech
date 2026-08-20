import * as React from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * PROTECTED MOTION PRIMITIVE — do not alter the transition values below.
 * Upward-rise paragraph reveal used for nearly all descriptive body copy
 * site-wide. Default delay is 0.15s.
 */
interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: React.ElementType
  style?: React.CSSProperties
}

export function AnimatedText({
  children,
  className,
  delay = 0.15,
  as = 'p',
  style,
}: AnimatedTextProps) {
  const MotionTag = motion.create(as)

  return (
    <MotionTag
      className={cn(className)}
      style={style}
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

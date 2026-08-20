import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * shadcn-ui base primitive, restyled to derive exclusively from the
 * Pelmatech design tokens (no arbitrary brand colors). Section-level
 * CTAs mostly use the exact pill classes defined in the spec directly;
 * this primitive exists for internal/dashboard/form UI.
 */
const buttonVariants = cva(
  // 2026-08-14: nav/link animation pass — added hover:scale/active:scale for
  // tactile press feedback (site owner request). `transition` already
  // covers `transform` by default, so no extra transition-property needed.
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition hover:scale-[1.02] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-white hover:opacity-90',
        white: 'bg-white text-foreground hover:bg-white/90',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
        link: 'text-foreground underline-offset-4 hover:underline rounded-none',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8',
        icon: 'h-9 w-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ReactNode, useRef } from 'react'

interface Props {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  /* If false, render as a button-like span (still goes via Link) without
     the magnetic shift — useful when nested in tight layouts. */
}

/* Magnetic-hover link: cursor pulls the content slightly toward it.
   Spring-smoothed so it feels physical, not jittery. */
export default function MagneticLink({ href, children, className, strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.55 })
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.55 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Link href={href} legacyBehavior passHref>
      <motion.a
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={className}
      >
        <motion.span
          className="inline-flex items-center gap-2"
          style={{ x: sx, y: sy }}
        >
          {children}
        </motion.span>
      </motion.a>
    </Link>
  )
}

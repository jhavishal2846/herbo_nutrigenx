'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  speed?: number     // seconds for one full loop
  reverse?: boolean
  className?: string
}

/* Infinite horizontal marquee — duplicates content so it loops seamlessly.
   Uses transform animation only, GPU-friendly. */
export default function Marquee({ children, speed = 38, reverse = false, className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max">
        <motion.div
          className="flex items-center flex-shrink-0"
          animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        >
          {children}
          {children}
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  text: string
  className?: string
  delay?: number
  stagger?: number
  italicLast?: boolean
  italicClass?: string
  startInView?: boolean
}

/* Splits text into words and reveals them with a spring-eased y/opacity stagger.
   Used for confident editorial-style headlines. */
export default function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  italicLast = false,
  italicClass = '',
  startInView = false,
}: Props) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  }
  const child = {
    hidden: { opacity: 0, y: '0.6em', rotate: 4, skewY: 3 },
    show: {
      opacity: 1,
      y: '0em',
      rotate: 0,
      skewY: 0,
      transition: { duration: 0.85, ease: EASE },
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(startInView
        ? { whileInView: 'show', viewport: { once: true, margin: '-80px' } }
        : { animate: 'show' })}
      aria-label={text}
    >
      {words.map((w, i) => {
        const isLast = i === words.length - 1
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden align-baseline"
            style={{ marginRight: '0.28em' }}
          >
            <motion.span
              variants={child}
              className={`inline-block ${italicLast && isLast ? italicClass : ''}`}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </motion.span>
  )
}

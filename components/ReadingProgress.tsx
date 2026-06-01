'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/* Thin progress bar pinned to the very top of the viewport that fills as the
   reader scrolls through the page. Spring-smoothed for a calmer feel. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-40 pointer-events-none"
      style={{
        scaleX,
        background: 'var(--color-lime)',
      }}
    />
  )
}

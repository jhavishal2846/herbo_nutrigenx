'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center py-32 bg-bg leaf-pattern relative overflow-hidden">
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute -right-12 -top-12 w-[400px] h-[400px] pointer-events-none"
        fill="none"
      >
        <motion.path
          d="M40 360 C 60 280, 110 230, 200 220 C 110 200, 80 130, 90 60 C 130 130, 200 180, 260 200 C 310 110, 360 90, 380 60"
          stroke="#1F7A3D"
          strokeOpacity={0.18}
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
      </motion.svg>

      <div className="container-narrow relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-lime mb-6"
        >
          Page not found
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="font-display font-semibold text-3xl lg:text-5xl text-ink mb-4 text-balance leading-[0.98] tracking-[-0.01em]"
        >
          This page <span className="italic text-primary">wandered off</span> the path.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="text-ink-muted text-lg mb-10 max-w-md mx-auto"
        >
          The article or page you were looking for doesn&apos;t live here. Try the library, or head
          back to the front page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
          >
            Back home
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors"
          >
            Browse articles
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

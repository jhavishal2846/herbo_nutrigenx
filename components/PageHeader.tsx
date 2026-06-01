'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  variant?: 'default' | 'dark' | 'cream'
  tag?: string
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  variant = 'default',
  tag,
}: PageHeaderProps) {
  const isDark = variant === 'dark'

  return (
    <section
      className={`relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24 ${
        isDark
          ? 'bg-surface-dark helix-pattern'
          : variant === 'cream'
          ? 'bg-bg leaf-pattern'
          : 'bg-surface-raised'
      }`}
    >
      {/* Drawn botanical line — animates on mount */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute -right-20 -top-16 w-[460px] h-[460px] pointer-events-none"
        fill="none"
      >
        <motion.path
          d="M40 360 C 60 280, 110 230, 200 220 C 110 200, 80 130, 90 60 C 130 130, 200 180, 260 200 C 310 110, 360 90, 380 60"
          stroke={isDark ? '#8BC53F' : '#1F7A3D'}
          strokeOpacity={isDark ? 0.4 : 0.2}
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute -left-24 -bottom-20 w-[400px] h-[400px] pointer-events-none"
        fill="none"
      >
        <motion.path
          d="M380 40 C 320 90, 260 110, 200 120 C 240 200, 220 290, 160 360 C 110 290, 70 220, 50 140 C 130 160, 220 130, 280 80"
          stroke={isDark ? '#A8D762' : '#8BC53F'}
          strokeOpacity={isDark ? 0.32 : 0.2}
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: EASE, delay: 0.3 }}
        />
      </motion.svg>

      <div className="container-wide relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-8 flex flex-wrap items-center gap-3 text-sm"
          >
            <Link
              href="/"
              className={`transition-colors ${
                isDark ? 'text-white/55 hover:text-white' : 'text-ink-subtle hover:text-primary'
              }`}
            >
              Home
            </Link>
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className={isDark ? 'text-white/30' : 'text-ink-subtle/40'}>/</span>
                {bc.href ? (
                  <Link
                    href={bc.href}
                    className={`transition-colors ${
                      isDark
                        ? 'text-white/55 hover:text-white'
                        : 'text-ink-subtle hover:text-primary'
                    }`}
                  >
                    {bc.label}
                  </Link>
                ) : (
                  <span className={isDark ? 'text-white/85 font-medium' : 'text-ink-muted font-medium'}>
                    {bc.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {tag && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mb-6 flex items-center gap-4"
          >
            <motion.div
              className={`h-px ${isDark ? 'bg-lime' : 'bg-primary'}`}
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            />
            <span
              className={`text-[11px] font-bold tracking-[0.3em] uppercase ${
                isDark ? 'text-lime' : 'text-primary'
              }`}
            >
              {tag}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className={`font-display font-semibold text-balance leading-[0.98] tracking-[-0.02em] ${
            isDark ? 'text-white' : 'text-ink'
          } text-4xl md:text-5xl lg:text-[4.25rem] max-w-4xl`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.4 }}
            className={`mt-6 max-w-2xl text-lg leading-relaxed ${
              isDark ? 'text-white/70' : 'text-ink-muted'
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

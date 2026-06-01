'use client'

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  categories,
  categoryMeta,
  categorySlug,
  getFeatured,
  getLatest,
} from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import WordReveal from '@/components/WordReveal'
import Marquee from '@/components/Marquee'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ─── Botanical SVG with path-draw animation ─────────────────────────── */

function BotanicalLine({
  className,
  delay = 0,
  duration = 2.4,
  stroke = '#8BC53F',
  opacity = 0.4,
  d,
}: {
  className?: string
  delay?: number
  duration?: number
  stroke?: string
  opacity?: number
  d: string
}) {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d={d}
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, delay, ease: EASE }}
      />
    </motion.svg>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Multi-layer parallax — each layer at a different speed
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const yFg = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // Cursor-tracked glow
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const glowX = useTransform(mx, (v) => `${v * 100}%`)
  const glowY = useTransform(my, (v) => `${v * 100}%`)

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden bg-surface-dark pt-32 pb-28 lg:pt-44 lg:pb-40"
    >
      {/* Solid forest bg + texture, no gradient */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <div className="absolute inset-0 helix-pattern opacity-25" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        {/* Soft cursor-follow blob — solid colour, blurred for a halo. */}
        <motion.div
          aria-hidden
          className="absolute w-[420px] h-[420px] rounded-full bg-lime/15"
          style={{
            left: glowX,
            top: glowY,
            x: '-50%',
            y: '-50%',
            filter: 'blur(110px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Mid-layer drawn botanical lines */}
      <motion.div style={{ y: yMid }} className="absolute inset-0 pointer-events-none">
        <BotanicalLine
          className="absolute -left-12 top-16 w-[420px] h-[420px]"
          stroke="#8BC53F"
          opacity={0.35}
          delay={0.2}
          duration={2.6}
          d="M40 360 C 60 280, 110 230, 200 220 C 110 200, 80 130, 90 60 C 130 130, 200 180, 260 200 C 310 110, 360 90, 380 60"
        />
        <BotanicalLine
          className="absolute -right-16 -bottom-10 w-[460px] h-[460px]"
          stroke="#A8D762"
          opacity={0.28}
          delay={0.6}
          duration={2.8}
          d="M380 40 C 320 90, 260 110, 200 120 C 240 200, 220 290, 160 360 C 110 290, 70 220, 50 140 C 130 160, 220 130, 280 80"
        />
      </motion.div>

      {/* Pulse rings */}
      <motion.div style={{ y: yFg }} className="absolute top-1/2 right-[16%] -translate-y-1/2 pointer-events-none">
        {[200, 320, 460, 600].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-lime/12"
            style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ opacity }} className="container-wide relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 flex items-center gap-5"
        >
          <div className="h-px w-14 bg-lime" />
          <span className="text-xs font-bold tracking-[0.32em] uppercase text-lime">
            A wellness library, est. 2025
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-semibold text-white leading-[0.92] mb-8 max-w-5xl text-[3.25rem] sm:text-[4rem] lg:text-[5.25rem] xl:text-[6rem] tracking-[-0.02em]">
          <span className="block">
            <WordReveal text="The science" />
          </span>
          <span className="block">
            <WordReveal text="of feeling" delay={0.18} />{' '}
            <motion.span
              initial={{ opacity: 0, y: '0.5em', skewY: 6 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: EASE }}
              className="inline-block italic text-lime"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              alive.
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
          className="max-w-xl text-lg text-white/65 leading-relaxed mb-14"
        >
          Evidence-based articles on nutrition, sleep, immunity and cellular health — written for
          curious humans, grounded in the work of scientists.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
          className="flex flex-wrap gap-4"
        >
          <HeroCTA href="/articles" primary>
            Enter the library
          </HeroCTA>
          <HeroCTA href="/about-us">How we write</HeroCTA>
        </motion.div>
      </motion.div>

      {/* Marquee at hero bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 inset-x-0 z-10"
      >
        <Marquee speed={48} className="py-3">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center pr-12">
              {categories.map((c) => (
                <span key={c} className="flex items-center pr-12">
                  <span className="font-display italic text-2xl lg:text-3xl text-white/30 tracking-tight">
                    {c}
                  </span>
                  <span className="ml-12 w-1.5 h-1.5 rounded-full bg-lime/60" />
                </span>
              ))}
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}

function HeroCTA({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-bold transition-colors duration-200 ${
        primary
          ? 'bg-lime text-primary-dark hover:bg-lime-light'
          : 'border border-white/25 text-white hover:bg-white/10'
      }`}
    >
      {children}
      <motion.svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <motion.path
          d="M5 12h14M13 6l6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.a>
  )
}

/* ─── Featured ──────────────────────────────────────────────────────────── */

function FeaturedSection() {
  const featured = getFeatured(2)
  if (featured.length < 2) return null

  return (
    <section className="py-28 bg-bg">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                Featured
              </span>
            </div>
            <h2 className="font-display font-semibold text-5xl lg:text-6xl text-ink leading-[0.95] text-balance">
              <WordReveal text="Start here." startInView />
            </h2>
          </div>
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 text-primary text-sm font-bold"
          >
            <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors">
              View all articles
            </span>
            <motion.svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </motion.svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((a, i) => (
            <ArticleCard key={a.slug} article={a} variant="featured" index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Topic library — editorial numbered cards ─────────────────────────── */

function TopicGridSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  return (
    <section
      ref={ref}
      className="relative py-28 bg-surface-raised leaf-pattern overflow-hidden"
    >
      <div className="container-wide relative">
        <motion.div
          style={{ y: yTitle }}
          className="mb-16 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                Topic Library
              </span>
            </div>
            <h2 className="font-display font-semibold text-5xl lg:text-6xl text-ink leading-[0.95] mb-5 text-balance">
              Eight threads,{' '}
              <span className="italic text-primary">one body</span>.
            </h2>
            <p className="text-ink-muted text-lg leading-relaxed max-w-lg">
              Each topic is a doorway into how something inside you actually works — and what to
              do about it.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {categories.map((c, i) => {
            const meta = categoryMeta[c]
            return (
              <TopicCard
                key={c}
                category={c}
                kicker={meta.kicker}
                description={meta.description}
                color={meta.color}
                href={`/topics/${categorySlug(c)}`}
                index={i}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TopicCard({
  category,
  kicker,
  description,
  color,
  href,
  index,
}: {
  category: string
  kicker: string
  description: string
  color: string
  href: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 4) * 0.08 }}
      viewport={{ once: true, margin: '-30px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={href}
        className="group relative flex flex-col h-full bg-surface p-8 lg:p-9 min-h-[260px] overflow-hidden"
      >
        {/* Background color reveal on hover */}
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-bottom"
          style={{ backgroundColor: color }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: hovered ? 1 : 0,
            opacity: hovered ? 0.08 : 0,
          }}
          transition={{ duration: 0.45, ease: EASE }}
        />

        {/* Kicker word — small editorial accent */}
        <div className="relative flex items-center gap-3 mb-7">
          <motion.span
            aria-hidden
            className="h-px"
            style={{ backgroundColor: color }}
            initial={{ width: 14 }}
            animate={{ width: hovered ? 32 : 14 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          />
          <span
            className="text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ color }}
          >
            {kicker}
          </span>
        </div>

        {/* Category name */}
        <motion.h3
          className="relative font-display font-semibold text-3xl lg:text-[2rem] text-ink leading-[1.05] mb-4 tracking-[-0.01em]"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
        >
          {category}
        </motion.h3>

        <p className="relative text-sm text-ink-muted leading-relaxed flex-1 mb-7">
          {description}
        </p>

        {/* Bottom arrow */}
        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-subtle">
            Explore
          </span>
          <motion.svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={1.6}
            animate={{ x: hovered ? 6 : 0, rotate: hovered ? -45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Latest ─────────────────────────────────────────────────────────── */

function LatestSection() {
  const latest = getLatest(6)

  return (
    <section className="py-28 bg-bg">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                Latest
              </span>
            </div>
            <h2 className="font-display font-semibold text-5xl lg:text-6xl text-ink leading-[0.95] mb-4 text-balance">
              Fresh from{' '}
              <span className="italic text-primary">the library</span>.
            </h2>
            <p className="text-ink-muted leading-relaxed">
              Recently published articles across all eight topics. Skim, save, return.
            </p>
          </div>
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all duration-200"
          >
            See all
            <motion.svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </motion.svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Editorial principles — numbered list ────────────────────────────── */

const principles = [
  {
    n: '01',
    title: 'Cited by default.',
    desc: 'Every claim ties back to peer-reviewed research or a named expert. No mystery wellness hot takes.',
  },
  {
    n: '02',
    title: 'Practical, not preachy.',
    desc: 'Every article ends with what to actually do. Mechanism first, then habits you can pick up tomorrow.',
  },
  {
    n: '03',
    title: 'Whole-body view.',
    desc: 'Gut, brain, sleep, immunity — we treat the body as one connected system, because the science does too.',
  },
  {
    n: '04',
    title: 'No product pressure.',
    desc: 'We do not sell supplements. We do not push brands. The library exists to teach — and that’s it.',
  },
]

function PrinciplesSection() {
  return (
    <section className="relative py-28 bg-surface-dark overflow-hidden">
      <div className="absolute inset-0 helix-pattern opacity-25 pointer-events-none" />
      <BotanicalLine
        className="absolute -right-16 -top-16 w-[420px] h-[420px] opacity-30"
        stroke="#8BC53F"
        opacity={0.5}
        delay={0.2}
        duration={3}
        d="M40 360 C 60 280, 110 230, 200 220 C 110 200, 80 130, 90 60 C 130 130, 200 180, 260 200 C 310 110, 360 90, 380 60"
      />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-lime" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-lime">
              How we write
            </span>
          </div>
          <h2 className="font-display font-semibold text-5xl lg:text-6xl text-white leading-[0.95] mb-5 text-balance">
            Wellness writing{' '}
            <span className="italic text-lime">without the woo</span>.
          </h2>
          <p className="text-white/65 text-lg leading-relaxed">
            Wellness on the internet is loud. We try to be quiet, and right.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {principles.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.1 }}
              viewport={{ once: true, margin: '-40px' }}
              className="group relative bg-surface-dark p-8 lg:p-10 overflow-hidden"
            >
              <motion.span
                aria-hidden
                className="absolute top-0 left-0 h-px bg-lime"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: EASE }}
                viewport={{ once: true }}
              />
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] tabular-nums text-lime tracking-[0.25em]">
                  {p.n}
                </span>
                <span className="h-px w-8 bg-lime/40" />
              </div>
              <h3 className="font-display font-semibold text-2xl lg:text-[1.625rem] text-white mb-3 leading-tight">
                {p.title}
              </h3>
              <p className="text-white/65 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Newsletter ────────────────────────────────────────────────────────── */

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-28 bg-bg">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-14 lg:p-20"
        >
          <div className="absolute inset-0 helix-pattern opacity-25 pointer-events-none" />
          <BotanicalLine
            className="absolute -right-12 -top-12 w-[420px] h-[420px] opacity-40"
            stroke="#FFFFFF"
            opacity={0.5}
            delay={0.2}
            duration={2.8}
            d="M380 40 C 320 90, 260 110, 200 120 C 240 200, 220 290, 160 360 C 110 290, 70 220, 50 140 C 130 160, 220 130, 280 80"
          />

          <div className="relative max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-lime-light" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-lime-light">
                The Sunday Read
              </span>
            </div>
            <h2 className="font-display font-semibold text-5xl lg:text-6xl text-white mb-5 text-balance leading-[0.95]">
              One thoughtful read.
              <br />
              <span className="italic text-lime-light">Every Sunday morning.</span>
            </h2>
            <p className="text-white/80 text-lg mb-9 max-w-lg">
              A single hand-picked article in your inbox. No advertising, no list trading, easy to
              leave.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-2xl text-lime-light italic"
                >
                  Subscribed. See you Sunday.
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg"
                >
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/45 text-sm outline-none focus:bg-white/15 focus:border-white/40 transition-colors"
                    aria-label="Email address"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    className="px-7 py-4 rounded-full bg-lime text-primary-dark text-sm font-bold hover:bg-lime-light transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <TopicGridSection />
      <LatestSection />
      <PrinciplesSection />
      <NewsletterSection />
    </>
  )
}

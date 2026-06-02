'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, categoryMeta, categorySlug } from '@/lib/articles'

type NavLink = { label: string; href: string; desc?: string; kicker?: string; color?: string }
type NavSection = { heading: string; links: NavLink[] }
type NavItem =
  | { label: string; href: string; mega?: false }
  | { label: string; href?: string; mega: true; sections: NavSection[] }

const topicLinks: NavLink[] = categories.map((c) => ({
  label: c,
  href: `/topics/${categorySlug(c)}`,
  desc: categoryMeta[c].description,
  kicker: categoryMeta[c].kicker,
  color: categoryMeta[c].color,
}))

const navItems: NavItem[] = [
  {
    label: 'Topics',
    mega: true,
    sections: [
      { heading: 'Body', links: topicLinks.slice(0, 4) },
      { heading: 'Mind & Life', links: topicLinks.slice(4) },
    ],
  },
  { label: 'Articles', href: '/articles' },
  { label: 'About',    href: '/about-us' },
  { label: 'Contact',  href: '/contact-us' },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ─── Mega menu ─────────────────────────────────────────────────────────── */

function MegaContent({ sections }: { sections: NavSection[] }) {
  return (
    <div
      className={`grid gap-10 ${
        sections.length === 3 ? 'grid-cols-3' : sections.length === 2 ? 'grid-cols-2' : 'grid-cols-1'
      }`}
    >
      {sections.map((sec) => (
        <div key={sec.heading}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-dark">
            {sec.heading}
          </p>
          <ul className="space-y-0.5">
            {sec.links.map((lnk) => (
              <li key={lnk.href}>
                <Link
                  href={lnk.href}
                  className="group flex flex-col px-2.5 py-2 rounded-xl hover:bg-primary-xlight transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  <span
                    className="text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5"
                    style={{ color: lnk.color }}
                    aria-hidden
                  >
                    {lnk.kicker}
                  </span>
                  <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors duration-150">
                    {lnk.label}
                  </span>
                  {lnk.desc && (
                    <span className="text-xs text-ink-subtle mt-0.5 leading-snug line-clamp-1">
                      {lnk.desc}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function SharedMegaMenu({
  activeItem,
  centerX,
  onMouseEnter,
  onMouseLeave,
}: {
  activeItem: (NavItem & { mega: true }) | null
  centerX: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const widthClass =
    !activeItem
      ? 'min-w-[320px]'
      : activeItem.sections.length === 3
      ? 'min-w-[760px]'
      : activeItem.sections.length === 2
      ? 'min-w-[560px]'
      : 'min-w-[320px]'

  const prevCenterX = useRef(centerX)
  const direction =
    centerX > prevCenterX.current ? 1 : centerX < prevCenterX.current ? -1 : 0
  useEffect(() => {
    prevCenterX.current = centerX
  }, [centerX])

  const contentVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -28 : 28 }),
  }

  return (
    <AnimatePresence>
      {activeItem && (
        <motion.div
          key="shared-mega"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: -8 }}
          animate={{
            opacity: 1,
            y: 0,
            x: centerX,
            transition: {
              x: { type: 'spring', stiffness: 600, damping: 42, mass: 0.6 },
              opacity: { duration: 0.16, ease: EASE },
              y: { duration: 0.2, ease: EASE },
            },
          }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.14 } }}
          style={{ left: 0, translateX: '-50%' }}
          className={`absolute top-full mt-3 rounded-2xl border border-border bg-surface/98 backdrop-blur-xl shadow-xl p-7 z-50 w-max overflow-hidden ${widthClass}`}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={activeItem.label}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 520, damping: 40, mass: 0.55 },
                opacity: { duration: 0.18, ease: EASE },
              }}
            >
              <MegaContent sections={activeItem.sections} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Mobile drawer ─────────────────────────────────────────────────────── */

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!open) setExpanded(null)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-surface shadow-2xl overflow-y-auto lg:hidden flex flex-col"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center"
                aria-label="Herbo Nutrigenx — Home"
              >
                <Image
                  src="/brand/logo.png"
                  alt="Herbo Nutrigenx"
                  width={1786}
                  height={130}
                  className="h-7 w-auto"
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
              >
                <svg
                  className="w-5 h-5 text-ink"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 py-4 px-4">
              {navItems.map((item) =>
                item.mega ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-surface-raised transition-colors text-sm font-semibold text-ink"
                    >
                      {item.label}
                      <motion.svg
                        className="w-4 h-4 text-ink-subtle"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        animate={{ rotate: expanded === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden"
                        >
                          {item.sections.map((sec) => (
                            <div key={sec.heading} className="pl-4 pb-2">
                              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-lime-dark">
                                {sec.heading}
                              </p>
                              {sec.links.map((lnk) => (
                                <Link
                                  key={lnk.href}
                                  href={lnk.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink/80 hover:text-primary hover:bg-primary-xlight transition-colors"
                                >
                                  <span
                                    aria-hidden
                                    className="text-[9px] font-bold tracking-[0.25em] uppercase w-14 flex-shrink-0"
                                    style={{ color: lnk.color }}
                                  >
                                    {lnk.kicker}
                                  </span>
                                  {lnk.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={onClose}
                    className="block px-3 py-3 rounded-xl text-sm font-semibold text-ink hover:text-primary hover:bg-primary-xlight transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="p-5 border-t border-border space-y-2.5">
              <Link
                href="/articles"
                onClick={onClose}
                className="flex items-center justify-center w-full px-5 py-3 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark transition-colors"
              >
                Browse Articles
              </Link>
              <Link
                href="/contact-us"
                onClick={onClose}
                className="flex items-center justify-center w-full px-5 py-3 rounded-full border border-border text-sm font-semibold text-ink hover:border-primary hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Main navbar ───────────────────────────────────────────────────────── */

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hoverRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const navRef = useRef<HTMLElement | null>(null)
  const [centerX, setCenterX] = useState(0)

  const computeCenter = (label: string) => {
    const t = triggerRefs.current[label]
    const n = navRef.current
    if (!t || !n) return null
    const tRect = t.getBoundingClientRect()
    const nRect = n.getBoundingClientRect()
    return tRect.left - nRect.left + tRect.width / 2
  }

  useEffect(() => {
    if (!open) return
    const c = computeCenter(open)
    if (c != null) setCenterX(c)
    const onResize = () => {
      const c = computeCenter(open)
      if (c != null) setCenterX(c)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, scrolled])

  const activeItem = open
    ? (navItems.find((i) => 'mega' in i && i.mega && i.label === open) as
        | (NavItem & { mega: true })
        | undefined) ?? null
    : null

  const openMenu = (label: string) => {
    if (hoverRef.current) clearTimeout(hoverRef.current)
    const c = computeCenter(label)
    if (c != null) setCenterX(c)
    setOpen(label)
  }
  const closeSoon = () => {
    hoverRef.current = setTimeout(() => setOpen(null), 130)
  }

  useEffect(() => {
    const threshold = pathname === '/' ? window.innerHeight * 0.6 : 48
    const check = () => setScrolled(window.scrollY > threshold)
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const onHero = pathname === '/' && !scrolled

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-30"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? 'rgba(255,254,250,0.96)' : onHero ? 'rgba(14,36,24,0)' : 'rgba(255,254,250,0.96)',
            backdropFilter: scrolled || !onHero ? 'blur(20px)' : 'blur(0px)',
            borderBottomColor: scrolled || !onHero ? 'rgba(225,221,208,0.8)' : 'rgba(225,221,208,0)',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="border-b"
        >
          <div className="container-wide">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:rounded-lg"
                aria-label="Herbo Nutrigenx — Home"
              >
                <Image
                  src="/brand/logo.png"
                  alt="Herbo Nutrigenx"
                  width={1786}
                  height={130}
                  priority
                  className={`h-7 w-auto lg:h-8 transition-all duration-200 ${
                    onHero ? 'brightness-0 invert' : ''
                  }`}
                />
              </Link>

              {/* Desktop nav */}
              <nav
                ref={navRef}
                className="hidden lg:flex relative items-center gap-7"
                aria-label="Main navigation"
                onMouseLeave={closeSoon}
              >
                {navItems.map((item) =>
                  item.mega ? (
                    <div
                      key={item.label}
                      ref={(el) => {
                        triggerRefs.current[item.label] = el
                      }}
                      onMouseEnter={() => openMenu(item.label)}
                    >
                      <button
                        aria-expanded={open === item.label}
                        aria-haspopup="true"
                        className={`flex items-center gap-1 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:rounded transition-colors duration-150 ${
                          onHero ? 'text-white/85 hover:text-white' : 'text-ink/80 hover:text-ink'
                        }`}
                      >
                        {item.label}
                        <motion.svg
                          className="w-3.5 h-3.5 opacity-60"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          animate={{ rotate: open === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onMouseEnter={() => {
                        if (hoverRef.current) clearTimeout(hoverRef.current)
                        setOpen(null)
                      }}
                      className={`relative text-sm font-semibold transition-colors duration-150 ${
                        onHero ? 'text-white/85 hover:text-white' : 'text-ink/80 hover:text-ink'
                      } ${
                        pathname === item.href ? (onHero ? 'text-lime' : 'text-primary') : ''
                      }`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-lime rounded-full"
                        />
                      )}
                    </Link>
                  )
                )}

                <SharedMegaMenu
                  activeItem={activeItem}
                  centerX={centerX}
                  onMouseEnter={() => {
                    if (hoverRef.current) clearTimeout(hoverRef.current)
                  }}
                  onMouseLeave={closeSoon}
                />
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/articles"
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    onHero
                      ? 'border border-white/30 text-white hover:bg-white/10'
                      : 'border border-primary/40 text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  Browse Articles
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-colors duration-150"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2.5 rounded-xl hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:outline-none"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
                aria-expanded={mobileOpen}
              >
                <svg
                  className={`w-5 h-5 transition-colors duration-200 ${
                    onHero ? 'text-white' : 'text-ink'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

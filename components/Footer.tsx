import Link from 'next/link'
import Image from 'next/image'
import { categories, categorySlug } from '@/lib/articles'
import FooterNewsletter from './FooterNewsletter'
import Marquee from './Marquee'

const aboutLinks = [
  { label: 'Our Mission', href: '/about-us#mission' },
  { label: 'Our Approach', href: '/about-us#approach' },
  { label: 'Editorial Standards', href: '/about-us#standards' },
  { label: 'Contact', href: '/contact-us' },
]

const quickLinks = [
  { label: 'All Articles', href: '/articles' },
  { label: 'Topics', href: '/articles' },
  { label: 'Newsletter', href: '/contact-us#newsletter' },
  { label: 'Contact', href: '/contact-us' },
]

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const marqueeWords = [
  'Herbo Nutrigenx',
  'Wellness',
  'Nutrition',
  'Sleep',
  'Immunity',
  'Cellular Health',
  'Mental Wellness',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-dark-forest text-white/70 overflow-hidden">
      {/* CTA band */}
      <div className="relative border-b border-white/8">
        <div className="container-wide py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-lime" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-lime">
                The Sunday Read
              </span>
            </div>
            <p className="font-display text-3xl lg:text-4xl font-semibold text-white text-balance leading-[1.05] tracking-[-0.01em]">
              Get a weekly drop of <span className="italic text-lime">science-backed</span> wellness.
            </p>
            <p className="mt-4 text-sm text-white/55 leading-relaxed">
              Quiet, ad-free, no spam — just one carefully picked article each Sunday morning.
            </p>
          </div>
          <FooterNewsletter />
        </div>
      </div>

      {/* Link grid */}
      <div className="relative container-wide py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6" aria-label="Herbo Nutrigenx — Home">
              <Image
                src="/brand/logo.png"
                alt="Herbo Nutrigenx"
                width={1786}
                height={130}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/55 mb-6 max-w-xs">
              An evidence-based library on nutrition, immunity, sleep, and the cellular science of
              feeling well.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-white/45 hover:text-lime hover:bg-white/8 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="col-span-2 lg:col-span-1">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-lime">
              Topics
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/topics/${categorySlug(c)}`}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-lime">
              About
            </p>
            <ul className="space-y-3">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick */}
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-lime">
              Discover
            </p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Giant wordmark marquee */}
      <div className="relative border-t border-white/8 py-12">
        <Marquee speed={60}>
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center pr-16">
              {marqueeWords.map((w, i) => (
                <span key={`${dup}-${i}`} className="flex items-center pr-16">
                  <span className="font-display italic text-5xl lg:text-7xl text-white/8 tracking-[-0.02em] whitespace-nowrap">
                    {w}
                  </span>
                  <span className="ml-16 w-2 h-2 rounded-full bg-lime/60" />
                </span>
              ))}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/8">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {year} Herbo Nutrigenx. All content is for educational purposes only.</p>
          <div className="flex items-center gap-5">
            <Link href="/contact-us" className="hover:text-white/70 transition-colors">
              Privacy
            </Link>
            <Link href="/contact-us" className="hover:text-white/70 transition-colors">
              Terms
            </Link>
            <span className="opacity-60 italic">Made with herbs &amp; data</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

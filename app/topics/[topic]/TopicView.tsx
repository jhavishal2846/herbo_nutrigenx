'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { categories, categoryMeta, categorySlug, type Article, type Category } from '@/lib/articles'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  category: Category
  kicker: string
  description: string
  color: string
  articles: Article[]
}

export default function TopicView({ category, kicker, description, color, articles }: Props) {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-bg"
      >
        {/* Subtle topic tint */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute inset-0"
          style={{ backgroundColor: color }}
        />
        <div className="absolute inset-0 leaf-pattern opacity-50 pointer-events-none" />

        {/* Drawn botanical accent — animates on mount */}
        <motion.svg
          viewBox="0 0 400 400"
          className="absolute -right-20 -top-16 w-[460px] h-[460px] pointer-events-none"
          fill="none"
        >
          <motion.path
            d="M40 360 C 60 280, 110 230, 200 220 C 110 200, 80 130, 90 60 C 130 130, 200 180, 260 200 C 310 110, 360 90, 380 60"
            stroke={color}
            strokeOpacity={0.2}
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: EASE }}
          />
        </motion.svg>

        <div className="container-wide relative">
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 flex items-center gap-3 text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-ink-subtle hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-ink-subtle/40">/</span>
            <Link href="/articles" className="text-ink-subtle hover:text-primary transition-colors">
              Topics
            </Link>
            <span className="text-ink-subtle/40">/</span>
            <span className="text-ink-muted font-medium">{category}</span>
          </motion.nav>

          {/* Kicker eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="mb-6 flex items-center gap-4"
          >
            <motion.div
              className="h-px"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            />
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase"
              style={{ color }}
            >
              {kicker} · Topic
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.3 }}
            className="font-display font-semibold text-5xl lg:text-7xl text-ink leading-[0.95] mb-6 text-balance tracking-[-0.02em] max-w-3xl"
          >
            {category}.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="text-lg lg:text-xl text-ink-muted leading-relaxed max-w-2xl"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          {articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <p className="font-display text-3xl text-ink mb-3 italic">
                No articles here yet.
              </p>
              <p className="text-ink-muted mb-8">
                We&apos;re adding to this topic. Meanwhile, the library has plenty.
              </p>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
              >
                Browse all articles
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other topics */}
      <section className="py-20 bg-surface-raised border-t border-border">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="font-display font-semibold text-3xl lg:text-4xl text-ink tracking-[-0.01em]">
              Wander somewhere else.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {categories
              .filter((c) => c !== category)
              .map((c, i) => {
                const m = categoryMeta[c]
                return (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                    viewport={{ once: true, margin: '-40px' }}
                  >
                    <Link
                      href={`/topics/${categorySlug(c)}`}
                      className="group block bg-surface p-6 hover:bg-primary-50 transition-colors min-h-[150px]"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="h-px w-6" style={{ backgroundColor: m.color }} />
                        <span
                          className="text-[10px] font-bold tracking-[0.28em] uppercase"
                          style={{ color: m.color }}
                        >
                          {m.kicker}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-display font-semibold text-xl text-ink group-hover:text-primary transition-colors">
                          {c}
                        </p>
                        <motion.svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={m.color}
                          strokeWidth={1.6}
                          whileHover={{ x: 4, rotate: -45 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </motion.svg>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}

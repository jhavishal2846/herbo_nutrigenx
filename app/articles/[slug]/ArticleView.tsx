'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Markdown from '@/components/Markdown'
import ArticleCard from '@/components/ArticleCard'
import ReadingProgress from '@/components/ReadingProgress'
import { categorySlug, type Article } from '@/lib/articles'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Meta {
  number: string
  kicker: string
  description: string
  color: string
}

interface Props {
  article: Article
  related: Article[]
  meta: Meta
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ArticleView({ article, related, meta }: Props) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.06])

  return (
    <>
      <ReadingProgress />

      {/* Hero block */}
      <section className="relative pt-28 pb-12 bg-surface-raised overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-50 pointer-events-none" />
        <div className="container-wide relative">
          <motion.nav
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-3 text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-ink-subtle hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-ink-subtle/40">/</span>
            <Link href="/articles" className="text-ink-subtle hover:text-primary transition-colors">
              Articles
            </Link>
            <span className="text-ink-subtle/40">/</span>
            <Link
              href={`/topics/${categorySlug(article.category)}`}
              className="text-ink-muted hover:text-primary transition-colors"
            >
              {article.category}
            </Link>
          </motion.nav>

          <div className="max-w-3xl">
            {/* Kicker badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="mb-6 flex items-center gap-4"
            >
              <motion.div
                className="h-px"
                style={{ backgroundColor: meta.color }}
                initial={{ width: 0 }}
                animate={{ width: '2.5rem' }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              />
              <Link
                href={`/topics/${categorySlug(article.category)}`}
                className="text-[11px] font-bold tracking-[0.3em] uppercase hover:opacity-70 transition-opacity"
                style={{ color: meta.color }}
              >
                {meta.kicker} · {article.category}
              </Link>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.02] text-balance mb-7 tracking-[-0.02em]"
              >
                {article.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.35 }}
                className="text-xl text-ink-muted leading-relaxed mb-10"
              >
                {article.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm border-y border-border py-5"
              >
                {article.author && (
                  <span className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-xs"
                      style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
                    >
                      {article.author
                        .split(' ')
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-ink-subtle">
                        Written by
                      </span>
                      <span className="block text-ink font-semibold">{article.author}</span>
                    </span>
                  </span>
                )}
                <span className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink-subtle">
                    Published
                  </span>
                  <time className="text-ink font-semibold tabular-nums">
                    {formatDate(article.publishedAt)}
                  </time>
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink-subtle">
                    Reading time
                  </span>
                  <span className="text-ink font-semibold tabular-nums">
                    {article.readMinutes} min
                  </span>
                </span>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Hero image with parallax */}
      <section ref={heroRef} className="bg-bg">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="relative aspect-[16/8] -mt-4 rounded-3xl overflow-hidden shadow-xl bg-surface-raised"
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: heroY, scale: heroScale }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-bg">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <Markdown source={article.body} />
          </motion.div>

          {/* Footer rules */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-ink-subtle max-w-md">
              Educational content — not medical advice. See a clinician for personal guidance.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-subtle mr-2">
                Share
              </span>
              <motion.a
                whileHover={{ y: -2 }}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="w-9 h-9 rounded-full border border-border text-ink-muted hover:border-primary hover:text-primary inline-flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  'https://herbonutrigenx.com/articles/' + article.slug
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-9 h-9 rounded-full border border-border text-ink-muted hover:border-primary hover:text-primary inline-flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-surface-raised">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="h-px w-10"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span
                    className="text-[11px] font-bold tracking-[0.3em] uppercase"
                    style={{ color: meta.color }}
                  >
                    Keep reading
                  </span>
                </div>
                <h2 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-[0.95] tracking-[-0.01em]">
                  More on{' '}
                  <span className="italic" style={{ color: meta.color }}>
                    {article.category}
                  </span>
                </h2>
              </div>
              <Link
                href={`/topics/${categorySlug(article.category)}`}
                className="group inline-flex items-center gap-2 text-primary text-sm font-bold"
              >
                <span className="border-b border-primary/30 pb-0.5 group-hover:border-primary transition-colors">
                  Browse {article.category}
                </span>
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
              {related.map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

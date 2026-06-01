'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { categoryMeta, type Article } from '@/lib/articles'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface Props {
  article: Article
  variant?: 'default' | 'compact' | 'featured'
  index?: number
}

export default function ArticleCard({ article, variant = 'default', index = 0 }: Props) {
  const meta = categoryMeta[article.category]

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
        viewport={{ once: true, margin: '-40px' }}
        className="group"
      >
        <Link
          href={`/articles/${article.slug}`}
          className="relative flex flex-col h-full rounded-3xl overflow-hidden bg-surface border border-border hover:border-primary/30 transition-colors duration-300"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Kicker + category */}
            <div className="absolute top-5 left-5">
              <span
                className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-white bg-ink/85 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <span style={{ color: meta.color }}>{meta.kicker}</span>
                <span className="opacity-50">·</span>
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center gap-3 text-xs text-ink-subtle mb-4 font-mono tracking-wide tabular-nums">
              <time>{formatDate(article.publishedAt)}</time>
              <span className="w-1 h-1 rounded-full bg-ink-subtle" />
              <span>{article.readMinutes} MIN READ</span>
            </div>
            <h3 className="font-display font-semibold text-2xl lg:text-[1.75rem] text-ink leading-[1.1] mb-4 text-balance group-hover:text-primary transition-colors duration-200">
              {article.title}
            </h3>
            <p className="text-ink-muted leading-relaxed flex-1">{article.summary}</p>

            <div className="mt-7 inline-flex items-center gap-2 text-primary font-bold text-sm">
              <span className="border-b border-primary/30 pb-0.5">Read article</span>
              <motion.svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </motion.svg>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="group"
      >
        <Link
          href={`/articles/${article.slug}`}
          className="flex gap-4 items-start p-3 rounded-2xl hover:bg-surface transition-colors duration-200"
        >
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-surface-raised">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] uppercase mb-1.5"
              style={{ color: meta.color }}
            >
              {meta.kicker} · {article.category}
            </span>
            <h4 className="font-display font-semibold text-base leading-snug text-ink group-hover:text-primary transition-colors line-clamp-2 mb-1">
              {article.title}
            </h4>
            <p className="text-xs text-ink-subtle tabular-nums">{article.readMinutes} MIN READ</p>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link
        href={`/articles/${article.slug}`}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* Kicker + category */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-white bg-ink/85 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <span style={{ color: meta.color }}>{meta.kicker}</span>
              <span className="opacity-50">·</span>
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-[11px] text-ink-subtle mb-3 font-mono tracking-wide tabular-nums">
            <time>{formatDate(article.publishedAt)}</time>
            <span className="w-1 h-1 rounded-full bg-ink-subtle" />
            <span>{article.readMinutes} MIN</span>
          </div>
          <h3 className="font-display font-semibold text-lg text-ink leading-snug mb-2.5 text-balance group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3">
            {article.summary}
          </p>
          <div className="mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-bold">
            <span className="border-b border-primary/30 pb-0.5">Read more</span>
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
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

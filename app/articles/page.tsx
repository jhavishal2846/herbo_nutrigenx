'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import {
  getAll,
  categories,
  categoryMeta,
  type Category,
} from '@/lib/articles'

const PER_PAGE = 9
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ArticlesPage() {
  const all = useMemo(() => getAll(), [])
  const [activeCat, setActiveCat] = useState<Category | 'All'>('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter((a) => {
      if (activeCat !== 'All' && a.category !== activeCat) return false
      if (q && !a.title.toLowerCase().includes(q) && !a.summary.toLowerCase().includes(q))
        return false
      return true
    })
  }, [all, activeCat, query])

  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const setCategory = (c: Category | 'All') => {
    setActiveCat(c)
    setPage(1)
  }

  return (
    <>
      <PageHeader
        title="The Library"
        subtitle="A growing collection of evidence-based articles on nutrition, sleep, immunity, and the science of feeling well."
        breadcrumbs={[{ label: 'Articles' }]}
        tag="All Articles"
        variant="cream"
      />

      <section className="py-16 bg-bg">
        <div className="container-wide">
          {/* Filters */}
          <div className="mb-12 flex flex-col gap-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative max-w-xl"
            >
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                placeholder="Search articles…"
                className="w-full pl-14 pr-5 py-4 rounded-full bg-surface border border-border text-ink placeholder:text-ink-subtle text-sm outline-none focus:border-primary transition-colors"
                aria-label="Search articles"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      setQuery('')
                      setPage(1)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface-raised hover:bg-border text-ink-subtle inline-flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Category pills with layout-animated active marker */}
            <LayoutGroup>
              <div className="flex flex-wrap gap-2">
                <CategoryPill
                  label="All"
                  active={activeCat === 'All'}
                  onClick={() => setCategory('All')}
                />
                {categories.map((c) => {
                  const count = all.filter((a) => a.category === c).length
                  if (count === 0) return null
                  return (
                    <CategoryPill
                      key={c}
                      label={c}
                      color={categoryMeta[c].color}
                      active={activeCat === c}
                      onClick={() => setCategory(c)}
                    />
                  )
                })}
              </div>
            </LayoutGroup>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCat}-${query}-${page}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {visible.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="font-display text-3xl italic text-ink mb-2">No matches.</p>
                  <p className="text-ink-muted">
                    Try a different topic or search term — or{' '}
                    <button
                      onClick={() => {
                        setActiveCat('All')
                        setQuery('')
                        setPage(1)
                      }}
                      className="text-primary font-semibold underline underline-offset-2"
                    >
                      reset filters
                    </button>
                    .
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <Pagination
            total={filtered.length}
            perPage={PER_PAGE}
            current={page}
            onChange={(p) => {
              setPage(p)
              window.scrollTo({ top: 200, behavior: 'smooth' })
            }}
          />
        </div>
      </section>
    </>
  )
}

function CategoryPill({
  label,
  active,
  onClick,
  color,
}: {
  label: string
  active: boolean
  onClick: () => void
  color?: string
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
        active
          ? 'text-white'
          : 'bg-surface border border-border text-ink-muted hover:border-primary/40 hover:text-primary'
      }`}
    >
      {active && (
        <motion.span
          layoutId="cat-pill"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color || '#1F7A3D' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}

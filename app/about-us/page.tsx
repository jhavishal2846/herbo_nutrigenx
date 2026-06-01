'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import WordReveal from '@/components/WordReveal'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const values = [
  {
    n: '01',
    title: 'Evidence over opinion.',
    desc: 'Every article is grounded in published research. When science is uncertain, we say so.',
  },
  {
    n: '02',
    title: 'Plain, calm language.',
    desc: 'Wellness has too many gurus and not enough patient explainers. We aim for the latter.',
  },
  {
    n: '03',
    title: 'Whole-body thinking.',
    desc: 'Gut, brain, sleep and immunity are one system. Our content treats them that way.',
  },
  {
    n: '04',
    title: 'No hidden agenda.',
    desc: 'We do not sell supplements, run affiliate links, or rank brands. We just teach.',
  },
]

const editorialSteps = [
  {
    n: '01',
    title: 'Pick the question.',
    desc: 'We start from a real, common question — not a keyword. "Does fiber matter?" beats "Top 10 fiber facts."',
  },
  {
    n: '02',
    title: 'Read the science.',
    desc: 'Peer-reviewed papers, systematic reviews, and named expert sources only. We log everything we cite.',
  },
  {
    n: '03',
    title: "Translate, don't simplify.",
    desc: 'A good wellness article respects the reader. We keep the nuance and strip the jargon.',
  },
  {
    n: '04',
    title: 'Make it usable.',
    desc: 'Every piece ends with what to actually do — habits you can pick up tomorrow morning.',
  },
]

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: missionRef,
    offset: ['start end', 'end start'],
  })
  const quoteY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  return (
    <>
      <PageHeader
        title="A quieter place to learn about your body."
        subtitle="Herbo Nutrigenx is an evidence-based wellness library — written for people who want to understand, not be sold to."
        breadcrumbs={[{ label: 'About' }]}
        tag="About"
        variant="cream"
      />

      {/* Mission */}
      <section id="mission" ref={missionRef} className="py-28 bg-bg overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            {/* Side label */}
            <motion.div
              style={{ y: quoteY }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 self-start"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                  Our mission
                </span>
              </div>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                viewport={{ once: true }}
                className="font-display font-semibold text-4xl lg:text-6xl text-ink leading-[0.98] mb-8 text-balance tracking-[-0.02em]"
              >
                Most wellness content is written to sell.{' '}
                <span className="italic text-primary">We write to teach.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                viewport={{ once: true }}
                className="prose-herbal text-lg"
              >
                <p>
                  Walk into any drugstore and you&apos;ll see a wall of pills, gummies and powders with
                  very confident claims. Walk online and you&apos;ll see a wall of influencers with
                  even more confident claims. Somewhere underneath all of that is a real,
                  fascinating science — one about how cells age, how the gut shapes mood, how a
                  single night of bad sleep changes everything for the next day.
                </p>
                <p>
                  Herbo Nutrigenx is the library we wished existed. Articles long enough to
                  actually explain something, short enough to read with a coffee, written by people
                  who care more about being right than being loud.
                </p>
                <blockquote>
                  We want to be the friend who took a biology degree and reads the journals so you
                  don&apos;t have to.
                </blockquote>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="approach" className="py-28 bg-surface-raised leaf-pattern relative">
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                  What we value
                </span>
              </div>
              <h2 className="font-display font-semibold text-4xl lg:text-6xl text-ink text-balance leading-[0.95] tracking-[-0.02em]">
                <WordReveal text="Four things we" startInView />{' '}
                <span className="italic text-primary">won&apos;t</span>{' '}
                <WordReveal text="compromise on." startInView delay={0.2} />
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.1 }}
                viewport={{ once: true, margin: '-40px' }}
                className="group relative bg-surface p-9 lg:p-10 overflow-hidden"
              >
                <motion.span
                  aria-hidden
                  className="absolute top-0 left-0 h-1 bg-lime"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: EASE }}
                  viewport={{ once: true }}
                />
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[11px] tabular-nums text-lime tracking-[0.25em]">
                    {v.n}
                  </span>
                  <span className="h-px w-8 bg-lime/40" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-ink mb-3 leading-tight">
                  {v.title}
                </h3>
                <p className="text-ink-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial process */}
      <section id="standards" className="py-28 bg-bg">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                Editorial process
              </span>
            </div>
            <h2 className="font-display font-semibold text-4xl lg:text-6xl text-ink text-balance leading-[0.95] tracking-[-0.02em]">
              How an article{' '}
              <span className="italic text-primary">gets made</span>.
            </h2>
          </motion.div>

          {/* Connected timeline */}
          <div className="relative">
            <motion.span
              aria-hidden
              className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: EASE }}
              viewport={{ once: true }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px lg:gap-0 bg-border lg:bg-transparent">
              {editorialSteps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative bg-bg p-7 lg:p-8 lg:pr-12"
                >
                  <span className="hidden lg:block absolute top-12 left-7 w-3 h-3 rounded-full bg-lime ring-4 ring-bg" />
                  <span className="font-mono text-[11px] tracking-[0.25em] text-lime tabular-nums">
                    {s.n}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-ink mt-5 mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 helix-pattern opacity-25" />
        <motion.div
          aria-hidden
          className="absolute -right-24 -bottom-24 w-[460px] h-[460px] rounded-full border border-lime/15"
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-semibold text-5xl lg:text-7xl text-white mb-6 text-balance leading-[0.95] tracking-[-0.02em]">
              Read your{' '}
              <span className="italic text-lime">first article</span>.
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
              Or get one delivered, every Sunday, with the kind of patience the internet lost a
              while ago.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-lime text-primary-dark text-sm font-bold hover:bg-lime-light transition-colors"
              >
                Browse the library
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white text-sm font-bold hover:bg-white/10 transition-colors"
              >
                Say hello
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

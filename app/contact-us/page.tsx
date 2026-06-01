'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import PageHeader from '@/components/PageHeader'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const reasons = [
  {
    n: '01',
    title: 'Pitch a topic.',
    desc: "There's a question you want answered — and we haven't covered it yet.",
  },
  {
    n: '02',
    title: 'Correct something.',
    desc: 'You spotted a citation issue or want to add nuance. We always want to know.',
  },
  {
    n: '03',
    title: 'Work together.',
    desc: "You're a researcher, clinician, or writer who likes how we work. Get in touch.",
  },
  {
    n: '04',
    title: 'Just say hi.',
    desc: 'A real human reads every message. Even the short ones. Especially the short ones.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [newsletter, setNewsletter] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)

  return (
    <>
      <PageHeader
        title="Say hello."
        subtitle="Questions, tips, pitches, corrections — we read everything. Usually reply within a day or two."
        breadcrumbs={[{ label: 'Contact' }]}
        tag="Contact"
        variant="cream"
      />

      <section className="py-24 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              viewport={{ once: true }}
              className="relative bg-surface border border-border rounded-3xl p-8 lg:p-12 overflow-hidden"
            >
              <motion.span
                aria-hidden
                className="absolute top-0 left-0 h-1 bg-lime"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.4, ease: EASE }}
                viewport={{ once: true }}
              />
              <h2 className="font-display font-semibold text-4xl text-ink mb-8 tracking-[-0.01em]">
                Send a message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-lime text-primary-dark flex items-center justify-center mx-auto mb-6 font-display text-3xl"
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-display font-semibold text-3xl text-ink mb-2 italic">
                    Got it. Thanks.
                  </h3>
                  <p className="text-ink-muted">
                    We&apos;ll reply to <span className="font-semibold text-ink">{form.email}</span>{' '}
                    within a couple of days.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="space-y-5"
                >
                  <Field label="Your name">
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg border border-border text-ink text-sm outline-none focus:border-primary transition-colors"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg border border-border text-ink text-sm outline-none focus:border-primary transition-colors"
                    />
                  </Field>
                  <Field label="What's this about?">
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg border border-border text-ink text-sm outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option value="general">A general question</option>
                      <option value="pitch">Pitching a topic</option>
                      <option value="correction">A correction or follow-up</option>
                      <option value="collab">Collaboration</option>
                      <option value="press">Press / media</option>
                    </select>
                  </Field>
                  <Field label="Message">
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg border border-border text-ink text-sm outline-none focus:border-primary transition-colors resize-none"
                    />
                  </Field>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
                  >
                    Send message
                    <motion.svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      whileHover={{ x: 3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </motion.svg>
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Reasons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-semibold text-3xl text-ink tracking-[-0.01em] mb-6">
                Why people <span className="italic text-primary">write</span>
              </h3>

              <div className="space-y-px bg-border">
                {reasons.map((r, i) => (
                  <motion.div
                    key={r.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex gap-5 p-6 bg-surface hover:bg-primary-50 transition-colors"
                  >
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-lime tabular-nums pt-1.5 flex-shrink-0">
                      {r.n}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-lg text-ink mb-1.5">{r.title}</p>
                      <p className="text-sm text-ink-muted leading-relaxed">{r.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 p-8 rounded-2xl bg-primary text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 helix-pattern opacity-20 pointer-events-none" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime-light mb-3 relative">
                  Direct email
                </p>
                <a
                  href="mailto:hello@herbonutrigenx.com"
                  className="font-display text-2xl lg:text-3xl text-white hover:text-lime-light transition-colors block tracking-[-0.01em] relative"
                >
                  hello@herbonutrigenx.com
                </a>
                <p className="text-sm text-white/70 mt-4 relative">
                  Real humans, not a ticket queue. Reply usually within 1–2 days.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-24 bg-surface-raised leaf-pattern relative">
        <div className="container-narrow relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                Newsletter
              </span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-display font-semibold text-5xl lg:text-6xl text-ink mb-5 text-balance leading-[0.95] tracking-[-0.02em]">
              The <span className="italic text-primary">Sunday Read</span>.
            </h2>
            <p className="text-ink-muted text-lg mb-10 max-w-lg mx-auto">
              One carefully picked article every week. No tracking pixels, no upsells, easy to leave.
            </p>

            {newsletterDone ? (
              <p className="font-display text-2xl text-primary italic">
                You&apos;re subscribed. See you Sunday.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setNewsletterDone(true)
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  required
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="flex-1 px-5 py-4 rounded-full bg-surface border border-border text-ink text-sm outline-none focus:border-primary transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-7 py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-ink-subtle mb-2">
        {label}
      </span>
      {children}
    </label>
  )
}

'use client'

import { useState } from 'react'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[420px]"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        disabled={done}
        className="flex-1 px-5 py-3.5 rounded-full bg-white/8 border border-white/10 text-white placeholder:text-white/35 text-sm outline-none focus:bg-white/12 focus:border-lime/40 transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={done}
        className="px-6 py-3.5 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark disabled:opacity-60 transition-colors whitespace-nowrap"
      >
        {done ? '✓ Subscribed' : 'Subscribe'}
      </button>
    </form>
  )
}

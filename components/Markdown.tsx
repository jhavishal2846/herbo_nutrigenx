import { ReactNode } from 'react'

/* Tiny markdown renderer tuned for our wellness article bodies.
   Supports: ## h2, ### h3, **bold**, *italic*, - lists, > blockquotes, paragraphs. */

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let i = 0
  let key = 0
  while (i < text.length) {
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2)
      if (end !== -1) {
        out.push(<strong key={key++}>{text.slice(i + 2, end)}</strong>)
        i = end + 2
        continue
      }
    }
    if (text[i] === '*' && text[i + 1] !== '*') {
      const end = text.indexOf('*', i + 1)
      if (end !== -1) {
        out.push(<em key={key++}>{text.slice(i + 1, end)}</em>)
        i = end + 1
        continue
      }
    }
    // accumulate plain text up to next marker
    let next = text.length
    const a = text.indexOf('**', i)
    const b = text.indexOf('*', i + 1) > i ? text.indexOf('*', i) : -1
    if (a !== -1) next = Math.min(next, a)
    if (b !== -1) next = Math.min(next, b)
    out.push(<span key={key++}>{text.slice(i, next)}</span>)
    i = next
  }
  return out
}

export default function Markdown({ source }: { source: string }) {
  const lines = source.split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('### ')) {
      blocks.push(<h3 key={key++}>{renderInline(line.slice(4))}</h3>)
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push(<h2 key={key++}>{renderInline(line.slice(3))}</h2>)
      i++
      continue
    }
    if (line.startsWith('> ')) {
      // gather contiguous blockquote lines
      const buf: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        buf.push(lines[i].slice(2))
        i++
      }
      blocks.push(<blockquote key={key++}>{renderInline(buf.join(' '))}</blockquote>)
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push(
        <ul key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>
      )
      continue
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push(
        <ol key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ol>
      )
      continue
    }
    if (line.trim() === '') {
      i++
      continue
    }
    // paragraph: collect until blank line / new block marker
    const buf: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('> ') &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      buf.push(lines[i])
      i++
    }
    blocks.push(<p key={key++}>{renderInline(buf.join(' '))}</p>)
  }

  return <div className="prose-herbal">{blocks}</div>
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  categories,
  categoryMeta,
  categorySlug,
  categoryFromSlug,
  getByCategory,
} from '@/lib/articles'
import TopicView from './TopicView'

interface Props {
  params: Promise<{ topic: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ topic: categorySlug(c) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params
  const category = categoryFromSlug(topic)
  if (!category) return { title: 'Topic not found' }
  return {
    title: category,
    description: categoryMeta[category].description,
  }
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params
  const category = categoryFromSlug(topic)
  if (!category) notFound()

  const meta = categoryMeta[category]
  const list = getByCategory(category)

  return (
    <TopicView
      category={category}
      kicker={meta.kicker}
      description={meta.description}
      color={meta.color}
      articles={list}
    />
  )
}

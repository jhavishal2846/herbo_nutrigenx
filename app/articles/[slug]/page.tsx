import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles, getBySlug, getRelated, categoryMeta } from '@/lib/articles'
import ArticleView from './ArticleView'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getBySlug(slug)
  if (!article) return { title: 'Not Found' }
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.image }],
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getBySlug(slug)
  if (!article) notFound()
  const related = getRelated(slug, 3)
  const meta = categoryMeta[article.category]
  return <ArticleView article={article} related={related} meta={meta} />
}

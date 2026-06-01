import { articles, categories, type Article, type Category } from './data'

export { articles, categories }
export type { Article, Category }

export function getAll(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getByCategory(category: Category): Article[] {
  return getAll().filter((a) => a.category === category)
}

export function getFeatured(limit = 3): Article[] {
  return getAll().filter((a) => a.featured).slice(0, limit)
}

export function getLatest(limit = 6): Article[] {
  return getAll().slice(0, limit)
}

export function getRelated(slug: string, limit = 3): Article[] {
  const current = getBySlug(slug)
  if (!current) return []
  return getAll()
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit)
}

export function getCategoryCounts(): { category: Category; count: number }[] {
  return categories.map((c) => ({
    category: c,
    count: articles.filter((a) => a.category === c).length,
  }))
}

export const categorySlug = (c: Category): string =>
  c.toLowerCase().replace(/\s+/g, '-')

export const categoryFromSlug = (slug: string): Category | undefined =>
  categories.find((c) => categorySlug(c) === slug)

export const categoryMeta: Record<
  Category,
  { number: string; kicker: string; description: string; color: string }
> = {
  Nutrition: {
    number: '01',
    kicker: 'Eat',
    description: 'Whole-food eating, macros, weight management and meal planning.',
    color: '#8BC53F',
  },
  Immunity: {
    number: '02',
    kicker: 'Defend',
    description: 'Strengthen your natural defenses with food, sleep and supportive habits.',
    color: '#D49E4A',
  },
  'Mental Wellness': {
    number: '03',
    kicker: 'Quiet',
    description: 'Stress, focus, mindfulness, and tools for an easier inner life.',
    color: '#7C9EE0',
  },
  Sleep: {
    number: '04',
    kicker: 'Rest',
    description: 'The science of rest — sleep stages, naps, and rituals for deeper recovery.',
    color: '#5D7CB0',
  },
  'Gut Health': {
    number: '05',
    kicker: 'Digest',
    description: 'Your microbiome, prebiotics, probiotics and the gut–brain axis.',
    color: '#2E9B52',
  },
  Fitness: {
    number: '06',
    kicker: 'Move',
    description: 'Cellular benefits of movement, strength, cardio and recovery.',
    color: '#E07C5D',
  },
  'Cellular Health': {
    number: '07',
    kicker: 'Repair',
    description: 'Aging, telomeres, oxidative stress and the building blocks of vitality.',
    color: '#1F7A3D',
  },
  Lifestyle: {
    number: '08',
    kicker: 'Live',
    description: 'Daily rituals, hydration, holistic living and balance.',
    color: '#B17F2E',
  },
}

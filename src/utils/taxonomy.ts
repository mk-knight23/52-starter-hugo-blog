import { getAllContent } from './contentLoader'

export interface Tag {
  name: string
  count: number
  slug: string
}

export interface Category {
  name: string
  count: number
  slug: string
}

export interface TaxonomyContent {
  tags: string[]
  category: string
}

// Get all unique tags with counts
export async function getAllTags(): Promise<Tag[]> {
  const content = await getAllContent()
  const tagMap = new Map<string, number>()

  content.forEach((item) => {
    const tags = item.frontmatter.tags || []
    tags.forEach((tag: string) => {
      const count = tagMap.get(tag) || 0
      tagMap.set(tag, count + 1)
    })
  })

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    }))
    .sort((a, b) => b.count - a.count)
}

// Get all unique categories with counts
export async function getAllCategories(): Promise<Category[]> {
  const content = await getAllContent()
  const categoryMap = new Map<string, number>()

  content.forEach((item) => {
    const category = item.frontmatter.category || 'Uncategorized'
    const count = categoryMap.get(category) || 0
    categoryMap.set(category, count + 1)
  })

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

// Get content by tag
export async function getContentByTag(tag: string) {
  const content = await getAllContent()
  return content.filter((item) => {
    const tags = item.frontmatter.tags || []
    return tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
  })
}

// Get content by category
export async function getContentByCategory(category: string) {
  const content = await getAllContent()
  return content.filter((item) => {
    const itemCategory = item.frontmatter.category || 'Uncategorized'
    return itemCategory.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  })
}

// Get related content by tags
export async function getRelatedContent(currentSlug: string, limit = 3) {
  const content = await getAllContent()
  const current = content.find((item) => item.slug === currentSlug)

  if (!current) return []

  const currentTags = current.frontmatter.tags || []

  const related = content
    .filter((item) => {
      if (item.slug === currentSlug) return false

      const itemTags = item.frontmatter.tags || []
      const sharedTags = itemTags.filter((tag: string) =>
        currentTags.some((ct: string) => ct.toLowerCase() === tag.toLowerCase())
      )

      return sharedTags.length > 0
    })
    .map((item) => ({
      ...item,
      relevance: (
        item.frontmatter.tags?.filter((tag: string) =>
          currentTags.some((ct: string) => ct.toLowerCase() === tag.toLowerCase())
        ).length || 0
      )
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ relevance, ...item }) => item)

  return related
}

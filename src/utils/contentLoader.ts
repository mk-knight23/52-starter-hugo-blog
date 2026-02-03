// Client-side content loader using Vite's glob imports
const contentModules = import.meta.glob('../content/**/*.md', { as: 'raw' })

export interface Frontmatter {
  title: string
  description: string
  date: string
  category: string
  author: string
  slug?: string
  tags?: string[]
}

export interface ContentItem {
  slug: string
  frontmatter: Frontmatter
  content: string
}

// Cache for loaded content
let contentCache: ContentItem[] | null = null

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {
      frontmatter: {
        title: 'Untitled',
        description: '',
        date: new Date().toISOString(),
        category: 'General',
        author: 'Unknown'
      },
      content
    }
  }

  const frontmatterLines = match[1]!.split('\n')
  const frontmatter: Partial<Frontmatter> = {}

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value: string | string[] = line.slice(colonIndex + 1).trim()

    // Remove quotes if present
    if ((value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1)
    }

    // Parse array values
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''))
    }

    (frontmatter as any)[key] = value
  }

  return {
    frontmatter: {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      date: frontmatter.date || new Date().toISOString(),
      category: frontmatter.category || 'General',
      author: frontmatter.author || 'Unknown',
      tags: frontmatter.tags || []
    },
    content: match[2]!
  }
}

/**
 * Load all markdown content
 */
export async function getAllContent(): Promise<ContentItem[]> {
  if (contentCache) {
    return contentCache
  }

  const items: ContentItem[] = []

  for (const path in contentModules) {
    const content = await contentModules[path]()
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)

    // Extract slug from path
    // path format: ../content/category/slug.md
    const match = path.match(/\.\.\/content\/(.+)\/(.+)\.md/)
    if (match) {
      const category = match[1]!
      const slug = match[2]!

      items.push({
        slug,
        frontmatter: {
          ...frontmatter,
          slug,
          category: category
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        },
        content: markdownContent
      })
    }
  }

  contentCache = items
  return items
}

/**
 * Get content by slug
 */
export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const allContent = await getAllContent()
  return allContent.find(item => item.slug === slug) || null
}

/**
 * Get content by category
 */
export async function getContentByCategory(category: string): Promise<ContentItem[]> {
  const allContent = await getAllContent()
  return allContent.filter(item =>
    item.frontmatter.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Search content by title or description
 */
export async function searchContent(query: string): Promise<ContentItem[]> {
  const allContent = await getAllContent()
  const lowerQuery = query.toLowerCase()

  return allContent.filter(item =>
    item.frontmatter.title.toLowerCase().includes(lowerQuery) ||
    item.frontmatter.description.toLowerCase().includes(lowerQuery) ||
    item.content.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<string[]> {
  const allContent = await getAllContent()
  const categories = new Set(allContent.map(item => item.frontmatter.category))
  return Array.from(categories).sort()
}

/**
 * Get content for sitemap (build-time only)
 */
export function getSitemapContent(): Array<{
  url: string
  lastmod: string
}> {
  // This would be used by build scripts, not at runtime
  return []
}

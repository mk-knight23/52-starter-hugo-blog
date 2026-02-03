import RSS from 'rss'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://yourdomain.com'

// Read content directory and build items
function buildContentFromDir(dir: string): any[] {
  const items: any[] = []

  if (!fs.existsSync(dir)) {
    return items
  }

  const files = fs.readdirSync(dir, { recursive: true }) as string[]

  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (!stat.isFile()) continue

    const content = fs.readFileSync(filePath, 'utf-8')

    // Extract frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
    const match = content.match(frontmatterRegex)

    let title = 'Untitled'
    let description = ''
    let date = new Date().toISOString()
    let author = 'DOCS. Team'
    let category = 'General'

    if (match) {
      const frontmatterStr = match[1]!

      const titleMatch = frontmatterStr.match(/title:\s*(.+)/)
      const descMatch = frontmatterStr.match(/description:\s*(.+)/)
      const dateMatch = frontmatterStr.match(/date:\s*(.+)/)
      const authorMatch = frontmatterStr.match(/author:\s*(.+)/)
      const catMatch = frontmatterStr.match(/category:\s*(.+)/)

      if (titleMatch) title = titleMatch[1]!.replace(/['"]/g, '').trim()
      if (descMatch) description = descMatch[1]!.replace(/['"]/g, '').trim()
      if (dateMatch) date = dateMatch[1]!.replace(/['"]/g, '').trim()
      if (authorMatch) author = authorMatch[1]!.replace(/['"]/g, '').trim()
      if (catMatch) category = catMatch[1]!.replace(/['"]/g, '').trim()
    }

    const slug = file.replace('.md', '')
    const url = `${SITE_URL}/${category.toLowerCase().replace(' ', '-')}/${slug}`

    items.push({
      title,
      description,
      url,
      date,
      author,
      category
    })
  }

  return items
}

interface RSSFeedOptions {
  title: string
  description: string
  feed_url: string
  site_url: string
  language?: string
  pubDate?: Date
}

function generateRSSFeed(options: RSSFeedOptions, items: any[]) {
  const feed = new RSS({
    title: options.title,
    description: options.description,
    feed_url: options.feed_url,
    site_url: options.site_url,
    language: options.language || 'en',
    pubDate: options.pubDate || new Date(),
    ttl: 60
  })

  // Add items to feed
  items.forEach(item => {
    feed.item({
      title: item.title,
      description: item.description,
      url: item.url,
      date: new Date(item.date),
      author: item.author,
      categories: [item.category]
    })
  })

  return feed.xml({ indent: true })
}

function main() {
  const contentDir = path.resolve(__dirname, '../src/content')
  const allItems: any[] = []

  // Load all content
  if (fs.existsSync(contentDir)) {
    const categories = fs.readdirSync(contentDir, { withFileTypes: true })

    for (const category of categories) {
      if (!category.isDirectory()) continue

      const categoryPath = path.join(contentDir, category.name)
      const items = buildContentFromDir(categoryPath)
      allItems.push(...items)
    }
  }

  const xml = generateRSSFeed({
    title: 'DOCS. Knowledge Base',
    description: 'Latest documentation and tutorials from DOCS.',
    feed_url: `${SITE_URL}/feed.xml`,
    site_url: SITE_URL,
    language: 'en'
  }, allItems)

  // Ensure public directory exists
  const publicDir = path.resolve(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Write RSS feed
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), xml)

  console.log('✅ RSS feed generated successfully!')
  console.log(`   Total items: ${allItems.length}`)
}

main()

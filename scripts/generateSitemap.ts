import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOMAIN = 'https://yourdomain.com'

interface SitemapURL {
  url: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

function generateSitemapXML(urls: SitemapURL[]): string {
  const urlEntries = urls.map(({ url, lastmod, changefreq, priority }) =>
    `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

// Read content directory and build sitemap
function buildContentFromDir(dir: string, basePath: string = ''): any[] {
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
    let date = new Date().toISOString().split('T')[0]
    let category = 'General'

    if (match) {
      const frontmatterStr = match[1]!
      const titleMatch = frontmatterStr.match(/title:\s*(.+)/)
      const dateMatch = frontmatterStr.match(/date:\s*(.+)/)

      if (titleMatch) title = titleMatch[1]!.replace(/['"]/g, '').trim()
      if (dateMatch) date = dateMatch[1]!.replace(/['"]/g, '').trim()
    }

    const slug = file.replace('.md', '')
    const categoryPath = basePath || path.basename(dir)

    items.push({
      slug,
      category: categoryPath,
      title,
      date
    })
  }

  return items
}

function main() {
  const contentDir = path.resolve(__dirname, '../src/content')
  const urls: SitemapURL[] = [
    // Homepage
    {
      url: DOMAIN,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0
    }
  ]

  // Add content pages
  if (fs.existsSync(contentDir)) {
    const categories = fs.readdirSync(contentDir, { withFileTypes: true })

    for (const category of categories) {
      if (!category.isDirectory()) continue

      const categoryPath = path.join(contentDir, category.name)
      const items = buildContentFromDir(categoryPath, category.name)

      for (const item of items) {
        urls.push({
          url: `${DOMAIN}/${item.category.toLowerCase().replace(' ', '-')}/${item.slug}`,
          lastmod: item.date,
          changefreq: 'weekly',
          priority: 0.8
        })
      }
    }
  }

  const sitemap = generateSitemapXML(urls)

  // Ensure public directory exists
  const publicDir = path.resolve(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Write sitemap
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

  console.log('✅ Sitemap generated successfully!')
  console.log(`   Total URLs: ${urls.length}`)
}

main()

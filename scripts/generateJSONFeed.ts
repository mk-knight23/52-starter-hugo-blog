import fs from 'fs'
import path from 'path'
import { getAllContent } from '../src/utils/contentLoader'

const SITE_URL = 'https://yourdomain.com'

interface JSONFeedItem {
  id: string
  url: string
  title: string
  content_html: string
  summary: string
  date_published: string
  authors: Array<{ name: string }>
  tags: string[]
}

interface JSONFeed {
  version: string
  title: string
  description: string
  home_page_url: string
  feed_url: string
  icon: string
  items: JSONFeedItem[]
}

function generateJSONFeed(): JSONFeed {
  const content = getAllContent()

  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'DOCS. Knowledge Base',
    description: 'Latest documentation and tutorials from DOCS.',
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    icon: `${SITE_URL}/logo.png`,
    items: content.map(item => ({
      id: item.slug,
      url: `${SITE_URL}/${item.frontmatter.category.toLowerCase().replace(' ', '-')}/${item.slug}`,
      title: item.frontmatter.title,
      content_html: item.content,
      summary: item.frontmatter.description,
      date_published: item.frontmatter.date,
      authors: [{ name: item.frontmatter.author }],
      tags: [item.frontmatter.category, ...(item.frontmatter.tags || [])]
    }))
  }
}

function main() {
  const feed = generateJSONFeed()

  // Ensure public directory exists
  const publicDir = path.resolve(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Write JSON feed
  fs.writeFileSync(
    path.join(publicDir, 'feed.json'),
    JSON.stringify(feed, null, 2)
  )

  console.log('✅ JSON feed generated successfully!')
}

main()

import { useHead } from '@vueuse/head'

export interface MetaTags {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedDate?: string
  modifiedDate?: string
  tags?: string[]
  category?: string
  siteName?: string
}

const DEFAULT_SITE_URL = 'https://yourdomain.com'
const DEFAULT_SITE_NAME = 'DOCS.'
const DEFAULT_IMAGE = '/og-image.png'

export function useSEO(meta: MetaTags) {
  const fullTitle = meta.siteName
    ? `${meta.title} | ${meta.siteName}`
    : `${meta.title} | ${DEFAULT_SITE_NAME}`

  const url = meta.url || DEFAULT_SITE_URL
  const image = meta.image || DEFAULT_IMAGE

  const metaTags: any[] = [
    // Basic meta tags
    { name: 'description', content: meta.description },
    { name: 'author', content: meta.author || DEFAULT_SITE_NAME },

    // Open Graph / Facebook
    { property: 'og:type', content: meta.type || 'website' },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: meta.siteName || DEFAULT_SITE_NAME },

    // Article specific
    ...(meta.type === 'article'
      ? [
          { property: 'article:author', content: meta.author || '' },
          ...(meta.publishedDate
            ? [{ property: 'article:published_time', content: meta.publishedDate }]
            : []),
          ...(meta.modifiedDate
            ? [{ property: 'article:modified_time', content: meta.modifiedDate }]
            : []),
          ...(meta.category
            ? [{ property: 'article:section', content: meta.category }]
            : []),
          ...(meta.tags?.map((tag) => ({ property: 'article:tag', content: tag })) ||
            [])
        ]
      : []),

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: image },

    // Additional SEO
    { name: 'keywords', content: meta.tags?.join(', ') || '' }
  ]

  useHead({
    title: fullTitle,
    meta: metaTags,
    link: [{ rel: 'canonical', href: url }]
  })
}

// Generate structured data (JSON-LD)
export function generateStructuredData(type: 'website' | 'article', data: any) {
  let structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite'
  }

  if (type === 'article' && data) {
    structuredData = {
      ...structuredData,
      headline: data.title,
      description: data.description,
      image: data.image || DEFAULT_IMAGE,
      datePublished: data.publishedDate,
      dateModified: data.modifiedDate || data.publishedDate,
      author: {
        '@type': 'Person',
        name: data.author || DEFAULT_SITE_NAME
      },
      publisher: {
        '@type': 'Organization',
        name: data.siteName || DEFAULT_SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${DEFAULT_SITE_URL}/logo.png`
        }
      }
    }
  } else if (type === 'website') {
    structuredData = {
      ...structuredData,
      url: DEFAULT_SITE_URL,
      name: data.siteName || DEFAULT_SITE_NAME,
      description: data.description
    }
  }

  return JSON.stringify(structuredData)
}

// Inject structured data into page
export function useStructuredData(type: 'website' | 'article', data: any) {
  const jsonLd = generateStructuredData(type, data)

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: jsonLd
      }
    ]
  })
}

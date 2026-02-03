import { useHead } from '@vueuse/head'
import type { MetaProps } from '@vueuse/head'

export interface SEOMeta {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  url?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const defaultMeta: SEOMeta = {
  title: 'DOCS. | Knowledge Base',
  description: 'Complete documentation and knowledge base for developers.',
  image: '/og-image.png',
  type: 'website',
  url: 'https://yourdomain.com'
}

/**
 * Use SEO composable for managing meta tags
 */
export function useSEO(meta: SEOMeta = {}) {
  const fullTitle = meta.title
    ? `${meta.title} | DOCS.`
    : defaultMeta.title

  const fullUrl = meta.url || defaultMeta.url

  const metaTags: MetaProps = [
    // Primary Meta
    { name: 'description', content: meta.description || defaultMeta.description },
    { name: 'keywords', content: meta.tags?.join(', ') || '' },

    // OpenGraph / Facebook
    { property: 'og:type', content: meta.type || defaultMeta.type },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: meta.description || defaultMeta.description },
    { property: 'og:image', content: meta.image || defaultMeta.image },
    { property: 'og:url', content: fullUrl },

    // Article-specific OpenGraph
    ...(meta.type === 'article' ? [
      { property: 'article:published_time', content: meta.publishedTime || '' },
      { property: 'article:modified_time', content: meta.modifiedTime || '' },
      { property: 'article:author', content: meta.author || '' },
      { property: 'article:section', content: meta.section || '' },
      ...(meta.tags?.map(tag => ({ property: 'article:tag', content: tag })) || [])
    ] : []),

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: meta.description || defaultMeta.description },
    { name: 'twitter:image', content: meta.image || defaultMeta.image },

    // Additional SEO
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'author', content: meta.author || 'DOCS. Team' }
  ]

  useHead({
    title: fullTitle,
    meta: metaTags,
    link: [
      { rel: 'canonical', href: fullUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(generateSchema(meta, fullTitle, fullUrl))
      }
    ]
  })
}

/**
 * Generate Schema.org structured data
 */
function generateSchema(meta: SEOMeta, title: string, url: string) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': meta.type === 'article' ? 'Article' : 'WebSite',
    headline: title,
    description: meta.description || defaultMeta.description,
    image: meta.image || defaultMeta.image,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'DOCS.',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    }
  }

  if (meta.type === 'article') {
    return {
      ...baseSchema,
      datePublished: meta.publishedTime,
      dateModified: meta.modifiedTime,
      author: {
        '@type': 'Person',
        name: meta.author || 'DOCS. Team'
      },
      articleSection: meta.section
    }
  }

  return {
    ...baseSchema,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: url + '/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

/**
 * Generate breadcrumb schema
 */
export function useBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  })
}

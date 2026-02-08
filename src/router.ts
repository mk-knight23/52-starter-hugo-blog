import type { RouteRecordRaw } from 'vue-router'
import type { ContentItem } from './utils/contentLoader'

// Content routes will be generated dynamically at runtime
const contentRoutes: RouteRecordRaw[] = []

// Helper function to generate routes from content items
export function generateContentRoutes(items: ContentItem[]): RouteRecordRaw[] {
  return items.map((item) => ({
    path: `/${item.frontmatter.category.toLowerCase().replace(' ', '-')}/${item.slug}`,
    component: () => import('./views/ArticleView.vue'),
    props: { slug: item.slug, frontmatter: item.frontmatter },
    meta: {
      title: item.frontmatter.title,
      description: item.frontmatter.description
    }
  }))
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
    meta: {
      title: 'DOCS. | Knowledge Base'
    }
  },
  {
    path: '/tags',
    component: () => import('./views/TagsView.vue'),
    meta: {
      title: 'Tags | DOCS.'
    }
  },
  {
    path: '/tag/:slug',
    component: () => import('./views/TagDetailView.vue'),
    props: true
  },
  {
    path: '/categories',
    component: () => import('./views/CategoriesView.vue'),
    meta: {
      title: 'Categories | DOCS.'
    }
  },
  {
    path: '/:category/:slug',
    component: () => import('./views/ArticleView.vue'),
    props: true
  },
  ...contentRoutes
]

declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{
    frontmatter: {
      title: string
      description: string
      date: string
      category: string
      author: string
      slug?: string
      tags?: string[]
    }
  }>

  export default component
}

declare module '@mdit-vue/types' {
  export interface MarkdownItEnv {
    frontmatter?: Record<string, any>
  }
}

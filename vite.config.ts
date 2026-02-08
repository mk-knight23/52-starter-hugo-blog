import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { resolve } from 'path'
import markdownItAnchor from 'markdown-it-anchor'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(mdit) {
        // Add anchor plugin for heading IDs
        mdit.use(markdownItAnchor, {
          permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'before'
          }),
          level: [1, 2, 3, 4, 5, 6],
          slugify: (s: string) => s
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
        })
      }
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  ssr: {
    noExternal: ['@vueuse/head']
  }
})

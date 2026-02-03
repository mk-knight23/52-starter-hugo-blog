---
title: Plugins & Extensions
description: Extend DOCS. with custom plugins and integrations.
date: 2026-01-29
category: Guides
author: DOCS. Team
---

# Plugins & Extensions

Extend DOCS. functionality with plugins.

## Official Plugins

### 1. Search Plugin

Full-text search across documentation.

```bash
npm install flexsearch
```

```typescript
// stores/search.ts
import FlexSearch from 'flexsearch'

export const useSearchStore = defineStore('search', () => {
  const index = new FlexSearch.Index({
    tokenize: 'forward',
    resolution: 9
  })

  function addDocument(id: string, content: string) {
    index.add(id, content)
  }

  function search(query: string) {
    return index.search(query)
  }

  return { index, addDocument, search }
})
```

### 2. Copy Code Button

Add copy button to code blocks.

```vue
<!-- components/CodeBlock.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  language: string
}>()

const copied = ref(false)

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative">
    <pre><code :class="`language-${language}`">{{ code }}</code></pre>
    <button
      @click="copyCode"
      class="absolute top-2 right-2 px-2 py-1 rounded text-sm"
    >
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
  </div>
</template>
```

### 3. Image Zoom

Click images to view fullscreen.

```bash
npm install medium-zoom
```

```typescript
// composables/useImageZoom.ts
import mediumZoom from 'medium-zoom'

export function useImageZoom() {
  onMounted(() => {
    mediumZoom('img', {
      background: 'rgba(0, 0, 0, 0.9)',
      scrollOffset: 0
    })
  })
}
```

## Integrations

### Google Analytics

Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'GA-XXXXXXXXXX')
</script>
```

Track page views in router:

```typescript
// router.ts
router.afterEach((to) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_path: to.fullPath
    })
  }
})
```

### Disqus Comments

Add comment sections.

```vue
<!-- components/Comments.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  identifier: string
  url: string
  title: string
}>()

onMounted(() => {
  const d = document.createElement('script')
  d.src = 'https://EXAMPLE.disqus.com/embed.js'
  d.setAttribute('data-timestamp', String(+new Date()))
  document.head.appendChild(d)
})
</script>

<template>
  <div id="disqus_thread">
    <div :data-identifier="identifier" :data-url="url" :data-title="title"></div>
  </div>
</template>
```

### Umami Analytics

Privacy-focused analytics.

```html
<script
  defer
  src="https://analytics.umami.is/script.js"
  data-website-id="YOUR-ID"
></script>
```

## Custom Plugins

### Create a Plugin

```typescript
// plugins/myPlugin.ts
import type { Plugin } from 'vue'

export const myPlugin: Plugin = {
  install(app) {
    // Add global property
    app.config.globalProperties.$myMethod = () => {
      console.log('Plugin method called')
    }

    // Provide injection
    app.provide('pluginData', { /* ... */ })
  }
}
```

### Use Plugin

```typescript
// main.ts
import { myPlugin } from './plugins/myPlugin'

const app = createApp(App)
app.use(myPlugin)
```

## Markdown Extensions

### Custom Containers

Add alert boxes in Markdown:

```typescript
// vite.config.ts
import markdownItContainer from 'markdown-it-container'

markdownIt.use(markdownItContainer, 'warning', {
  render: (tokens, idx) => {
    if (tokens[idx].nesting === 1) {
      return '<div class="warning">\n'
    }
    return '</div>\n'
  }
})
```

Use in Markdown:

```markdown
::: warning
**Warning:** This is important!
:::
```

### Custom Components in MDX

Use Vue components in Markdown:

```markdown
---
title: My Document
---

<Alert type="info">
This is a Vue component in Markdown!
</Alert>

```typescript
// components/Alert.vue
<script setup lang="ts">
defineProps<{
  type: 'info' | 'warning' | 'error'
}>()
</script>

<template>
  <div :class="`alert alert-${type}`">
    <slot />
  </div>
</template>
```

## SEO Plugins

### Sitemap Generation

```bash
npm install -D vite-plugin-sitemap
```

```typescript
// vite.config.ts
import { SitemapPlugin } from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    vue(),
    SitemapPlugin({
      hostname: 'https://yourdomain.com',
      routes: ['/', '/about', '/contact']
    })
  ]
})
```

### Robots.txt

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## Performance Plugins

### Image Optimization

```bash
npm install -D vite-plugin-imagemin
```

```typescript
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: { plugins: [{ removeViewBox: false }] }
    })
  ]
})
```

### Compression

```bash
npm install -D vite-plugin-compression
```

```typescript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ]
})
```

## Next Steps

- [Customize Theme](/guides/customization)
- [Deploy to Production](/guides/deployment)
- [Performance Tuning](/guides/performance)

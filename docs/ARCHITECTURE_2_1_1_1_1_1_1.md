---
title: Architecture
description: Understanding the DOCS. architecture and how components work together.
date: 2026-01-29
category: Core Concepts
author: DOCS. Team
---

# Architecture

DOCS. is built on modern web technologies with performance and developer experience in mind.

## Technology Stack

### Frontend Framework
- **Vue 3.5+** - Progressive JavaScript framework with Composition API
- **TypeScript 5.9+** - Type-safe development
- **Vite 7.x** - Lightning-fast build tool

### Static Site Generation
- **Vite-SSG** - Static site generation for Vue 3
- **Vue Router 4.x** - Client-side routing
- **@vueuse/head** - SEO meta tag management

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - Browser compatibility

### State Management
- **Pinia 3.x** - Official Vue state management
- **LocalStorage** - Client-side persistence

### Icons
- **Lucide Vue Next** - Beautiful icon library

## Project Structure

```
52-starter-hugo-blog/
├── public/              # Static assets
├── src/
│   ├── content/        # Markdown documentation
│   ├── components/     # Reusable Vue components
│   ├── composables/    # Vue composition functions
│   ├── stores/         # Pinia stores
│   ├── views/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.vue         # Root component
│   ├── main.ts         # Application entry
│   ├── router.ts       # Route definitions
│   └── style.css       # Global styles
├── .github/            # GitHub workflows
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## Data Flow

```
User Interaction
    ↓
Component (Vue SFC)
    ↓
Composable (Logic)
    ↓
Store (State)
    ↓
LocalStorage (Persistence)
```

## Key Patterns

### 1. Composition API

All components use Vue 3 Composition API:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### 2. Pinia Stores

State management with Pinia:

```typescript
export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('system')
  const isDark = computed(() => theme.value === 'dark')

  function setTheme(newTheme: string) {
    theme.value = newTheme
  }

  return { theme, isDark, setTheme }
})
```

### 3. Route Guards

Navigation guards for analytics:

```typescript
router.beforeEach((to, from, next) => {
  // Track page views
  next()
})
```

## Performance Optimizations

### Static Site Generation
- Pre-render all routes at build time
- Generate static HTML for instant loading
- Hydrate for interactive features

### Code Splitting
- Route-based lazy loading
- Dynamic imports for heavy components
- Vendor chunk optimization

### Image Optimization
- Responsive image generation
- Modern formats (WebP, AVIF)
- Lazy loading

### Caching Strategy
- Aggressive cache headers
- Service worker (optional)
- Immutable asset hashing

## Build Process

```bash
# Development
vite dev

# Build
vite build

# Preview
vite preview
```

### Build Output

```
dist/
├── assets/           # Hashed CSS/JS
├── getting-started/  # Static HTML
├── core-concepts/    # Static HTML
└── index.html        # Entry point
```

## Next Steps

- [Learn about Components](/core-concepts/components)
- [Explore State Management](/core-concepts/state-management)
- [Customize the Theme](/guides/customization)

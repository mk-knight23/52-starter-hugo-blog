# DOCS. | Vue 3 Documentation System

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite-SSG](https://img.shields.io/badge/Vite--SSG-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern documentation system built with Vue 3, Vite-SSG, and Tailwind CSS v4**

[Live Demo](https://neotheme.vercel.app) | [GitHub](https://github.com/mk-knight23/52-starter-hugo-blog)

</div>

---

## Features

- **Static Site Generation** - Lightning-fast builds with Vite-SSG
- **Markdown/MDX Support** - Write documentation in Markdown with frontmatter
- **Full-Text Search** - Client-side search powered by FlexSearch
- **Syntax Highlighting** - Beautiful code blocks with Shiki
- **Dark Mode** - System-aware theme switching
- **SEO Optimized** - Built-in meta tags, sitemaps, and RSS/JSON feeds
- **Responsive Design** - Mobile-first approach
- **Type-Safe** - Full TypeScript support

---

## Tech Stack

- **Framework**: Vue 3.5+ (Composition API)
- **SSG**: Vite-SSG for static generation
- **State**: Pinia 3.x
- **Styling**: Tailwind CSS v4
- **Routing**: Vue Router 4.x
- **Search**: FlexSearch
- **Syntax Highlighting**: Shiki
- **TypeScript**: 5.9+ with strict mode

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mk-knight23/52-starter-hugo-blog.git
cd 52-starter-hugo-blog

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to see the result.

---

## Project Structure

```
src/
├── content/              # Markdown documentation files
│   ├── getting-started/
│   ├── core-concepts/
│   └── guides/
├── components/           # Vue components
│   ├── CodeBlock.vue
│   ├── SearchModal.vue
│   └── SettingsPanel.vue
├── composables/          # Vue composition functions
│   ├── useShiki.ts
│   ├── useAudio.ts
│   └── useKeyboardControls.ts
├── stores/               # Pinia stores
│   ├── settings.ts
│   ├── stats.ts
│   └── search.ts
├── views/                # Page components
│   ├── Home.vue
│   └── ArticleView.vue
├── utils/                # Utility functions
│   ├── contentLoader.ts
│   └── constants.ts
├── App.vue               # Root component
├── main.ts               # Application entry
├── router.ts             # Router configuration
└── style.css             # Global styles
```

---

## Adding Content

### Create a New Page

Add a Markdown file in `src/content/`:

```bash
touch src/content/guides/my-guide.md
```

### Frontmatter

Every page needs frontmatter:

```yaml
---
title: My Guide
description: A comprehensive guide to doing something.
date: 2026-01-29
category: Guides
author: Your Name
tags: [tag1, tag2]
---
```

### Markdown Features

```markdown
# Heading 1

## Heading 2

**Bold** and *italic* text

- List item 1
- List item 2

```typescript
const code = "highlighted";
```

| Tables | Are | Supported |
|--------|-----|-----------|

> Blockquotes work too
```

---

## Configuration

### Customizing Theme

Edit `src/style.css` to customize colors:

```css
@theme {
  --color-docs-primary: #0ea5e9;  /* Primary accent */
  --color-docs-bg: #ffffff;       /* Background */
  --color-docs-text: #0f172a;     /* Text color */
}
```

### Navigation

Update sidebar in `src/App.vue`:

```typescript
const navItems = [
  {
    title: 'Documentation',
    icon: BookOpen,
    path: '/docs',
    items: [
      { title: 'Getting Started', path: '/docs/getting-started' }
    ]
  }
]
```

### SEO Settings

Edit `scripts/generateSitemap.ts`:

```typescript
const DOMAIN = 'https://yourdomain.com'
```

---

## Deployment

### GitHub Pages

1. Push to main branch
2. GitHub Actions automatically deploys
3. Site available at `https://username.github.io/repo-name`

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

Build settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Vercel

```bash
npm run build
vercel
```

---

## Customization Guide

### Colors

The theme uses CSS custom properties. Modify in `src/style.css`:

```css
:root {
  --color-docs-primary: #0ea5e9;
  --color-docs-accent: #6366f1;
  --color-docs-success: #22c55e;
  --color-docs-warning: #f59e0b;
  --color-docs-error: #ef4444;
}
```

### Typography

Fonts are defined in `src/style.css`:

```css
@theme {
  --font-display: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Components

All components use utility classes from Tailwind CSS. Override styles using:

```css
.custom-component {
  @apply docs-card;  /* Uses custom docs class */
  background: custom-color;
}
```

---

## Performance

### Lighthouse Scores

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Optimizations

- Static site generation (pre-rendered HTML)
- Code splitting and lazy loading
- Image optimization (WebP/AVIF)
- CSS purging (unused styles removed)
- Gzip compression
- Aggressive caching

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run generate:feeds  # Generate sitemap and feeds
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT License - feel free to use this for your own projects.

---

<div align="center">

**DOCS.** // Modern Documentation System

Built with ❤️ using Vue 3 + Vite-SSG

</div>

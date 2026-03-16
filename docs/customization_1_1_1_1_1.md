---
title: Customization
description: Customize the DOCS. theme to match your brand.
date: 2026-01-29
category: Guides
author: DOCS. Team
---

# Customization Guide

Make DOCS. yours with easy customization.

## Color Scheme

### Primary Colors

Edit `src/style.css`:

```css
@theme {
  --color-docs-primary: #0ea5e9;  /* Sky blue */
  --color-docs-accent: #6366f1;   /* Indigo */
  --color-docs-success: #22c55e;  /* Green */
  --color-docs-warning: #f59e0b;  /* Amber */
  --color-docs-error: #ef4444;    /* Red */
}
```

### Background Colors

```css
@theme {
  --color-docs-bg: #ffffff;              /* Light background */
  --color-docs-bg-dark: #0f172a;         /* Dark background */
  --color-docs-bg-sidebar: #f8fafc;      /* Sidebar light */
  --color-docs-bg-sidebar-dark: #1e293b; /* Sidebar dark */
}
```

### Text Colors

```css
@theme {
  --color-docs-text: #0f172a;           /* Primary text */
  --color-docs-text-dark: #f1f5f9;      /* Dark mode text */
  --color-docs-text-muted: #64748b;     /* Secondary text */
  --color-docs-text-muted-dark: #94a3b8; /* Dark muted */
}
```

### Border Colors

```css
@theme {
  --color-docs-border: #e2e8f0;      /* Light borders */
  --color-docs-border-dark: #334155; /* Dark borders */
}
```

## Typography

### Fonts

Change fonts in `src/style.css`:

```css
@theme {
  --font-display: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Add custom fonts in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Font Sizes

Override Tailwind defaults:

```css
.docs-title {
  @apply text-3xl md:text-4xl font-bold tracking-tight;
}

.docs-content {
  @apply text-base leading-relaxed;
}
```

## Layout

### Sidebar Width

Edit `.docs-sidebar`:

```css
.docs-sidebar {
  @apply w-72 flex-shrink-0; /* Change width */
}
```

### Content Max Width

```css
.docs-content {
  @apply flex-1 max-w-5xl; /* Add max width */
}
```

### Footer

Edit `App.vue` footer section:

```vue
<footer class="docs-footer">
  <div class="flex items-center gap-4">
    <img src="/logo.png" alt="Logo" class="h-8 w-8" />
    <span class="text-sm">Your Brand</span>
  </div>
</footer>
```

## Navigation

### Sidebar Menu

Edit `src/App.vue`:

```typescript
const navItems = [
  {
    title: 'Documentation',
    icon: BookOpen,
    items: [
      'Introduction',
      'Installation',
      'Quick Start'
    ]
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      'Components',
      'Utilities',
      'Plugins'
    ]
  }
]
```

### Top Navigation

Add links to header:

```vue
<header>
  <nav class="flex gap-4">
    <a href="/docs">Documentation</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
  </nav>
</header>
```

## Components

### Card Styles

Override card component:

```css
.docs-card {
  @apply border rounded-xl p-6;
  background: var(--color-docs-bg);
  border-color: var(--color-docs-border);

  /* Custom styles */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Button Styles

```css
.docs-button {
  @apply px-4 py-2 rounded-lg font-medium;
  background: var(--color-docs-primary);
  color: white;

  /* Hover effect */
  transition: all 0.2s;
}

.docs-button:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}
```

## Logo and Branding

### Site Logo

Replace in `App.vue`:

```vue
<router-link to="/">
  <img src="/logo.svg" alt="Your Logo" class="h-8 w-8" />
  <span class="font-bold text-lg">Your Brand</span>
</router-link>
```

### Favicon

Add `public/favicon.ico` and reference in `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

### OpenGraph Image

Add `public/og-image.png` (1200x630px) and update meta:

```typescript
useHead({
  meta: [
    {
      property: 'og:image',
      content: '/og-image.png'
    }
  ]
})
```

## Code Blocks

### Syntax Highlighting Theme

Configure in Markdown plugin settings:

```typescript
shiki: {
  theme: {
    light: 'github-light',
    dark: 'github-dark'
  }
}
```

### Code Block Styles

```css
.docs-code-block {
  @apply p-4 rounded-lg overflow-x-auto;
  background: var(--color-docs-bg-sidebar);
  border: 1px solid var(--color-docs-border);
  font-family: 'JetBrains Mono', monospace;
}
```

## Dark Mode

### Default Theme

Set initial theme in `stores/settings.ts`:

```typescript
const DEFAULT_SETTINGS: SettingsState = {
  theme: 'dark', // Change from 'system'
  // ...
}
```

### Dark Mode Colors

Customize dark mode palette:

```css
.dark {
  --color-docs-bg: #0f172a;
  --color-docs-text: #f1f5f9;
  /* ... */
}
```

## Animations

### Transitions

Adjust page transitions:

```css
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease; /* Change duration */
}
```

### Hover Effects

```css
.docs-card {
  transition: all 0.2s ease;
}

.docs-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## Configuration Files

### `vite.config.ts`

```typescript
export default defineConfig({
  base: '/your-site/',
  plugins: [vue()],
  // Add custom config
})
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Next Steps

- [Deploy to Production](/guides/deployment)
- [Add Plugins](/guides/plugins)
- [Performance Tuning](/guides/performance)

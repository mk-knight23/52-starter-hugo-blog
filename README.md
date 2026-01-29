# DOCS. | Knowledge Base Starter

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite-SSG](https://img.shields.io/badge/Vite--SSG-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A documentation-first knowledge base starter built with Vue 3, Vite-SSG, and Tailwind CSS v4**

[Live Demo](https://neotheme.vercel.app) | [GitHub](https://github.com/mk-knight23/55-Hugo-Blog-Theme-Starter)

</div>

---

## Theme: Docs-first / Knowledge System

This starter kit is designed for creating professional documentation and knowledge bases:

- **Sidebar Navigation** - Collapsible sections with icons
- **Table of Contents** - Right sidebar for page navigation
- **Search Bar** - Quick access to documentation
- **Breadcrumbs** - Hierarchical navigation
- **Code Blocks** - Syntax highlighting support
- **Dark Mode** - System-aware theme switching
- **Clean Typography** - Optimized for reading

---

## Tech Stack

- **Framework**: Vue 3.5+ (Composition API)
- **SSG**: Vite-SSG for static generation
- **State**: Pinia 3.x
- **Styling**: Tailwind CSS v4
- **Routing**: Vue Router 4.x
- **Head Management**: @vueuse/head
- **Icons**: Lucide Vue Next
- **TypeScript**: 5.9+ with strict mode

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (SSG)
npm run build
```

---

## Docs Theme Components

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-docs-primary` | `#0ea5e9` | Primary accent (sky blue) |
| `--color-docs-bg` | `#ffffff` | Content background |
| `--color-docs-bg-dark` | `#0f172a` | Dark content background |
| `--color-docs-bg-sidebar` | `#f8fafc` | Sidebar background |
| `--color-docs-text` | `#0f172a` | Primary text |
| `--color-docs-text-muted` | `#64748b` | Secondary text |

### Typography

- **Inter** - Headings and body text
- **JetBrains Mono** - Code blocks and inline code

### Available Classes

```css
.docs-container       /* Main wrapper */
.docs-sidebar         /* Left navigation sidebar */
.docs-content         /* Main content area */
.docs-nav-item        /* Navigation link */
.docs-nav-item-active /* Active navigation item */
.docs-card            /* Content card */
.docs-badge           /* Category/section badge */
.docs-code-block      /* Code snippet container */
.docs-code-inline     /* Inline code styling */
.docs-search          /* Search input field */
.docs-toc             /* Table of contents */
```

---

## Layout Structure

```
+------------------+-------------------+------------------+
|                  |                   |                  |
|   SIDEBAR        |   MAIN CONTENT    |   TABLE OF       |
|   (Navigation)   |   (Documentation) |   CONTENTS       |
|                  |                   |                  |
| - Getting Started| - Article content | - On this page   |
| - Core Concepts  | - Code examples   | - Navigation     |
| - API Reference  | - Guides          | - Related        |
| - Guides         |                   |                  |
|                  |                   |                  |
+------------------+-------------------+------------------+
|                  |                   |                  |
|                  |     FOOTER        |                  |
|                  |                   |                  |
+------------------+-------------------+------------------+
```

---

## Project Structure

```
src/
├── composables/         # Vue composables
├── stores/              # Pinia stores
│   ├── settings.ts          # Theme preferences
│   └── stats.ts             # Analytics tracking
├── views/
│   ├── Home.vue             # Docs landing page
│   └── Article.vue          # Individual doc page
├── components/
│   └── SettingsPanel.vue    # Settings modal
├── App.vue              # Root layout
├── main.ts              # Vite-SSG entry
├── router.ts            # Router configuration
└── style.css            # Tailwind v4 + Docs theme
```

---

## Navigation Structure

Define navigation in App.vue:

```typescript
const navItems = [
  { title: 'Getting Started', icon: BookOpen, items: ['Introduction', 'Installation'] },
  { title: 'Core Concepts', icon: FileText, items: ['Architecture', 'Components'] },
  { title: 'Guides', icon: Folder, items: ['Deployment', 'Customization'] },
]
```

---

## Deployment

```bash
# Build for production (SSG)
npm run build

# Preview production build
npm run preview
```

Compatible with Vercel, Netlify, GitHub Pages, and Cloudflare Pages.

---

<div align="center">

**DOCS.** // KNOWLEDGE BASE SYSTEM

</div>

# Architecture | DOCS. Vue Knowledge Base

## Overview

DOCS. is a Vue 3 + Vite-SSG static site generator starter designed for creating professional documentation and knowledge bases. It provides a clean, navigation-focused layout optimized for technical content.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue 3.5+ (Composition API) |
| SSG | Vite-SSG |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| State | Pinia 3.x |
| Routing | Vue Router 4.x |
| Head | @vueuse/head |
| Icons | Lucide Vue Next |

## Directory Structure

```
src/
├── composables/         # Vue composables
│   ├── useAudio.ts          # Sound effects
│   ├── useKeyboardControls.ts # Keyboard shortcuts
├── stores/              # Pinia stores
│   ├── settings.ts          # Theme preferences
│   └── stats.ts             # Analytics tracking
├── views/
│   ├── Home.vue             # Docs landing page
│   └── Article.vue          # Individual doc page
├── components/
│   └── SettingsPanel.vue    # Settings modal
├── App.vue              # Root layout with sidebar
├── main.ts              # Vite-SSG entry
├── router.ts            # Router configuration
└── style.css            # Tailwind v4 + Docs theme
```

## State Management

### Settings Store (`stores/settings.ts`)

Manages user preferences:
- Theme mode (dark/light/system)
- Sound effects toggle
- Reduced motion preference
- Help panel visibility

```typescript
const settingsStore = useSettingsStore()
settingsStore.isDarkMode // Computed theme state
settingsStore.toggleTheme()
```

### Stats Store (`stores/stats.ts`)

Tracks usage analytics:
- Page visits
- Theme switches
- Settings panel opens
- Click events

## Composables

### useKeyboardControls (`composables/useKeyboardControls.ts`)

Global keyboard shortcuts:
- `Cmd/Ctrl + K` - Focus search
- `Cmd/Ctrl + /` - Toggle theme
- `Esc` - Close modals

### useAudio (`composables/useAudio.ts`)

UI sound effects management.

## Tailwind v4 Configuration

No `tailwind.config.js` needed. Theme defined in CSS:

```css
@theme {
  --color-docs-primary: #0ea5e9;
  --color-docs-bg: #ffffff;
  --color-docs-bg-sidebar: #f8fafc;
  --font-display: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## Layout Architecture

### Three-Column Layout

1. **Sidebar (Left)** - 18rem fixed
   - Sticky navigation
   - Section organization
   - Icon support

2. **Content (Center)** - Flexible
   - Main documentation
   - Code examples
   - Guides and tutorials

3. **Table of Contents (Right)** - 16rem fixed (desktop only)
   - Page navigation
   - Scroll tracking
   - Active state

## Build Output

```
dist/
├── index.html           # Landing page
├── getting-started/
│   └── index.html       # Doc pages
├── installation/
│   └── index.html
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

## Development

```bash
# Start dev server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance

- **Vite-SSG:** Pre-rendered HTML for SEO
- **Tailwind v4:** Zero-runtime CSS
- **Lazy Loading:** Components loaded on demand
- **Minimal JS:** Vue hydration only

## Deployment

Pre-configured for:
- Vercel (zero config)
- Netlify (zero config)
- GitHub Pages
- Cloudflare Pages

```bash
npm run build
# Deploy dist/ folder
```

## SEO

Uses `@vueuse/head` for meta tags:

```typescript
useHead({
  title: 'DOCS. | Knowledge Base',
  meta: [
    { name: 'description', content: 'Complete documentation...' },
    { property: 'og:title', content: 'DOCS. | Knowledge Base' },
  ],
})
```

## Customization

### Adding Navigation Sections

Edit `navItems` array in App.vue:

```typescript
const navItems = [
  { title: 'Getting Started', icon: BookOpen, items: ['Introduction', 'Installation'] },
  { title: 'Your Section', icon: FileText, items: ['Topic 1', 'Topic 2'] },
]
```

### Styling Customization

Modify CSS variables in `style.css`:

```css
@theme {
  --color-docs-primary: #your-color;
  --color-docs-bg-sidebar: #your-sidebar-bg;
}
```

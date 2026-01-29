# Design System | DOCS. Theme

## Theme Identity

**Theme Name:** Docs-first / Knowledge System
**Primary Color:** Sky Blue (`#0ea5e9`)
**Background:** Clean White / Slate (`#0f172a` dark)

## Design Principles

1. **Content-First** - Navigation supports content, not vice versa
2. **Clear Hierarchy** - Section organization is obvious
3. **Scanable** - Headers, badges, and TOC aid quick scanning
4. **Code Focus** - Monospace fonts for technical content
5. **Consistent Layout** - Predictable navigation patterns

## Color System

### Primary Palette

```css
--color-docs-primary: #0ea5e9;
--color-docs-primary-dim: rgba(14, 165, 233, 0.1);
--color-docs-accent: #6366f1;
--color-docs-success: #22c55e;
--color-docs-warning: #f59e0b;
--color-docs-error: #ef4444;
```

### Backgrounds

```css
--color-docs-bg: #ffffff;
--color-docs-bg-dark: #0f172a;
--color-docs-bg-sidebar: #f8fafc;
--color-docs-bg-sidebar-dark: #1e293b;
```

### Text Colors

```css
--color-docs-text: #0f172a;
--color-docs-text-dark: #f1f5f9;
--color-docs-text-muted: #64748b;
--color-docs-text-muted-dark: #94a3b8;
```

### Borders

```css
--color-docs-border: #e2e8f0;
--color-docs-border-dark: #334155;
```

## Typography

- **Inter** - Headlines, body text, navigation
- **JetBrains Mono** - Code blocks, inline code, terminal text

## Component Patterns

### Navigation Item

```html
<router-link to="/guide" class="docs-nav-item" active-class="docs-nav-item-active">
  <ChevronRight :size="14" />
  Guide Title
</router-link>
```

### Search Bar

```html
<input type="text" class="docs-search" placeholder="Search docs..." />
```

### Code Block

```html
<div class="docs-code-block">
  <pre><code>const example = 'code';</code></pre>
</div>
```

### Inline Code

```html
<code class="docs-code-inline">variable_name</code>
```

### Badge

```html
<span class="docs-badge">Category</span>
```

### Card

```html
<div class="docs-card">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

## Layout Guidelines

### Sidebar (Left)
- Fixed width: 18rem (288px)
- Sticky position
- Scrollable independently
- Collapsible sections

### Content (Center)
- Flexible width
- Maximum readability: 65-75 characters per line
- Generous padding

### TOC (Right, desktop only)
- Fixed position
- Shows current page headings
- Active state on scroll

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation throughout
- Focus visible states
- Sufficient color contrast
- Semantic heading hierarchy

## Dark Mode

Dark mode inverts the color scheme while maintaining:
- Readable contrast ratios
- Subtle differentiation between sections
- Consistent accent color

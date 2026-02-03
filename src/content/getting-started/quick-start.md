---
title: Quick Start
description: Get up and running with DOCS. in under 5 minutes.
date: 2026-01-29
category: Getting Started
author: DOCS. Team
---

# Quick Start Guide

Create your first documentation page in 5 minutes.

## 1. Create a New Page

Add a new Markdown file in `src/content/getting-started/`:

```bash
touch src/content/getting-started/my-first-page.md
```

## 2. Add Frontmatter

Every page needs frontmatter:

```yaml
---
title: My First Page
description: This is my first documentation page.
date: 2026-01-29
category: Getting Started
author: Your Name
---
```

## 3. Write Content

Use Markdown for formatting:

```markdown
# Heading 1

## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

```js
console.log('Code blocks work too!')
```
```

## 4. View Your Page

The page is automatically available at:

```
/getting-started/my-first-page
```

## 5. Update Navigation

Edit `src/App.vue` to add to sidebar:

```ts
const navItems = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: ['Introduction', 'Installation', 'Quick Start', 'My First Page']
  }
]
```

## Common Tasks

### Add Code Syntax Highlighting

Use fenced code blocks with language:

\`\`\`typescript
interface User {
  id: number
  name: string
}
\`\`\`

### Add Tables

| Feature | Status |
|---------|--------|
| Search | ✅ |
| Dark Mode | ✅ |
| RSS Feeds | ✅ |

### Add Callouts

> **Tip:** Use blockquotes for important notes.
>
> ⚠️ **Warning:** Use for warnings.
>
> ℹ️ **Info:** Use for information.

### Add Links

```markdown
[Internal link](/getting-started/installation)
[External link](https://vuejs.org)
```

## What's Next?

- [Explore Architecture](/core-concepts/architecture)
- [Build Components](/core-concepts/components)
- [Customize Styles](/guides/customization)

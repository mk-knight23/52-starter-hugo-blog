# Adding New Documentation Content

This workflow guides you through adding new documentation pages.

## Steps

### 1. Create Content File

```bash
# Navigate to content directory
cd src/content

# Create or choose a category
mkdir -p your-category

# Create markdown file
touch your-category/your-page.md
```

### 2. Add Frontmatter

Every page needs frontmatter:

```yaml
---
title: Your Page Title
description: A clear, concise description of what this page covers.
date: 2026-01-29
category: Your Category
author: Your Name
tags: [optional, tag, list]
---
```

### 3. Write Content

Use Markdown for formatting:

```markdown
# Heading 1

Introduction paragraph.

## Subheading

Content with **bold**, *italic*, and `code`.

- List items
- With bullets

\`\`\`typescript
// Code blocks work too
const example = "highlighted";
\`\`\`

| Tables | Work | Too |
|--------|------|-----|

> Blockquotes for important notes
```

### 4. Update Navigation

Edit `src/App.vue` to add to sidebar:

```typescript
const navItems = [
  {
    title: 'Your Category',
    icon: IconComponent,
    path: '/your-category',
    items: [
      { title: 'Your Page', path: '/your-category/your-page' }
    ]
  }
]
```

### 5. Test Locally

```bash
npm run dev
```

Navigate to `http://localhost:5173/your-category/your-page`

### 6. Build and Verify

```bash
npm run build
npm run preview
```

Check the page renders correctly in production build.

## Tips

- Keep page titles under 60 characters
- Write clear, actionable descriptions
- Use proper heading hierarchy (h1 → h2 → h3)
- Add code examples for technical content
- Include relevant tags for searchability
- Test all links before committing

## Checklist

- [ ] Frontmatter is complete and valid
- [ ] Content is well-formatted Markdown
- [ ] Navigation updated in App.vue
- [ ] Links work correctly
- [ ] Code blocks have correct language tags
- [ ] Page renders in dev mode
- [ ] Page renders in production build
- [ ] SEO meta tags are appropriate

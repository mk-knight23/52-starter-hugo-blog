# Customizing the DOCS. Theme

This workflow guides you through customizing the visual appearance.

## Color Customization

### Primary Colors

Edit `src/style.css`:

```css
@theme {
  --color-docs-primary: #0ea5e9;  /* Main accent color */
  --color-docs-accent: #6366f1;   /* Secondary accent */
  --color-docs-success: #22c55e;  /* Success state */
  --color-docs-warning: #f59e0b;  /* Warning state */
  --color-docs-error: #ef4444;    /* Error state */
}
```

### Background Colors

```css
@theme {
  --color-docs-bg: #ffffff;              /* Light mode background */
  --color-docs-bg-dark: #0f172a;         /* Dark mode background */
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

## Typography

### Font Families

```css
@theme {
  --font-display: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

To use custom fonts:

1. Add font links in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

2. Update CSS variable:

```css
--font-display: 'Your Font', sans-serif;
```

### Font Sizes

Override in component styles:

```css
.docs-title {
  font-size: 2.5rem; /* Adjust as needed */
}
```

## Layout Customization

### Sidebar Width

Edit `.docs-sidebar` in `src/style.css`:

```css
.docs-sidebar {
  width: 18rem; /* Default: 18rem (288px) */
}
```

### Content Width

```css
.docs-content {
  max-width: 65rem; /* Limit content width */
}
```

## Component Styling

### Buttons

```css
.docs-button {
  /* Custom button styles */
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}
```

### Cards

```css
.docs-card {
  /* Custom card styles */
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Dark Mode

### Custom Dark Mode Colors

```css
.dark {
  --color-docs-bg: #0a0a0a;      /* Custom dark background */
  --color-docs-text: #f0f0f0;    /* Custom dark text */
}
```

### Dark Mode Images

Add dark mode-specific images:

```vue
<img
  :src="isDarkMode ? '/logo-dark.png' : '/logo.png'"
  alt="Logo"
/>
```

## Testing

1. Test in both light and dark modes
2. Test on different screen sizes
3. Check color contrast ratios (4.5:1 minimum)
4. Verify all components render correctly

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Vue Style Guide](https://vuejs.org/style-guide/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

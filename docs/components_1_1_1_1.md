---
title: Components
description: Understanding Vue components and how to use them in DOCS.
date: 2026-01-29
category: Core Concepts
author: DOCS. Team
---

# Components

DOCS. uses Vue 3 Single File Components (SFCs) for reusable UI elements.

## Component Structure

A typical Vue SFC:

```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'

// Props
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits
const emit = defineEmits<{
  click: []
}>()

// State
const isActive = ref(false)

// Computed
const displayText = computed(() => {
  return `${props.title} (${props.count})`
})

// Methods
function handleClick() {
  isActive.value = !isActive.value
  emit('click')
}
</script>

<template>
  <div :class="{ active: isActive }" @click="handleClick">
    {{ displayText }}
  </div>
</template>

<style scoped>
.active {
  color: var(--color-docs-primary);
}
</style>
```

## Built-in Components

### App.vue

Root component with layout:

```vue
<template>
  <div class="docs-container">
    <header>...</header>
    <div class="docs-layout">
      <aside>Sidebar</aside>
      <main><router-view /></main>
    </div>
    <footer>...</footer>
  </div>
</template>
```

### SettingsPanel.vue

Modal settings dialog with:

- Theme selection
- Sound toggle
- Animation toggle
- Statistics display
- Export/Reset functionality

## Component Patterns

### 1. Composables Pattern

Extract reusable logic:

```typescript
// composables/useTheme.ts
export function useTheme() {
  const store = useSettingsStore()

  const toggle = () => {
    store.toggleTheme()
  }

  return { toggle }
}
```

### 2. Slots Pattern

Flexible content distribution:

```vue
<template>
  <div class="card">
    <slot name="header">
      <h3>Default Title</h3>
    </slot>
    <slot />
    <slot name="footer" />
  </div>
</template>
```

### 3. Provide/Inject

Cross-component communication:

```typescript
// Parent
provide('settings', settings)

// Child
const settings = inject('settings')
```

## Styling Components

### Tailwind CSS Classes

```vue
<template>
  <div class="px-4 py-2 rounded-lg bg-docs-primary text-white">
    Click me
  </div>
</template>
```

### CSS Variables

```vue
<template>
  <div class="custom-card">
    Content
  </div>
</template>

<style scoped>
.custom-card {
  background: var(--color-docs-bg);
  border: 1px solid var(--color-docs-border);
}
</style>
```

### Dark Mode

```vue
<template>
  <div :class="{ 'dark': isDark }">
    Content
  </div>
</template>
```

## Creating New Components

### 1. Component File

Create `src/components/MyComponent.vue`:

```vue
<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <div class="docs-card">{{ text }}</div>
</template>
```

### 2. Use Component

Import and use in any template:

```vue
<script setup lang="ts">
import MyComponent from '@/components/MyComponent.vue'
</script>

<template>
  <MyComponent text="Hello World" />
</template>
```

## Best Practices

### DO:
- ✅ Use TypeScript for props
- ✅ Compose with composables
- ✅ Keep components focused
- ✅ Use semantic HTML
- ✅ Test interactions

### DON'T:
- ❌ Mutate props directly
- ❌ Mix concerns (data/presentation)
- ❌ Over-optimize prematurely
- ❌ Ignore accessibility
- ❌ Skip error handling

## Next Steps

- [Explore State Management](/core-concepts/state-management)
- [Customize Styles](/guides/customization)
- [Add Interactions](/guides/plugins)

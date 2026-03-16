---
title: State Management
description: How Pinia stores manage application state in DOCS.
date: 2026-01-29
category: Core Concepts
author: DOCS. Team
---

# State Management

DOCS. uses Pinia for type-safe, modular state management.

## Why Pinia?

- **TypeScript First** - Full type inference
- **Composition API** - Natural with Vue 3
- **DevTools** - Excellent debugging support
- **Modular** - Stores are self-contained
- **Lightweight** - Small bundle size

## Store Structure

A typical Pinia store:

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMyStore = defineStore('myStore', () => {
  // State
  const count = ref(0)

  // Getters
  const doubleCount = computed(() => count.value * 2)

  // Actions
  function increment() {
    count.value++
  }

  function reset() {
    count.value = 0
  }

  return {
    count,
    doubleCount,
    increment,
    reset
  }
})
```

## Built-in Stores

### Settings Store (`stores/settings.ts`)

Manages user preferences:

```typescript
interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  soundEnabled: boolean
  animationsEnabled: boolean
  reducedMotion: boolean
  showHelp: boolean
}

// Usage
const settingsStore = useSettingsStore()
settingsStore.toggleTheme()
```

### Stats Store (`stores/stats.ts`)

Tracks analytics:

```typescript
interface StatsState {
  visits: number
  totalClicks: number
  themeSwitches: number
  settingsOpened: number
  keyboardShortcutsUsed: number
}

// Usage
const statsStore = useStatsStore()
statsStore.recordVisit()
```

## Using Stores in Components

```vue
<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useStatsStore } from '@/stores/stats'

const settings = useSettingsStore()
const stats = useStatsStore()

function handleClick() {
  stats.recordClick()
  settings.toggleTheme()
}
</script>

<template>
  <div>
    <p>Theme: {{ settings.theme }}</p>
    <p>Visits: {{ stats.visits }}</p>
    <button @click="handleClick">Toggle Theme</button>
  </div>
</template>
```

## Store Persistence

Automatically persist to localStorage:

```typescript
import { watch } from 'vue'

watch(
  () => settings.theme,
  (newTheme) => {
    localStorage.setItem('theme', newTheme)
  }
)
```

## Store Actions

### Actions vs Methods

```typescript
// ❌ DON'T: Direct mutation
function updateCount(value: number) {
  count.value = value
}

// ✅ DO: Use action
function setCount(value: number) {
  count.value = Math.max(0, value)
}
```

### Async Actions

```typescript
async function fetchUserData() {
  loading.value = true
  try {
    const data = await api.getUser()
    user.value = data
  } catch (error) {
    console.error('Failed to fetch user:', error)
  } finally {
    loading.value = false
  }
}
```

## Store Composables

Extract reusable store logic:

```typescript
// composables/useTheme.ts
export function useTheme() {
  const settings = useSettingsStore()

  const isDark = computed(() => settings.isDarkMode)

  function toggle() {
    settings.toggleTheme()
  }

  function setTheme(theme: ThemeMode) {
    settings.setTheme(theme)
  }

  return {
    isDark,
    toggle,
    setTheme
  }
}
```

## Store Testing

Test stores in isolation:

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('toggles theme', () => {
    const store = useSettingsStore()
    expect(store.theme).toBe('system')

    store.toggleTheme()
    expect(store.theme).toBe('light')
  })
})
```

## Best Practices

### DO:
- ✅ Use composables for reusable logic
- ✅ Keep stores focused and small
- ✅ Type all state, getters, and actions
- ✅ Handle errors in async actions
- ✅ Use computed for derived state

### DON'T:
- ❌ Mix concerns in one store
- ❌ Directly mutate state outside store
- ❌ Skip error handling
- ❌ Over-complicate store logic
- ❌ Forget TypeScript types

## Next Steps

- [Explore Components](/core-concepts/components)
- [Learn about Routing](/core-concepts/routing)
- [Build Custom Features](/guides/plugins)

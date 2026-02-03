<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'

interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}

const props = defineProps<{
  content: string
}>()

const settingsStore = useSettingsStore()
const activeId = ref('')

// Extract headings from markdown content
const tocItems = computed<TocItem[]>(() => {
  const headingRegex = /^<(h[1-6])[^>]*id=(["']?)([^"'\s]+)\2[^>]*>(.*?)<\/\1>$/gim
  const items: TocItem[] = []
  const levels: TocItem[][] = [[], [], [], [], [], []]

  let match
  while ((match = headingRegex.exec(props.content)) !== null) {
    const level = parseInt(match[1]!.replace('h', '')) - 1
    const id = match[3]!
    const text = match[4]!.replace(/<[^>]*>/g, '') // Strip HTML tags

    const item: TocItem = { id, text, level }
    levels[level]!.push(item)
  }

  // Build hierarchical structure
  const root: TocItem[] = []
  const stack: { level: number; parent: TocItem[] }[] = []

  for (let i = 0; i < 6; i++) {
    for (const item of levels[i]!) {
      // Remove items from stack that are >= current level
      while (stack.length > 0 && stack[stack.length - 1]!.level >= item.level) {
        stack.pop()
      }

      // Find where to add this item
      if (stack.length === 0) {
        root.push(item)
      } else {
        const parent = stack[stack.length - 1]!.parent
        const lastChild = parent[parent.length - 1]
        if (lastChild) {
          if (!lastChild.children) {
            lastChild.children = []
          }
          lastChild.children.push(item)
        }
      }

      stack.push({ level: item.level, parent: item.children || root })
    }
  }

  return root
})

const hasToc = computed(() => tocItems.value.length > 0)

// Intersection Observer for active heading tracking
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Get all headings in the article
  const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6')

  if (headings.length === 0) return

  // Create intersection observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    }
  )

  headings.forEach((heading) => {
    observer?.observe(heading)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Header height offset
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Render toc items recursively
function renderTocItems(items: TocItem[], depth = 0) {
  return items.map((item) => (
    <div key={item.id} class={`toc-item toc-item-level-${item.level}`}>
      <a
        href={`#${item.id}`}
        class={[
          'toc-link',
          activeId.value === item.id ? 'toc-link-active' : ''
        ]}
        onClick={(e: Event) => {
          e.preventDefault()
          scrollToHeading(item.id)
        }}
      >
        {item.text}
      </a>
      {item.children && item.children.length > 0 && (
        <div class="toc-children">
          {renderTocItems(item.children, depth + 1)}
        </div>
      )}
    </div>
  ))
}
</script>

<template>
  <div v-if="hasToc" class="table-of-contents">
    <p class="toc-title">On this page</p>
    <nav class="toc-nav">
      {renderTocItems(tocItems)}
    </nav>
  </div>
</template>

<style scoped>
.table-of-contents {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}

.toc-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: var(--color-docs-text-muted);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-item {
  position: relative;
}

.toc-item-level-1 {
  padding-left: 0;
}

.toc-item-level-2 {
  padding-left: 1rem;
}

.toc-item-level-3 {
  padding-left: 2rem;
}

.toc-item-level-4 {
  padding-left: 3rem;
}

.toc-item-level-5,
.toc-item-level-6 {
  padding-left: 4rem;
}

.toc-link {
  display: block;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  color: var(--color-docs-text-muted);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
  line-height: 1.5;
}

.toc-link:hover {
  color: var(--color-docs-primary);
  border-left-color: var(--color-docs-primary);
  padding-left: 0.75rem;
}

.toc-link-active {
  color: var(--color-docs-primary);
  font-weight: 600;
  border-left-color: var(--color-docs-primary);
  padding-left: 0.75rem;
}

.toc-children {
  margin-top: 0.25rem;
}

/* Scrollbar styling */
.table-of-contents::-webkit-scrollbar {
  width: 4px;
}

.table-of-contents::-webkit-scrollbar-track {
  background: transparent;
}

.table-of-contents::-webkit-scrollbar-thumb {
  background: var(--color-docs-border);
  border-radius: 2px;
}

.table-of-contents::-webkit-scrollbar-thumb:hover {
  background: var(--color-docs-text-muted);
}
</style>

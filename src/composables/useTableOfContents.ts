import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}

export function useTableOfContents() {
  const activeId = ref('')
  const tocItems = ref<TocItem[]>([])

  // Extract headings from the current page
  function extractHeadings() {
    const content = document.querySelector('.markdown-content')
    if (!content) {
      tocItems.value = []
      return
    }

    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []
    const levels: TocItem[][] = [[], [], [], [], [], []]

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.replace('H', '')) - 1
      const id = heading.id || `heading-${items.length}`
      const text = heading.textContent || ''

      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = id
      }

      const item: TocItem = { id, text, level }
      levels[level]!.push(item)
    })

    // Build hierarchical structure
    const root: TocItem[] = []

    for (let i = 0; i < 6; i++) {
      for (const item of levels[i]!) {
        // Find parent at previous level
        let parent = root
        for (let j = i - 1; j >= 0; j--) {
          if (levels[j] && levels[j]!.length > 0) {
            const lastItem = levels[j]![levels[j]!.length - 1]
            if (lastItem) {
              if (!lastItem.children) {
                lastItem.children = []
              }
              parent = lastItem.children
              break
            }
          }
        }
        parent.push(item)
      }
    }

    tocItems.value = root
  }

  // Intersection Observer for active heading tracking
  let observer: IntersectionObserver | null = null

  function setupObserver() {
    const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6')

    if (headings.length === 0) return

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
  }

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

  onMounted(() => {
    // Wait for content to be rendered
    setTimeout(() => {
      extractHeadings()
      setupObserver()
    }, 100)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  const hasToc = computed(() => tocItems.value.length > 0)

  return {
    tocItems,
    activeId,
    hasToc,
    scrollToHeading
  }
}

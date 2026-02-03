import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import FlexSearch from 'flexsearch'
import { getAllContent } from '@/utils/contentLoader'

interface SearchResult {
  slug: string
  title: string
  description: string
  category: string
  score?: number
}

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const isOpen = ref(false)
  const selectedIndex = ref(0)
  const index = ref<any>(null)
  const documents = ref<Map<string, SearchResult>>(new Map())

  const results = computed(() => {
    if (!query.value.trim() || !index.value) {
      return []
    }

    const searchResults: string[] = index.value.search(query.value, {
      limit: 10,
      suggest: true
    })

    return searchResults
      .map(id => documents.value.get(id))
      .filter(Boolean) as SearchResult[]
  })

  const hasResults = computed(() => results.value.length > 0)

  async function initializeIndex() {
    const content = getAllContent()

    // Create FlexSearch index
    index.value = new FlexSearch.Index({
      tokenize: 'forward',
      resolution: 9,
      optimize: true,
      cache: true
    })

    // Index all content
    for (const item of content) {
      const id = item.slug

      // Store document metadata
      documents.value.set(id, {
        slug: item.slug,
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        category: item.frontmatter.category
      })

      // Index title, description, and content
      const searchableText = [
        item.frontmatter.title,
        item.frontmatter.description,
        item.content
      ].join(' ')

      index.value.add(id, searchableText)
    }
  }

  function open() {
    isOpen.value = true
    selectedIndex.value = 0
  }

  function close() {
    isOpen.value = false
    query.value = ''
    selectedIndex.value = 0
  }

  function setQuery(newQuery: string) {
    query.value = newQuery
    selectedIndex.value = 0
  }

  function selectNext() {
    if (results.value.length === 0) return
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  }

  function selectPrevious() {
    if (results.value.length === 0) return
    selectedIndex.value =
      selectedIndex.value === 0
        ? results.value.length - 1
        : selectedIndex.value - 1
  }

  function getSelectedResult(): SearchResult | null {
    return results.value[selectedIndex.value] || null
  }

  return {
    query,
    isOpen,
    selectedIndex,
    results,
    hasResults,
    initializeIndex,
    open,
    close,
    setQuery,
    selectNext,
    selectPrevious,
    getSelectedResult
  }
})

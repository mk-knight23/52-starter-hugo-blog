<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'

interface GiscusProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  term?: string
  strict?: string
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: 'top' | 'bottom'
  theme?: string
  lang?: string
  lazy?: boolean
}

const props = withDefaults(defineProps<GiscusProps>(), {
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom',
  lang: 'en',
  lazy: true
})

const settingsStore = useSettingsStore()
const giscusLoaded = ref(false)
const giscusContainer = ref<HTMLElement | null>(null)

// Determine theme based on settings
const currentTheme = computed(() => {
  return settingsStore.isDarkMode ? 'dark_dimmed' : 'light'
})

function loadGiscus() {
  if (giscusLoaded.value) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'

  const giscusConfig: Record<string, string | boolean> = {
    'data-repo': props.repo,
    'data-repo-id': props.repoId,
    'data-category': props.category,
    'data-category-id': props.categoryId,
    'data-mapping': props.mapping,
    'data-strict': props.strict,
    'data-reactions-enabled': props.reactionsEnabled,
    'data-emit-metadata': props.emitMetadata,
    'data-input-position': props.inputPosition,
    'data-theme': currentTheme.value,
    'data-lang': props.lang,
    'data-lazy': props.lazy
  }

  Object.entries(giscusConfig).forEach(([key, value]) => {
    script.setAttribute(key, String(value))
  })

  script.onload = () => {
    giscusLoaded.value = true
  }

  if (giscusContainer.value) {
    giscusContainer.value.appendChild(script)
  }
}

function updateGiscusTheme() {
  if (!giscusLoaded.value) return

  const iframe = document.querySelector('iframe[src*="giscus"]') as HTMLIFrameElement
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: currentTheme.value
          }
        }
      },
      'https://giscus.app'
    )
  }
}

// Watch for theme changes
watch(() => settingsStore.isDarkMode, () => {
  updateGiscusTheme()
})

onMounted(() => {
  if (!props.lazy) {
    loadGiscus()
  } else {
    // Use IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadGiscus()
            observer.disconnect()
          }
        })
      },
      { rootMargin: '400px' }
    )

    if (giscusContainer.value) {
      observer.observe(giscusContainer.value)
    }
  }
})
</script>

<template>
  <div
    ref="giscusContainer"
    class="giscus-container mt-12 pt-8 border-t"
    style="border-color: var(--color-docs-border);"
  />
</template>

<style scoped>
.giscus-container {
  min-height: 200px;
}

/* Giscus customization */
:deep(.giscus-frame) {
  border-radius: 0.5rem;
}
</style>

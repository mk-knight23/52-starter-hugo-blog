<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'

interface UtterancesProps {
  repo: string
  issueTerm?: string
  label?: string
  theme?: string
}

const props = withDefaults(defineProps<UtterancesProps>(), {
  issueTerm: 'pathname',
  label: 'comments',
  theme: 'github-light'
})

const settingsStore = useSettingsStore()
const utterancesLoaded = ref(false)
const utterancesContainer = ref<HTMLElement | null>(null)

// Determine theme based on settings
const currentTheme = computed(() => {
  return settingsStore.isDarkMode ? 'github-dark' : 'github-light'
})

function loadUtterances() {
  if (utterancesLoaded.value) return

  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', props.repo)
  script.setAttribute('issue-term', props.issueTerm)
  script.setAttribute('label', props.label)
  script.setAttribute('theme', currentTheme.value)

  script.onload = () => {
    utterancesLoaded.value = true
  }

  if (utterancesContainer.value) {
    utterancesContainer.value.appendChild(script)
  }
}

function reloadUtterances() {
  if (!utterancesContainer.value) return

  // Remove existing utterances
  const existingScript = utterancesContainer.value.querySelector('script')
  if (existingScript) {
    existingScript.remove()
  }

  utterancesLoaded.value = false
  loadUtterances()
}

// Watch for theme changes
watch(() => settingsStore.isDarkMode, () => {
  reloadUtterances()
})

onMounted(() => {
  loadUtterances()
})
</script>

<template>
  <div
    ref="utterancesContainer"
    class="utterances-container mt-12 pt-8 border-t"
    style="border-color: var(--color-docs-border);"
  />
</template>

<style scoped>
.utterances-container {
  min-height: 200px;
}

/* Utterances customization */
:deep(.utterances) {
  max-width: 100%;
}
</style>

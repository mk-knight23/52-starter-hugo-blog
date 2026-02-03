<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Copy, Check } from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settings'
import { highlightCodeDualTheme } from '@/composables/useShiki'

const props = defineProps<{
  code: string
  language?: string
  filename?: string
}>()

const settingsStore = useSettingsStore()
const copied = ref(false)
const highlightedCode = ref<{ light: string; dark: string } | null>(null)

const isDark = computed(() => settingsStore.isDarkMode)

onMounted(async () => {
  highlightedCode.value = await highlightCodeDualTheme(
    props.code,
    (props.language || 'javascript') as any
  )
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const displayCode = computed(() => {
  if (!highlightedCode.value) return props.code
  return isDark.value ? highlightedCode.value.dark : highlightedCode.value.light
})
</script>

<template>
  <div class="code-block-wrapper">
    <div v-if="filename || language" class="code-block-header">
      <span v-if="filename" class="filename">{{ filename }}</span>
      <span v-else class="language">{{ language }}</span>
      <button
        @click="copyToClipboard"
        class="copy-button"
        :title="copied ? 'Copied!' : 'Copy code'"
      >
        <Check v-if="copied" :size="16" />
        <Copy v-else :size="16" />
      </button>
    </div>
    <div
      class="code-block-content"
      v-html="displayCode"
    ></div>
  </div>
</template>

<style scoped>
.code-block-wrapper {
  @apply my-6 rounded-lg overflow-hidden border;
  border-color: var(--color-docs-border);
  background: var(--color-docs-bg-sidebar);
}

.code-block-header {
  @apply flex items-center justify-between px-4 py-2 border-b;
  border-color: var(--color-docs-border);
  background: var(--color-docs-bg);
}

.filename,
.language {
  @apply text-xs font-medium;
  color: var(--color-docs-text-muted);
}

.copy-button {
  @apply p-1.5 rounded transition-colors;
  color: var(--color-docs-text-muted);
}

.copy-button:hover {
  background: var(--color-docs-primary-dim);
  color: var(--color-docs-primary);
}

.code-block-content {
  @apply overflow-x-auto;
}

.code-block-content :deep(pre) {
  @apply !m-0 !p-4 !rounded-none !border-0;
  background: transparent !important;
}

.code-block-content :deep(code) {
  @apply font-mono text-sm;
  font-family: 'JetBrains Mono', monospace;
}

/* Shiki theme overrides */
.code-block-content :deep(.shiki) {
  background: transparent !important;
}

.code-block-content :deep(.shiki span) {
  color: inherit;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { Tag as TagIcon } from 'lucide-vue-next'
import { getAllTags } from '@/utils/taxonomy'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const tags = computed(() => getAllTags())

useHead({
  title: 'Tags | DOCS.',
  meta: [
    {
      name: 'description',
      content: 'Browse all documentation tags and find the content you need.'
    }
  ]
})

function getTagSizeClass(count: number): string {
  if (count >= 10) return 'text-3xl'
  if (count >= 5) return 'text-2xl'
  if (count >= 3) return 'text-xl'
  return 'text-lg'
}

function getTagOpacity(count: number): number {
  const maxCount = Math.max(...tags.value.map((t) => t.count))
  return 0.4 + (count / maxCount) * 0.6
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-lg bg-docs-primary/10 flex items-center justify-center">
          <TagIcon class="text-docs-primary" :size="24" />
        </div>
        <div>
          <h1 class="docs-title !mb-1">Tags</h1>
          <p class="text-docs-text-muted">
            Browse all {{ tags.length }} tags to find the content you need
          </p>
        </div>
      </div>
    </div>

    <!-- Tag Cloud -->
    <div class="docs-card">
      <div class="flex flex-wrap gap-3">
        <router-link
          v-for="tag in tags"
          :key="tag.slug"
          :to="`/tag/${tag.slug}`"
          class="tag-cloud-item"
          :class="getTagSizeClass(tag.count)"
          :style="{ opacity: getTagOpacity(tag.count) }"
        >
          {{ tag.name }}
          <span class="tag-count">{{ tag.count }}</span>
        </router-link>
      </div>

      <div v-if="tags.length === 0" class="text-center py-12 text-docs-text-muted">
        <p>No tags found.</p>
      </div>
    </div>

    <!-- Tag List -->
    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4 text-docs-text">All Tags</h2>
      <div class="docs-card">
        <div class="space-y-2">
          <router-link
            v-for="tag in tags"
            :key="tag.slug"
            :to="`/tag/${tag.slug}`"
            class="tag-list-item flex items-center justify-between p-3 rounded-lg hover:bg-docs-bg-sidebar transition-colors"
          >
            <div class="flex items-center gap-3">
              <TagIcon :size="16" class="text-docs-primary" />
              <span class="font-medium">{{ tag.name }}</span>
            </div>
            <span class="text-sm text-docs-text-muted bg-docs-bg-sidebar px-2 py-1 rounded">
              {{ tag.count }} {{ tag.count === 1 ? 'article' : 'articles' }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-cloud-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-docs-bg-sidebar);
  border-radius: 0.5rem;
  color: var(--color-docs-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 600;
}

.tag-cloud-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tag-count {
  font-size: 0.75rem;
  background: var(--color-docs-primary);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
}

.tag-list-item {
  text-decoration: none;
  color: var(--color-docs-text);
}

.tag-list-item:hover {
  background: var(--color-docs-bg-sidebar);
}
</style>

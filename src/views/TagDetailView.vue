<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Tag as TagIcon, Calendar, FileText } from 'lucide-vue-next'
import { getContentByTag, getAllTags } from '@/utils/taxonomy'
import { useSettingsStore } from '@/stores/settings'

const route = useRoute()
const settingsStore = useSettingsStore()

const tagSlug = computed(() => route.params.slug as string)

const tags = computed(() => getAllTags())
const currentTag = computed(() =>
  tags.value.find((t) => t.slug === tagSlug.value)
)

const content = computed(() => getContentByTag(tagSlug.value))

useHead({
  title: currentTag.value
    ? `${currentTag.value.name} | DOCS.`
    : 'Tag | DOCS.',
  meta: currentTag.value
    ? [
        {
          name: 'description',
          content: `Browse all articles tagged with "${currentTag.value.name}"`
        }
      ]
    : []
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="currentTag">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-lg bg-docs-primary/10 flex items-center justify-center">
            <TagIcon class="text-docs-primary" :size="24" />
          </div>
          <div>
            <h1 class="docs-title !mb-1">{{ currentTag.name }}</h1>
            <p class="text-docs-text-muted">
              {{ content.length }} {{ content.length === 1 ? 'article' : 'articles' }}
              with this tag
            </p>
          </div>
        </div>
      </div>

      <!-- Content List -->
      <div v-if="content.length > 0" class="space-y-4">
        <router-link
          v-for="item in content"
          :key="item.slug"
          :to="`/${item.frontmatter.category.toLowerCase().replace(/\s+/g, '-')}/${
            item.slug
          }`"
          class="docs-card content-item"
        >
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-docs-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText class="text-docs-primary" :size="20" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold mb-2 text-docs-text">
                {{ item.frontmatter.title }}
              </h3>
              <p class="text-sm text-docs-text-muted mb-3 line-clamp-2">
                {{ item.frontmatter.description }}
              </p>
              <div class="flex items-center gap-4 text-xs text-docs-text-muted">
                <div class="flex items-center gap-1">
                  <Calendar :size="12" />
                  <span>{{ new Date(item.frontmatter.date).toLocaleDateString() }}</span>
                </div>
                <div class="inline-flex items-center gap-1 px-2 py-1 rounded bg-docs-bg-sidebar">
                  <span>{{ item.frontmatter.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div v-else class="docs-card text-center py-12">
        <p class="text-docs-text-muted">No articles found with this tag.</p>
      </div>
    </div>

    <div v-else class="docs-card text-center py-12">
      <h1 class="text-2xl font-bold mb-4">Tag Not Found</h1>
      <p class="text-docs-text-muted mb-6">
        The tag you're looking for doesn't exist.
      </p>
      <router-link to="/tags" class="docs-button">
        Browse All Tags
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.content-item {
  text-decoration: none;
  transition: all 0.2s ease;
}

.content-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

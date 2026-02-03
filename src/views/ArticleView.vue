<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { ChevronRight, Calendar, User, Tag } from 'lucide-vue-next'
import { getContentBySlug } from '@/utils/contentLoader'
import { useSettingsStore } from '@/stores/settings'
import GiscusComments from '@/components/GiscusComments.vue'
import UtterancesComments from '@/components/UtterancesComments.vue'
import { COMMENTS_PROVIDER, GISCUS_CONFIG, UTTERANCES_CONFIG } from '@/config/comments'
import { useSEO, useStructuredData } from '@/utils/seo'

const route = useRoute()
const settingsStore = useSettingsStore()

const props = defineProps<{
  category?: string
  slug?: string
}>()

const content = computed(() => {
  const slug = props.slug || (route.params.slug as string)
  return getContentBySlug(slug)
})

// Set meta tags
onMounted(() => {
  if (content.value) {
    const categorySlug = content.value.frontmatter.category
      .toLowerCase()
      .replace(/\s+/g, '-')
    const url = `${window.location.origin}/${categorySlug}/${content.value.slug}`

    // Enhanced SEO
    useSEO({
      title: content.value.frontmatter.title,
      description: content.value.frontmatter.description,
      type: 'article',
      author: content.value.frontmatter.author,
      publishedDate: content.value.frontmatter.date,
      tags: content.value.frontmatter.tags || [],
      category: content.value.frontmatter.category,
      url
    })

    // Structured data
    useStructuredData('article', {
      title: content.value.frontmatter.title,
      description: content.value.frontmatter.description,
      author: content.value.frontmatter.author,
      publishedDate: content.value.frontmatter.date,
      category: content.value.frontmatter.category
    })
  }
})
</script>

<template>
  <div v-if="content" class="max-w-4xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="docs-breadcrumb">
      <router-link to="/" class="docs-breadcrumb-link">Home</router-link>
      <ChevronRight :size="14" />
      <router-link
        :to="`/${content.frontmatter.category.toLowerCase().replace(' ', '-')}`"
        class="docs-breadcrumb-link"
      >
        {{ content.frontmatter.category }}
      </router-link>
      <ChevronRight :size="14" />
      <span class="text-docs-text-muted">{{ content.frontmatter.title }}</span>
    </nav>

    <!-- Article Header -->
    <header class="docs-header">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-docs-primary/10 mb-4">
        <span class="w-2 h-2 rounded-full bg-docs-primary"></span>
        <span class="text-xs font-medium text-docs-primary">{{ content.frontmatter.category }}</span>
      </div>

      <h1 class="docs-title mb-4">
        {{ content.frontmatter.title }}
      </h1>

      <p class="text-lg text-docs-text-muted mb-6">
        {{ content.frontmatter.description }}
      </p>

      <div class="flex flex-wrap items-center gap-4 text-sm text-docs-text-muted">
        <div class="flex items-center gap-2">
          <User :size="16" />
          <span>{{ content.frontmatter.author }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Calendar :size="16" />
          <span>{{ new Date(content.frontmatter.date).toLocaleDateString() }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="content.frontmatter.tags && content.frontmatter.tags.length" class="flex flex-wrap gap-2 mt-4">
        <router-link
          v-for="tag in content.frontmatter.tags"
          :key="tag"
          :to="`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`"
          class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-docs-primary/10 text-docs-primary text-sm hover:bg-docs-primary/20 transition-colors"
        >
          <Tag :size="14" />
          <span>{{ tag }}</span>
        </router-link>
      </div>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg max-w-none">
      <div v-html="content.content" class="markdown-content"></div>
    </article>

    <!-- Article Footer -->
    <footer class="docs-footer !mt-12">
      <div class="docs-card">
        <p class="text-sm text-docs-text-muted mb-4">
          Was this article helpful?
        </p>
        <div class="flex gap-3">
          <button class="docs-button-secondary">👍 Yes</button>
          <button class="docs-button-secondary">👎 No</button>
        </div>
      </div>
    </footer>

    <!-- Comments Section -->
    <GiscusComments
      v-if="COMMENTS_PROVIDER === 'giscus'"
      v-bind="GISCUS_CONFIG"
    />
    <UtterancesComments
      v-else-if="COMMENTS_PROVIDER === 'utterances'"
      v-bind="UTTERANCES_CONFIG"
    />
  </div>

  <div v-else class="max-w-4xl mx-auto">
    <div class="docs-card">
      <h1 class="text-2xl font-bold mb-4">Article Not Found</h1>
      <p class="text-docs-text-muted mb-6">
        The article you're looking for doesn't exist.
      </p>
      <router-link to="/" class="docs-button">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.markdown-content {
  @apply text-docs-text;
}

.markdown-content :deep(h1) {
  @apply text-3xl font-bold mt-12 mb-6 text-docs-text;
}

.markdown-content :deep(h2) {
  @apply text-2xl font-bold mt-10 mb-4 text-docs-text;
}

.markdown-content :deep(h3) {
  @apply text-xl font-bold mt-8 mb-3 text-docs-text;
}

.markdown-content :deep(h4) {
  @apply text-lg font-bold mt-6 mb-2 text-docs-text;
}

.markdown-content :deep(p) {
  @apply my-4 leading-relaxed text-docs-text;
}

.markdown-content :deep(a) {
  @apply text-docs-primary hover:underline;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  @apply my-4 ml-6;
}

.markdown-content :deep(li) {
  @apply my-2;
}

.markdown-content :deep(code) {
  @apply docs-code-inline;
}

.markdown-content :deep(pre) {
  @apply docs-code-block my-6;
}

.markdown-content :deep(blockquote) {
  @apply border-l-4 border-docs-primary pl-4 py-2 my-6 italic text-docs-text-muted;
}

.markdown-content :deep(table) {
  @apply w-full my-6 border-collapse;
}

.markdown-content :deep(th) {
  @apply border px-4 py-2 text-left font-bold bg-docs-bg-sidebar;
}

.markdown-content :deep(td) {
  @apply border px-4 py-2;
}

.markdown-content :deep(img) {
  @apply rounded-lg my-6;
}
</style>

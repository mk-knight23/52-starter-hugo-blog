<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { Folder } from 'lucide-vue-next'
import { getAllCategories } from '@/utils/taxonomy'
import { useSettingsStore } from '@/stores/settings'
import type { Category } from '@/utils/taxonomy'

const settingsStore = useSettingsStore()
const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await getAllCategories()
})

useHead({
  title: 'Categories | DOCS.',
  meta: [
    {
      name: 'description',
      content: 'Browse documentation by category to find what you need.'
    }
  ]
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-lg bg-docs-primary/10 flex items-center justify-center">
          <Folder class="text-docs-primary" :size="24" />
        </div>
        <div>
          <h1 class="docs-title !mb-1">Categories</h1>
          <p class="text-docs-text-muted">
            Browse {{ categories.length }} categories to find the content you need
          </p>
        </div>
      </div>
    </div>

    <!-- Category Grid -->
    <div v-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link
        v-for="category in categories"
        :key="category.slug"
        :to="`/${category.slug}`"
        class="docs-card category-item"
      >
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-lg bg-docs-primary/10 flex items-center justify-center flex-shrink-0">
            <Folder class="text-docs-primary" :size="24" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold mb-2 text-docs-text">
              {{ category.name }}
            </h3>
            <p class="text-sm text-docs-text-muted">
              {{ category.count }} {{ category.count === 1 ? 'article' : 'articles' }}
            </p>
          </div>
        </div>
      </router-link>
    </div>

    <div v-else class="docs-card text-center py-12">
      <p class="text-docs-text-muted">No categories found.</p>
    </div>
  </div>
</template>

<style scoped>
.category-item {
  text-decoration: none;
  transition: all 0.2s ease;
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>

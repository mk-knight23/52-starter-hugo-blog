<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, FileText, ArrowRight, Command } from 'lucide-vue-next'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const router = useRouter()

const inputRef = ref<HTMLInputElement | null>(null)

watch(() => searchStore.isOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    inputRef.value?.focus()
  }
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    searchStore.selectNext()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    searchStore.selectPrevious()
  } else if (event.key === 'Enter') {
    event.preventDefault()
    const selected = searchStore.getSelectedResult()
    if (selected) {
      navigateToResult(selected)
    }
  } else if (event.key === 'Escape') {
    searchStore.close()
  }
}

function navigateToResult(result: { slug: string; category: string }) {
  const categoryPath = result.category.toLowerCase().replace(' ', '-')
  router.push(`/${categoryPath}/${result.slug}`)
  searchStore.close()
}

onMounted(() => {
  searchStore.initializeIndex()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="searchStore.isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
        @click.self="searchStore.close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div
          class="relative w-full max-w-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- Search Input -->
          <div class="flex items-center gap-3 px-5 py-4 border-b border-border dark:border-border-dark">
            <Search class="text-text-muted dark:text-text-muted-dark" :size="20" />
            <input
              ref="inputRef"
              v-model="searchStore.query"
              type="text"
              placeholder="Search documentation..."
              class="flex-1 bg-transparent outline-none text-text dark:text-text-dark placeholder-text-muted dark:placeholder-text-muted-dark text-base"
              @keydown="handleKeydown"
            />
            <kbd class="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono bg-surface-hover dark:bg-surface-hover-dark border border-border dark:border-border-dark rounded text-text-muted dark:text-text-muted-dark">
              <Command :size="12" /> ESC
            </kbd>
          </div>

          <!-- Results -->
          <div class="max-h-[50vh] overflow-y-auto">
            <!-- Initial State -->
            <div v-if="!searchStore.query" class="py-12 text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText class="text-primary" :size="32" />
              </div>
              <p class="text-text dark:text-text-dark font-medium">Start typing to search...</p>
              <p class="text-sm text-text-muted dark:text-text-muted-dark mt-1">Use arrow keys to navigate</p>
            </div>

            <!-- No Results -->
            <div
              v-else-if="!searchStore.hasResults"
              class="py-12 text-center"
            >
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-hover dark:bg-surface-hover-dark flex items-center justify-center">
                <Search class="text-text-muted dark:text-text-muted-dark" :size="32" />
              </div>
              <p class="text-text dark:text-text-dark font-medium">No results found</p>
              <p class="text-sm text-text-muted dark:text-text-muted-dark mt-1">
                Try searching for something else
              </p>
            </div>

            <!-- Results List -->
            <div v-else class="py-2">
              <div
                v-for="(result, index) in searchStore.results"
                :key="result.slug"
                class="flex items-center gap-3 px-5 py-3 cursor-pointer transition-all duration-150 mx-2 rounded-xl"
                :class="{
                  'bg-primary text-white': index === searchStore.selectedIndex,
                  'hover:bg-surface-hover dark:hover:bg-surface-hover-dark': index !== searchStore.selectedIndex
                }"
                @click="navigateToResult(result)"
              >
                <FileText class="flex-shrink-0" :size="18" :class="index === searchStore.selectedIndex ? 'text-white' : 'text-text-muted dark:text-text-muted-dark'" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate" :class="index === searchStore.selectedIndex ? 'text-white' : 'text-text dark:text-text-dark'">
                    {{ result.title }}
                  </p>
                  <p class="text-sm truncate" :class="index === searchStore.selectedIndex ? 'text-white/80' : 'text-text-muted dark:text-text-muted-dark'">
                    {{ result.description }}
                  </p>
                </div>
                <ArrowRight class="flex-shrink-0" :size="16" :class="index === searchStore.selectedIndex ? 'text-white' : 'text-text-muted dark:text-text-muted-dark'" />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            v-if="searchStore.hasResults"
            class="px-5 py-3 border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-xs text-text-muted dark:text-text-muted-dark flex items-center justify-between"
          >
            <span>{{ searchStore.results.length }} result(s) found</span>
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 text-[10px] font-mono bg-surface-hover dark:bg-surface-hover-dark border border-border dark:border-border-dark rounded">↑</kbd>
                <kbd class="px-1.5 py-0.5 text-[10px] font-mono bg-surface-hover dark:bg-surface-hover-dark border border-border dark:border-border-dark rounded">↓</kbd>
                to navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 text-[10px] font-mono bg-surface-hover dark:bg-surface-hover-dark border border-border dark:border-border-dark rounded">↵</kbd>
                to select
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>

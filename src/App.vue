<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Sun,
  Moon,
  Github,
  Search,
  BookOpen,
  FileText,
  Folder,
  ChevronRight,
  Home,
  Settings,
  Zap,
  Tag
} from 'lucide-vue-next'
import { useHead } from '@vueuse/head'
import { useSettingsStore } from './stores/settings'
import { useStatsStore } from './stores/stats'
import { useSearchStore } from './stores/search'
import { audioService } from './composables/useAudio'
import { useKeyboardControls } from './composables/useKeyboardControls'
import SettingsPanel from './components/SettingsPanel.vue'
import SearchModal from './components/SearchModal.vue'
import TableOfContentsSidebar from './components/TableOfContentsSidebar.vue'
import Analytics from './components/Analytics.vue'

const showSettings = ref(false)
const settingsStore = useSettingsStore()
const statsStore = useStatsStore()
const searchStore = useSearchStore()

onMounted(() => {
  settingsStore.loadSettings()
  statsStore.loadStats()
  searchStore.initializeIndex()
  statsStore.recordVisit()
})

function toggleTheme(): void {
  audioService.playClick()
  settingsStore.toggleTheme()
  statsStore.recordThemeSwitch()
}

function openSettings(): void {
  showSettings.value = true
  statsStore.recordSettingsOpen()
}

function openSearch(): void {
  searchStore.open()
}

function recordClick(): void {
  statsStore.recordClick()
}

useKeyboardControls({
  onToggleTheme: toggleTheme,
  onOpenSettings: openSettings,
  onOpenSearch: openSearch,
  onClose: () => {
    showSettings.value = false
    searchStore.close()
    settingsStore.hideHelp()
  }
})

const navItems = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    path: '/getting-started',
    items: [
      { title: 'Introduction', path: '/getting-started/introduction' },
      { title: 'Installation', path: '/getting-started/installation' },
      { title: 'Quick Start', path: '/getting-started/quick-start' }
    ]
  },
  {
    title: 'Core Concepts',
    icon: FileText,
    path: '/core-concepts',
    items: [
      { title: 'Architecture', path: '/core-concepts/architecture' },
      { title: 'Components', path: '/core-concepts/components' },
      { title: 'State Management', path: '/core-concepts/state-management' }
    ]
  },
  {
    title: 'Guides',
    icon: Folder,
    path: '/guides',
    items: [
      { title: 'Deployment', path: '/guides/deployment' },
      { title: 'Customization', path: '/guides/customization' },
      { title: 'Plugins', path: '/guides/plugins' }
    ]
  },
  {
    title: 'Browse',
    icon: Tag,
    path: '/tags',
    items: [
      { title: 'Tags', path: '/tags' },
      { title: 'Categories', path: '/categories' }
    ]
  }
]

useHead({
  title: 'DOCS. | Knowledge Base',
  meta: [{ name: 'description', content: 'Complete documentation and knowledge base for developers.' }]
})
</script>

<template>
  <div class="docs-container" :class="{ 'dark': settingsStore.isDarkMode }">
    <!-- Top Navigation -->
    <header class="docs-top-nav">
       <div class="flex items-center gap-6">
          <router-link to="/" class="flex items-center gap-2.5 group" @click="recordClick">
             <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                <BookOpen class="text-white" :size="18" />
             </div>
             <span class="font-bold text-xl tracking-tight text-text dark:text-text-dark">
                DOCS<span class="text-primary">.</span>
             </span>
          </router-link>

          <div class="hidden md:flex items-center gap-1">
             <button
                @click="openSearch(); recordClick()"
                class="docs-search !w-72 !py-2 !text-sm flex items-center gap-2 cursor-pointer hover:border-border-strong transition-colors"
             >
                <Search :size="16" class="text-text-muted" />
                <span class="text-text-muted">Search docs...</span>
                <kbd class="docs-code-inline ml-auto text-xs">⌘K</kbd>
             </button>
          </div>
       </div>

       <div class="flex items-center gap-2">
          <button @click="toggleTheme(); recordClick()" class="docs-icon-btn" :aria-label="settingsStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
             <Sun v-if="settingsStore.isDarkMode" :size="18" />
             <Moon v-else :size="18" />
          </button>

          <button @click="openSettings(); recordClick()" class="docs-icon-btn" aria-label="Settings">
             <Settings :size="18" />
          </button>

          <div class="h-5 w-px bg-border dark:bg-border-dark mx-1"></div>

          <a href="https://github.com" target="_blank" class="docs-icon-btn" aria-label="GitHub">
             <Github :size="18" />
          </a>
       </div>
    </header>

    <div class="docs-layout">
       <!-- Sidebar Navigation -->
       <aside class="docs-sidebar hidden lg:block">
          <div class="p-4 border-b border-border dark:border-border-dark">
             <router-link to="/" class="docs-nav-item" @click="recordClick">
                <Home :size="18" />
                <span>Overview</span>
             </router-link>
          </div>

          <nav class="p-4 space-y-6">
             <div v-for="section in navItems" :key="section.title">
                <div class="docs-nav-section flex items-center gap-2 mb-3">
                   <component :is="section.icon" :size="14" />
                   {{ section.title }}
                </div>
                <div class="space-y-1">
                   <router-link
                      v-for="item in section.items"
                      :key="item.path"
                      :to="item.path"
                      class="docs-nav-item"
                      active-class="docs-nav-item-active"
                      @click="recordClick"
                   >
                      <ChevronRight :size="14" />
                      {{ item.title }}
                   </router-link>
                </div>
             </div>
          </nav>

          <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
             <div class="flex items-center justify-between text-xs text-text-muted dark:text-text-muted-dark">
                <span class="font-medium">v2.0.0</span>
                <span>Last updated today</span>
             </div>
          </div>
       </aside>

       <!-- Main Content -->
       <main class="docs-content">
          <router-view v-slot="{ Component }">
             <transition name="page" mode="out-in">
                <component :is="Component" />
             </transition>
          </router-view>
       </main>

       <!-- Table of Contents (Right Sidebar) -->
       <aside class="hidden xl:block w-64 flex-shrink-0 pl-4 py-12">
          <TableOfContentsSidebar />
       </aside>
    </div>

    <!-- Footer -->
    <footer class="docs-footer flex flex-col md:flex-row justify-between items-center gap-4">
       <div class="flex items-center gap-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet flex items-center justify-center">
             <Zap class="text-white" :size="18" />
          </div>
          <span class="text-sm text-text-secondary dark:text-text-secondary-dark font-medium">DOCS. Knowledge Base</span>
       </div>
       <div class="flex items-center gap-6 text-sm text-text-muted dark:text-text-muted-dark">
          <a href="#" class="hover:text-primary transition-colors">Terms</a>
          <a href="#" class="hover:text-primary transition-colors">Privacy</a>
          <a href="#" class="hover:text-primary transition-colors">License</a>
       </div>
       <p class="text-sm text-text-muted dark:text-text-muted-dark">© 2026 DOCS. Systems</p>
    </footer>

    <SettingsPanel v-if="showSettings" @close="showSettings = false" />
    <SearchModal />
    <Analytics />
  </div>
</template>

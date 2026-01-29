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
  Zap
} from 'lucide-vue-next'
import { useHead } from '@vueuse/head'
import { useSettingsStore } from './stores/settings'
import { useStatsStore } from './stores/stats'
import { audioService } from './composables/useAudio'
import { useKeyboardControls } from './composables/useKeyboardControls'
import SettingsPanel from './components/SettingsPanel.vue'

const showSettings = ref(false)
const settingsStore = useSettingsStore()
const statsStore = useStatsStore()

onMounted(() => {
  settingsStore.loadSettings()
  statsStore.loadStats()
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

function recordClick(): void {
  statsStore.recordClick()
}

useKeyboardControls({
  onToggleTheme: toggleTheme,
  onOpenSettings: openSettings,
  onClose: () => {
    showSettings.value = false
    settingsStore.hideHelp()
  }
})

const navItems = [
  { title: 'Getting Started', icon: BookOpen, items: ['Introduction', 'Installation', 'Quick Start'] },
  { title: 'Core Concepts', icon: FileText, items: ['Architecture', 'Components', 'State Management'] },
  { title: 'Guides', icon: Folder, items: ['Deployment', 'Customization', 'Plugins'] },
]

useHead({
  title: 'DOCS. | Knowledge Base',
  meta: [{ name: 'description', content: 'Complete documentation and knowledge base for developers.' }]
})
</script>

<template>
  <div class="docs-container" :class="{ 'dark': settingsStore.isDarkMode }">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-50 border-b px-6 py-3 flex items-center justify-between" style="background: inherit; border-color: var(--color-docs-border);">
       <div class="flex items-center gap-6">
          <router-link to="/" class="flex items-center gap-2" @click="recordClick">
             <div class="w-8 h-8 rounded-lg bg-docs-primary flex items-center justify-center">
                <BookOpen class="text-white" :size="18" />
             </div>
             <span class="font-bold text-lg tracking-tight">DOCS<span class="text-docs-primary">.</span></span>
          </router-link>

          <div class="hidden md:flex items-center gap-1">
             <button class="docs-search !w-64 !py-2 !text-sm flex items-center gap-2">
                <Search :size="16" />
                <span class="text-docs-text-muted">Search docs...</span>
                <kbd class="docs-code-inline ml-auto">⌘K</kbd>
             </button>
          </div>
       </div>

       <div class="flex items-center gap-3">
          <button @click="toggleTheme(); recordClick()" class="p-2 rounded-lg hover:bg-docs-bg-sidebar transition-colors" :aria-label="settingsStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
             <Sun v-if="settingsStore.isDarkMode" :size="18" class="text-docs-text-muted" />
             <Moon v-else :size="18" class="text-docs-text-muted" />
          </button>

          <button @click="openSettings(); recordClick()" class="p-2 rounded-lg hover:bg-docs-bg-sidebar transition-colors" aria-label="Settings">
             <Settings :size="18" class="text-docs-text-muted" />
          </button>

          <div class="h-6 w-px bg-docs-border mx-2"></div>

          <a href="https://github.com" target="_blank" class="p-2 rounded-lg hover:bg-docs-bg-sidebar transition-colors" aria-label="GitHub">
             <Github :size="18" class="text-docs-text-muted" />
          </a>
       </div>
    </header>

    <div class="docs-layout">
       <!-- Sidebar Navigation -->
       <aside class="docs-sidebar hidden lg:block" :class="{ 'dark': settingsStore.isDarkMode }">
          <div class="p-4 border-b" style="border-color: var(--color-docs-border);">
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
                      :key="item"
                      :to="'/' + item.toLowerCase().replace(' ', '-')"
                      class="docs-nav-item"
                      active-class="docs-nav-item-active"
                      @click="recordClick"
                   >
                      <ChevronRight :size="14" />
                      {{ item }}
                   </router-link>
                </div>
             </div>
          </nav>

          <div class="absolute bottom-0 left-0 right-0 p-4 border-t" style="border-color: var(--color-docs-border);">
             <div class="flex items-center justify-between text-xs text-docs-text-muted">
                <span>v2.0.0</span>
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
       <aside class="hidden xl:block w-64 flex-shrink-0 pl-4">
          <div class="sticky top-24">
             <p class="text-xs font-bold uppercase tracking-wider mb-4 text-docs-text-muted">On this page</p>
             <nav class="docs-toc">
                <a href="#" class="docs-toc-link docs-toc-link-active">Introduction</a>
                <a href="#" class="docs-toc-link">Getting Started</a>
                <a href="#" class="docs-toc-link">Configuration</a>
                <a href="#" class="docs-toc-link">Components</a>
                <a href="#" class="docs-toc-link">API Reference</a>
             </nav>
          </div>
       </aside>
    </div>

    <!-- Footer -->
    <footer class="docs-footer flex flex-col md:flex-row justify-between items-center gap-4">
       <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-lg bg-docs-primary/10 flex items-center justify-center">
             <Zap class="text-docs-primary" :size="16" />
          </div>
          <span class="text-sm text-docs-text-muted">DOCS. Knowledge Base</span>
       </div>
       <div class="flex items-center gap-6 text-sm text-docs-text-muted">
          <a href="#" class="hover:text-docs-primary">Terms</a>
          <a href="#" class="hover:text-docs-primary">Privacy</a>
          <a href="#" class="hover:text-docs-primary">License</a>
       </div>
       <p class="text-sm text-docs-text-muted">© 2026 DOCS. Systems</p>
    </footer>

    <SettingsPanel v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Sun,
  Moon,
  Github,
  Twitter,
  Zap,
  Settings
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

useHead({
  title: 'NeoBrutalist | Modern Editorial Theme',
  meta: [{ name: 'description', content: 'A high-performance Neo-Brutalist theme for modern developers.' }]
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-500" :class="settingsStore.isDarkMode ? 'dark' : 'light'">
    <!-- Brutalist Nav -->
    <nav
      class="sticky top-0 z-50 px-10 h-24 flex items-center justify-between border-b-4 border-black transition-colors duration-500"
      :class="settingsStore.isDarkMode ? 'bg-neo-primary border-white' : 'bg-neo-secondary border-black'"
    >
       <div class="flex items-center space-x-3">
          <div
            class="p-2 border-2 transition-colors duration-500"
            :class="settingsStore.isDarkMode ? 'bg-black border-white' : 'bg-white border-black'"
          >
             <Zap
               class="transition-colors duration-500"
               :class="settingsStore.isDarkMode ? 'text-white' : 'text-black'"
               :size="24"
               fill="currentColor"
             />
          </div>
          <span
            class="font-display font-black text-3xl tracking-tighter uppercase transition-colors duration-500"
            :class="settingsStore.isDarkMode ? 'text-white' : 'text-black'"
          >
            Neo<span class="italic">Theme</span>
          </span>
       </div>

       <div class="hidden md:flex items-center space-x-12">
          <router-link to="/" @click="recordClick" class="text-sm font-black uppercase tracking-widest hover:underline decoration-4 transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-white' : 'text-black'">Journal</router-link>
          <a href="#" @click="recordClick" class="text-sm font-black uppercase tracking-widest hover:underline decoration-4 transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-white' : 'text-black'">Manifesto</a>
          <a href="#" @click="recordClick" class="text-sm font-black uppercase tracking-widest hover:underline decoration-4 transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-white' : 'text-black'">Archive</a>
       </div>

       <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme(); recordClick()"
            class="p-3 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            :class="settingsStore.isDarkMode ? 'bg-white' : 'bg-black'"
            :attr.aria-label="settingsStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
             <Sun v-if="settingsStore.isDarkMode" :size="18" class="text-black" />
             <Moon v-else :size="18" class="text-white" />
          </button>

          <!-- Settings Button -->
          <button
            @click="openSettings(); recordClick()"
            class="p-3 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            :class="settingsStore.isDarkMode ? 'bg-white' : 'bg-black'"
            aria-label="Settings"
          >
             <Settings :size="18" :class="settingsStore.isDarkMode ? 'text-black' : 'text-white'" />
          </button>

          <button
            @click="recordClick()"
            class="hidden md:block px-8 py-3 font-black uppercase tracking-widest text-xs transition-all"
            :class="settingsStore.isDarkMode ? 'bg-white text-black shadow-[4px_4px_0px_0px_#fff]' : 'bg-black text-white shadow-[4px_4px_0px_0px_#000]'"
          >
             Subscribe
          </button>
       </div>
    </nav>

    <!-- Main View -->
    <main class="flex-1 transition-colors duration-500" :class="settingsStore.isDarkMode ? '' : 'bg-neo-light'">
       <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
             <component :is="Component" />
          </transition>
       </router-view>
    </main>

    <!-- Global Footer -->
    <footer
      class="py-20 px-10 border-t-8 transition-colors duration-500"
      :class="settingsStore.isDarkMode ? 'bg-black text-white border-neo-primary' : 'bg-neo-secondary text-black border-black'"
    >
       <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
          <div class="md:col-span-4 space-y-8">
             <h3 class="font-display font-black text-4xl tracking-tight uppercase italic transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-white' : 'text-black'">NeoTheme.</h3>
             <p class="leading-relaxed max-w-xs transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Building the definitive visual language for high-performance static journalism.</p>
             <div class="flex space-x-6 transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-500'">
                <a href="https://github.com/mk-knight23/55-Hugo-Blog-Theme-Starter" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                   <Github class="hover:text-neo-primary transition-colors cursor-pointer" :size="20" />
                </a>
                <Twitter class="hover:text-neo-primary transition-colors cursor-pointer" :size="20" />
             </div>
          </div>
          <div class="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
             <div class="space-y-6">
                <p class="text-neo-primary">Theme</p>
                <div class="flex flex-col gap-4">
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Documentation</a>
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Customization</a>
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Tokens</a>
                </div>
             </div>
             <div class="space-y-6">
                <p class="text-neo-primary">Platform</p>
                <div class="flex flex-col gap-4">
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Vite SSG</a>
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Vue 3.5</a>
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Tailwind</a>
                </div>
             </div>
             <div class="space-y-6">
                <p class="text-neo-primary">Legal</p>
                <div class="flex flex-col gap-4">
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">MIT License</a>
                   <a href="#" @click="recordClick" class="hover:underline transition-colors duration-500" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-600'">Privacy</a>
                </div>
             </div>
          </div>
       </div>
       <div
         class="max-w-7xl mx-auto pt-20 mt-20 border-t text-[10px] font-black uppercase tracking-[0.5em] text-center md:text-left transition-colors duration-500"
         :class="settingsStore.isDarkMode ? 'border-white/10 text-slate-600' : 'border-black/10 text-slate-400'"
       >
          &#169; 2026 NeoTheme Systems. Architecture by Staff Engineering.
       </div>
    </footer>

    <SettingsPanel v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

kbd {
  @apply px-2 py-1 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded;
}
</style>

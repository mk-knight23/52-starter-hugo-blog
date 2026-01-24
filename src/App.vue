<script setup lang="ts">
import { ref } from 'vue'
import { 
  Sun, 
  Moon, 
  Github, 
  Twitter,
  Zap
} from 'lucide-vue-next'
import { useHead } from '@vueuse/head'

const isDarkMode = ref(true)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

useHead({
  title: 'NeoBrutalist | Modern Editorial Theme',
  meta: [{ name: 'description', content: 'A high-performance Neo-Brutalist theme for modern developers.' }]
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans overflow-x-hidden">
    <!-- Brutalist Nav -->
    <nav class="sticky top-0 z-50 bg-neo-primary dark:bg-neo-secondary px-10 h-24 flex items-center justify-between border-b-4 border-black dark:border-white transition-colors duration-500">
       <div class="flex items-center space-x-3">
          <div class="bg-black dark:bg-white p-2 border-2 border-white dark:border-black rotate-12">
             <Zap class="text-white dark:text-black" :size="24" fill="currentColor" />
          </div>
          <span class="font-display font-black text-3xl tracking-tighter uppercase text-black dark:text-white">Neo<span class="italic">Theme</span></span>
       </div>

       <div class="hidden md:flex items-center space-x-12">
          <router-link to="/" class="text-sm font-black uppercase tracking-widest text-black dark:text-white hover:underline decoration-4">Journal</router-link>
          <a href="#" class="text-sm font-black uppercase tracking-widest text-black dark:text-white hover:underline decoration-4">Manifesto</a>
          <a href="#" class="text-sm font-black uppercase tracking-widest text-black dark:text-white hover:underline decoration-4">Archive</a>
       </div>

       <div class="flex items-center space-x-4">
          <button @click="toggleTheme" class="p-3 bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
             <Sun v-if="isDarkMode" :size="18" />
             <Moon v-else :size="18" />
          </button>
          <button class="hidden md:block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs brutalist-shadow">
             Subscribe
          </button>
       </div>
    </nav>

    <!-- Main View -->
    <main class="flex-1">
       <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
             <component :is="Component" />
          </transition>
       </router-view>
    </main>

    <!-- Global Footer -->
    <footer class="py-20 px-10 bg-black text-white border-t-8 border-neo-primary">
       <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
          <div class="md:col-span-4 space-y-8">
             <h3 class="font-display font-black text-4xl tracking-tight uppercase italic text-white">NeoTheme.</h3>
             <p class="text-slate-400 font-medium leading-relaxed max-w-xs">Building the definitive visual language for high-performance static journalism.</p>
             <div class="flex space-x-6 text-slate-500">
                <Github class="hover:text-neo-primary transition-colors cursor-pointer" :size="20" />
                <Twitter class="hover:text-neo-primary transition-colors cursor-pointer" :size="20" />
             </div>
          </div>
          <div class="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
             <div class="space-y-6">
                <p class="text-neo-primary">Theme</p>
                <div class="flex flex-col gap-4">
                   <a href="#" class="hover:underline">Documentation</a>
                   <a href="#" class="hover:underline">Customization</a>
                   <a href="#" class="hover:underline">Tokens</a>
                </div>
             </div>
             <div class="space-y-6">
                <p class="text-neo-primary">Platform</p>
                <div class="flex flex-col gap-4">
                   <a href="#" class="hover:underline">Vite SSG</a>
                   <a href="#" class="hover:underline">Vue 3.5</a>
                   <a href="#" class="hover:underline">Tailwind</a>
                </div>
             </div>
             <div class="space-y-6">
                <p class="text-neo-primary">Legal</p>
                <div class="flex flex-col gap-4">
                   <a href="#" class="hover:underline">MIT License</a>
                   <a href="#" class="hover:underline">Privacy</a>
                </div>
             </div>
          </div>
       </div>
       <div class="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 text-center md:text-left">
          © 2026 NeoTheme Systems. Architecture by Staff Engineering.
       </div>
    </footer>
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
</style>

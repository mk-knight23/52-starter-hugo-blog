<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Clock, ChevronRight, BookOpen, Terminal, Layers, Zap, Sparkles, ArrowUpRight } from 'lucide-vue-next'

const guides = ref([
  { title: 'Quick Start', description: 'Get up and running in under 5 minutes', icon: Zap, time: '2 min', color: 'from-amber-400 to-orange-500' },
  { title: 'Installation', description: 'Step-by-step setup guide for all platforms', icon: Terminal, time: '5 min', color: 'from-emerald-400 to-teal-500' },
  { title: 'Configuration', description: 'Customize your documentation structure', icon: Layers, time: '10 min', color: 'from-violet-400 to-purple-500' },
])

const categories = ref([
  { title: 'Getting Started', count: 12, description: 'Introduction and setup guides' },
  { title: 'Core Concepts', count: 8, description: 'Understanding the architecture' },
  { title: 'API Reference', count: 24, description: 'Complete API documentation' },
  { title: 'Guides', count: 15, description: 'Tutorials and how-to guides' },
])

const recentUpdates = ref([
  { title: 'Added Markdown support with Vite', date: 'Today', type: 'New' },
  { title: 'Integrated FlexSearch for documentation search', date: 'Today', type: 'New' },
  { title: 'Added Shiki syntax highlighting', date: 'Today', type: 'New' },
  { title: 'Setup RSS and JSON feeds', date: 'Today', type: 'Updated' },
])

function recordClick() {
  // Analytics tracking
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-16">
    <!-- Hero Section -->
    <header class="docs-header !border-0 !pb-0 text-center md:text-left">
       <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-dim mb-6 border border-primary/20">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="text-xs font-semibold text-primary">v2.0 Documentation</span>
       </div>
       <h1 class="docs-title mb-5">
          Welcome to <span class="docs-gradient-text">DOCS.</span>
       </h1>
       <p class="text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl leading-relaxed">
          The complete knowledge base for developers. Find guides, tutorials, and API references for building modern web applications.
       </p>

       <div class="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
          <router-link to="/getting-started" class="docs-button" @click="recordClick">
             Read the Docs
             <ArrowRight :size="16" />
          </router-link>
          <a href="#" class="docs-button-secondary">
             <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
             </svg>
             View on GitHub
          </a>
       </div>
    </header>

    <!-- Quick Start Guides -->
    <section class="space-y-6">
       <div class="flex items-center justify-between">
          <h2 class="docs-section-title">
             <Zap class="text-primary" :size="22" />
             Quick Start Guides
          </h2>
          <router-link to="/guides" class="text-sm font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1">
             View all <ArrowRight :size="14" />
          </router-link>
       </div>
       <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="guide in guides" :key="guide.title" class="docs-card cursor-pointer group hover:-translate-y-1">
             <div class="flex items-start justify-between mb-4">
                <div :class="`p-2.5 rounded-xl bg-gradient-to-br ${guide.color} shadow-lg`">
                   <component :is="guide.icon" class="text-white" :size="20" />
                </div>
                <span class="docs-badge">{{ guide.time }} read</span>
             </div>
             <h3 class="font-semibold text-text dark:text-text-dark mb-2 group-hover:text-primary transition-colors">{{ guide.title }}</h3>
             <p class="text-sm text-text-secondary dark:text-text-secondary-dark">{{ guide.description }}</p>
          </div>
       </div>
    </section>

    <!-- Categories Grid -->
    <section class="space-y-6">
       <h2 class="docs-section-title">
          <BookOpen class="text-primary" :size="22" />
          Browse by Category
       </h2>
       <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="category in categories" :key="category.title" class="docs-card cursor-pointer group hover:-translate-y-1">
             <div class="flex items-start justify-between">
                <div>
                   <h3 class="font-semibold text-text dark:text-text-dark mb-1 group-hover:text-primary transition-colors">{{ category.title }}</h3>
                   <p class="text-sm text-text-secondary dark:text-text-secondary-dark">{{ category.description }}</p>
                </div>
                <span class="text-xs font-semibold px-3 py-1 rounded-full bg-surface dark:bg-surface-hover-dark text-text-secondary dark:text-text-secondary-dark border border-border dark:border-border-dark">
                   {{ category.count }} articles
                </span>
             </div>
          </div>
       </div>
    </section>

    <!-- Recent Updates -->
    <section class="space-y-6">
       <h2 class="docs-section-title">
          <Clock class="text-primary" :size="22" />
          Recent Updates
       </h2>
       <div class="border border-border dark:border-border-dark rounded-xl overflow-hidden bg-surface/50 dark:bg-surface-dark/50">
           <div v-for="(update, index) in recentUpdates" :key="update.title"
                class="flex items-center justify-between px-5 py-4 border-b border-border dark:border-border-dark last:border-0 hover:bg-surface dark:hover:bg-surface-hover-dark transition-colors">
             <div class="flex items-center gap-4">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                  :class="{
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': update.type === 'New',
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400': update.type === 'Updated',
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': update.type === 'Fixed'
                  }"
                >{{ update.type }}</span>
                <span class="text-sm text-text dark:text-text-dark">{{ update.title }}</span>
             </div>
             <span class="text-xs text-text-muted dark:text-text-muted-dark">{{ update.date }}</span>
          </div>
       </div>
    </section>

    <!-- Help CTA Section -->
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-violet p-8 md:p-10">
       <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
       <div class="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
             <Sparkles class="text-white" :size="28" />
          </div>
          <div class="flex-1">
             <h3 class="font-bold text-xl text-white mb-2">Need Help?</h3>
             <p class="text-sm text-white/80 mb-0">
                Can't find what you're looking for? Check our FAQ or reach out to the community.
             </p>
          </div>
          <div class="flex flex-wrap gap-3">
             <a href="#" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg">
                View FAQ
                <ArrowUpRight :size="14" />
             </a>
             <a href="#" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20">
                Join Discord
                <ArrowUpRight :size="14" />
             </a>
          </div>
       </div>
    </section>
  </div>
</template>

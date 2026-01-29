<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Clock, ChevronRight, BookOpen, Terminal, Layers, Zap } from 'lucide-vue-next'

const guides = ref([
  { title: 'Quick Start', description: 'Get up and running in under 5 minutes', icon: Zap, time: '2 min' },
  { title: 'Installation', description: 'Step-by-step setup guide for all platforms', icon: Terminal, time: '5 min' },
  { title: 'Configuration', description: 'Customize your documentation structure', icon: Layers, time: '10 min' },
])

const categories = ref([
  { title: 'Getting Started', count: 12, description: 'Introduction and setup guides' },
  { title: 'Core Concepts', count: 8, description: 'Understanding the architecture' },
  { title: 'API Reference', count: 24, description: 'Complete API documentation' },
  { title: 'Guides', count: 15, description: 'Tutorials and how-to guides' },
])

const recentUpdates = ref([
  { title: 'Added new authentication section', date: 'Today', type: 'New' },
  { title: 'Updated deployment guide for Vercel', date: 'Yesterday', type: 'Updated' },
  { title: 'Fixed code examples in API reference', date: '2 days ago', type: 'Fixed' },
])
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Hero Section -->
    <header class="docs-header !border-0 !pb-0">
       <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-docs-primary/10 mb-6">
          <span class="w-2 h-2 rounded-full bg-docs-primary animate-pulse"></span>
          <span class="text-xs font-medium text-docs-primary">v2.0 Documentation</span>
       </div>
       <h1 class="docs-title mb-4">
          Welcome to <span class="text-docs-primary">DOCS.</span>
       </h1>
       <p class="text-lg text-docs-text-muted max-w-2xl leading-relaxed">
          The complete knowledge base for developers. Find guides, tutorials, and API references for building modern web applications.
       </p>

       <div class="flex flex-wrap gap-4 mt-8">
          <router-link to="/getting-started" class="docs-button" @click="recordClick">
             Read the Docs
             <ArrowRight :size="16" />
          </router-link>
          <a href="#" class="docs-button-secondary flex items-center gap-2">
             <Github :size="16" />
             View on GitHub
          </a>
       </div>
    </header>

    <!-- Quick Start Guides -->
    <section class="space-y-6">
       <h2 class-bold flex items-center="text-xl font gap-2">
          <Zap class="text-docs-primary" :size="20" />
          Quick Start Guides
       </h2>
       <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="guide in guides" :key="guide.title" class="docs-card cursor-pointer group">
             <div class="flex items-start justify-between mb-4">
                <div class="p-2 rounded-lg bg-docs-primary/10">
                   <component :is="guide.icon" class="text-docs-primary" :size="20" />
                </div>
                <span class="docs-badge">{{ guide.time }} read</span>
             </div>
             <h3 class="font-semibold mb-2 group-hover:text-docs-primary transition-colors">{{ guide.title }}</h3>
             <p class="text-sm text-docs-text-muted">{{ guide.description }}</p>
          </div>
       </div>
    </section>

    <!-- Categories Grid -->
    <section class="space-y-6">
       <h2 class="text-xl font-bold">Browse by Category</h2>
       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="category in categories" :key="category.title" class="docs-card cursor-pointer group">
             <div class="flex items-start justify-between">
                <div>
                   <h3 class="font-semibold mb-1 group-hover:text-docs-primary transition-colors">{{ category.title }}</h3>
                   <p class="text-sm text-docs-text-muted">{{ category.description }}</p>
                </div>
                <span class="text-xs font-medium px-2 py-1 rounded-full bg-docs-bg-sidebar">{{ category.count }} articles</span>
             </div>
          </div>
       </div>
    </section>

    <!-- Recent Updates -->
    <section class="space-y-6">
       <h2 class="text-xl font-bold flex items-center gap-2">
          <Clock class="text-docs-primary" :size="20" />
          Recent Updates
       </h2>
       <div class="border rounded-xl overflow-hidden">
           <div v-for="update in recentUpdates" :key="update.title" class="flex items-center justify-between px-4 py-3 border-b last:border-0" style="border-color: var(--color-docs-border);">
             <div class="flex items-center gap-4">
                <span class="text-xs font-medium px-2 py-0.5 rounded"
                  :class="{
                    'bg-green-100 text-green-700': update.type === 'New',
                    'bg-blue-100 text-blue-700': update.type === 'Updated',
                    'bg-yellow-100 text-yellow-700': update.type === 'Fixed'
                  }"
                >{{ update.type }}</span>
                <span class="text-sm">{{ update.title }}</span>
             </div>
             <span class="text-xs text-docs-text-muted">{{ update.date }}</span>
          </div>
       </div>
    </section>

    <!-- Help Section -->
    <section class="docs-card !bg-docs-primary/5 !border-docs-primary/20">
       <div class="flex items-start gap-4">
          <div class="p-3 rounded-lg bg-docs-primary text-white">
             <BookOpen :size="24" />
          </div>
          <div class="flex-1">
             <h3 class="font-bold mb-2">Need Help?</h3>
             <p class="text-sm text-docs-text-muted mb-4">
                Can't find what you're looking for? Check our FAQ or reach out to the community.
             </p>
             <div class="flex flex-wrap gap-3">
                <a href="#" class="text-sm font-medium text-docs-primary hover:underline flex items-center gap-1">
                   View FAQ <ChevronRight :size="14" />
                </a>
                <a href="#" class="text-sm font-medium text-docs-primary hover:underline flex items-center gap-1">
                   Join Discord <ChevronRight :size="14" />
                </a>
             </div>
          </div>
       </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    recordClick() {
      // This will be connected to stats store
    }
  }
}
</script>

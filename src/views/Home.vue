<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Clock } from 'lucide-vue-next'

const posts = ref([
  { slug: 'neobrutalism-design', title: 'The Rise of Neo-Brutalism', excerpt: 'Why high-contrast UI is dominating modern editorial design.', date: 'Dec 01, 2025', category: 'Design', readTime: '5 min' },
  { slug: 'static-first-web', title: 'Static-First Engineering', excerpt: 'Leveraging SSG for sub-second page loads and global distribution.', date: 'Nov 28, 2025', category: 'Performance', readTime: '8 min' },
  { slug: 'vue-sfc-evolution', title: 'Vue SFC Evolution', excerpt: 'How script setup and macros are refining the developer experience.', date: 'Nov 25, 2025', category: 'Engineering', readTime: '6 min' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-24 space-y-32">
    <!-- Hero -->
    <header class="max-w-4xl space-y-10">
       <div class="inline-block px-4 py-1 bg-neo-accent brutalist-border font-black uppercase tracking-widest text-[10px]">
          Dispatch // 2026
       </div>
       <h2 class="text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase text-black dark:text-white">
          High <br />
          <span class="italic font-light text-neo-primary">Impact</span> <br />
          Journalism.
       </h2>
       <p class="text-2xl text-slate-500 font-medium max-w-xl italic">Exploring the intersection of brutalist design and high-performance frontend architecture.</p>
    </header>

    <!-- Post Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
       <div v-for="post in posts" :key="post.slug" class="group bg-white dark:bg-neo-dark brutalist-border brutalist-shadow p-8 space-y-8 cursor-pointer overflow-hidden">
          <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
             <span class="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black">{{ post.category }}</span>
             <span class="flex items-center gap-1.5"><Clock :size="12" /> {{ post.readTime }}</span>
          </div>
          <div class="space-y-4">
             <h3 class="text-4xl font-display font-black leading-none uppercase tracking-tighter group-hover:text-neo-primary transition-colors">{{ post.title }}</h3>
             <p class="text-slate-500 font-medium leading-relaxed line-clamp-3 italic">{{ post.excerpt }}</p>
          </div>
          <div class="pt-6 border-t-2 border-black dark:border-white/10 flex items-center justify-between">
             <span class="text-[10px] font-black uppercase text-slate-400">{{ post.date }}</span>
             <router-link :to="'/post/' + post.slug" class="w-10 h-10 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform">
                <ArrowRight :size="20" />
             </router-link>
          </div>
       </div>
    </section>
  </div>
</template>

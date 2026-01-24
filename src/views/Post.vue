<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Clock, Share2, Zap } from 'lucide-vue-next'

const props = defineProps<{ slug: string }>()

const post = ref({
  title: 'The Rise of Neo-Brutalism',
  author: 'M. Kazi',
  date: 'Dec 01, 2025',
  readTime: '5 min read',
  content: `
    <p>Neo-Brutalism in web design is a reaction against the overly polished, gradient-heavy "SaaS" look that has dominated the last decade. It values raw clarity, high contrast, and architectural honesty.</p>
    <h2>Core Principles</h2>
    <p>The style is defined by heavy black borders, bold primary colors (often unmuted), and a complete lack of soft shadows. It prioritizes function over decorative flourishes.</p>
    <blockquote>"Brutalism is not about being ugly. It's about being direct."</blockquote>
    <p>In this editorial theme, we leverage Tailwind CSS to manage these aggressive design tokens while maintaining sub-second performance through SSG.</p>
  `
})
</script>

<template>
  <article class="max-w-4xl mx-auto px-10 py-24 space-y-16">
    <router-link to="/" class="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-neo-primary transition-colors">
       <ArrowLeft class="mr-2" :size="14" /> Back to Journal
    </router-link>

    <header class="space-y-10">
       <div class="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-neo-primary">
          <span class="px-2 py-1 bg-black text-white dark:bg-white dark:text-black">Design Analysis</span>
          <span class="flex items-center gap-1.5 italic text-slate-500"><Clock :size="12" /> {{ post.readTime }}</span>
       </div>
       <h1 class="text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase text-black dark:text-white">
          {{ post.title }}
       </h1>
       <div class="flex items-center justify-between py-10 border-y-4 border-black dark:border-white">
          <div class="flex items-center space-x-6">
             <div class="w-14 h-14 bg-neo-accent border-2 border-black dark:border-white rounded-full flex items-center justify-center font-black">MK</div>
             <div>
                <p class="text-sm font-black uppercase tracking-tight dark:text-white">{{ post.author }}</p>
                <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest">{{ post.date }}</p>
             </div>
          </div>
          <div class="flex items-center space-x-4">
             <button class="w-12 h-12 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center hover:bg-neo-accent transition-colors shadow-[4px_4px_0px_0px_#000] dark:shadow-none"><Share2 :size="18" /></button>
          </div>
       </div>
    </header>

    <div class="prose prose-2xl prose-slate dark:prose-invert max-w-none font-medium italic text-slate-700 dark:text-slate-300" v-html="post.content"></div>

    <footer class="pt-32">
       <div class="bg-neo-accent brutalist-border p-16 text-center space-y-8 brutalist-shadow">
          <Zap class="mx-auto text-black" :size="48" fill="currentColor" />
          <h4 class="text-4xl font-display font-black uppercase tracking-tight text-black">Keep the Signal Clear.</h4>
          <p class="text-black/70 max-w-md mx-auto font-bold italic">Subscribe to receive technical breakdowns of high-fidelity systems directly in your terminal.</p>
          <button class="bg-black text-white px-12 py-5 rounded-none font-black uppercase tracking-widest text-xs hover:bg-neo-primary transition-all">Subscribe</button>
       </div>
    </footer>
  </article>
</template>

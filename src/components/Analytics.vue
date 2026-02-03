<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { initAnalytics, trackPageView } from '@/config/analytics'

const route = useRoute()

// Initialize analytics on mount
onMounted(() => {
  initAnalytics()
  trackPageView(route.path, route.meta.title as string)
})

// Track page views on route changes
watch(
  () => route.path,
  (toPath, fromPath) => {
    if (toPath !== fromPath) {
      trackPageView(toPath, route.meta.title as string)
    }
  }
)
</script>

<template>
  <!-- This component doesn't render anything -->
  <!-- It only initializes and tracks analytics -->
</template>

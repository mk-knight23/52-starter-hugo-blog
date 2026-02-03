<script setup lang="ts">
import { useTableOfContents } from '@/composables/useTableOfContents'

const { tocItems, activeId, hasToc, scrollToHeading } = useTableOfContents()
</script>

<template>
  <div v-if="hasToc" class="table-of-contents">
    <p class="toc-title">On this page</p>
    <nav class="toc-nav">
      <template v-for="item in tocItems" :key="item.id">
        <div :class="`toc-item toc-item-level-${item.level}`">
          <a
            :href="`#${item.id}`"
            :class="[
              'toc-link',
              activeId === item.id ? 'toc-link-active' : ''
            ]"
            @click.prevent="scrollToHeading(item.id)"
          >
            {{ item.text }}
          </a>
          <div v-if="item.children && item.children.length" class="toc-children">
            <template v-for="child in item.children" :key="child.id">
              <div :class="`toc-item toc-item-level-${child.level}`">
                <a
                  :href="`#${child.id}`"
                  :class="[
                    'toc-link',
                    activeId === child.id ? 'toc-link-active' : ''
                  ]"
                  @click.prevent="scrollToHeading(child.id)"
                >
                  {{ child.text }}
                </a>
              </div>
            </template>
          </div>
        </div>
      </template>
    </nav>
  </div>
  <div v-else class="table-of-contents-placeholder">
    <p class="text-xs text-docs-text-muted">No table of contents available</p>
  </div>
</template>

<style scoped>
.table-of-contents,
.table-of-contents-placeholder {
  position: sticky;
  top: 6rem;
}

.toc-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: var(--color-docs-text-muted);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-item {
  position: relative;
}

.toc-item-level-1 {
  padding-left: 0;
}

.toc-item-level-2 {
  padding-left: 1rem;
}

.toc-item-level-3 {
  padding-left: 2rem;
}

.toc-item-level-4 {
  padding-left: 3rem;
}

.toc-item-level-5,
.toc-item-level-6 {
  padding-left: 4rem;
}

.toc-link {
  display: block;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  color: var(--color-docs-text-muted);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
  line-height: 1.5;
}

.toc-link:hover {
  color: var(--color-docs-primary);
  border-left-color: var(--color-docs-primary);
  padding-left: 0.75rem;
}

.toc-link-active {
  color: var(--color-docs-primary);
  font-weight: 600;
  border-left-color: var(--color-docs-primary);
  padding-left: 0.75rem;
}

.toc-children {
  margin-top: 0.25rem;
}
</style>

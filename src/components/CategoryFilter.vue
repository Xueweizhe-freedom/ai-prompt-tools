<template>
  <div class="space-y-4">
    <h3 class="font-semibold text-[var(--text-primary)]">{{ $t('nav.categories') }}</h3>
    
    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="toggleCategory(category.id)"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all border"
        :class="selectedCategories.includes(category.id) 
          ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]' 
          : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--primary-color)]'"
      >
        <span class="mr-1">{{ category.icon }}</span>
        {{ $t(`categories.${category.id}`) }}
      </button>
    </div>

    <button 
      v-if="selectedCategories.length > 0"
      @click="clearCategories"
      class="text-sm text-[var(--text-muted)] hover:text-[var(--primary-color)] transition-colors"
    >
      {{ $t('filter.reset') }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePromptsStore } from '@/stores/prompts.js'

const promptsStore = usePromptsStore()

const categories = computed(() => promptsStore.categories)
const selectedCategories = computed(() => promptsStore.selectedCategories)

function toggleCategory(categoryId) {
  promptsStore.toggleCategory(categoryId)
}

function clearCategories() {
  promptsStore.setSelectedCategories([])
}
</script>

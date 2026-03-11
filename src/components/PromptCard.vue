<template>
  <div 
    class="card group relative overflow-hidden cursor-pointer"
    @click="goToDetail"
  >
    <!-- Featured Badge -->
    <div 
      v-if="prompt.featured" 
      class="absolute top-3 right-3 z-10 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full"
    >
      ★ {{ $t('home.featuredPrompts') }}
    </div>

    <!-- Card Content -->
    <div class="p-5">
      <!-- Header -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span 
            class="px-2 py-1 text-xs font-medium rounded-md"
            :class="levelClass"
          >
            {{ $t(`levels.${prompt.level}`) }}
          </span>
          <span class="text-xs text-[var(--text-muted)]">
            {{ getCategoryName(prompt.category) }}
          </span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors">
        {{ prompt.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
        {{ prompt.description }}
      </p>

      <!-- Models -->
      <div class="flex flex-wrap gap-1 mb-4">
        <span 
          v-for="model in prompt.model.slice(0, 3)" 
          :key="model"
          class="px-2 py-0.5 text-xs bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded"
        >
          {{ model }}
        </span>
        <span v-if="prompt.model.length > 3" class="text-xs text-[var(--text-muted)]">
          +{{ prompt.model.length - 3 }}
        </span>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-4">
        <span 
          v-for="tag in prompt.tags.slice(0, 3)" 
          :key="tag"
          class="text-xs text-[var(--text-muted)]"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
        <div class="flex items-center space-x-4 text-sm text-[var(--text-muted)]">
          <span class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <span>{{ formatNumber(prompt.views) }}</span>
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Favorite Button -->
          <button 
            @click.stop="toggleFavorite"
            class="p-2 rounded-lg transition-colors"
            :class="isFavorite ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]'"
          >
            <svg 
              class="w-5 h-5" 
              :fill="isFavorite ? 'currentColor' : 'none'" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          <!-- Copy Button -->
          <button 
            @click.stop="copyPrompt"
            class="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary-color)] hover:bg-[var(--bg-secondary)] transition-colors"
            :class="{ 'text-green-500': copied }"
          >
            <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites.js'
import { useCopy } from '@/composables/useCopy.js'
import { usePromptsStore } from '@/stores/prompts.js'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  prompt: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const favoritesStore = useFavoritesStore()
const promptsStore = usePromptsStore()
const { copied, copyToClipboard } = useCopy()
const { t } = useI18n()

const isFavorite = computed(() => favoritesStore.isFavorite(props.prompt.id))

const levelClass = computed(() => {
  const classes = {
    basic: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    advanced: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pro: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
  }
  return classes[props.prompt.level] || classes.basic
})

function getCategoryName(categoryId) {
  return t(`categories.${categoryId}`)
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

function goToDetail() {
  promptsStore.incrementViews(props.prompt.id)
  router.push(`/prompt/${props.prompt.id}`)
}

async function toggleFavorite() {
  const result = favoritesStore.toggleFavorite(props.prompt.id)
  // Could add toast notification here
}

async function copyPrompt() {
  await copyToClipboard(props.prompt.content)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

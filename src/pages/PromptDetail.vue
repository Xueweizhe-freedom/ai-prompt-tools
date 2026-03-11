<template>
  <div v-if="prompt" class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-[var(--text-muted)] mb-6">
        <router-link to="/" class="hover:text-[var(--primary-color)]">{{ $t('nav.home') }}</router-link>
        <span>/</span>
        <router-link to="/prompts" class="hover:text-[var(--primary-color)]">{{ $t('nav.prompts') }}</router-link>
        <span>/</span>
        <router-link :to="`/prompts/${prompt.category}`" class="hover:text-[var(--primary-color)]">
          {{ $t(`categories.${prompt.category}`) }}
        </router-link>
        <span>/</span>
        <span class="text-[var(--text-primary)]">{{ prompt.title }}</span>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span 
            class="px-3 py-1 text-sm font-medium rounded-full"
            :class="levelClass"
          >
            {{ $t(`levels.${prompt.level}`) }}
          </span>
          <span class="px-3 py-1 text-sm bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full">
            {{ $t(`categories.${prompt.category}`) }}
          </span>
          <span class="flex items-center text-sm text-[var(--text-muted)]">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            {{ prompt.views }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
          {{ prompt.title }}
        </h1>

        <p class="text-lg text-[var(--text-secondary)]">
          {{ prompt.description }}
        </p>
      </div>

      <!-- Models -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          {{ $t('prompt.model') }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="model in prompt.model" 
            :key="model"
            class="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg font-medium"
          >
            {{ model }}
          </span>
        </div>
      </div>

      <!-- Prompt Content -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            {{ $t('prompt.content') }}
          </h3>
          <button 
            @click="copyPrompt"
            class="flex items-center space-x-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition-opacity"
            :class="{ 'bg-green-500': copied }"
          >
            <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>{{ copied ? $t('prompt.copied') : $t('prompt.copy') }}</span>
          </button>
        </div>
        
        <div class="relative">
          <pre class="p-6 bg-[var(--bg-secondary)] rounded-xl overflow-x-auto text-[var(--text-primary)] whitespace-pre-wrap font-mono text-sm leading-relaxed">{{ prompt.content }}</pre>
        </div>
      </div>

      <!-- Example Output -->
      <div v-if="prompt.example" class="mb-8">
        <h3 class="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          {{ $t('prompt.example') }}
        </h3>
        <div class="p-6 bg-[var(--bg-secondary)]/50 border border-[var(--border-color)] rounded-xl">
          <pre class="text-[var(--text-secondary)] whitespace-pre-wrap font-mono text-sm leading-relaxed">{{ prompt.example }}</pre>
        </div>
      </div>

      <!-- Tags -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          {{ $t('prompt.tags') }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in prompt.tags" 
            :key="tag"
            class="px-3 py-1 text-sm bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)] transition-colors cursor-pointer"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 pt-6 border-t border-[var(--border-color)]">
        <button 
          @click="toggleFavorite"
          class="flex items-center space-x-2 px-6 py-3 rounded-xl border-2 transition-colors"
          :class="isFavorite 
            ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20' 
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-red-500 hover:text-red-500'"
        >
          <svg 
            class="w-5 h-5" 
            :fill="isFavorite ? 'currentColor' : 'none'" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span>{{ isFavorite ? $t('prompt.unfavorite') : $t('prompt.favorite') }}</span>
        </button>

        <button 
          @click="sharePrompt"
          class="flex items-center space-x-2 px-6 py-3 rounded-xl border-2 border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
          <span>{{ $t('prompt.share') }}</span>
        </button>
      </div>

      <!-- Related Prompts -->
      <div v-if="relatedPrompts.length > 0" class="mt-12 pt-8 border-t border-[var(--border-color)]">
        <h3 class="text-xl font-bold text-[var(--text-primary)] mb-6">{{ $t('prompt.related') }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PromptCard 
            v-for="relatedPrompt in relatedPrompts" 
            :key="relatedPrompt.id" 
            :prompt="relatedPrompt"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4">😕</div>
      <h1 class="text-2xl font-bold text-[var(--text-primary)] mb-2">Prompt Not Found</h1>
      <p class="text-[var(--text-secondary)] mb-6">The prompt you're looking for doesn't exist.</p>
      <router-link to="/prompts" class="px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:opacity-90 transition-opacity">
        Browse All Prompts
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePromptsStore } from '@/stores/prompts.js'
import { useFavoritesStore } from '@/stores/favorites.js'
import { useCopy } from '@/composables/useCopy.js'
import PromptCard from '@/components/PromptCard.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const route = useRoute()
const promptsStore = usePromptsStore()
const favoritesStore = useFavoritesStore()
const { copied, copyToClipboard } = useCopy()

const prompt = computed(() => promptsStore.getPromptById(props.id))

const isFavorite = computed(() => {
  if (!prompt.value) return false
  return favoritesStore.isFavorite(prompt.value.id)
})

const levelClass = computed(() => {
  if (!prompt.value) return ''
  const classes = {
    basic: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    advanced: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pro: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
  }
  return classes[prompt.value.level] || classes.basic
})

const relatedPrompts = computed(() => {
  if (!prompt.value) return []
  return promptsStore.prompts
    .filter(p => p.id !== prompt.value.id && p.category === prompt.value.category)
    .slice(0, 4)
})

async function copyPrompt() {
  if (prompt.value) {
    await copyToClipboard(prompt.value.content)
  }
}

function toggleFavorite() {
  if (prompt.value) {
    favoritesStore.toggleFavorite(prompt.value.id)
  }
}

async function sharePrompt() {
  if (navigator.share && prompt.value) {
    try {
      await navigator.share({
        title: prompt.value.title,
        text: prompt.value.description,
        url: window.location.href
      })
    } catch (err) {
      // User cancelled or share failed
      await copyToClipboard(window.location.href)
    }
  } else {
    await copyToClipboard(window.location.href)
  }
}
</script>

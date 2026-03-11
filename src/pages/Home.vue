<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {{ $t('home.title') }}
        </h1>
        <p class="text-xl sm:text-2xl text-[var(--text-secondary)] mb-4">
          {{ $t('home.subtitle') }}
        </p>
        <p class="text-[var(--text-muted)] mb-10 max-w-2xl mx-auto">
          {{ $t('home.description') }}
        </p>

        <!-- Search Bar -->
        <SearchBar v-model="searchQuery" @search="handleSearch" class="mb-8" />

        <!-- Stats -->
        <div class="flex justify-center space-x-8 text-sm text-[var(--text-muted)]">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-[var(--primary-color)]">{{ totalPrompts }}</span>
            <span>{{ $t('home.totalPrompts', { count: '' }) }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-[var(--primary-color)]">{{ categories.length }}</span>
            <span>{{ $t('nav.categories') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-[var(--text-primary)]">{{ $t('home.categories') }}</h2>
          <router-link to="/prompts" class="text-[var(--primary-color)] hover:underline">
            {{ $t('home.viewAll') }} →
          </router-link>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="`/prompts/${category.id}`"
            class="group p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--primary-color)] transition-all hover:shadow-lg"
          >
            <div class="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{{ category.icon }}</div>
            <h3 class="font-semibold text-[var(--text-primary)]">{{ $t(`categories.${category.id}`) }}</h3>
            <p class="text-sm text-[var(--text-muted)] mt-1">
              {{ getPromptCount(category.id) }} {{ $t('home.totalPrompts', { count: '' }).replace('0', '') }}
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Prompts -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-8">{{ $t('home.featuredPrompts') }}</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PromptCard 
            v-for="prompt in featuredPrompts" 
            :key="prompt.id" 
            :prompt="prompt"
          />
        </div>
      </div>
    </section>

    <!-- Hot Prompts -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-8">{{ $t('home.hotPrompts') }}</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PromptCard 
            v-for="prompt in hotPrompts" 
            :key="prompt.id" 
            :prompt="prompt"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePromptsStore } from '@/stores/prompts.js'
import SearchBar from '@/components/SearchBar.vue'
import PromptCard from '@/components/PromptCard.vue'

const router = useRouter()
const promptsStore = usePromptsStore()
const searchQuery = ref('')

const categories = computed(() => promptsStore.categories)
const totalPrompts = computed(() => promptsStore.prompts.length)
const featuredPrompts = computed(() => promptsStore.featuredPrompts)
const hotPrompts = computed(() => promptsStore.hotPrompts)

function getPromptCount(categoryId) {
  return promptsStore.getPromptsByCategory(categoryId).length
}

function handleSearch(query) {
  if (query) {
    router.push('/prompts')
  }
}
</script>

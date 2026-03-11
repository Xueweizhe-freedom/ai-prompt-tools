<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-4">
          {{ pageTitle }}
        </h1>
        <SearchBar v-model="searchQuery" @search="handleSearch" />
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <div class="sticky top-24 space-y-8">
            <CategoryFilter />
            <LevelFilter />
            
            <!-- Sort Options -->
            <div class="space-y-4">
              <h3 class="font-semibold text-[var(--text-primary)]">{{ $t('filter.sortBy') }}</h3>
              <select 
                v-model="sortBy"
                class="w-full px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-color)]"
              >
                <option value="popular">{{ $t('filter.popular') }}</option>
                <option value="newest">{{ $t('filter.newest') }}</option>
                <option value="name">{{ $t('filter.name') }}</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <button 
              v-if="hasActiveFilters"
              @click="clearAllFilters"
              class="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors"
            >
              {{ $t('filter.reset') }}
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
          <!-- Results Count -->
          <div class="mb-6 flex items-center justify-between">
            <p class="text-[var(--text-secondary)]">
              {{ $t('home.totalPrompts', { count: filteredPrompts.length }) }}
            </p>
          </div>

          <!-- Prompts Grid -->
          <div v-if="filteredPrompts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <PromptCard 
              v-for="prompt in filteredPrompts" 
              :key="prompt.id" 
              :prompt="prompt"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-[var(--text-primary)] mb-2">
              {{ $t('messages.noResults') }}
            </h3>
            <p class="text-[var(--text-secondary)] mb-6">
              {{ $t('filter.reset') }} {{ $t('filter.search') }}
            </p>
            <button 
              @click="clearAllFilters"
              class="px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              {{ $t('filter.reset') }}
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePromptsStore } from '@/stores/prompts.js'
import { useFavoritesStore } from '@/stores/favorites.js'
import SearchBar from '@/components/SearchBar.vue'
import PromptCard from '@/components/PromptCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import LevelFilter from '@/components/LevelFilter.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  category: {
    type: String,
    default: ''
  },
  favoritesOnly: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const promptsStore = usePromptsStore()
const favoritesStore = useFavoritesStore()
const { t } = useI18n()

const searchQuery = ref('')

// Set category filter if provided via route param
watch(() => props.category, (newCategory) => {
  if (newCategory) {
    promptsStore.setSelectedCategories([newCategory])
  }
}, { immediate: true })

const pageTitle = computed(() => {
  if (props.favoritesOnly) {
    return t('nav.favorites')
  }
  if (props.category) {
    return t(`categories.${props.category}`)
  }
  return t('nav.prompts')
})

const sortBy = computed({
  get: () => promptsStore.sortBy,
  set: (value) => promptsStore.setSortBy(value)
})

const filteredPrompts = computed(() => {
  let prompts = promptsStore.filteredPrompts
  
  // Filter by favorites if needed
  if (props.favoritesOnly) {
    prompts = prompts.filter(p => favoritesStore.isFavorite(p.id))
  }
  
  return prompts
})

const hasActiveFilters = computed(() => {
  return promptsStore.searchQuery || 
         promptsStore.selectedCategories.length > 0 || 
         promptsStore.selectedLevel !== 'all'
})

function handleSearch(query) {
  promptsStore.setSearchQuery(query)
}

function clearAllFilters() {
  promptsStore.clearFilters()
  searchQuery.value = ''
}
</script>

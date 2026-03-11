<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('home.searchPlaceholder')"
        class="w-full px-6 py-4 pl-14 pr-20 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all text-lg"
        @input="handleInput"
        @keyup.enter="handleSearch"
      />
      <svg 
        class="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      
      <!-- Clear Button -->
      <button 
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <svg class="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Search Button -->
      <button 
        @click="handleSearch"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
      >
        {{ $t('filter.search') }}
      </button>
    </div>

    <!-- Search Suggestions -->
    <div 
      v-if="showSuggestions && suggestions.length > 0" 
      class="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-lg overflow-hidden z-50"
    >
      <div 
        v-for="(suggestion, index) in suggestions" 
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="px-4 py-3 hover:bg-[var(--bg-secondary)] cursor-pointer flex items-center space-x-3 transition-colors"
      >
        <svg class="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span class="text-[var(--text-primary)]">{{ suggestion }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePromptsStore } from '@/stores/prompts.js'
import { debounce } from '@/utils/debounce.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const promptsStore = usePromptsStore()
const showSuggestions = ref(false)

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Generate suggestions based on popular tags and titles
const suggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  
  const query = searchQuery.value.toLowerCase()
  const allTags = [...new Set(promptsStore.prompts.flatMap(p => p.tags))]
  const allTitles = promptsStore.prompts.map(p => p.title)
  
  const matched = [...allTags, ...allTitles]
    .filter(item => item.toLowerCase().includes(query))
    .slice(0, 5)
  
  return matched
})

const handleInput = debounce(() => {
  showSuggestions.value = searchQuery.value.length >= 2
  promptsStore.setSearchQuery(searchQuery.value)
}, 300)

function handleSearch() {
  showSuggestions.value = false
  emit('search', searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  showSuggestions.value = false
  promptsStore.setSearchQuery('')
  emit('search', '')
}

function selectSuggestion(suggestion) {
  searchQuery.value = suggestion
  showSuggestions.value = false
  promptsStore.setSearchQuery(suggestion)
  emit('search', suggestion)
}
</script>

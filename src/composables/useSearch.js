import { ref, computed } from 'vue'
import { debounce } from '@/utils/debounce.js'

export function useSearch(items, options = {}) {
  const {
    searchFields = ['title', 'content'],
    debounceMs = 300
  } = options
  
  const query = ref('')
  const isSearching = ref(false)
  
  // Debounced search function
  const debouncedSearch = debounce((searchQuery) => {
    query.value = searchQuery
    isSearching.value = false
  }, debounceMs)
  
  // Perform search
  function search(searchQuery) {
    isSearching.value = true
    debouncedSearch(searchQuery)
  }
  
  // Filtered results
  const results = computed(() => {
    if (!query.value.trim()) {
      return items.value || items
    }
    
    const searchTerm = query.value.toLowerCase()
    const itemsArray = items.value || items
    
    return itemsArray.filter(item => {
      return searchFields.some(field => {
        const value = item[field]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm)
        }
        if (Array.isArray(value)) {
          return value.some(v => String(v).toLowerCase().includes(searchTerm))
        }
        return false
      })
    })
  })
  
  // Highlight matching text
  function highlightText(text, highlightQuery = query.value) {
    if (!highlightQuery.trim() || !text) return text
    
    const regex = new RegExp(`(${escapeRegExp(highlightQuery)})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>')
  }
  
  // Escape special regex characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  
  // Clear search
  function clear() {
    query.value = ''
    isSearching.value = false
  }
  
  return {
    query,
    isSearching,
    results,
    search,
    clear,
    highlightText
  }
}

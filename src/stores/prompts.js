import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import promptsData from '@/data/prompts.json'

export const usePromptsStore = defineStore('prompts', () => {
  // State
  const prompts = ref(promptsData)
  const searchQuery = ref('')
  const selectedCategories = ref([])
  const selectedLevel = ref('all')
  const sortBy = ref('popular') // popular, newest, name
  
  // Categories definition
  const categories = [
    { id: 'writing', name: 'AI写作', nameEn: 'AI Writing', icon: '✍️' },
    { id: 'art', name: 'AI绘画', nameEn: 'AI Art', icon: '🎨' },
    { id: 'video', name: 'AI视频', nameEn: 'AI Video', icon: '🎬' },
    { id: 'programming', name: 'AI编程', nameEn: 'AI Programming', icon: '💻' },
    { id: 'marketing', name: 'AI营销', nameEn: 'AI Marketing', icon: '📈' },
    { id: 'ecommerce', name: 'AI电商', nameEn: 'AI E-commerce', icon: '🛒' },
    { id: 'office', name: 'AI办公', nameEn: 'AI Office', icon: '📄' },
    { id: 'education', name: 'AI教育', nameEn: 'AI Education', icon: '📚' },
    { id: 'social', name: 'AI自媒体', nameEn: 'AI Social Media', icon: '📱' },
    { id: 'shortvideo', name: 'AI短视频', nameEn: 'AI Short Video', icon: '🎵' }
  ]
  
  const levels = [
    { id: 'all', name: '全部等级', nameEn: 'All Levels' },
    { id: 'basic', name: '基础', nameEn: 'Basic' },
    { id: 'advanced', name: '高级', nameEn: 'Advanced' },
    { id: 'pro', name: '专业', nameEn: 'Professional' }
  ]
  
  // Getters
  const filteredPrompts = computed(() => {
    let result = prompts.value
    
    // Search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query)
      )
    }
    
    // Category filter
    if (selectedCategories.value.length > 0) {
      result = result.filter(p => selectedCategories.value.includes(p.category))
    }
    
    // Level filter
    if (selectedLevel.value !== 'all') {
      result = result.filter(p => p.level === selectedLevel.value)
    }
    
    // Sort
    switch (sortBy.value) {
      case 'newest':
        result = [...result].sort((a, b) => b.id.localeCompare(a.id))
        break
      case 'name':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'popular':
      default:
        result = [...result].sort((a, b) => b.views - a.views)
        break
    }
    
    return result
  })
  
  const promptsByCategory = computed(() => {
    const grouped = {}
    categories.forEach(cat => {
      grouped[cat.id] = prompts.value.filter(p => p.category === cat.id)
    })
    return grouped
  })
  
  const hotPrompts = computed(() => {
    return [...prompts.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 8)
  })
  
  const featuredPrompts = computed(() => {
    return prompts.value.filter(p => p.featured).slice(0, 6)
  })
  
  // Actions
  function setSearchQuery(query) {
    searchQuery.value = query
  }
  
  function toggleCategory(categoryId) {
    const index = selectedCategories.value.indexOf(categoryId)
    if (index > -1) {
      selectedCategories.value.splice(index, 1)
    } else {
      selectedCategories.value.push(categoryId)
    }
  }
  
  function setSelectedCategories(categories) {
    selectedCategories.value = categories
  }
  
  function setSelectedLevel(level) {
    selectedLevel.value = level
  }
  
  function setSortBy(sort) {
    sortBy.value = sort
  }
  
  function clearFilters() {
    searchQuery.value = ''
    selectedCategories.value = []
    selectedLevel.value = 'all'
  }
  
  function getPromptById(id) {
    return prompts.value.find(p => p.id === id)
  }
  
  function getPromptsByCategory(categoryId) {
    return prompts.value.filter(p => p.category === categoryId)
  }
  
  function incrementViews(id) {
    const prompt = prompts.value.find(p => p.id === id)
    if (prompt) {
      prompt.views = (prompt.views || 0) + 1
    }
  }
  
  return {
    prompts,
    categories,
    levels,
    searchQuery,
    selectedCategories,
    selectedLevel,
    sortBy,
    filteredPrompts,
    promptsByCategory,
    hotPrompts,
    featuredPrompts,
    setSearchQuery,
    toggleCategory,
    setSelectedCategories,
    setSelectedLevel,
    setSortBy,
    clearFilters,
    getPromptById,
    getPromptsByCategory,
    incrementViews
  }
})

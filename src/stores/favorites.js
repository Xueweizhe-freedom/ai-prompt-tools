import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favorites = ref([])
  
  // Load from localStorage on init
  const stored = localStorage.getItem('promptFavorites')
  if (stored) {
    try {
      favorites.value = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse favorites:', e)
      favorites.value = []
    }
  }
  
  // Getters
  const favoriteIds = computed(() => favorites.value)
  const favoriteCount = computed(() => favorites.value.length)
  const isFavorite = (id) => favorites.value.includes(id)
  
  // Actions
  function addFavorite(id) {
    if (!favorites.value.includes(id)) {
      favorites.value.push(id)
      saveToStorage()
    }
  }
  
  function removeFavorite(id) {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveToStorage()
    }
  }
  
  function toggleFavorite(id) {
    if (isFavorite(id)) {
      removeFavorite(id)
      return false
    } else {
      addFavorite(id)
      return true
    }
  }
  
  function clearFavorites() {
    favorites.value = []
    saveToStorage()
  }
  
  function saveToStorage() {
    localStorage.setItem('promptFavorites', JSON.stringify(favorites.value))
  }
  
  return {
    favorites,
    favoriteIds,
    favoriteCount,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites
  }
})

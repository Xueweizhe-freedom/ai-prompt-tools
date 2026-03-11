import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref(localStorage.getItem('theme') || 'light')
  
  // Getters
  const isLight = computed(() => currentTheme.value === 'light')
  const isDark = computed(() => currentTheme.value === 'dark')
  const isCyber = computed(() => currentTheme.value === 'cyber')
  const themeLabel = computed(() => {
    const labels = {
      light: 'Light',
      dark: 'Dark',
      cyber: 'Cyber'
    }
    return labels[currentTheme.value]
  })
  
  // Actions
  function setTheme(theme) {
    if (['light', 'dark', 'cyber'].includes(theme)) {
      currentTheme.value = theme
      localStorage.setItem('theme', theme)
      applyTheme(theme)
    }
  }
  
  function toggleTheme() {
    const themes = ['light', 'dark', 'cyber']
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    
    // Handle dark mode class for Tailwind
    if (theme === 'dark' || theme === 'cyber') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  function initTheme() {
    applyTheme(currentTheme.value)
  }
  
  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  })
  
  return {
    currentTheme,
    isLight,
    isDark,
    isCyber,
    themeLabel,
    setTheme,
    toggleTheme,
    initTheme
  }
})

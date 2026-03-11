<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border-color)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <span class="text-white text-xl font-bold">P</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Prompt Hub
          </span>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
            :class="{ 'text-[var(--primary-color)] bg-[var(--bg-secondary)]': $route.path === item.path }"
          >
            {{ $t(item.label) }}
          </router-link>
        </nav>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">
          <!-- Theme Toggle -->
          <button 
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            :title="$t('theme.' + themeStore.currentTheme)"
          >
            <svg v-if="themeStore.isLight" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else-if="themeStore.isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </button>

          <!-- Language Switch -->
          <button 
            @click="toggleLocale"
            class="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[var(--bg-secondary)] transition-colors border border-[var(--border-color)]"
          >
            {{ currentLocale === 'zh' ? 'EN' : '中' }}
          </button>

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-[var(--border-color)]">
      <nav class="px-4 py-3 space-y-1">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
          :class="{ 'text-[var(--primary-color)] bg-[var(--bg-secondary)]': $route.path === item.path }"
        >
          {{ $t(item.label) }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme.js'

const { locale } = useI18n()
const themeStore = useThemeStore()
const mobileMenuOpen = ref(false)

const currentLocale = computed(() => locale.value)

const navItems = [
  { path: '/', label: 'nav.home' },
  { path: '/prompts', label: 'nav.prompts' },
  { path: '/favorites', label: 'nav.favorites' }
]

function toggleLocale() {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}
</script>

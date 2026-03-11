<template>
  <div class="min-h-screen flex flex-col bg-[var(--bg-primary)]">
    <Header />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useThemeStore } from '@/stores/theme.js'
import { generateSecurityMeta } from '@/utils/security.js'
import { generateWebsiteStructuredData } from '@/utils/seo.js'

const themeStore = useThemeStore()

onMounted(() => {
  // Initialize theme
  themeStore.initTheme()
  
  // Add security meta tags
  generateSecurityMeta()
  
  // Add structured data
  generateWebsiteStructuredData()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

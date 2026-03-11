<template>
  <div class="space-y-4">
    <h3 class="font-semibold text-[var(--text-primary)]">{{ $t('prompt.level') }}</h3>
    
    <div class="space-y-2">
      <button
        v-for="level in levels"
        :key="level.id"
        @click="selectLevel(level.id)"
        class="w-full px-4 py-3 rounded-xl text-left transition-all border flex items-center justify-between"
        :class="selectedLevel === level.id 
          ? 'bg-[var(--primary-color)]/10 border-[var(--primary-color)] text-[var(--primary-color)]' 
          : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--primary-color)]/50'"
      >
        <div>
          <div class="font-medium">{{ $t(`levels.${level.id}`) }}</div>
          <div v-if="level.id !== 'all'" class="text-xs opacity-70 mt-0.5">
            {{ $t(`levels.${level.id}Desc`) }}
          </div>
        </div>
        <div 
          v-if="selectedLevel === level.id"
          class="w-5 h-5 rounded-full bg-[var(--primary-color)] flex items-center justify-center"
        >
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePromptsStore } from '@/stores/prompts.js'

const promptsStore = usePromptsStore()

const levels = computed(() => promptsStore.levels)
const selectedLevel = computed(() => promptsStore.selectedLevel)

function selectLevel(levelId) {
  promptsStore.setSelectedLevel(levelId)
}
</script>

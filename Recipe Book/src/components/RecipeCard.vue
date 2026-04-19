<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Recipe } from '@/types/recipe'
import { useBookmarksStore } from '@/stores/bookmarks'

const props = defineProps<{
  recipe: Recipe
}>()

const bookmarksStore = useBookmarksStore()
const isSaved = computed(() => bookmarksStore.isBookmarked(props.recipe.id))
</script>

<template>
  <article class="surface-card overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30">
    <div class="relative">
      <img :src="recipe.image" :alt="recipe.name" class="h-60 w-full object-cover" />
      <button class="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 backdrop-blur hover:bg-white" @click="bookmarksStore.toggle(recipe)">
        {{ isSaved ? 'Saved' : 'Save' }}
      </button>
    </div>
    <div class="p-5">
      <div class="flex flex-wrap items-center gap-2">
        <span class="tag-pill">{{ recipe.cuisine }}</span>
        <span class="tag-pill">{{ recipe.mealType[0] }}</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{{ recipe.name }}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} mins · {{ recipe.servings }} servings · {{ recipe.difficulty }}
      </p>
      <div class="mt-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-amber-500">★ {{ recipe.rating.toFixed(1) }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ recipe.reviewCount }} reviews</p>
        </div>
        <RouterLink :to="`/recipe/${recipe.id}`" class="action-button bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
          View recipe
        </RouterLink>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import { useBookmarksStore } from '@/stores/bookmarks'

const bookmarksStore = useBookmarksStore()
</script>

<template>
  <section class="container-shell py-10">
    <div class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Saved collection</p>
      <h1 class="mt-2 text-4xl font-semibold">Your bookmarked recipes, ready whenever inspiration hits.</h1>
    </div>

    <div v-if="bookmarksStore.hasBookmarks" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <RecipeCard v-for="recipe in bookmarksStore.items" :key="recipe.id" :recipe="recipe" />
    </div>

    <div v-else class="surface-card p-10 text-center">
      <p class="text-lg font-semibold">No saved recipes yet.</p>
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Start exploring and save dishes you want to cook later.</p>
    </div>
  </section>
</template>
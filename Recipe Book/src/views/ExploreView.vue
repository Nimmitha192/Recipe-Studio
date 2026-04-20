<script setup lang="ts">
import { computed, onMounted } from 'vue'
import FilterPanel from '@/components/FilterPanel.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useRecipesStore } from '@/stores/recipes'

const recipesStore = useRecipesStore()

onMounted(async () => {
  await recipesStore.fetchRecipes()
})

const resultCountLabel = computed(() => `${recipesStore.filteredRecipes.length} recipes found`)
</script>

<template>
  <section class="container-shell py-10">
    <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Explore</p>
        <h1 class="mt-2 text-4xl font-semibold">Browse recipes by cuisine, ingredient, or meal type.</h1>
      </div>
      <p class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">{{ resultCountLabel }}</p>
    </div>

    <FilterPanel
      :search="recipesStore.search"
      :cuisines="recipesStore.cuisines"
      :meal-types="recipesStore.mealTypes"
      :selected-cuisine="recipesStore.selectedCuisine"
      :selected-meal-type="recipesStore.selectedMealType"
      @search="recipesStore.setSearch"
      @cuisine="recipesStore.setCuisine"
      @meal-type="recipesStore.setMealType"
    />

    <div v-if="recipesStore.loading" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="placeholder in 9" :key="placeholder" class="surface-card h-[420px] animate-pulse bg-slate-100 dark:bg-slate-900"></div>
    </div>
    <p v-else-if="recipesStore.error" class="mt-8 rounded-3xl bg-rose-50 p-5 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">{{ recipesStore.error }}</p>
    <div v-else class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <RecipeCard v-for="recipe in recipesStore.filteredRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </section>
</template>

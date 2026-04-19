<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useRecipesStore } from '@/stores/recipes'

const recipesStore = useRecipesStore()

onMounted(async () => {
  await recipesStore.fetchRecipes()
})
</script>

<template>
  <div>
    <HeroSection />

    <section class="container-shell py-4">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Editor’s picks</p>
          <h2 class="mt-2 text-3xl font-semibold">Featured recipes</h2>
        </div>
      </div>

      <div v-if="recipesStore.loading" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="placeholder in 6" :key="placeholder" class="surface-card h-[420px] animate-pulse bg-slate-100 dark:bg-slate-900"></div>
      </div>
      <p v-else-if="recipesStore.error" class="rounded-3xl bg-rose-50 p-5 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">{{ recipesStore.error }}</p>
      <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <RecipeCard v-for="recipe in recipesStore.featured" :key="recipe.id" :recipe="recipe" />
      </div>
    </section>

    <section class="container-shell pt-10">
      <LoginPanel />
    </section>
  </div>
</template>

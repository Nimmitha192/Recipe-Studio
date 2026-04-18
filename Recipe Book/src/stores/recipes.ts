import { defineStore } from 'pinia'
import type { Recipe, RecipesResponse } from '@/types/recipe'

interface RecipesState {
  recipes: Recipe[]
  featured: Recipe[]
  loading: boolean
  error: string
  search: string
  selectedCuisine: string
  selectedMealType: string
}

export const useRecipesStore = defineStore('recipes', {
  state: (): RecipesState => ({
    recipes: [],
    featured: [],
    loading: false,
    error: '',
    search: '',
    selectedCuisine: 'All',
    selectedMealType: 'All',
  }),

  getters: {
    cuisines: (state): string[] => [
      'All',
      ...new Set(state.recipes.map((recipe) => recipe.cuisine)),
    ],

    mealTypes: (state): string[] => [
      'All',
      ...new Set(state.recipes.flatMap((recipe) => recipe.mealType)),
    ],

    filteredRecipes: (state): Recipe[] => {
      const query = state.search.trim().toLowerCase()

      return state.recipes.filter((recipe) => {
        const matchesSearch =
          query.length === 0 ||
          recipe.name.toLowerCase().includes(query) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query),
          )

        const matchesCuisine =
          state.selectedCuisine === 'All' ||
          recipe.cuisine === state.selectedCuisine

        const matchesMealType =
          state.selectedMealType === 'All' ||
          recipe.mealType.includes(state.selectedMealType)

        return matchesSearch && matchesCuisine && matchesMealType
      })
    },
  },

  actions: {
    async fetchRecipes(): Promise<void> {
      if (this.recipes.length > 0) {
        return
      }

      this.loading = true
      this.error = ''

      try {
        const response = await fetch('https://dummyjson.com/recipes?limit=50')

        if (!response.ok) {
          throw new Error('Unable to load recipes right now.')
        }

        const data = (await response.json()) as RecipesResponse

        this.recipes = data.recipes
        this.featured = [...data.recipes]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6)
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : 'Unexpected error while loading recipes.'
      } finally {
        this.loading = false
      }
    },

    setSearch(value: string): void {
      this.search = value
    },

    setCuisine(value: string): void {
      this.selectedCuisine = value
    },

    setMealType(value: string): void {
      this.selectedMealType = value
    },
  },
})
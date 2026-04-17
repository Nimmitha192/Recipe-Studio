import { defineStore } from 'pinia'
import type { Recipe } from '@/types/recipe'

const STORAGE_KEY = 'recipe-studio-bookmarks'

interface BookmarksState {
  items: Recipe[]
}

const readFromStorage = (): Recipe[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as Recipe[]
  } catch {
    return []
  }
}

export const useBookmarksStore = defineStore('bookmarks', {
  state: (): BookmarksState => ({
    items: readFromStorage(),
  }),
  getters: {
    total: (state) => state.items.length,
    hasBookmarks: (state) => state.items.length > 0,
  },
  actions: {
    persist(): void {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    isBookmarked(recipeId: number): boolean {
      return this.items.some((item) => item.id === recipeId)
    },
    toggle(recipe: Recipe): void {
      if (this.isBookmarked(recipe.id)) {
        this.items = this.items.filter((item) => item.id !== recipe.id)
      } else {
        this.items = [recipe, ...this.items]
      }
      this.persist()
    },
  },
})

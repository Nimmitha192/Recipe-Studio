
import { computed, ref } from 'vue'

const STORAGE_KEY = 'recipe-studio-theme'
const theme = ref<'light' | 'dark'>(localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light')

const syncDocument = (): void => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  document.documentElement.classList.toggle('light', theme.value === 'light')
  localStorage.setItem(STORAGE_KEY, theme.value)
}

syncDocument()

export const useTheme = () => {
  const isDark = computed(() => theme.value === 'dark')

  const toggleTheme = (): void => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    syncDocument()
  }

  return { isDark, toggleTheme }
}

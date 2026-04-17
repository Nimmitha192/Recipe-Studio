import { defineStore } from 'pinia'
import type { LoginResponse, UserSession } from '@/types/recipe'

const STORAGE_KEY = 'recipe-studio-session'

const readSession = (): UserSession | null => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as UserSession
  } catch {
    return null
  }
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: readSession() as UserSession | null,
    loading: false,
    error: '',
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
  actions: {
    persist(): void {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
    async login(username: string, password: string): Promise<boolean> {
      this.loading = true
      this.error = ''

      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, expiresInMins: 30 }),
        })

        if (!response.ok) {
          throw new Error('Invalid username or password.')
        }

        const data = (await response.json()) as LoginResponse
        this.user = {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          username: data.username,
          token: data.accessToken,
          avatar: data.image,
        }
        this.persist()
        return true
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Login failed.'
        return false
      } finally {
        this.loading = false
      }
    },
    logout(): void {
      this.user = null
      this.persist()
    },
  },
})

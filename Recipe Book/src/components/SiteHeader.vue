<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useBookmarksStore } from '@/stores/bookmarks'
import { useSessionStore } from '@/stores/session'

const bookmarksStore = useBookmarksStore()
const sessionStore = useSessionStore()
const route = useRoute()
const isMenuOpen = ref(false)

const links = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Saved', to: '/bookmarks' },
])

const closeMenu = (): void => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
    <div class="container-shell flex items-center justify-between gap-4 py-4">
      <RouterLink to="/" class="flex items-center gap-3" @click="closeMenu">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/30">
          RB
        </div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
            Recipe Book
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Curated cooking experiences
          </p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
          :class="route.path === link.to ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300'"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <RouterLink
          to="/bookmarks"
          class="action-button bg-amber-400 text-slate-900 hover:bg-amber-300"
        >
          Saved {{ bookmarksStore.total }}
        </RouterLink>

        <RouterLink
          v-if="!sessionStore.isAuthenticated"
          to="/login"
          class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          Sign In
        </RouterLink>

        <RouterLink
          v-else
          to="/login"
          class="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <img
            :src="sessionStore.user?.avatar"
            alt="Profile"
            class="h-9 w-9 rounded-full object-cover"
          />
          <p class="pr-2 text-sm font-semibold text-slate-700 dark:text-slate-100">
            {{ sessionStore.user?.name }}
          </p>
        </RouterLink>
      </div>

      <button
        class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium md:hidden dark:border-slate-800"
        @click="isMenuOpen = !isMenuOpen"
      >
        Menu
      </button>
    </div>

    <div v-if="isMenuOpen" class="container-shell pb-4 md:hidden">
      <div class="surface-card flex flex-col gap-2 p-3">
        <RouterLink
          v-if="!sessionStore.isAuthenticated"
          to="/login"
          class="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          @click="closeMenu"
        >
          Sign In
        </RouterLink>

        <RouterLink
          v-else
          to="/login"
          class="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800"
          @click="closeMenu"
        >
          <img
            :src="sessionStore.user?.avatar"
            alt="Profile"
            class="h-9 w-9 rounded-full object-cover"
          />
          <p class="font-semibold">
            {{ sessionStore.user?.name }}
          </p>
        </RouterLink>

        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-2xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
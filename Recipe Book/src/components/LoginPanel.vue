<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const router = useRouter()

const form = reactive({
  username: 'emilys',
  password: 'emilyspass',
})

const handleSubmit = async (): Promise<void> => {
  const success = await sessionStore.login(form.username, form.password)

  if (success) {
    await router.push('/')
  }
}
</script>

<template>
  <section class="container-shell section-space overflow-x-hidden">
    <div class="grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div class="min-w-0">
        <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-fuchsia-500">
          Client account
        </p>

        <h1 class="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white break-words">
          Welcome back to Recipe Book!
        </h1>

        <p class="mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-slate-600 dark:text-slate-300">
          Log in to keep your experience seamless across sessions with account-aware state and persistent access.
        </p>

        <div
          class="mt-6 sm:mt-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 min-w-0"
        >
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-slate-500">
            Account status
          </p>

          <p class="mt-4 text-lg sm:text-xl font-semibold text-slate-900 dark:text-white break-words">
            {{
              sessionStore.isAuthenticated
                ? `Logged in as ${sessionStore.user?.name}`
                : 'Not logged in'
            }}
          </p>
        </div>
      </div>

      <div
        class="min-w-0 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <form
          v-if="!sessionStore.isAuthenticated"
          class="space-y-4 sm:space-y-5"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="username"
              class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="w-full min-w-0 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full min-w-0 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <p class="text-sm leading-6 text-slate-500 dark:text-slate-400 break-words">
            Use valid DummyJSON account credentials to test the authentication flow.
          </p>

          <p
            v-if="sessionStore.error"
            class="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 break-words dark:bg-rose-950/50 dark:text-rose-300"
          >
            {{ sessionStore.error }}
          </p>

          <button
            type="submit"
            class="w-full rounded-full bg-slate-900 px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950"
            :disabled="sessionStore.loading"
          >
            {{ sessionStore.loading ? 'Logging in...' : 'Log in' }}
          </button>
        </form>

        <div v-else class="space-y-5 min-w-0">
          <div class="flex items-center gap-3 sm:gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-800/70 min-w-0">
            <img
              :src="sessionStore.user?.avatar"
              alt="Profile"
              class="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-full object-cover"
            />
            <div class="min-w-0">
              <p class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white break-words">
                {{ sessionStore.user?.name }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400 break-all">
                {{ sessionStore.user?.email }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="w-full rounded-full bg-rose-500 px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-rose-400"
            @click="sessionStore.logout"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
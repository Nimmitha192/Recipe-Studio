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
  <section class="container-shell section-space">
    <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-500">
          Client account
        </p>

        <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back to Recipe Book!
        </h1>

        <p class="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Log in to keep your experience seamless across sessions with account-aware state and persistent access.
        </p>

        <!-- ✅ Account Status (no logout button now) -->
        <div
          class="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Account status
          </p>

          <p class="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            {{
              sessionStore.isAuthenticated
                ? `Logged in as ${sessionStore.user?.name}`
                : 'Not logged in'
            }}
          </p>
        </div>
      </div>

      <div
        class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <!-- ✅ Show login form only when NOT logged in -->
        <form
          v-if="!sessionStore.isAuthenticated"
          class="space-y-5"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label for="username" class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="w-full rounded-2xl border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full rounded-2xl border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <p class="text-sm text-slate-500 dark:text-slate-400">
            Use valid DummyJSON account credentials to test the authentication flow.
          </p>

          <p
            v-if="sessionStore.error"
            class="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-950/50 dark:text-rose-300"
          >
            {{ sessionStore.error }}
          </p>

          <button
            type="submit"
            class="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950"
            :disabled="sessionStore.loading"
          >
            {{ sessionStore.loading ? 'Logging in...' : 'Log in' }}
          </button>
        </form>

        <!-- ✅ Logged-in profile section (logout stays here) -->
        <div v-else class="space-y-5">
          <div class="flex items-center gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <img
              :src="sessionStore.user?.avatar"
              alt="Profile"
              class="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p class="text-lg font-semibold text-slate-900 dark:text-white">
                {{ sessionStore.user?.name }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ sessionStore.user?.email }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="w-full rounded-full bg-rose-500 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-rose-400"
            @click="sessionStore.logout"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
/*import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import BookmarksView from '@/views/BookmarksView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/explore', name: 'explore', component: ExploreView },
    { path: '/bookmarks', name: 'bookmarks', component: BookmarksView },
    { path: '/recipe/:id', name: 'recipe-detail', component: RecipeDetailView, props: true },
    ],
})

export default router*/

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import BookmarksView from '@/views/BookmarksView.vue'
import LoginView from '@/components/LoginPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/explore', name: 'explore', component: ExploreView },
    { path: '/bookmarks', name: 'bookmarks', component: BookmarksView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/recipe/:id', name: 'recipe-detail', component: RecipeDetailView, props: true },
  ],
})

export default router
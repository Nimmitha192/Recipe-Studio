<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_40%),linear-gradient(to_bottom,_rgba(255,255,255,0.95),_rgba(248,250,252,1))] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(to_bottom,_rgba(2,6,23,1),_rgba(3,7,18,1))]">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>


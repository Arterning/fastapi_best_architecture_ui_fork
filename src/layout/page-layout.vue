<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="move">
      <!-- <keep-alive> -->
        <component :is="Component" :key="route.fullPath" />
      <!-- </keep-alive> -->
    </Transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore } from '@/store';

  const tabBarStore = useTabBarStore();
  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style lang="less" >
  .move-enter-active {
    animation: move-in 0.25s ease;
  }
  @keyframes move-in {
    0% {
      transform: scale(0.99);
      opacity: 0;
    }
    50%{
      transform: scale(1.01);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>

<template>
  <div class="container">
    <video :src="src"></video>
    <div class="menu">
      <icon-play-arrow-fill style="stroke-width: 5;" v-show="!isPlaying" @click="clickPlay"/>
      <icon-pause style="stroke-width: 5;" v-show="isPlaying" @click="clickPause"/>
    </div>
  </div>
</template>


<script setup lang='ts'>
  import { ref, watch } from "vue";
  
  const props = defineProps(['src']);
  const isPlaying = ref(false);
  const videoRef = document.getElementsByTagName('video')[0];

  const clickPlay = ()=> {
    isPlaying.value = true;
    videoRef.play();
  }

  const clickPause = () => {
    isPlaying.value = false;
    videoRef.pause();
  }
</script>

<style scoped>
.container{
  position: relative;
}
.menu {
    position: absolute;
    width: 100%;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    left: 0;
    display: none;
}
</style>
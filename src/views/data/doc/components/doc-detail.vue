<template>
  <div class="container">
      <a-layout style="padding: 0 18px">
          <Breadcrumb />
          <a-card v-if="info">
            <ExcelDetail v-if="info.type==='excel'" 
            :title="info.title" 
            :doc_data="info.doc_data" 
            :file="info.file"/>
            <GeneralDetail v-else :info="info" />
          </a-card>
      </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { SysDocRes } from '@/api/doc';
  import useLoading from '@/hooks/loading';
  import { onMounted, ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDocStore } from '@/store';
  import GeneralDetail from './general-detail.vue';
  import ExcelDetail from './excel-detail.vue';

  const route = useRoute();
  const docStore = useDocStore();
  const { loading, setLoading } = useLoading(true);

  const info = ref<SysDocRes>();

  const { id } = route.params;

  onMounted(()=>{
    setLoading(true);
    const max = 10; // 超时时间
    const slice = 200; // 每次检查间隔时间
    const maxNumber = max / slice;
    let count = 0
    if(id){
      const inter = setInterval(()=>{
        info.value = docStore.getDocMap.get(Number(id));
        count += 1;
        if(info.value || count>=maxNumber){
          setLoading(false);
          clearInterval(inter);
        }
      }, slice)
    }
  })

</script>

<style lang="less" scoped>
.content-box{
  display: flex;
  width: 70vw;
  max-height: 65vh;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
  display: block;
}

/* 设置滚动条轨道的背景色 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 设置滚动条滑块的颜色 */
::-webkit-scrollbar-thumb {
  background: #999;
}

/* 设置滚动条滑块在悬停时的颜色 */
::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
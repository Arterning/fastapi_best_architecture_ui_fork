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
  import { querySysDocDetail, SysDocRes } from '@/api/doc';
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import GeneralDetail from './general-detail.vue';
  import ExcelDetail from './excel-detail.vue';

  const route = useRoute();
  const { loading, setLoading } = useLoading(true);

  const info = ref<SysDocRes>();

  const { id } = route.params;

  const fetchApiDetail = async (pk: number) => {
      setLoading(true);
      try {
        const res = await querySysDocDetail(pk);
        info.value = res;
      } catch (error) {
      // console.log(error);
      } finally {
        setLoading(false);
      }
  };

  if(id){
      fetchApiDetail(Number(id));
  }
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
<template>
    <a-space direction="vertical">
        <a-descriptions :column="1">
            <a-descriptions-item label="标题">
                {{ info.title }}
            </a-descriptions-item>
            <!-- <a-descriptions-item label="描述">
                <pre>
                {{ info.desc }}
                </pre>
            </a-descriptions-item> -->
            <a-descriptions-item label="预览">
                <keep-alive>
                    <a-tooltip content="点击以查看">
                        <a-image
                            style="cursor:pointer"
                            v-if="info.type==='picture'"
                            :src="buildSrcURL(info.file)"
                        />
                    </a-tooltip>
                </keep-alive>
                <keep-alive>
                    <video v-if="info.type==='media'" :src="buildSrcURL(info.file)"  style="width:75vw;height:65vh" controls></video>
                </keep-alive>
                <keep-alive>
                    <iframe v-if="info.type==='pdf'" :src="buildSrcURL(info.file)" style="width:75vw;" frameborder="0"></iframe>
                </keep-alive>
            </a-descriptions-item>
            <a-descriptions-item label="内容" >
                <div class="content-box">
                    <pre>{{ info.content }} </pre>
                </div>
            </a-descriptions-item>
        </a-descriptions>
    </a-space>        
</template>

<script lang="ts" setup>

    defineProps(['info']);

    const buildSrcURL = (file: string) => {
      let url;
      if (import.meta.env.VITE_API_BASE_URL) {
          url = `${import.meta.env.VITE_API_BASE_URL}/${file}`;
      } else {
          url = `${window.origin}/${file}`;
      }
      return url;
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
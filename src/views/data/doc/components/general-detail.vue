<template>
    <a-space direction="vertical">
        <a-descriptions :column="1">
            <a-descriptions-item label="文件标题">
                {{ info.title }}
            </a-descriptions-item>
            <a-descriptions-item label="邮件头" v-if="info.type==='email'" >
                <a-divider />
                <div class="email-title flex mb-2">   
                    <div class="email-label">主题</div>
                    <div>{{ info.email_subject || '-' }}</div>
                </div>
                <div class="flex mb-1">
                    <div class="email-label">发件人</div>
                    <div :class="info.email_from?'email-person':''">{{ info.email_from || '-' }}</div>
                </div>
                <div class="flex mb-1">
                    <div class="email-label">收件人</div>
                    <div :class="info.email_to?'email-person':''">{{ info.email_to || '-' }}</div>
                </div>
                <div class="flex">
                    <div class="email-label">时间</div>
                    <div>{{ dateFormat(info.email_time) }}</div>
                </div>
                <a-divider />
            </a-descriptions-item>
 
            <a-descriptions-item label="摘要">
                <pre>
                {{ info.desc }}
                </pre>
            </a-descriptions-item>
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
                    <video v-if="info.type==='media'" :src="buildSrcURL(info.file)"  style="width:75vw;" controls></video>
                </keep-alive>
                <keep-alive>
                    <iframe v-if="info.type==='pdf'" :src="buildSrcURL(info.file)" style="width:75vw;height:65vh" frameborder="0"></iframe>
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

    const dateFormat = (dateStr: string) => {
        if (!dateStr) return "-";
        const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = daysOfWeek[date.getDay()];

        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // 根据小时数判断上午/下午
        const period = hours < 12 ? "上午" : "下午";
        const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

        return `${year}年${month}月${day}日（${dayOfWeek}）${period}${formattedHour} : ${minutes}`;
    }

</script>

<style lang="less" scoped>
.content-box{
    display: flex;
    width: 70vw;
    max-height: 65vh;
    overflow: auto;
}

.flex{
    display:flex;
}

.email-title{
    font-weight: bold;
    font-size: 1.5rem;
}

.email-label{
    width:3rem;
    text-align: justify;
    text-align-last: justify;
    margin-right: 1rem;
}

.email-person{
    color:  rgb(var(--primary-6));
}

.mb-1{
    margin-bottom: 0.5rem;
}

.mb-2{
    margin-bottom: 1rem;
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